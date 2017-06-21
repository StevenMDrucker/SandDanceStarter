//-------------------------------------------------------------------------------------
//  Copyright (c) 2015 - Microsoft Corporation.
//    kMeansWorker.js - computes clusters of given data using K-MEANS algorithm, running as a Web Worker..
//-------------------------------------------------------------------------------------
importScripts("vuePlotCore.js");

function computeDistance(pt, centriod)
{
    //---- compute distance between pt and each cluster's centoid ----
    var distance = 0;
    for (var z = 0; z < pt.length; z++)
    {
        var pz = pt[z];
        var cz = centriod[z];

        distance += (pz - cz) * (pz - cz);
    }

    //---- don't take SQRT since we don't have to ----
    return distance;
}

/** computes and returns a cluster ID number for each row of data. */
function doKmeansWork(dataCols, K, kdRandomNumbers)
{   
    var epoc = 0;                  // counts passes over data 
    var N = dataCols.length;       // number of observations 
    var D = dataCols[0].length;    // number of features in each observation (=2 for OldFaithful data)

    //--- todo: get random number generator that is seed based ----

    //---- create holder for the D-dimensional center of each cluster ----
    var centriods = [];
    for (var i = 0; i < K; i++)
    {
        centriods[i] = [];
    }

    var clusterAssignments = vp.data.dataRepeat(-1, N);    // the cluster that each observation belongs to

    //---- these calls provide data for visualization of Utils's progress ----
    //Utils.VisTrace(epoc, "dataLoaded", "dataName", dataName, "N", N, "D", D, "K", K, "xData", xData);

    //vp.utils.debug("kMeansWorker: kdRandomNumbers.length=" + kdRandomNumbers.length + ", first=" +
    //    kdRandomNumbers[0]);

    //---- step 1: locate each cluster (k) at random within the data range in each dimension (d) ----
    var randIndex = 0;
    for (var d = 0; d < D; d++)
    {
        var colData = dataCols.map(function (xd) { return xd[d]; });
        var min = colData.min();
        var max = colData.max();
        var range = max - min;

        for (var k = 0; k < K; k++)
        {
            var rand = kdRandomNumbers[randIndex++];           // Math.random()
            var randValue = min + rand * range;
            centriods[k][d] = randValue;
        }
    }

    //Utils.VisTrace(epoc, "locateCentriods", "centriods", centriods);

    //---- iterate this part until we converge ----
    while (true)
    {
        epoc++;
        var assignmentsChanged = false;
        var totalDistances = 0.0;

        //---- step 2: assign each observation to the centriod/cluster that it is closest to ----
        for (var n = 0; n < N; n++)
        {
            var minDist = Number.MAX_VALUE;
            var minCluster = -1;        // none found yet

            //---- pt is a point in our D-dimensional space ----
            var pt = dataCols[n];

            for (var k = 0; k < K; k++)
            {
                var centriod = centriods[k];         // Utils.GetRow(centriods, k);

                var distance = computeDistance(pt, centriod);

                if (distance < minDist)
                {
                    minDist = distance;
                    minCluster = k;
                }
            }

            if (minCluster != clusterAssignments[n])
            {
                clusterAssignments[n] = minCluster;
                assignmentsChanged = true;
            }

            totalDistances += minDist;
        }

        //Utils.VisTrace(epoc, "assignClusters", "totalDistances", totalDistances, "clusterAssignments", clusterAssignments);

        if ((!assignmentsChanged) && (epoc > 1))
        {
            //---- we have converged ---
            //Utils.VisTrace(epoc, "converged", "totalDistances", totalDistances);
            break;
        }

        //---- step 3: compute the MEAN of each of the K clusters (the new centriods) ----

        //---- for each cluster, this will hold the totals of each dimension ----
        var clusterTotals = [];
        for (var i = 0; i < K; i++)
        {
            clusterTotals[i] = [];   // will be a D-dim array 

            for (var j = 0; j < D; j++)   
            {
                clusterTotals[i][j] = 0;
            }
        }

        var clusterCounts = vp.data.dataRepeat(0, K);         // # of observations in each cluster 

        //---- first, walk thru each observation and accumulate cluster totals and counts ----
        for (var n = 0; n < N; n++)
        {
            var k = clusterAssignments[n];
            clusterCounts[k]++;

            for (var d = 0; d < D; d++)
            {
                var value = dataCols[n][d];
                clusterTotals[k][d] += value;
            }
        }

        //---- now compute the average (mean) of each cluster/dimension combination ----
        for (var k = 0; k < K; k++)
        {
            for (var d = 0; d < D; d++)
            {
                var counts = (clusterCounts[k] == 0) ? 1 : clusterCounts[k];
                var mean = clusterTotals[k][d] / counts;

                centriods[k][d] = mean;
            }
        }

        //Utils.VisTrace(epoc, "locateCentriods", "centriods", centriods);
    }

    //---- now compute the average (mean) of each cluster/dimension combination ----
    var clusters = [];

    for (var k = 0; k < K; k++)
    {
        var maxDist = 0;

        //---- compute max distance for all members of this cluster ----
        for (var n = 0; n < N; n++)
        {
            var centroid = centriods[k];

            if (clusterAssignments[n] == k)
            {
                var pt = dataCols[n];
                var distance = computeDistance(pt, centriod);

                if (distance > maxDist)
                {
                    maxDist = distance;
                }
            }
        }

        var cluster = { center: centroid, radius: maxDist, counts: clusterCounts[k] };
        clusters.push(cluster);
    }

    return {
        totalDistance: totalDistances, assignments: clusterAssignments, clusters: clusters, epoc: epoc,
        clusterAssignments: clusterAssignments
    };
}

self.addEventListener("message", function (e)
{
    var jsonObj = e.data;
    var result = doKmeansWork(jsonObj.columns, jsonObj.K, jsonObj.kdRandomNumbers);

    jsonObj.columns = null;     // faster to send obj back without these
    jsonObj.result = result;
    jsonObj.status = "done";
    postMessage(jsonObj);
});

