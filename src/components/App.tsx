import * as React from 'react';
import { Counter } from 'src/components/Counter';
import VegaLite from 'react-vega-lite';
import BarChart from 'src/components/BarChart';
//const VegaLite = require('react-vega-lite');



export interface IAppProps {

}


 const spec = {
  "description": "A simple bar chart with embedded data.",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
};


// <VegaLite spec={spec} data={barData} />
// <BarChart data={barData} />

export class App extends React.Component<IAppProps, void> {
    public rand(min, max)
    {
        var r2 = max - min;

        return r2 * Math.random() + min;
    }

    public render() {
        var canvas = document.getElementById("canvas1") as HTMLCanvasElement;
        var shapeEng = new beachParty.ShapeEngClass(canvas);
        var shapeCount = 25;

        shapeEng.clearFromBuffers();
        var gl = shapeEng.getGlContext();
        var camera = new beachParty.transformerClass(gl);
        camera.updateCamera(false, canvas.width, canvas.height);
             //---- this displayed our drawing stats at the end of each animation cycle ----
        shapeEng.onCycleEnd.attach(this, function(ss)
        {
            var msg = "<br>shapeCount=" + vp.formatters.comma(ss.shapeCount, 0) + ", shapeType=" + beachParty.DrawPrimitive[ss.drawPrimitive]
                + ", instanced=" + ss.isInstancing + ", maxGlBufferLength=" + ss.maxGlBufferLength +

                "<br>glBufferMem=" + vp.formatters.comma(ss.bufferMemUsage / 1000000, 2) +
                " MB, glBufferTime=" + ss.glBufferTime + " ms, drawShapes=" + ss.glDrawTime + " ms, FPS=" + ss.lastCycleFrameRate + ", batches=" + vp.formatters.comma(ss.drawBatchCount, 0);

            document.getElementById("idCount").innerHTML = msg;
        });

        //---- build drawing parameters ----
        var dp = shapeEng.getParams();   // start with default values

        dp.cameraParams = camera.cameraParams();
        dp.canvasWidth = canvas.width;
        dp.canvasHeight = canvas.height;
        dp.sizeFactor = .5;         // relative drawing size (this works well for 25 shapes)
        dp.colorPalette = ["red", "green", "blue"];
        dp.drawPrimitive = beachParty.DrawPrimitive.cube;   // a 3D cube
        dp.clearColor = "black";        // color of the plot background
        dp.useInstancing = true;        // use webGL instancing for better performance

        shapeEng.setParams(dp);

        //---- get world coordinates of our canvas, so we know where to place our shapes in 3D space ----
        var rcWorld = camera.getWorldBounds();

        var start = vp.utils.now();

        //---- create dataFrame to bind to the chart ----
        var x = [];
        var y = [];
        var z = [];
        var factor = .95;

        for (var i = 0; i < shapeCount; i++)
        {
            x[i] = .9 * this.rand(factor * rcWorld.left, factor * rcWorld.right);
            y[i] = .9 * this.rand(factor * rcWorld.top, factor * rcWorld.bottom);
            z[i] = 0;
        }

        //---- build shapes ----
        var shapes = [];
        for (var i = 0; i < shapeCount; i++)
        {
            var shape = new beachParty.Shape();

            //---- for now, must always specify ALL 15 fields of Shape ----

            //---- 3D location of shape ----
            shape.x = x[i];
            shape.y = y[i];
            shape.z = z[i];

            //---- 3D size of shape ----
            shape.width = 1;
            shape.height = 1;
            shape.depth = 1 / 8;

            shape.colorIndex = i % 3;       // index into color palette
            shape.imageIndex = 0;           // index into image sheet (not used here)
            shape.opacity = 1;              // opacity of shape, if blending is enabled
            shape.staggerOffset = 0;        // how shape should be delayed within animation cycle (not used here)

            shape.primaryKey = "key-" + i;  // a unique key for each shape (usually corresponding to the data record's primary key)

            //---- not used ----
            shape.redChannel = 0;           // this shape's direct red value ([0..1])
            shape.greenChannel = 0;         // this shape's direct green value ([0..1])
            shape.blueChannel = 0;          // this shape's direct blue value ([0..1])
            shape.theta = 0;                // line rotation angle (not used here)

            shapes.push(shape);
        }
        var buildShapesElapsed = vp.utils.now() - start;

        //---- do the animated draw of all shapes ----
        var dsStart = vp.utils.now();
        shapeEng.drawShapes(shapes);
        var dsElapsed = vp.utils.now() - dsStart;

        shapes = null;      // release memory

        return (
            <div>
                <h1>Hello SandDance!</h1>
            </div>
        );
    }
}


                // <VegaLite spec={spec} data={store.bardata} />
                // <Counter
                //     count={store.count}
                //     onDecrease={() => store.decrease("A")}
                //     onIncrease={() => store.increase("A")}/>
                // <Counter
                //     count={store.count2}
                //     onDecrease={() => store.decrease("B")}
                //     onIncrease={() => store.increase("B")}/>
