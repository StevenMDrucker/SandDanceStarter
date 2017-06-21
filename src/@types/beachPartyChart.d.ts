/// <reference path="vuePlotCore.d.ts" />
/// <reference path="thirdParty/gl-matrix.d.ts" />
/// <reference path="thirdParty/hammer.d.ts" />
/// <reference path="beachPartyShape.d.ts" />
declare module beachParty {
    enum MappingSpread {
        normal = 0,
        low = 1,
        high = 2,
    }
    enum BinSorting {
        none = 0,
        ascending = 1,
        descending = 2,
        nameAscending = 3,
        nameDescending = 4,
    }
    /** the delimiters that separate tags in a column value. */
    enum TagDelimiter {
        none = 0,
        semi = 1,
        comma = 2,
        space = 3,
    }
    var TagDelimiters: string[];
    /** parameters for mapping column data to attributes, facets, and axes. */
    class MappingData {
        attrName: string;
        colName: string;
        binCount: number;
        isBinCountSoft: boolean;
        binSorting: BinSorting;
        forceCategory: boolean;
        tagDelimiter: TagDelimiter;
        allFacetsKeys: string[];
        spread: MappingSpread;
        useNiceNumbers: boolean;
        minBreak: number;
        maxBreak: number;
        minBreakFacet: number;
        maxBreakFacet: number;
        breaks: any[];
        labels: string[];
        formatting: string;
        customScalingCallback: any;
        isLegendBottomUp: boolean;
        /** this should be set to the bound set of values (from current or a previous filter setting). */
        boundColInfo: ColInfo;
        constructor(attrName: string, colName?: string, binCount?: number);
    }
    class SizeMappingData extends MappingData {
        sizePalette: any[];
        isContinuous: boolean;
        constructor(binCount?: number);
    }
    class LineMappingData extends MappingData {
        color: string;
        opacity: number;
        size: number;
        lineStyle: string;
        maxShapes: number;
        constructor(binCount?: number);
    }
    class TextMappingData extends MappingData {
        fontDesc: string;
        color: string;
        opacity: number;
        maxTextLength: number;
        maxShapes: number;
        constructor(binCount?: number);
    }
    class ShapeMappingData extends MappingData {
        shapePalette: string[];
        experimentalPalette: string[];
        imagePalette: string[];
        constructor(binCount?: number);
        getImagePalette(useExperimental?: boolean): string[];
    }
    class ImageMappingData extends MappingData {
        constructor(binCount?: number);
    }
    class ChannelMappingData {
        redColumn: string;
        greenColumn: string;
        blueColumn: string;
        rgbColumn: string;
    }
    class ColorMappingData extends MappingData {
        isContinuous: boolean;
        channelMapping: ChannelMappingData;
        colorPalette: any[];
        paletteSetName: string;
        paletteName: string;
        isReversed: boolean;
        isInverted: boolean;
        isCycling: boolean;
        constructor(psName?: string, paletteName?: string, isContinuous?: boolean, colorSteps?: number, isReversed?: boolean, isInverted?: boolean, isCycling?: boolean);
    }
    class SearchParams {
        colName: string;
        minValue: any;
        maxValue: any;
        searchType: TextSearchType;
        caseSensitiveSearch: boolean;
        searchAction: SearchAction;
        selectMode: SelectMode;
        searchRawValues: boolean;
    }
    class FacetLayoutInfo {
        plotBounds: ClientRect;
        labelBounds: ClientRect;
        facetIndex: number;
        facelLabel: string;
        searchParams: SearchParams;
    }
    class FacetMappingData extends MappingData {
        facetBounds: any[];
        constructor(binCount?: number);
    }
    class AxisData {
        isAxisVisible: boolean;
        drawTicks: boolean;
        drawLabels: boolean;
        drawGridLines: boolean;
        constructor();
    }
    class ChartFrameData {
        isVisible: boolean;
        opacity: number;
        labelColor: string;
        tickColor: string;
        padding: any;
        xAxis: AxisData;
        yAxis: AxisData;
        zAxis: AxisData;
        constructor(isVisible?: boolean);
    }
    enum TextSearchType {
        exactMatch = 0,
        startsWith = 1,
        contains = 2,
        lessThan = 3,
        lessThanEqual = 4,
        greaterThan = 5,
        greaterThanEqual = 6,
        betweenInclusive = 7,
        gtrValueAndLeqValue2 = 8,
        geqValueAndLessValue2 = 9,
        notEqual = 10,
    }
    enum SearchAction {
        selectMatches = 0,
        isolateMatches = 1,
        excludeMatches = 2,
        returnMatches = 3,
    }
    class ColMappings {
        x: MappingData;
        y: MappingData;
        z: MappingData;
        aux: MappingData;
        color: ColorMappingData;
        facet: FacetMappingData;
        size: SizeMappingData;
        shape: ShapeMappingData;
        image: ImageMappingData;
        text: TextMappingData;
        line: LineMappingData;
        constructor(x: string, y: string, color?: string);
    }
    class PreloadField {
        name: string;
        description: string;
        calcFieldExp: string;
        fieldType: string;
        formatting: string;
        sortedValues: string[];
        valueMap: ValueMapEntry[];
        constructor(name: string, desc: string, calcFieldExp?: string, fieldType?: string, sortedValues?: string[], formatting?: string);
    }
    enum FileType {
        delimited = 0,
        json = 1,
        sql = 2,
    }
    /** parameters that specify the working data: which data to load and how it should be transformed. */
    class WorkingDataParams {
        dataName: string;
        filePath: string;
        fileType: FileType;
        separator: string;
        hasHeader: boolean;
        tableName: string;
        fileSource: string;
        primaryKeyCol: string;
        canLoadFromCache: boolean;
        forceDataLoad: boolean;
        queryString: string;
        dataSampling: DataSampling;
        dataAggregation: DataAggregation;
        fieldList: PreloadField[];
        mergeFieldList: boolean;
        /** When this exp evaluates to true, the specified records will be removed from the data set, before the data is loaded. */
        prefilter: string;
        /** this is used to expand records to match each value in a multiValue column */
        multiValueCol: string;
        filteredOutKeys: string[];
        selectedKeys: string[];
        supressDataFrameLoadedMsgToClient: boolean;
        dataChangeType: DataChangeType;
        aggResult: AggResult;
        constructor(dataName?: string, path?: string, fileSource?: string);
        addField(name: string, desc: string, calcFieldExp?: string, fieldType?: string, sortedValues?: string[]): void;
        getField(name: string): PreloadField;
    }
    /** Preloaded settings for data files. Users should also be able to create these by saving their current view.
    This also is how we represent the full state of an insight, to be persisted between sessions. */
    class Preload extends WorkingDataParams {
        worldTransform: Float32Array;
        rotationInertia: number[];
        colMappings: ColMappings;
        chartName: string;
        subLayout: string;
        shapeColor: string;
        shapeImage: string;
        tooltipFieldList: string[];
        isXGridVisible: boolean;
        isYGridVisible: boolean;
        isZGridVisible: boolean;
        shapeOpacity: number;
        sizeFactor: number;
        separationFactor: number;
        dataTips: DataTipData[];
        sortCol: string;
        isSortAscending: boolean;
        flatParams: FlatParams;
        /** User-defined name for this preload. */
        /** User-supplied insight description/notes. */
        description: string;
        /** Should this be shown in the "File Open" UX?  (is this a 'favorites' data set?) */
        showInFileOpen: boolean;
        /** who create this INSIGHT or PRELOAD. */
        addedBy: string;
        /** when this INSIGHT/PRELOAD was created. */
        dateAdded: Date;
        recordCount: number;
        entityTypeCount: number;
        hasTimeData: boolean;
        constructor(name?: string, path?: string, description?: string, x?: string, y?: string, color?: string, chart?: string, subLayout?: string);
    }
    /** This is the subset of InsightData that is managed by the chart engine. */
    class SystemViewData {
        filteredOutKeys: string[];
        selectedKeys: string[];
        worldTransform: Float32Array;
        rotationInertia: number[];
        imageAsUrl: string;
        chartRepro: ChartRepro;
    }
    enum LoadAction {
        all = 0,
        selection = 1,
        filter = 2,
        view = 3,
        data = 4,
    }
    enum NotesSource {
        none = 0,
        name = 1,
        notes = 2,
        both = 3,
    }
    class InsightData {
        preload: Preload;
        imageAsUrl: string;
        chartRepro: ChartRepro;
        searchText: string;
        searchColumn: string;
        isDetailsPanelOpen: boolean;
        isSortPanelOpen: boolean;
        isAppPanelOpen: boolean;
        isColorPanelOpen: boolean;
        isSlicerPanelOpen: boolean;
        isShowing3DWheel: boolean;
        name: string;
        notes: string;
        loadAction: LoadAction;
        notesSource: NotesSource;
        notesBounds: any;
        constructor(insightName?: string, notes?: string);
    }
    enum MarkerType {
        circleFill = 0,
        rectFill = 1,
        triangleFill = 2,
        separator = 3,
        circleOutline = 4,
        rectOutline = 5,
        triangleOutline = 6,
    }
    /**
     * For callers, if you don't know the information for a field, leave it as "undefined" and the dataFrame class
     * will try to calculate it.
     */
    class ColStats {
        min: number;
        max: number;
        nanCount: number;
        keyCount: number;
        sortedKeys: string[];
        constructor(min?: number, max?: number, nanCount?: number, keyCount?: number, sortedKeys?: string[]);
    }
    /**
     * This is information about the specified column, relative to its SandDance-filtered-in values.
      * For callers, if you don't know the information for a field, leave it as "undefined" and the dataFrame class
      * will try to calculate it.
     */
    class ColInfo {
        name: string;
        colType: string;
        calcFieldExp: string;
        desc: string;
        stats: ColStats;
        infoIsComplete: boolean;
        constructor(name: string, desc?: string, colType?: string, calcFieldExp?: string, stats?: ColStats, infoIsComplete?: boolean);
    }
    /**
     * This structure extends ColInfo by adding a data vector.
     */
    class DataColumn extends ColInfo {
        data: any[];
        ctr: string;
        constructor(name: string, desc?: string, colType?: string, calcFieldExp?: string, stats?: ColStats, dataVector?: any[]);
    }
    /**
     * This specifies a substitution to be made for a specific value of a column.
     */
    class ValueMapEntry {
        originalValue: string;
        valueCount: number;
        newValue: string;
    }
    /** Information to rebuild chart as SVG, etc. */
    class ChartRepro {
        xFactor: number;
        yFactor: number;
        zFactor: number;
        layoutResults: LayoutResult[];
    }
    enum ChartType {
        Bar = 0,
        Column = 1,
        Custom = 2,
        Density = 3,
        Grid = 4,
        Line = 5,
        Links = 6,
        Poisson = 7,
        Radial = 8,
        Random = 9,
        Scatter = 10,
        Scatter3D = 11,
        Spiral = 12,
        Stacks = 13,
        Violin = 14,
        Xband = 15,
        Yband = 16,
    }
    enum LayoutType {
        Default = 0,
        Grid = 1,
        Percent = 2,
        Squarify = 3,
        Strips = 4,
        Cubes = 5,
        ScaleToFit = 6,
        Circle = 7,
        Poisson = 8,
        Random = 9,
    }
    function getUiName(ct: ChartType): any;
    enum VectorType {
        sortOrder = 0,
        naturalOrder = 1,
        primaryKeyList = 2,
    }
    class DataTipData {
        title: string;
        text: string;
        offset: any;
        colNames: string[];
        includeNames: boolean;
        primaryKey: string;
    }
    enum SelectMode {
        normal = 0,
        smartToggle = 1,
        toggleClear = 2,
        additive = 3,
        subtractive = 4,
        intersection = 5,
        nonIntersection = 6,
    }
    enum SnapshotType {
        none = 0,
        plot = 1,
        chart = 2,
    }
    class ClusteringParams {
        numClusters: number;
        constructor();
    }
    enum ClusterResultMapping {
        none = 0,
        color = 1,
        size = 2,
        shape = 3,
    }
    enum PredefinedCustomChart {
        grid = 0,
        random = 1,
        poisson = 2,
        spiral = 3,
        squarify = 4,
        line = 5,
        radial = 6,
        scatter = 7,
        xband = 8,
        yband = 9,
        scatter3D = 10,
        bar = 11,
        column = 12,
        density = 13,
        violin = 14,
        stacks = 15,
        custom = 16,
    }
    enum CustomColUsage {
        none = 0,
        map = 1,
        bin = 2,
    }
    enum CustomLayout {
        grid = 0,
        map = 1,
        radial = 2,
        random = 3,
        poisson = 4,
        squarify = 5,
        spiral = 6,
        stackX = 7,
        stackY = 8,
        stackZ = 9,
    }
    enum LayoutDirection {
        fromBottom = 0,
        fromLeft = 1,
        fromCenter = 2,
    }
    enum TextAlign {
        left = 0,
        center = 1,
        right = 2,
    }
    class CustomParams {
        xUsage: CustomColUsage;
        yUsage: CustomColUsage;
        zUsage: CustomColUsage;
        layout: CustomLayout;
        direction: LayoutDirection;
        constructor();
    }
    class DataCacheParams {
        cacheLocalFiles: boolean;
        cacheKnownFiles: boolean;
        cacheWebFiles: boolean;
        cacheSqlFiles: boolean;
        constructor();
    }
    /** on client side. */
    enum DragAction {
        select = 0,
        zoomIn = 1,
        rotate = 2,
        move = 3,
        wheel = 4,
    }
    enum ClientTransformMode {
        none = 0,
        auto = 1,
        rotate = 2,
        pan = 3,
        wheel = 4,
    }
    /** effect of dragging mouse/touch on plot, on engine side of things. */
    enum TransformMode {
        none = 0,
        move = 1,
        spin = 2,
        turn = 3,
        flip = 4,
        zoom = 5,
    }
    enum PanelLocation {
        top = 0,
        right = 1,
        bottom = 2,
        left = 3,
    }
    enum ThemeName {
        white = 0,
        black = 1,
    }
    enum SampleType {
        first = 0,
        last = 1,
        random = 2,
    }
    class DataSampling {
        isEnabled: boolean;
        sampleType: SampleType;
        sampleCount: number;
        samplingThreshold: number;
        constructor(isEnabled?: boolean, sampleType?: SampleType, sampleCount?: number, sampleThreshold?: number);
    }
    enum AggType {
        count = 0,
        sum = 1,
        median = 2,
        average = 3,
        min = 4,
        max = 5,
        stdDev = 6,
        variance = 7,
    }
    enum DataChangeType {
        datasetChange = 0,
        queryResults = 1,
        sampleResults = 2,
    }
    class AggRange {
        min: number;
        max: number;
    }
    class AggFilter {
        colName: string;
        isMember: boolean;
        values: string[];
        ranges: AggRange[];
        constructor(colName: string, isMember: boolean, values: string[]);
    }
    class DataAggregation {
        aggType: AggType;
        targetCol: string;
        groupCols: string[];
        aggFilters: AggFilter[];
        constructor(aggType: AggType, targetCol: string, groupCols: string[]);
    }
    class AggResult {
        data: any;
        trueRecordCount: number;
        aggFilteredRecordCount: number;
        wasSampled: boolean;
        wasAggregated: boolean;
    }
    enum nanAction {
        /** leave NAN values in place */
        none = 0,
        /** omit records where NAN values are found for this column */
        omitRecord = 1,
        /** replace NAN with value linearly interpolated between last/next records with true value */
        interpolate = 2,
        /** replace NAN with 0 */
        setToZero = 3,
        /** replace NAN with the user-specified "NAN replacement" value */
        setToFixedValue = 4,
        /** replace NAN with the MINIMUM value of this column */
        setToMin = 5,
        /** replace NAN with the MAXIMUM value of this column */
        setToMax = 6,
        /** replace NAN with the MEAN (average) value of this column */
        setToMean = 7,
        /** replace NAN with the MEDIAN (middle) value of this column */
        setToMediam = 8,
        /** replace NAN with the MODE (most occuring) value of this column */
        setToMode = 9,
    }
}
declare module beachParty {
    /** information needed to draw a facet/chart. */
    class baseLayoutClass {
        _animationData: AnimationData;
        _chart: chartClass;
        _chartBuilder: chartBuilderClass;
        _layoutName: string;
        _chartOptions: any;
        _is3dChart: boolean;
        _visibleColPickers: string;
        _visibleBinAdjusters: string;
        constructor(chart: chartClass, layoutName: string, chartOptions?: {});
        getIs3dChart(): boolean;
        getVisibleColPickers(): string;
        getVisibleBinAdjusters(): string;
        buildScales(nv: NamedVectors, rcxWorld: any, filteredRecordCount: number, facetCount: number): {
            x: vp.scales.baseScale;
            y: vp.scales.baseScale;
            z: vp.scales.baseScale;
            size: vp.scales.baseScale;
            colorIndex: any;
            imageIndex: vp.scales.baseScale;
            red: vp.scales.baseScale;
            green: vp.scales.baseScale;
            blue: vp.scales.baseScale;
        };
        computeFacetStats(dc: DrawContext, nvFacetBuckets: NamedVectors[]): number;
        preLayoutLoop(dc: DrawContext): void;
        /** to be overwritten by subclass, where appropriated. */
        adjustScales(dc: DrawContext): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
        scaleColData(vector: NumericVector, index: number, scale: vp.scales.baseScale, defaultValue?: number): number;
    }
}
declare module beachParty {
    class chartClass extends dataChangerClass implements IChart {
        static maxCategoryBins: number;
        static maxNumericBins: number;
        static maxFacetCategoryBins: number;
        static maxFacetNumericBins: number;
        static defaultOpacity: number;
        static defaultNumericBins: number;
        static autoBins: number;
        static addedBeachPartyCss: boolean;
        private _app;
        private _dataMgr;
        private _selectMode;
        private _touchMgr;
        private _regOptions;
        private _cmdId;
        private _cursorHitTestLoc;
        private _cursorHitTestShape;
        private _showClientFrame;
        private _showGlCanvasFrame;
        private _showChartUxFrame;
        private _axisBoxAttribute;
        private _axisBoxKeys;
        private _origColInfos;
        private _colInfos;
        private _recordCount;
        private _filename;
        private _selectedCount;
        private _filteredInCount;
        private _selection;
        private _preload;
        private _isSelectionLocked;
        private _sortItemCol;
        private _isItemSortAscending;
        private _lastScatterXCol;
        private _lastScatterYCol;
        private _chartBuilder;
        private _isChartCustom;
        private _customParams;
        private _customSpec;
        private _scatterParams;
        private _flatParams;
        private _sizeFactor;
        private _separationFactor;
        private _isOrthoCamera;
        private _useFacets;
        private _facetMgr;
        private _hoverPrimaryKey;
        private _lastHoverPos;
        private _isVisible;
        private _toolTipElem;
        private _chartEng;
        private _chartSpecs;
        private _layoutsByChart;
        private _toPercentOverride;
        private _isAnimOverride;
        private _isTransformMode;
        private _isDataZoomMode;
        private _wheelDownTime;
        private _dtMouseDown;
        private _spiralParams;
        private _prevChartType;
        private _autoRebuild;
        private _actualDrawingPrimitive;
        private _rcPlot;
        private _rcRotateRing;
        private _rotateRing;
        private _chartSettings;
        private _vsCurrent;
        private _isEngineDrawing;
        private _root;
        private _clientElem;
        private _uxElem;
        private _facetLabelHolderElem;
        private _iframeElem;
        private _chartUx;
        private _textOpacity;
        private _maxToolTipColumns;
        private _topOfChartUx;
        private _deltaOfChartUx;
        private _showItemCounts;
        private _showTitleText;
        private _titleText;
        private _tooltipColumns;
        private _dragAction;
        private _attributes;
        private _xAttr;
        private _yAttr;
        private _zAttr;
        private _auxAttr;
        private _colorAttr;
        private _facetAttr;
        private _sizeAttr;
        private _shapeAttr;
        private _imageAttr;
        private _lineAttr;
        private _textAttr;
        private _shapeColor;
        private _shapeOpacity;
        private _shapeImage;
        private _canvasColor;
        private _chartColor;
        private _drawingPrimitive;
        private _instancingParams;
        private _isContinuousDrawing;
        private _chartFrameData;
        private _animationData;
        private _hoverParams;
        private _isTooltipsEnabled;
        private _includeNamesInTooltip;
        private _hoverOnDetailView;
        private _hoverOnMouseMove;
        private _selectionParams;
        private _is3dGridAlwaysOn;
        private _isWheelInertia;
        private _showWheelDuringTransformMode;
        private _isLightingAlwaysOn;
        private _lightingParams;
        private _useNiceNumbers;
        private _tickBoxStyle;
        private _mapByColorChannels;
        private _maxItemCount;
        private _isMaxItemCountEnabled;
        private _defaultShapeSize;
        onActionDectected: bpEvent<{
            sender: any;
            action: string;
            subAction: any;
            evt: any;
        }>;
        onAttrColNameChange: bpEvent<{
            sender: any;
            attrName: string;
            colName: string;
        }>;
        onSearchStarted: bpEvent<{
            sender: any;
            selectionDesc: SelectionDesc;
        }>;
        onCycleStart: bpEvent<CycleDesc>;
        onCycleEnd: bpEvent<CycleStats>;
        constructor(app: IAppMin, dataMgr: dataMgrClass, divElem: HTMLElement, isVisible?: boolean);
        createViewSettings(): ViewSettings;
        getChartUx(): chartUxClass;
        hoverPrimaryKey(value?: string): any;
        getHoverParams(): HoverParams;
        autoLoadFile(wdp: WorkingDataParams, callback?: any): void;
        applyHover(x: any, y: any, returnRecord: any, columnList: any, showHover: any, callback: any): void;
        getBinData(md: MappingData, callback: any): void;
        testApis(): void;
        selectFacetBox(index: number): void;
        getIndexOfFacetLabel(label: string): number;
        animationData(value?: AnimationData): AnimationData;
        getVisibleColPickers(): string;
        getVisibleBinAdjusters(): string;
        getChartBuilder(): chartBuilderClass;
        /**
         * Request a new chart drawing/animation cycle.
         * @param reason
         */
        markBuildNeeded(reason: string): void;
        /**
         * Request a chart single frame draw (usually for operations like changing hover or size factor).
         * @param reason
         */
        markDrawNeeded(reason: string): void;
        getRotateRingBounds(): ClientRect;
        getUseNiceNumbers(): boolean;
        getIsDataZoomMode(): boolean;
        enableSelectionSharing(value: boolean): void;
        setPresentationMode(value: boolean): void;
        getViewName(): string;
        getSelectedCount(): number;
        setSelectedCount(value: number): void;
        openKnownFile(fileName: string): void;
        isMaxItemCountEnabled(value?: boolean): boolean;
        staggerForward(value?: boolean): boolean;
        scatterParams(value?: ScatterParams): ScatterParams;
        defaultShapeSize(value?: number): any;
        getTransformer(): transformerClass;
        xAttr(): attrClass;
        yAttr(): attrClass;
        zAttr(): attrClass;
        auxAttr(): auxAttrClass;
        colorAttr(): colorAttrClass;
        sizeAttr(): attrClass;
        shapeAttr(): attrClass;
        textAttr(): attrClass;
        facetAttr(): attrClass;
        xMapping(): MappingData;
        yMapping(): MappingData;
        zMapping(): MappingData;
        auxMapping(): MappingData;
        colorMapping(): ColorMappingData;
        sizeMapping(): SizeMappingData;
        shapeMapping(): ShapeMappingData;
        facetMapping(): FacetMappingData;
        textMapping(): TextMappingData;
        maxItemCount(value?: number): number;
        isSelectionLocked(value?: boolean): boolean;
        getColInfos(): ColInfo[];
        setColInfos(value: ColInfo[]): void;
        getOrigColInfos(): ColInfo[];
        getPreload(): WorkingDataParams;
        onDataLoaded(): void;
        getRecordCount(): number;
        getFilteredInCount(): number;
        getFileName(): string;
        getAppMin(): IAppMin;
        enableTickBoxUI(value?: boolean): void;
        processDataChange(changeFlags: DataChangeFlags): void;
        setChartDebugInfo(value: any): void;
        enableTwoFingerSwipe(value: boolean): void;
        isEngineDrawing(): boolean;
        selectMode(value?: SelectMode): SelectMode;
        textOpacity(value?: number): number;
        toPercentOverride(value?: number): any;
        clearAxisBoxStuff(): void;
        setDataAndSystemView(data: any, preload: Preload, svd: SystemViewData, callback: any): void;
        search(colName: string, value: string, maxValue?: string, searchType?: TextSearchType, searchAction?: SearchAction, searchRawValues?: boolean, caseSensitive?: boolean, selectMode?: SelectMode, callback?: any, selectKey?: string): void;
        searchEx(spList: SearchParams[], selectKey?: string, callback?: any): void;
        processSelectKey(selectMode: SelectMode, selectKey: string): SelectMode.normal | SelectMode.toggleClear | SelectMode.additive | SelectMode.subtractive | SelectMode.intersection | SelectMode.nonIntersection;
        doSearch(legendSource: string, colName: string, minValue: any, maxValue: any, searchType: TextSearchType, selectMode?: SelectMode, selectKey?: string): void;
        isolateSelection(callback: any): void;
        excludeSelection(callback: any): void;
        resetFilter(callback?: any): void;
        cursorHitTestLoc(value?: any): string;
        getSelectionParams(): SelectionParams;
        cursorHitTestShape(value?: string): string;
        showClientFrame(value?: boolean): boolean;
        showGlCanvasFrame(value?: boolean): boolean;
        showChartUxFrame(value?: boolean): boolean;
        showRing(): void;
        getActualToolTipColumns(): string[];
        tooltipColumns(value?: string[]): string[];
        isItemSortAscending(value?: boolean, tellEngine?: boolean): boolean;
        setSelectionWithKeys(keys: string[]): void;
        sortItemColumn(value?: string, tellEngine?: boolean): any;
        onSortParmsChanged(tellEngine: boolean): void;
        sortIfNeeded(colName: string, isDescending?: boolean): void;
        isItemSortByColor(value?: boolean): boolean;
        toggleWheel(): void;
        dragAction(value?: string): string;
        numColumns(value?: number): number;
        useNiceNumbers(value?: boolean): boolean;
        pulse3DCircleIfAppropriate(): void;
        isTransformMode(): boolean;
        mapByColorChannels(value?: boolean): boolean;
        shapeColor(value?: string, omitProcessing?: boolean): string;
        onShapeColorChanged(): void;
        hasData(): boolean;
        shapeImage(value?: string, omitProcessing?: boolean): string;
        getLayoutName(): string;
        layoutType(): LayoutType;
        onShapeImageChanged(): void;
        chartColor(value?: string): string;
        onChartColorChanged(): void;
        canvasColor(value?: string): string;
        onCanvasColorChanged(): void;
        getSpiralSeed(): number;
        setSpiralSeed(seed?: number): number;
        buildFromTop(value?: boolean): boolean;
        onFlatParamsChanged(): void;
        flatParams(value?: FlatParams): FlatParams;
        spiralParams(value?: SpiralParams): SpiralParams;
        shapeOpacity(value?: number, omitProcessing?: boolean): number;
        shapeOpacityCompleted(value?: number): void;
        isDataZoomMode(value?: boolean): boolean;
        toggleDataZoom(e: any): void;
        resetDataZoomMode(): void;
        isCountOrSumOrGrid(attrName: string, layoutType?: LayoutType): boolean;
        getAttribute(name: string): attrClass;
        sizeFactor(value?: number, animate?: boolean, omitProcessing?: boolean): number;
        setSizeFactor(value: number, animate: boolean): void;
        sizeFactorCompleted(value?: number): void;
        separationFactor(value?: number, omitProcessing?: boolean): number;
        onChartOrLayoutChanged(): void;
        private isLoggingEnabled(value?);
        applyViewSettings(): void;
        private getLayoutsForCurrentChart();
        onChartChanged(layoutType?: LayoutType): void;
        customParams(): CustomParams;
        /**
         *  called when we change the view (chart type).
         * @param name
         * @param isFromUi
         */
        changeToLayout(layoutType: LayoutType, isFromUi: boolean): void;
        logAction(gesture: Gesture, elementId: string, elementType: ElementType, action: Action, target: Target, isUndoable: boolean, options?: {
            [key: string]: any;
        }, forceLog?: boolean, nonLogOptions?: {
            [key: string]: any;
        }): void;
        clearSelection(): void;
        isWheelInertia(value?: boolean): boolean;
        showWheelDuringTransformMode(value?: boolean): boolean;
        is3dGridAlwaysOn(value?: boolean): boolean;
        ambientLightLevel(value?: number): number;
        customSpec(value?: string): string;
        customX(value?: string): string;
        customY(value?: string): string;
        customZ(value?: string): string;
        customLayout(value?: string): string;
        applyCustomParams(): void;
        takeSnapshot(chartBgColor: string, plotOnly?: boolean): any;
        captureInsightProperties(preload: Preload): void;
        onCustomParamChanged(): void;
        on3dViewChanged(): void;
        isLightingAlwaysOn(value?: boolean): boolean;
        onLightingParamsChanged(): void;
        getLightingParanms(): Lighting;
        selectedColorEffect(value?: string): string;
        unselectedColorEffect(value?: string): string;
        selectedColor(value?: string): string;
        unselectedColor(value?: string): string;
        selectedColorFactor(value?: number): number;
        unselectedColorFactor(value?: number): number;
        onSelectionParamsChanged(): void;
        hoverOnDetailView(value?: boolean): boolean;
        hoverOnMouseMove(value?: boolean): boolean;
        toolTipElem(value?: boolean): any;
        isTooltipsEnabled(value?: boolean): boolean;
        includeNamesInTooltip(value?: boolean): boolean;
        applyHoverCore(mousePos: any, showHover: boolean): any;
        hoverMatch(value?: string): string;
        hoverEffect(value?: string): string;
        hoverColor(value?: string): string;
        hoverSize(value?: number): number;
        onHoverParamsChanged(): void;
        isAnimationEnabled(value?: boolean): boolean;
        isStaggeringEnabled(value?: boolean): boolean;
        easeFunction(value?: string): string;
        easeType(value?: string): string;
        animationDuration(value?: number): number;
        maxStaggerTime(value?: number): number;
        onAnimationDataChanged(): void;
        chartFrameOpacity(value?: number): number;
        chartFrameData(): ChartFrameData;
        blankValueStr(): any;
        showXGridLines(value?: boolean): boolean;
        showYGridLines(value?: boolean): boolean;
        onChartFrameDataChanged(): void;
        isContinuousDrawing(value?: boolean): boolean;
        isInstancingEnabled(value?: boolean): boolean;
        drawingPrimitive(value?: string): string;
        getActualDrawingPrimitive(): DrawPrimitive;
        sortItemsByColor(): void;
        resetMappingsForNewFile(isLoadingInsight?: boolean, defaultCols?: any): void;
        setActualDrawingPrimitive(): void;
        is3DChart(chartType: ChartType): boolean;
        chartName(): string;
        getDataMgr(): dataMgrClass;
        getDataFrame(): dataFrameClass;
        onSizePackingRelatedChanged(triggerLayoutChange?: boolean, layoutType?: LayoutType): LayoutType;
        isChartUsingBins(attrName: string): boolean;
        getSystemViewData(snapShotType: SnapshotType, getReproData: boolean, chartBgColor: string, callback: any): void;
        /**
         * return the bounds (ClientRect) of the shape associated with the specified primary key.  The returned bounds
         * are relative to the plot bounds.
         * @param primaryKey
         */
        getShapeBounds(primaryKey: string): any;
        getColumnValues(columnList: string[], primaryKey: string): any[];
        getMemoryUse(callback: any): void;
        getEngineEvents(callback: any): void;
        /**
         * Find the shape within rcArea that is closest to its center.  Return the values of the specified colNames for the
         * data record associated with the located shape.
         * @param rcArea    - ClientRect of area to search, relative to the plot area of the chart.
         * @param colNames  - Names of columns whose values should be returned.
         * @param callback  - the callback function used to return the results when the operation is complete.
         */
        getMostCentralRecord(rcArea: ClientRect, colNames: string[], callback: any): void;
        getShapeBoundsAndRecord(primaryKey: string, colNames: string[], callback: any): void;
        getShapeEngine(): IShapeEngine;
        private buildAttributes();
        resetTransform(): void;
        getUiChartName(value?: string): any;
        rootElement(): HTMLElement;
        chartUxElement(): HTMLElement;
        clientElement(): HTMLElement;
        isVisible(value?: boolean, fadeTime?: number): boolean;
        showAxes(value?: boolean): void;
        showAxisTickLabels(value?: boolean): void;
        enableTitlePanel(value: boolean): void;
        showTitlePanel(value: boolean): void;
        showTitleText(value?: boolean): boolean;
        showItemCounts(value?: boolean): boolean;
        xBins(value?: number): any;
        yBins(value?: number): any;
        zBins(value?: number): any;
        private buildChartHtml(divElem, isVisible);
        onBoundsChanged(): void;
        tickBoxStyle(value?: string): string;
        getIFrameElem(): HTMLElement;
        layoutChart(): void;
        private onPlotMoved(rcPlot, rcRotateRing);
        getChartSpecs(): ChartSpecs;
        isShowing3DWheel(value?: boolean): boolean;
        getAxisColumnsInCurrentChart(): string[];
        getMappedColumns(): string[];
        isMappedToXYZ(colName: string): boolean;
        dataZoom(rcZoon: ClientRect, zoomOut: boolean): void;
        rectSelect(rcBand: ClientRect, selectMode: SelectMode): void;
        hitTestRectWithSelect(rcScreen: any, selectMode?: SelectMode): void;
        showChartUx(value?: boolean): void;
        private buildTitleStuff(rootW);
        onSelectionChanged(): void;
        onFilteredChanged(): void;
        addStyleSheet(rule: string): void;
        setCmdId(value: string): void;
        onLocalStorageChange(): void;
        /**
         *  Shutdown the chart & release as much memory as possible.
        */
        shutDown(): void;
        getBounds(): any;
        getPlotBounds(): ClientRect;
        titleText(value?: string): string;
        selectXTickBox(index: number): void;
        selectYTickBox(index: number): void;
        /**
         * Used to convert chart name and layout from insight file, UI controls, etc. into chartType.
         * @param chartName
         * @param layoutName
         */
        static getChartTypeFromName(chartName: string, layoutType: LayoutType): any;
        applyInsightToChart(insight: InsightData): void;
        setAttrMapping(attr: attrClass, md: MappingData): void;
        regOptions(value?: any): any;
        changeToChart(newChartType: ChartType, layoutType?: LayoutType, gesture?: Gesture, uiName?: string, isChartCustom?: boolean): void;
        isChartCustom(): boolean;
        private copyMapping(md);
        getChart(): this;
        setAppAutoRebuild(autoRebuild: boolean, rebuildNow: boolean, ignoreFilterStage?: boolean): void;
        isAutoRebuild(): boolean;
        addBeachPartyCss(): void;
    }
    /** chart settings that are saved with each chartType (current session only). */
    class ViewSettings {
        sizeFactor: number;
        shapeOpacity: number;
        separation: number;
        shapeName: string;
        shapeColor: string;
        zBinCount: number;
        constructor(shapeColor?: string, shapeOpacity?: number, separation?: number, shapeName?: string, sizeFactor?: number, zBinCount?: number);
    }
}
declare module beachParty {
    /**
     * Try the parent element and its children onto the canvas associated with "ctx".
     * @param ctx
     * @param parent
     * @param drawInfo - an object {tx: number, ty: number} - offset info
     * @param omitParentDraw
     */
    function drawHtmlChildren(ctx: CanvasRenderingContext2D, parent: HTMLElement, drawInfo?: any, omitParentDraw?: boolean, idToSkip?: string): void;
}
declare module beachParty {
    function drawSvgChildren(ctx: CanvasRenderingContext2D, parent: SVGSVGElement, rcCanvas: ClientRect, xOffset?: number, yOffset?: number, flipY?: boolean): void;
}
declare module beachParty {
    class boxPlotClass {
        static run(data: any[], xCol: string, yCol: string, whiskerType: WhiskerType): {
            name: any;
            lower: number;
            middle: number;
            upper: number;
            yMin: any;
            yMax: any;
            lowFence: any;
            highFence: any;
            outliers: any[];
        }[];
        private static getPercentile(sdata, percentile);
        private static getStdDev(sdata);
    }
    enum WhiskerType {
        minMax = 0,
        tukey = 1,
        percentiles9to91 = 2,
        percentile2to98 = 3,
        stdDev = 4,
    }
}
declare module beachParty {
    class chartEngClass extends dataChangerClass {
        _chart: chartClass;
        _chartBuilder: chartBuilderClass;
        _dataMgr: dataMgrClass;
        constructor(chart: chartClass, chartBuilder: chartBuilderClass, dataMgr: dataMgrClass);
        private makeMatrix(fakeArray);
        private buildDataFrameLoadedMsgBlock(dataMgr);
        private loadDataFromServer(wdParams, requestId, callback);
        setDataAndSystemView(data: any, preload: Preload, svd: SystemViewData, callback: any): void;
        private buildSelectionChangedMsgBlock(dataMgr);
        private setDataAndSystemViewPost(svd, dataFrameLoadedMsgBlock, selectedChangedMsgBlock, filterChangedMsgBlock, transformMgr, dataMgr, cmd);
        private buildFilterChangedMsgBlock(dataMgr);
        setSystemView(svd: SystemViewData, callback?: any): {
            selectionChanged: boolean;
            filterChanged: boolean;
        };
        search(colName: string, value: string, maxValue?: string, searchType?: TextSearchType, searchAction?: SearchAction, searchRawValues?: boolean, caseSensitive?: boolean, selectMode?: SelectMode, callback?: any, selectKey?: string): void;
        searchEx(spList: SearchParams[], selectKey: string, callback?: any): void;
        getSystemViewData(snapShotType: SnapshotType, getReproData: boolean, chartBgColor: string, callback: any): void;
        getShapeBoundsAndRecord(primaryKey: string, colNames: string[], callback: any): void;
        getMostCentralRecord(rcArea: ClientRect, colNames: string[], callback: any): void;
        applyHover(x: any, y: any, returnRecord: any, columnList: any, showHover: any, callback: any): void;
        autoLoadFile(wdp: WorkingDataParams, callback?: any): void;
        getBinData(md: MappingData, callback: any): void;
        getMemoryUse(callback: any): void;
        getEngineEvents(callback: any): void;
    }
}
declare module beachParty {
    class localStorageMgr {
        static makeKey(storageType: StorageType, subType: StorageSubType, fn: string, tableName: string): string;
        static getLastPartOfKey(key: string): string;
        static dumpKeyValue(name: string, key: string, value: string): void;
        static save(storageType: StorageType, subType: StorageSubType, fn: string, value: string, tableName?: string): void;
        static rename(storageType: StorageType, subType: StorageSubType, oldFn: string, newFn: string): void;
        static delete(storageType: StorageType, subType: StorageSubType, fn: string, tableName?: string): void;
        static get(storageType: StorageType, subType: StorageSubType, fn: string, tableName?: string): string;
        static isPresent(storageType: StorageType, subType: StorageSubType, fn: string, tableName?: string): boolean;
        static enumerate(storageType: StorageType, subType: StorageSubType, onlyLastPart?: boolean): string[];
        static hookChanges(callback: any): void;
        static clearAll(): void;
    }
    class CacheEntry {
        data: string;
        wdParams: WorkingDataParams;
    }
    enum StorageType {
        appSettings = 0,
        currentTheme = 1,
        logTokens = 2,
        dataFile = 3,
        insights = 4,
        locale = 5,
        palette = 6,
        preload = 7,
        script = 8,
        sessionShare = 9,
        theme = 10,
        tour = 11,
    }
    enum StorageSubType {
        none = 0,
        selectionChange = 1,
        triggerEngineRead = 2,
        lastSessionState = 3,
        testResults = 4,
        machineId = 5,
        sessionId = 6,
        sessionToken = 7,
        local = 8,
        web = 9,
        sql = 10,
    }
}
declare module beachParty {
    class searchUtils {
        static getValueOfBin(binResults: beachParty.BinResult, index: number): any;
        static buildSearchInfoOnElem(element: any, labelList: string[], record: any, binResults: beachParty.BinResult, index: number, colName: string, isCategory: boolean, axisName: any, buttonType: string, isLast: boolean): void;
        static searchOnTickOrBarClick(e: any, selectMode: SelectMode): SearchParamsEx;
        private static searchOnBarClick(elem, sp, isLast, labels, index, isCategory, isBar, useCategoryForBins);
    }
}
declare module beachParty {
    class shareMgrClass extends beachParty.dataChangerClass {
        private _sessionId;
        private _changeNumber;
        private _fn;
        private _callback;
        private _isSharingEnabled;
        constructor(callback: any);
        setFilename(fn: string): void;
        private processStorageChangedRecord(sdStr);
        /** this simulates a local storage change. */
        onLocalStorageChange(): void;
        isSharingEnabled(value?: boolean): boolean;
        setSelection(selectedPrimaryKeys: string[]): void;
    }
    class ShareStateData {
        changedById: string;
        changeNumber: number;
        changeTime: number;
        filename: string;
        selectedPrimaryKeys: string[];
        constructor(changedById: string, changeNumber: number, fn: string, selectedPrimaryKeys: string[]);
    }
}
declare module beachParty {
    class traceMgrClass {
        static instance: traceMgrClass;
        _cmds: any[];
        _maxCmds: number;
        _nextIndex: number;
        constructor();
        addTrace(eventName: string, name: string, eventType: TraceEventType, durationId?: string): void;
        getCmds(): any[];
    }
    enum TraceEventType {
        point = 0,
        start = 1,
        end = 2,
    }
    function addTrace(traceName: string, reason: string, eventType: TraceEventType, durationId?: string): void;
}
declare module beachParty {
    class barSquarifyClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxPosSumAllFacets: number;
        _maxNegSumAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binBottoms: number[];
        _itemAssignments: number[];
        _itemLefts: number[];
        _itemWidths: number[];
        _itemBounds: any;
        _binWidth: number;
        _binHeight: number;
        _widthFactor: number;
        _inverseSizeFactor: number;
        _yMargin: number;
        _yBetween: number;
        _xMin: number;
        _xMax: number;
        constructor(chart: chartClass);
        /** Two responsiblities: 1. compute max count for any bin, over all facets.  2. adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
         1. adjust Y scale to reflect maxCount (across all facets).
         2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
        */
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultY: any, dc: DrawContext): void;
        layoutBin(rc: any, itemIndexes: number[], binSizes: number[], itemBounds: any, spacing: number): void;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(itemIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class fullCustomClass extends baseLayoutClass {
        _maxShapeSize: number;
        _halfSizeSize: number;
        _z: number;
        _results: FullLayoutResult[];
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        modifyXYScales(dc: DrawContext, halfShapeSize?: number): void;
        preLayoutLoop(dc: DrawContext): void;
        binFixedRange(bp: BinParams): void;
        binNearBy(bp: BinParams): void;
        parseBinType(node: CustomLayoutNode, binSpec: string): void;
        parseLayout(node: CustomLayoutNode, layoutSpec: string): void;
        getAxisBounds(axis: string, bounds: Bounds3d): {
            rangeMin: any;
            rangeMax: any;
        };
        makeScale(axis: string, bounds: Bounds3d, colData: NumericVector): vp.scales.linearScaleClass;
        layoutMap(lp: LayoutParams): void;
        layoutRandom(lp: LayoutParams): void;
        getMarginValue(dc: DrawContext, spec: number, axis: string): number;
        layoutBar(lp: LayoutParams): void;
        layoutSpine(lp: LayoutParams): void;
        layoutGrid(lp: LayoutParams): void;
        parseSpec(): CustomLayoutNode;
        fullLayout(dc: DrawContext): void;
        layoutNextLevel(bounds: Bounds3d, data: dataFrameClass, cl: CustomLayoutNode, dc: DrawContext): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
    class Bounds3d {
        x: number;
        y: number;
        z: number;
        xRange: number;
        yRange: number;
        zRange: number;
        constructor(x?: number, y?: number, z?: number, width?: number, height?: number, depth?: number);
    }
    class CustomLayoutNode {
        binFunc: any;
        layoutsByAxis: {
            [axis: string]: any;
        };
        childLayout: CustomLayoutNode;
        constructor();
    }
    class FullLayoutData {
        dataByKeys: {
            [key: string]: dataFrameClass;
        };
    }
    class FullLayoutResult {
        data: FullLayoutData;
        bounds: Bounds3d;
    }
    class BinParams {
    }
    class LayoutParams {
        dc: DrawContext;
        axis: string;
        results: FullLayoutResult[];
        bounds: Bounds3d;
        marginSpec: number;
        gapSpec: number;
        constructor();
    }
}
declare module beachParty {
    /** A sliding window sampler for streaming data.  Keeps the samples received in the last windowLength milliseconds. */
    class slidingWindowClass {
        _samples: TimeSample[];
        _windowLength: number;
        constructor(windowLength: number);
        addSample(value: any, clear?: boolean): void;
        removeExpiredEntires(): void;
        getSamples(): TimeSample[];
    }
    class TimeSample {
        value: any;
        timeStamp: number;
        constructor(value: any, timeStamp: number);
    }
}
declare module beachParty {
    class transformWheelClass extends dataChangerClass {
        _group: SVGGElement;
        _circle: SVGCircleElement;
        _vBar: SVGLineElement;
        _hBar: SVGLineElement;
        _svgParent: any;
        _center: SVGRect;
        _partTouched: string;
        _isActive: boolean;
        _wheelSize: number;
        constructor(svgParent: any, wheelSize: number);
        rebuild(): void;
        simulateMouseDown(e: any, canvasElem: any): void;
        wheelSize(value?: number): number;
        isActive(value?: boolean): boolean;
        setTooltip(value: boolean): void;
        onPartMouseUp(e: any, part: string): void;
        onPartMouseDown(e: any, part: string): void;
        isPtInMiddle(pt: any, isRelativeToGroup: boolean): boolean;
        partTouched(value?: string): string;
        show(value: boolean): void;
    }
}
declare module beachParty {
    class binHelper {
        static createBins(nv: NamedVectors, colName: string, numericBinCount: number, maxCategoryBins: number, forceCategory?: boolean, addIndexes?: boolean, buildAssignments?: boolean, binSortOptions?: binSortOptionsClass, formatter?: any, useNiceNumbers?: boolean, md?: MappingData): BinResult;
        static splitBinsIntoNamedVectors(binResult: any, nv: NamedVectors): NamedVectors[];
        /** for facets: split data from nv into groups, as defined by the bin result "bin". */
        private static buildBinBucket(bin, nv);
        static sortBins(binningResults: any, binSortOptions: binSortOptionsClass, nv: NamedVectors): void;
    }
    class binSortOptionsClass {
        sortDirection: BinSorting;
        sortByAggregateType: string;
        sumByColumn: string;
    }
    class BinInfo {
        /** name of this bin. */
        name: string;
        /** number of items in this bin. */
        count: number;
        /** sum of all "SUM" column values for all records in the bin. */
        sum: number;
        /** 0-based indexes of records in this bin. */
        rowIndexes: number[];
        /** indicates this is the first bin of a set.  Obsolete.  */
        /** indicates this is the last bin of a set.  For numeric/date bins, the last bin includes its MAX value.  */
        isLast: boolean;
        /** if true, this is a single bin containing values from all the remaining bins (in current order). */
        isOther: boolean;
        /** if true, this bin was produced from a tag column and needs special treatment. */
        isTagBin: boolean;
        /** if isOther, this contains the set of other keys/values. */
        otherKeys: any[];
        constructor(name: string, isOther?: boolean, otherKeys?: string[]);
    }
    class BinInfoNum extends BinInfo {
        min: number;
        max: number;
        /** formatted min value for this bin */
        minLabel: string;
        /** formatted max value for this bin */
        maxLabel: string;
        actualMin: number;
        actualMax: number;
        density: number;
        ncount: number;
        ndensity: number;
        constructor(name: string, min: number, max: number, actualMin?: number, actualMax?: number, density?: number, ncount?: number, ndensity?: number);
    }
    class BinResult {
        colName: string;
        bins: BinInfo[];
        assignments: number[];
        isTagBinning: boolean;
        useCategoryForBins: boolean;
    }
    class BinResultNum extends BinResult {
        dateFormatString: string;
    }
}
declare module beachParty {
    class binHelperCat {
        static createCatBins(nv: NamedVectors, colName: string, maxCategoryBins: number, addIndexes: boolean, buildAssignments: boolean, binSortOptions?: binSortOptionsClass, md?: MappingData): BinResult;
        static getSortedKeyList(isUsingTags: any, nv: any, colName: any, filter: any, md: any, binSortOptions: any, assignments: any, buildAssignments: any, colDataInfo: any, maxCategoryBins: any, keyList: string[]): {
            keyList: string[];
            otherKey: string;
            useOtherBin: boolean;
            otherKeys: string[];
            sumColData: any;
            groups: {};
            otherMap: {};
            otherIndex: number;
        };
        static groupTags(nv: NamedVectors, colName: string, filter: any, md: MappingData, binSortOptions: binSortOptionsClass, keys: string[], assignments: any[], buildAssignments: boolean): {};
        static groupRecordsByKey(nv: NamedVectors, colName: string, filter: any, binSortOptions?: binSortOptionsClass): {};
        static sortByContent(keyList: string[], groups: any, binSortOptions: binSortOptionsClass): string[];
    }
}
declare module beachParty {
    class binHelperDate {
        static createDateBins(nv: NamedVectors, colName: string, binSize: number, addIndexes?: boolean, returnBinAssignments?: boolean, formatter?: any, useNiceNumbers?: boolean, md?: MappingData, binSortOptions?: binSortOptionsClass): BinResultNum;
        /**
         * Common code for finding the axis/bin break values for date columns.
         * @param md
         * @param colInfo
         */
        static computeDateBreaks(md: MappingData, colInfo: ColInfo): any[];
    }
}
declare module beachParty {
    class binHelperNum {
        static createNumBins(nv: NamedVectors, colName: string, binSize: number, addIndexes?: boolean, returnBinAssignments?: boolean, formatter?: any, useNiceNumbers?: boolean, md?: MappingData, binSortOptions?: binSortOptionsClass): BinResultNum;
        /**
         * Common code for finding the axis/bin break values for numeric columns.
         * @param md
         * @param colInfo
         */
        static computeNumBreaks(md: MappingData, colInfo: ColInfo, addNanBreakIfNeeded: boolean): any[];
        static computeBinStats(bins: BinInfoNum[], dataItemCount: number): void;
        private static labelsNeedMoreDecimals(bins, formatter);
    }
}
declare module beachParty {
    function csvToJson(csv: any, hasHeader: any, sepChar: any, findTypes: any): any[];
    class csvLoaderClass {
        _colNames: any[];
        _processedHdr: boolean;
        _lastLoadRemainder: string;
        _colCount: number;
        _hasHeader: any;
        _sepChar: string;
        _quoteChar: string;
        _findTypes: boolean;
        _fixupValues: boolean;
        _shortRowsCount: number;
        constructor(hasHeader: boolean, sepChar: string, findTypes: boolean, fixupValues: boolean);
        loadFromText(csv: string): any[];
        collectRowValues(scanner: csvScannerClass, colNames: string[]): {};
        tryToConvertColToNativeType(rows: any, colName: any): void;
        tryToConvertColToNumeric(rows: any, colName: any): boolean;
        tryToConvertColToBool(rows: any, colName: any): boolean;
        tryToConvertColToDate(rows: any, colName: any): boolean;
    }
    function createCsvLoader(hasHeader: boolean, sepChar: string, findTypes: boolean, fixupValues?: boolean): csvLoaderClass;
}
declare module beachParty {
    class csvColLoaderClass {
        _colNames: any[];
        _processedHdr: boolean;
        _lastLoadRemainder: string;
        _colCount: number;
        _rowCount: number;
        _hasHeader: any;
        _sepChar: string;
        _quoteChar: string;
        _findTypes: boolean;
        _fixupValues: boolean;
        _text: string;
        _colRowIndexes: number[][];
        _scanner: csvScannerClass;
        _shortRowsCount: number;
        constructor(text: string, hasHeader: boolean, sepChar: string, findTypes: boolean, fixupValues: boolean);
        /** load header and determine col types thru record sampling. */
        buildDataFrameWithEmptyVectors(): dataFrameClass;
        private readRowsWithVectors(scanner, vectors, startRow, rowCount);
        private fillSparseColVectors(vectorMap, scanner, colIndexes);
        getRecord(rowIndex: number, colNames: string[]): any;
        loadColumns(vectorMap: any, colNames: string[]): void;
        private sampleForColTypes(scanner);
        private buildColRowIndexes(scanner);
        private readHeaderRow(scanner);
    }
}
declare module beachParty {
    class csvScannerClass {
        static endOfLine: number;
        static endOfFile: any;
        _delimiter: string;
        _quoteChar: string;
        _text: string;
        _offset: number;
        constructor(text: string, delimiter: string, quoteChar: string);
        scan(): any;
        justPassedDelimiter(): boolean;
        endOfFile(): boolean;
    }
}
declare module beachParty {
    class dataFrameClass extends dataChangerClass {
        ctr: string;
        _groupName: string;
        _groupColName: string;
        private _wdParams;
        private _sortKey;
        private _pkToVectorIndex;
        private _loader;
        private _recordCount;
        private _currentSortKeys;
        private _getColInfoWorkCount;
        private _isFilterActive;
        private _columns;
        _colMap: {
            [index: string]: DataColumn;
        };
        private _numericVectorsCache;
        constructor(dataColumns: DataColumn[]);
        computeRecordCount(): number;
        isFilterActive(value?: boolean): boolean;
        setWdParams(wdParams: WorkingDataParams): void;
        getColTypes(): string[];
        getColInfos(): any[];
        getColInfo(name: string): ColInfo;
        /** returns the type of column (date, number, string).  This value is calculated on demand, and then cached. */
        getColType(name: string): any;
        /** ensure the specified columns are loaded and the other columns are closed (to minimize memory use). */
        loadColumns(colList: string[]): void;
        rebuildPrimaryKeyIndex(): void;
        getColumnNames(): string[];
        getPkToVectorIndex(): {};
        getVectorIndexByKey(key: string): any;
        vectorToPrimaryKeys(vector: number[]): any[];
        getValueMap(colName: string, maxRows?: number, callback?: any): ValueMapEntry[];
        isColumnName(colName: string): boolean;
        append(df: dataFrameClass): void;
        private isValidFieldName(str);
        /** replaces column names with "record." in front of them.  Also correct the case-ing of the column names. */
        addRecordKeywordToColumnNames(exp: string): string;
        isColLoaded(colName: string): boolean;
        /** uses "exp" as a JavaScript expression to build a new vector of values. */
        buildCalcVector(exp: string): void;
        /** applies a filter and produces a new dataFrame object. */
        applyPrefilter(exp: string): void;
        /** create a new dataFrame, using the specified fieldList. */
        makeFields(fieldList: PreloadField[], mergeFields: boolean): dataFrameClass;
        loader(value?: dataLoaderClass): dataLoaderClass;
        /**
         *  Make the value substitutions specified by the fld's valueMap (array of valueMapEntry objects).
         * @param fld
         * @param vector
         */
        applyValueMap(fld: PreloadField, vector: any[]): void;
        applyValueMapEntry(entry: ValueMapEntry, vector: any[]): void;
        sortVectors(colName: string, ascending: boolean, colType: string): void;
        getSortKey(): string;
        reorderVectorInPlace(vector: any[], keys: any[]): void;
        getPreloadField(colName: string): PreloadField;
        addColsToData(newInfos: ColInfo[], newVectors: any[], callback: any): void;
        addColumn(ci: ColInfo, vector?: any[], notify?: boolean): void;
        toJsonString(): string;
        static jsonToDataFrame(jsonData: any[]): dataFrameClass;
        getRecordCount(): number;
        getPreload(): WorkingDataParams;
        getRecordByPrimaryKey(primaryKey: string, colNames?: string[]): any;
        getRecordByVectorIndex(recordIndex: number, colNames?: string[]): any;
        toJson(maxRecords?: number, indexes?: number[]): any[];
        /** gets the named vector in its ORIGINAL form (string, date, number). */
        getVector(name: string, invalidateNumericCache: boolean): any[];
        getFieldData(colName: string): PreloadField;
        invalidateCache(colName: string): void;
        /** gets the named vector in its NUMERIC form. */
        getNumericVector(name: string, forceCategory?: boolean, allKeys?: string[], useCache?: boolean): NumericVector;
        copyData(recordIndexes?: number[]): dataFrameClass;
        private static getSortedKeys(name, wdParams);
        getPrimaryKeys(vector: any[], vectorType: VectorType): any[];
        private buildNumericCol(name, forceNumeric?, forceCategory?, allKeys?);
        /**
         * Fill in missing information in col, using wdParams and numeric vector.
         * @param col
         * @param numericVector
         */
        private completeColInfo(col, numericVector);
        getFileName(): string;
        clearFilteredColInfosCache(): void;
        getIndexOfCol(name: string): number;
        /**
         * Get a copy of the colInfo for the specified column name.
         * @param colName
         */
        private buildColumnInfo(colName, numVector);
        private getFilteredKeysMinMax(numericVector, colName, colType);
        /**
         * Caution - this returns a vector of column values where the FILTERED OUT values have been removed.  This will break code that is expecting
         * a FULL vector (indexes will be wrong).
         * @param colName
         * @param asNumeric
         * @param numericVector
         */
        getFilteredInVector(colName: string, asNumeric?: boolean, numericVector?: NumericVector): any[];
        getFilteredVector(invalidateNumericCache: boolean): any[];
        static buildNumericColFromVector(name: string, colData: any[], colType: string, forceNumeric?: boolean, forceCategory?: boolean, allKeys?: string[], wdParams?: WorkingDataParams): NumericVector;
        private static getStringKeyIndexes(data, numericVector?, allKeys?);
        aggData(statInfo: StatInfo): any;
        getDataColumns(): DataColumn[];
    }
}
declare module beachParty {
    class dataLoaderClass {
        private _preloadMgr;
        private _colsOnDemand;
        private _csvColLoader;
        private _isCachingWebFiles;
        constructor(preloadMgr: preloadMgrClass, colsOnDemand: boolean, isCachingWebFiles: boolean);
        expandRecordsByKeywordColumn(data: any, colName: string): any[];
        loadColumns(colMap: any, loadList: string[]): void;
        getRecord(recordIndex: number, colNames?: string[]): any;
        getKeywordsFromCommaString(str: string): any[];
        loadDataFrameFromText(text: string, wdParams: WorkingDataParams): any;
        addSysCol(dataFrame: dataFrameClass, name: string, colType: string, desc?: string, vector?: any[]): void;
        addSystemColumns(dataFrame: dataFrameClass, wdParams: WorkingDataParams): void;
        /** open the specified known data file, async.  if "multiValueCol" is true, replicate records
            so that we have 1 record for each value in the specified column of each original record. */
        loadKnownAsyncCore(name: string, multiValueCol?: string, callback?: any): void;
        /** convert "anyData" into a dataFrame, and then apply wdParams. */
        processData(anyData: any, wdParams?: WorkingDataParams, multiValueCol?: string): {
            origDf: dataFrameClass;
            postDf: dataFrameClass;
            wdParams: WorkingDataParams;
        };
        runLocalAgg(wdParams: WorkingDataParams): any;
        setWdpResult(wdp: WorkingDataParams, aggResult: AggResult): void;
        openPreloadAsyncCore(wdParams: WorkingDataParams, multiValueCol?: string, callback?: any): void;
        private loadDataFromService(path, fileName, wdParams, multiValueCol?, callback?);
    }
}
declare module beachParty {
    var selectedName: string;
    var filteredName: string;
    var primaryKeyName: string;
    var randomXName: string;
    var randomYName: string;
    var systemColNames: string[];
    /** manages:
        - server data requests
        - client-side data requests
        - selection
        - filtering
    */
    class dataMgrClass extends dataChangerClass {
        private _dataFrame;
        private _fn;
        private _recordCount;
        private _selectedCount;
        private _filteredInCount;
        private _wdParams;
        private _shareMgr;
        private _preloadMgr;
        private _origColInfos;
        private _isClientEdition;
        private _colsOnDemand;
        private _isCachingWebFiles;
        onDataLoadStart: bpEvent<{
            sender: any;
            fn: string;
        }>;
        onDataLoadComplete: bpEvent<{
            sender: any;
            fn: string;
        }>;
        onDataChange: bpEvent<{
            sender: any;
            changeFlags: DataChangeFlags;
        }>;
        constructor(preloadMgr: preloadMgrClass, isClientEdition: boolean, isCachingWebFiles: boolean);
        colsOnDemand(): boolean;
        getPrimaryKeys(applySelection?: boolean, applyFilter?: boolean): any[];
        hasSelectionChanged(keyList: string[]): boolean;
        setDataDirect(dataColumns: DataColumn[], wdParams: WorkingDataParams): void;
        loadKnownAsync(name: string, wdParams?: WorkingDataParams, callback?: any): void;
        openKnownFile(name: string, fromUI: boolean, callback?: any): void;
        autoloadFile(wdParams: WorkingDataParams, callback?: any): void;
        openPreloadAsync(wdParams?: WorkingDataParams, callback?: any): void;
        /**
         *  returns column values for all selected rows, ignoring the filter.
         * @param names
         * @param asNumeric
         * @param callback
         */
        getSelectedRowsMultiCol(names: string[], asNumeric: boolean, callback: any): void;
        /**
         * returns values of a single column for all selected rows, optionally applying a filter.

         * @param colName
         * @param asNumeric
         */
        getSelectedRowsSingleCol(colName: string, asNumeric?: boolean, applyFilter?: boolean): any[];
        getOrigColInfos(): ColInfo[];
        getColKeyCounts(colName: string, sortByCount: boolean, isDescendingSort: boolean, maxKeys: number, callback?: any): {
            key: string;
            count: number;
        }[];
        getDataVectors(names: string[], asNumeric: boolean, callback: any): void;
        getFilteredInVector(colName: string, asNumeric?: boolean): any[];
        getColInfos(applyFilter?: boolean): any[];
        isFilterInIuse(): boolean;
        private buildColInfos(df);
        isFileLoaded(wdp: WorkingDataParams): boolean;
        onLocalStorageChange(): void;
        getShareMgr(): shareMgrClass;
        getDataFrame(): dataFrameClass;
        getFilename(): string;
        searchExactMatchNumber(selection: number[], data: any[], value: string, maxValue: string): void;
        searchExactMatchString(selection: number[], data: any[], value: string, maxValue: string): void;
        searchNotEqual(selection: number[], data: any[], value: string, maxValue: string): void;
        searchContains(selection: number[], data: any[], value: string, maxValue: string): void;
        searchStartsWith(selection: number[], data: any[], value: string, maxValue: string): void;
        searchGreaterThan(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchGreaterThanEqual(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchLessThan(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchLessThanEqual(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchBetweenInclusive(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchGtrValueAndLeqValue2(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchGeqValueAndLessValue2(selection: number[], data: any[], value: string, maxValue: string, isString: boolean): void;
        searchColValueByKeys(selection: number[], data: any[], otherKeys: string[]): void;
        dateToNumber(value: any): number;
        runSearchQuery(spList: SearchParams[]): any;
        private runSearchNode(sp);
        private searchSingleColumn(sp);
        applyMatchVector(matchVector: number[], searchAction: SearchAction, selectMode: SelectMode): any;
        getPreload(): WorkingDataParams;
        /** data can be either JSON array, map of named vectors, or text string. */
        setDataAndInfo(origDf: dataFrameClass, postDf: dataFrameClass, wdParams: WorkingDataParams, loader: dataLoaderClass): void;
        requestBinData(md: MappingData, callback: any): void;
        computeSelectedCount(): void;
        private computeFilteredCount();
        getFilteredVector(invalidateNumericCache: boolean): any[];
        getSelectedVector(invalidateNumericCache: boolean): number[];
        updateSelectionFromBoxes(origBoxes: BoundingBox[], selectMode?: SelectMode): void;
        /**
         *  Remove any indexes that are not in the current FILTERED IN records.
         * @param indexes
         */
        removeFilteredOutIndexes(indexes: number[]): any[];
        updateSelectionFromVectorIndexes(indexes: number[], selectMode: SelectMode): void;
        getVectorFromKeys(keys: string[]): any[];
        setFilter(filteredOutKeys: string[]): boolean;
        forceFilterChangedEvent(): void;
        /** sets the selection vector to the records described by "selectedPrimaryKeys", without applying any boolean operations. */
        setSelectionDirect(selectedPrimaryKeys: string[], changeSource: string): boolean;
        isolateSelection(): void;
        onFilterChanged(): void;
        excludeSelection(): void;
        /**
         * returns full records for the selected rows, optionally applying the filter.
         * @param applyFilter
         */
        getSelectedRecords(applyFilter?: boolean): any[];
        sortData(colName: string, ascending: boolean): void;
        resetFilter(): void;
        clearSelection(omitNotify?: boolean): void;
        onSelectionChanged(changeSource?: string): void;
        getSelectedCount(applyFilter?: boolean): number;
        getFilteredInCount(): number;
        getKnownDataPreloads(): Preload[];
        getPreloadMgr(): preloadMgrClass;
    }
    enum DataChangeFlags {
        dataSetChange = 1,
        selectionChange = 2,
        filterChange = 4,
        columnsChange = 8,
        dataUpdate = 16,
        sortOrder = 32,
    }
}
declare module beachParty {
    enum fileFormat {
        text = 0,
        json = 1,
        csv = 2,
        odata = 3,
        excelSheet = 4,
        excelAllSheets = 5,
    }
    interface CsvFormatOptions {
        hasHeader: boolean;
        sepChar: string;
        findTypes: boolean;
    }
    class fileAccess {
        /** reads a local text file that is selected by the user. */
        static readLocalTextFile(userPrompt: string, callback: any): boolean;
        static mapToUrlParams(map: any): string;
        static writeFile64(fn: string, content64: string): void;
        static writeFileText(fn: string, text: string, successCallback?: any, failureCallback?: any): void;
        static removeDirectory(dir: string): void;
        /** replace every /Date/ value with a javaScript date object. */
        static fixUpDatesFromDotNet(data: any): any;
        /** read TEXT file sync. from server relative path. */
        static readServerTextFile(relPath: string): string;
        /** read binary file sync. from server relative path, into arrayBuff. */
        static readServerFileIntoArrayBuff(relPath: string): Uint8Array;
        static readFile(fnOrUlr: string, format?: fileFormat, formatOptions?: any, asyncSuccessCallback?: any, asyncFailCallback?: any, noCache?: boolean, asDataFrame?: boolean, addDataPathIfNeeded?: boolean): any;
        static removeHtmlEncoding(value: string): string;
        static readSqlTable(cs: string, tableName: string, query: string, dataSampling: DataSampling, asyncSuccessCallback?: any, asyncFailCallback?: any): void;
        static readSqlTableAgg(cs: string, tableName: string, query: string, dataAgg: DataAggregation, asyncSuccessCallback?: any, asyncFailCallback?: any): void;
        static httpReadIncremental(url: any, isJson: any, offset: any, maxSize: any, successFunc: any, failFunc: any, callAsync?: any): void;
        static httpPost(url: any, stringToSend: any, successFunc: any, failFunc?: any, isAsync?: boolean, contentType?: string): void;
        static httpReadViaService(url: string, isJson: boolean, successFunc: any, failFunc?: any, isAsync?: boolean, noCache?: boolean): void;
        static httpReadCsvViaService(url: string, csvOpts: CsvFormatOptions, successFunc: any, failFunc?: any, isAsync?: boolean, asDataFrame?: boolean): void;
        static httpReadExcelViaService(url: string, format: fileFormat, sheetName: string, successFunc: any, failFunc?: any, isAsync?: any): void;
        static oDataRead(url: any, isJson: any, successFunc: any, failFunc: any): void;
        static oDataBag: any;
        static oDataReadAll(url: any, byCount: any, successFunc: any, failFunc: any): void;
    }
    class incrementalCsvLoader {
        _csvLoader: any;
        _offset: number;
        _recordsCallback: any;
        _url: any;
        constructor(url: any, hasHeader: any, sepChar: any, findTypes: any, recordsCallback: any);
        readNextCheck(size: any): void;
    }
    function pagePath(): string;
    function httpRead(url: string, isJson: boolean, successFunc: any, failFunc: any, callAsync?: boolean, noCache?: boolean): void;
    function getMyPath(): string;
    function bpServerPath(): string;
    function sandDancePageServer(): string;
    function bpServerNextPath(): string;
    function appPath(): string;
    function bpDataPath(): string;
    function createXMLHttpRequest(): any;
    function getDataFromResult(xmlRequest: XMLHttpRequest, isJson: boolean, decodeNeeded?: boolean): any;
    function startServerSort(keys: string[], sortAsNumbers: boolean, callback: any): void;
    function logActionToServer(sessionId: string, gesture: string, elementId: string, elementType: string, action: string, target: string, options?: any): void;
    function renderWebPageToPng(pageUrl: string, width: number, height: number, msTimeout: number, callback: any): void;
    function writeSessionFile(userName: string, fileName: string, contents: string, callback: any): void;
    function publishSessionToWebPage(userName: string, fileName: string, contents: string, callback: any): void;
    function readSessionFile(sessionUrl: string, callback: any): void;
}
declare module beachParty {
    class preloadMgrClass {
        private _preloads;
        constructor();
        getPreloads(): Preload[];
        getFilePreload(name: string): Preload;
        buildPreloads(): void;
    }
}
declare module vector {
    /** return the number of entries that are true (or == 1). */
    function countOn(vector: any): number;
    /** return the number of entries that are false (or == 0). */
    function countOff(vector: any): number;
    /** set each entry to 0. */
    function clear(vector: any): void;
    /** copy contents of source to dest. */
    function copy(dest: any, source: any): void;
    /** compare contents of vector to vector2. */
    function compare(vector: any, vector2: any): boolean;
}
declare module beachParty {
    class wdCompare {
        static valueEntriesMatch(entry1: ValueMapEntry, entry2: ValueMapEntry): boolean;
        static valueMapsMatch(map1: ValueMapEntry[], map2: ValueMapEntry[]): boolean;
        static fieldsMatch(f1: PreloadField, f2: PreloadField): boolean;
        static fieldListsMatch(list1: PreloadField[], list2: PreloadField[]): boolean;
    }
}
declare module beachParty {
    class baseLegendClass extends dataChangerClass {
        _maxPaletteHeight: number;
        _entryHeight: number;
        _entryWidth: number;
        _labelVertOffset: number;
        _root: HTMLElement;
        _titleElem: HTMLElement;
        _paletteElem: HTMLElement;
        _labelsElem: HTMLElement;
        _ticksElem: HTMLElement;
        _textElems: HTMLElement[];
        _legendTable: HTMLElement;
        _holderParent: HTMLElement;
        _paletteElements: HTMLElement[];
        _md: MappingData;
        _formatter: any;
        _legendName: string;
        _chartRouter: IChartRouter;
        onSearchRequest: bpEvent<{
            legendName: string;
            colName: string;
            fromValue: any;
            toValue: any;
            searchType: TextSearchType;
            selectMode?: SelectMode;
            selectKey?: string;
        }>;
        onPanelRequest: bpEvent<{
            e: any;
        }>;
        constructor(chartRouter: IChartRouter, legendName: string, rootName: string, titleElemName: string);
        doSearch(legendName: string, colName: string, fromValue: any, toValue: any, searchType: TextSearchType, selectMode?: SelectMode, selectKey?: string): void;
        getColInfo(colName: string): ColInfo;
        show(value: boolean): void;
        measureTextAndSetItemHeight(): void;
        buildLabelFormatter(): void;
        formatLabel(value: any): any;
        rebuildLegendEx(md: MappingData, breakCount: number, isNumeric: boolean): void;
        rebuildFromTop(md: MappingData, breakCount: number, isNumeric: boolean): void;
        rebuildFromBottom(md: MappingData, breakCount: number, isNumeric: boolean): void;
        selectBox(index: number): void;
        search(colName: string, value: string): void;
        searchForEntryValues(e: any): void;
        fillPaletteEntry(paletteW: vp.dom.singleWrapperClass, i: number, isTop: boolean): void;
        fillTickEntry(parentW: vp.dom.singleWrapperClass, addBottom: boolean): void;
        fillLabelEntry(labelW: vp.dom.singleWrapperClass, i: number, yOffset: number): void;
    }
}
declare module beachParty {
    class colorLegendClass extends baseLegendClass {
        _paletteElements: HTMLElement[];
        _continuousPalette: HTMLElement;
        _cm: ColorMappingData;
        _colType: string;
        _isNumeric: boolean;
        _lastValue: any;
        constructor(chartRouter: IChartRouter, rootName: string);
        colorMapping(value?: ColorMappingData): ColorMappingData;
        rebuildLegend(): void;
        buildContinuousPaletteDiv(tdW: vp.dom.IWrapperOuter): any;
        fillPaletteEntry(parentW: vp.dom.singleWrapperClass, i: number, isTop: boolean): void;
        fillLabelEntry(parentW: vp.dom.singleWrapperClass, i: number, yOffset: number): void;
    }
}
declare module beachParty {
    class facetLegendClass extends dataChangerClass {
        _fm: MappingData;
        _rootElem: HTMLElement;
        _titleElem: HTMLElement;
        constructor(rootName: string, cm: MappingData);
        facetMapping(value?: MappingData): MappingData;
        updateLegend(): void;
    }
}
declare module beachParty {
    class facetLabelMgrClass extends dataChangerClass {
        _labelHolderElem: HTMLElement;
        _labelElements: HTMLElement[];
        _chart: chartClass;
        _facetLayouts: FacetLayoutInfo[];
        constructor(chart: chartClass, labelHolderElem: HTMLElement);
        buildLabels(facetLayouts: FacetLayoutInfo[]): void;
        getIndexOfLabel(label: string): number;
        /**
         * Used to select a facel label from the API.
         * @param index
         */
        selectFacetLabel(index: number): void;
    }
}
declare module beachParty {
    /** this represents a vector, usually extracted from a dataFrame, which has been converted to all numbers. */
    class NumericVector {
        colType: string;
        colName: string;
        colInfo: ColInfo;
        values: Float32Array;
        keyInfo: KeyInfo;
        constructor(values: Float32Array | number[], colName: string, colType: string, colInfo?: ColInfo);
        clone(): NumericVector;
        getRawData(index: number): string | number;
        count(value: number): number;
        copy(indexes: number[]): NumericVector;
    }
}
declare module beachParty {
    class NamedVectors {
        length: number;
        x: NumericVector;
        y: NumericVector;
        z: NumericVector;
        red: NumericVector;
        green: NumericVector;
        blue: NumericVector;
        rgb: string[];
        colorIndex: NumericVector;
        imageIndex: NumericVector;
        staggerOffset: NumericVector;
        size: NumericVector;
        text: NumericVector;
        facet: NumericVector;
        aux: NumericVector;
        selected: NumericVector;
        layoutFilter: NumericVector;
        enterExitFilter: NumericVector;
        randomX: NumericVector;
        randomY: NumericVector;
        primaryKey: NumericVector;
        constructor(length: number, x?: NumericVector, y?: NumericVector, z?: NumericVector, colorIndex?: NumericVector, imageIndex?: NumericVector, staggerOffset?: NumericVector, size?: NumericVector, text?: NumericVector, facet?: NumericVector, selected?: NumericVector, layoutFilter?: NumericVector, enterExitFilter?: NumericVector, primaryKey?: NumericVector, randomX?: NumericVector, randomY?: NumericVector, red?: NumericVector, green?: NumericVector, blue?: NumericVector, aux?: NumericVector, rgb?: any[]);
        copy(indexes: number[]): NamedVectors;
    }
}
declare module beachParty {
    class cbUtils {
        static _colorFromName: any;
        static buildColorsFromName(): void;
        /** rebuild the 4 special properties for "toNV", based on info from the larger "fromNV" that toNV was built from. */
        static rebuildStringKeyIndexes(toNV: NumericVector, indexes: number[], fromNV: NumericVector): void;
        static onFileOpenError(fileName: string, ex: string): void;
        static getDataLength(nv: NamedVectors, applyFilter?: boolean): number;
        static toBool(value: string): boolean;
        static getMinMax(dataNumVector: NumericVector, filterNumVector: NumericVector, md: MappingData): {
            min: number;
            max: number;
        };
        static makeRangeScale(dataVector: NumericVector, filterVector: NumericVector, rangeMin: number, rangeMax: number, constantDefault?: number, md?: MappingData): vp.scales.baseScale;
        static buildFormatter(md: MappingData, scale: vp.scales.baseScale, colType: string): void;
        /** this is used to scale palette-based attributes (like IMAGE and SHAPE), other than color. */
        static makePaletteScale(dataVector: NumericVector, filterVector: NumericVector, palette: any[], isContinuous?: boolean, breaks?: number[], md?: MappingData): vp.scales.baseScale;
        static makeLinearScale(min: number, max: number, rangeMin: number, rangeMax: number): vp.scales.baseScale;
        static getCubeDefaultSize(shapeCount: number): number;
        static error(msg: string): void;
        static cloneMap(map: any): any;
        static getFilteredSortedKeys(colDataInfo: NumericVector, filterVector: NumericVector, sortAsNumeric?: boolean): any[];
        static isImageFile(fn: string): boolean;
        static getSizeOfMap(map: any, objList?: any[], forceCheck?: boolean): number;
        static getSizeOfValue(value: any, objList?: any[]): number;
        /** get the approximate memory used exclusively by the specified objects (overlapping memory not counted).
         * Space used by functions and unusual memory types not counted.
         */
        static getMemoryUse(memObjMap: any, memUseMap?: any): any;
        static arrayToString(aray: string[], delim: string): string;
        static stringToArray(value: string, delim: string): any[];
        /**
         *  The expression is parsed to ensure it only contains:
            - contant numbers and strings
            - standard JavaScript Math/Date/String functions
            - variables from "allowVariableList".
         * @param expression
         * @param allowedVariableList
         */
        static isSafeExpression(expression: string, allowedVariableList: string[]): boolean;
        /**
         *  Returns a function that be called to evaluate the specified expression.
         * @param expression
         */
        static safeEval(expression: string, allowedVariableList: string[]): Function;
        /**
 *  Return a valid HTML color string for "cr".
 * @param cr
 */
        static getBeachPartyColor(cr: string): string;
        static getBeachPartyName(cr: string): string;
        static colorFromName(cr: string): string;
    }
    class SearchParamsEx extends SearchParams {
        buttonType: string;
        buttonIndex: number;
        axisName: string;
    }
}
declare module beachParty {
    class touchMgrClass extends dataChangerClass {
        private _div;
        private _chartUxElem;
        private _svgDoc;
        private _mc;
        private _inputAction;
        private _insightIndex;
        private _isHammerEnabled;
        private _maxTouchCount;
        private _rubberBandSelector;
        private _ptMouseDown;
        private _ptDownInChartUx;
        private _chart;
        private _lastSessionFinal;
        private _dir;
        private _isPinching;
        private _transformMgr;
        private _wheel;
        private _isShowingWheel;
        private _transformMode;
        private _ptTouch;
        private _wheelTimer;
        private _isMouseDown;
        private _hasInertia;
        private _isCutomRecogEnabled;
        private _processInputCallback;
        private _doubleTabCallback;
        private _pinchStartCallback;
        private _doublePinchCallback;
        private _singlePanCallback;
        private _doublePanCallback;
        private _triplePanCallback;
        private _tripleMode;
        private _doubleMode;
        private _delayTimer;
        private _isTouchEnabled;
        onActionDectected: bpEvent<{
            sender: any;
            action: string;
            subAction: any;
            evt: any;
        }>;
        constructor(div: HTMLElement, rubberBand: rubberBandSelectorClass, chart: chartClass);
        isShowingWheel(value?: boolean): boolean;
        shutDown(): void;
        setTransformMgr(transformMgr: transformMgrClass): void;
        isHammerEnabled(value?: boolean): boolean;
        private processPinchStart(e);
        private processDoublePinch(e);
        drawSingleFrame(reason: string): void;
        private enablePinch(mc);
        private processSinglePan(e);
        private enablePan1(mc);
        private enableTap2(mc);
        private processDoubleTap(e);
        private processDoublePan(e);
        private enablePan2(mc);
        private enablePinchAndPan2(mc);
        private processTriplePan(e);
        private enablePan3(mc);
        onHammerEnabledChanged(): void;
        processHammerInput(e: any): void;
        onPanEvent(e: any, forceRotate?: boolean, forceMove?: boolean): void;
        moveCamera(e: any): void;
        setBounds(left: number, top: number, width: number, height: number): void;
        setNextMsgDelay(): void;
        inputAction(value?: string, subAction?: any, e?: any): any;
        onMouseWheel(e: any): void;
        /** Called from dataView, based on the chart's onFrame event. */
        onFrame(): void;
        avgTouchPosition(e: any): {
            x: number;
            y: number;
        };
        processOnAction(e: any): void;
        isValidSelectionPos(pt: any): boolean;
        detectInputAction(e: any): void;
        onMouseDown(e: any): void;
        onMouseUp(e: any): void;
        stopWheelTimer(): void;
        startWheelTimer(): void;
        onInput(e: any): void;
    }
}
declare module beachParty {
    class attrClass extends dataChangerClass {
        _chart: chartClass;
        _target: Target;
        _app: IAppMin;
        _md: MappingData;
        _useCustomBreaks: boolean;
        _customBreaks: string;
        _useCustomLabels: boolean;
        _customLabels: string;
        _colOptMgr: colOptionMgrClass;
        _sliderBinCount: number;
        _userNiceNumbers: boolean;
        _limitBinsForStrings: boolean;
        _mappingChangedCount: number;
        _isMappingEnabled: boolean;
        onColNameChange: bpEvent<{
            sender: any;
            colName: string;
            attrName: string;
        }>;
        onMappingDataChange: bpEvent<{
            sender: any;
            attrName: string;
        }>;
        constructor(chart: chartClass, md: MappingData, target: Target, userBinCount?: number);
        /**
         *  don't store this since it changes whenever data is loaded (including the first load).
         */
        getDataFrame(): dataFrameClass;
        isSet(): boolean;
        mappingData(value?: MappingData): MappingData;
        colName(value?: string, omitLogging?: boolean, rebindColInfo?: boolean): string;
        limitBinsForStrings(value?: boolean): boolean;
        defaultBinCountForColumn(colName: string): {
            binCount: any;
            maxCount: number;
        };
        getMaxKeysForColumn(colName: string): any;
        onColNameChanged(forceColRemap?: boolean, omitOnMappingCall?: boolean): void;
        calcCustomBreaks(): void;
        getCommaSeparatedValues(str: string): string[];
        onCustomStuffChanged(): void;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean): void;
        triggerOnMappingDataChanged(): void;
        triggerColNameChanged(): void;
        setBinCountFromDefault(omitNotify?: boolean): void;
        /**
         * The UI for bins is done thru "_sliderBinCount".  This is typically "0" for
         * AUTO or "9" (the default setting for non-AUTO capable attributes).  The actual
         * "binCount" in the _mappingData is the value used to the the mapping (which is never "0").
         * @param value
         * @param omitNotify
         */
        sliderBinCount(value?: number, omitNotify?: boolean): number;
        setTrueBinCount(value: number, omitNotify?: boolean): void;
        binCount(value?: number, omitNotify?: boolean): number;
        binSorting(value?: string, disableNotify?: boolean, skipOptionUpdate?: boolean): string;
        setMappingDataFormatting(): void;
        forceCategory(value?: boolean, skipOptionUpdate?: boolean): boolean;
        useNiceNumbers(value?: boolean, omitOptionUpdate?: boolean): boolean;
        updateNiceNumbersInMapping(md: MappingData): void;
        valueSpread(value?: string, omitOptionUpdate?: boolean): string;
        useCustomBreaks(value?: boolean, skipOptUpdate?: boolean): boolean;
        customBreaks(value?: string, skipOptUpdate?: boolean): string;
        useCustomLabels(value?: boolean, skipOptUpdate?: boolean): boolean;
        customLabels(value?: string, skipOptUpdate?: boolean): string;
        isLegendBottomUp(value?: boolean, omitOptionUpdate?: boolean): boolean;
        clearForDataChanged(): void;
    }
}
declare module beachParty {
    class auxAttrClass extends attrClass {
        _countLayout: CountLayoutType;
        _sumLayout: SumLayoutType;
        constructor(chart: chartClass, md: MappingData, target: Target);
        countLayout(value?: string): string;
        sumLayout(value?: string): string;
    }
    enum CountLayoutType {
        grid = 0,
        percent = 1,
    }
    enum SumLayoutType {
        squarify = 0,
        strip = 1,
    }
}
declare module beachParty {
    /**
     *  Would like to remove dynamic method routing to current chart and just use this as the
     *  holder of the current chart.  For now, we still need dynamic method routing for panels
     *  that dynamically connect with current chart.
     */
    class chartRouterClass extends dataChangerClass {
        private _chart;
        constructor();
        buildMethodRoutingTable(chart: chartClass): void;
        /**
         *  make a unique function that correctly captures the method name.
         * @param name
         */
        makeMethod(name: string): () => any;
        setChart(chart: chartClass): void;
        getChart(): chartClass;
    }
}
declare module beachParty {
    class chartUxClass extends dataChangerClass {
        private _chartUxElem;
        private _app;
        private _rubberBandSelector;
        private _toolTipMgr;
        private _mouseInCanvas;
        private _chart;
        private _touchMgr;
        private _uxMode;
        private _primaryKey;
        onActionDectected: bpEvent<{
            sender: any;
            action: string;
            subAction: any;
            evt: any;
        }>;
        onCursorHitTest: bpEvent<{
            sender: any;
            x: number;
            y: number;
            primaryKey: string;
        }>;
        constructor(app: IAppMin, dataMgr: dataMgrClass, chart: chartClass, maxToolTipColumns: number);
        shutDownUI(): void;
        postInit(transformMgr: transformMgrClass): void;
        onDblClick(e: any): void;
        onKeyDown(e: any): void;
        enableRubberBand(value: boolean): void;
        onMouseWheel(e: any): void;
        onUxMouseOut(e: any, callback?: any): void;
        screenToPlotCoordinates(x: number, y: number): {
            x: number;
            y: number;
        };
        private onUxMouseMove(e, callback?);
        processPrimaryKeyChanged(e: any, primaryKey: string, getRecord: boolean, tooltipsEnabled: boolean, record: any, colList: string[]): void;
        enableEngineUI(value: boolean): void;
        getTouchMgr(): touchMgrClass;
        uxMode(value?: UxMode): UxMode;
        onUxModeChanged(): void;
        buildRubberBand(): void;
        /**
         * Process the window-relative rectangle coordinates from a drag-rectangle
         * mouse operation.
         * @param evt
         * @param rcBand
         * @param toggle
         * @param mouseDownOrigin
         */
        onRubberBandSelect(evt: any, rcScreen: any, toggle: any, mouseDownOrigin: any): void;
    }
    enum UxMode {
        touch = 0,
        rubberBand = 1,
    }
}
declare module beachParty {
    class colOptionMgrClass extends dataChangerClass {
        _optionsByColumn: {
            [key: string]: ColumnOptions;
        };
        _colName: string;
        constructor();
        clear(): void;
        getOrMakeOptions(colName: string): any;
        setForceCategory(value: boolean): void;
        getForceCategory(): any;
        setBinSort(value: BinSorting): void;
        getBinSort(): any;
        setBinCount(colName: string, count: number): void;
        getBinCount(): any;
        setUseCustomBreaks(value: boolean): void;
        getUseCustomBreaks(): any;
        setCustomBreaks(value: string): void;
        getCustomBreaks(): any;
        setUseCustomLabels(value: boolean): void;
        getUseCustomLabels(): any;
        setCustomLabels(value: string): void;
        getCustomLabels(): any;
        setUseNiceNumbers(value: boolean): void;
        getUseNiceNumbers(): any;
        setValueSpread(value: MappingSpread): void;
        getValueSpread(): any;
        setIsLegendBottomUp(value: boolean): void;
        getIsLegendBottomUp(): any;
    }
    class ColumnOptions {
        binCount: number;
        binSort: BinSorting;
        forceCategory: boolean;
        formatting: string;
        valueSpread: MappingSpread;
        useNiceNumbers: boolean;
        isLegendBottomUp: boolean;
        useCustomBreaks: boolean;
        customBreaks: string;
        useCustomLabels: boolean;
        customLabels: string;
        constructor();
    }
}
declare module beachParty {
    class colorAttrClass extends attrClass {
        _app: IAppMin;
        _colorColOptMgr: colorColOptionMgrClass;
        _paletteMgr: IPaletteMgr;
        constructor(app: IAppMin, chart: chartClass, md: MappingData, target: Target, userBinCount?: number);
        setCustomPalette(palette: string[]): void;
        /**
         * If stepsRequested==0, compute an automatic value that gives nice results for numeric and date values.  For
           category, use 999 to allow all numbers to show
         */
        stepsRequested(): number;
        onMappingChanged(rebuildPalette: boolean, rebindColInfo?: boolean): void;
        getNamedPaletteFromSet(setName: string, name: string): NamedPalette;
        setPaletteFromName(name: string, omitOptionUpdate?: boolean): void;
        onColNameChanged(): void;
        zapColorChannels(): void;
        colorPaletteIndex(index: number): void;
        getColorPaletteEntry(index: number): any;
        remapColorData(): void;
        colorSpread(value?: string): string;
        colorForceCategory(value?: boolean): boolean;
        reverseColorPalette(value?: boolean, omitOptionUpdate?: boolean): boolean;
        invertColorPalette(value?: boolean, omitOptionUpdate?: boolean): boolean;
        colorIsContinuous(value?: boolean, omitOptionUpdate?: boolean): boolean;
        colorIsCycling(value?: boolean, omitOptionUpdate?: boolean): boolean;
        redColumn(value?: string, omitOptionUpdate?: boolean): string;
        onChannelColumnChanged(): void;
        greenColumn(value?: string, omitOptionUpdate?: boolean): string;
        blueColumn(value?: string, omitOptionUpdate?: boolean): string;
        rgbColumn(value?: string, omitOptionUpdate?: boolean): string;
        paletteSetName(value: string, omitOptionUpdate?: boolean): string;
        colorPalette(value?: NamedPalette, omitOptionUpdate?: boolean): string | any[];
    }
}
declare module beachParty {
    class colorColOptionMgrClass extends colOptionMgrClass {
        _dataMgr: dataMgrClass;
        constructor(dataMgr: dataMgrClass);
        setDefaultOptions(opts: ColorColumnOptions, psSetName: string, paletteName: string): void;
        setDefaultOptionsByColType(colName: string, opts: ColorColumnOptions): void;
        getOrMakeOptions(colName: string): any;
        setPaletteSetName(value: string): void;
        getPaletteSetName(): any;
        setPaletteName(value: string): void;
        getPaletteName(): any;
        setPaletteIndex(value: number): void;
        getPaletteIndex(): any;
        setReverseColorPalette(value: boolean): void;
        getReverseColorPalette(): any;
        setInvertColorPalette(value: boolean): void;
        getInvertColorPalette(): any;
        setColorIsContinuous(value: boolean): void;
        getColorIsContiuous(): any;
        setColorIsCycling(value: boolean): void;
        getColorIsCycling(): any;
        setRedColumn(value: string): void;
        getRedColumn(): any;
        setGreenColumn(value: string): void;
        getGreenColumn(): any;
        setBlueColumn(value: string): void;
        getBlueColumn(): any;
        setRgbColumn(value: string): void;
        getRgbColumn(): any;
    }
    class ColorColumnOptions extends ColumnOptions {
        paletteSetName: string;
        paletteName: string;
        paletteIndex: number;
        reverseColorPalette: boolean;
        invertColorPalette: boolean;
        colorIsContinuous: boolean;
        colorIsCycling: boolean;
        redColumn: string;
        greenColumn: string;
        blueColumn: string;
        rgbColumn: string;
        constructor();
    }
}
declare module beachParty {
    interface IChart extends IDataChanger {
        rootElement(): any;
        chartUxElement(): any;
        getBounds(): any;
        getPlotBounds(): any;
        isVisible(value?: boolean, fadeTime?: number): any;
        showTitlePanel(value: boolean): any;
        showTitleText(value?: boolean): any;
        showItemCounts(value?: boolean): any;
        enableTitlePanel(value: boolean): any;
        showChartUx(value?: boolean): any;
        shutDown(): any;
        getDataMgr(): dataMgrClass;
        getDataFrame(): dataFrameClass;
        getFileName(): any;
        openKnownFile(fileName: string): any;
        getRecordCount(): any;
        getColInfos(): ColInfo[];
        getOrigColInfos(): ColInfo[];
        getPreload(): WorkingDataParams;
        onDataLoaded(): any;
        sortIfNeeded(colName: string, isDescending?: boolean): any;
        autoLoadFile(wdp: WorkingDataParams, callback?: any): any;
        resetMappingsForNewFile(isLoadingInsight?: boolean, defaultCols?: any): any;
        hasData(): any;
        setColInfos(value: ColInfo[]): any;
        is3dGridAlwaysOn(value?: boolean): any;
        ambientLightLevel(value?: number): any;
        isLightingAlwaysOn(value?: boolean): any;
        toggleWheel(): any;
        resetTransform(): any;
        dataZoom(rcZoon: ClientRect, zoomOut: boolean): any;
        isDataZoomMode(value?: boolean): any;
        isWheelInertia(value?: boolean): any;
        showWheelDuringTransformMode(value?: boolean): any;
        isShowing3DWheel(value?: boolean): any;
        pulse3DCircleIfAppropriate(): any;
        isContinuousDrawing(value?: boolean): any;
        isInstancingEnabled(value?: boolean): any;
        drawingPrimitive(value?: string): any;
        getActualDrawingPrimitive(): any;
        isEngineDrawing(): any;
        setAppAutoRebuild(value: boolean, rebuildNow: boolean, ignoreFilterStage?: boolean): any;
        selectedColorEffect(value?: string): any;
        unselectedColorEffect(value?: string): any;
        selectedColor(value?: string): any;
        unselectedColor(value?: string): any;
        selectedColorFactor(value?: number): any;
        unselectedColorFactor(value?: number): any;
        isSelectionLocked(value?: boolean): any;
        enableSelectionSharing(value: boolean): any;
        rectSelect(rcBand: ClientRect, selectMode: SelectMode): any;
        selectXTickBox(index: number): any;
        selectYTickBox(index: number): any;
        dragAction(value?: string): any;
        tooltipColumns(value?: string[]): any;
        clearSelection(): any;
        isolateSelection(callback: any): any;
        excludeSelection(callback: any): any;
        resetFilter(callback?: any): any;
        search(colName: string, value: string, maxValue?: string, searchType?: TextSearchType, searchAction?: SearchAction, searchRawValues?: boolean, caseSensitive?: boolean, selectMode?: SelectMode, callback?: any, selectKey?: string): any;
        doSearch(legendSource: string, colName: string, minValue: any, maxValue: any, searchType: TextSearchType, selectMode?: SelectMode, selectKey?: string): any;
        searchEx(spList: SearchParams[], callback?: any): any;
        getFilteredInCount(): any;
        setSelectionWithKeys(keys: string[]): any;
        setSelectedCount(value: number): any;
        getSelectedCount(): number;
        selectMode(value?: SelectMode): any;
        selectFacetBox(index: number): any;
        hoverPrimaryKey(value?: string): any;
        getShapeBoundsAndRecord(primaryKey: string, colNames: string[], callback: any): any;
        getMostCentralRecord(rcScreen: ClientRect, colNames: string[], callback: any): any;
        getAttribute(name: string): any;
        getBinData(md: MappingData, callback: any): any;
        getMappedColumns(): string[];
        xBins(value?: number): any;
        yBins(value?: number): any;
        zBins(value?: number): any;
        chartName(): any;
        layoutType(): any;
        getLayoutName(): any;
        getViewName(): any;
        customSpec(value?: string): any;
        isChartCustom(): any;
        getUiChartName(value?: string): any;
        chartColor(value?: string): any;
        canvasColor(value?: string): any;
        titleText(value?: string): any;
        blankValueStr(value?: string): any;
        /** return the chart-building helper object */
        getChartBuilder(): chartBuilderClass;
        getChartUx(): chartUxClass;
        chartFrameOpacity(value?: number): any;
        showXGridLines(value?: boolean): any;
        showYGridLines(value?: boolean): any;
        useNiceNumbers(value?: boolean): any;
        addStyleSheet(rule: string): any;
        shapeColor(value?: string): any;
        shapeOpacity(value?: number): any;
        shapeImage(value?: string): any;
        sizeFactor(value?: number, animate?: boolean): any;
        sizeFactorCompleted(value?: number): any;
        setSizeFactor(value: number, animate: boolean): any;
        numColumns(value?: number): any;
        mapByColorChannels(value?: boolean): any;
        separationFactor(value?: number): any;
        buildFromTop(value?: boolean): any;
        sortItemColumn(value?: string, tellEngine?: boolean): any;
        sortItemsByColor(): any;
        isItemSortAscending(value?: boolean, tellEngine?: boolean): any;
        setSpiralSeed(seed?: number): any;
        customParams(): any;
        customX(value?: string): any;
        customY(value?: string): any;
        customZ(value?: string): any;
        customLayout(value?: string): any;
        applyCustomParams(): any;
        hoverOnDetailView(value?: boolean): any;
        hoverOnMouseMove(value?: boolean): any;
        isTooltipsEnabled(value?: boolean): any;
        includeNamesInTooltip(value?: boolean): any;
        hoverMatch(value?: string): any;
        hoverEffect(value?: string): any;
        hoverColor(value?: string): any;
        hoverSize(value?: number): any;
        applyHover(x: any, y: any, returnRecord: any, colList: any, showHover: any, callback: any): any;
        isAnimationEnabled(value?: boolean): any;
        isStaggeringEnabled(value?: boolean): any;
        easeFunction(value?: string): any;
        easeType(value?: string): any;
        animationDuration(value?: number): any;
        maxStaggerTime(value?: number): any;
        /** return the visible axis names for the current chart (e.g., "xy"). */
        getVisibleColPickers(): string;
        /** return the axis names with bin adjusters for the current chart (e.g., "xy"). */
        getVisibleBinAdjusters(): string;
        onChartOrLayoutChanged(): any;
        onChartChanged(layoutType?: LayoutType): any;
        on3dViewChanged(): any;
        onLocalStorageChange(): any;
        registerForChange(propName: string, callback: any): any;
        /** called when bounds of chart change, to allow chart to redraw */
        onBoundsChanged(): any;
        onActionDectected: bpEvent<{
            sender: any;
            action: string;
            subAction: any;
            evt: any;
        }>;
        onAttrColNameChange: bpEvent<{
            sender: any;
            attrName: string;
            colName: string;
        }>;
        onSearchStarted: bpEvent<{
            sender: any;
            selectionDesc: SelectionDesc;
        }>;
        onCycleStart: bpEvent<CycleDesc>;
        onCycleEnd: bpEvent<CycleStats>;
        changeToChart(newChartType: ChartType, layoutType?: LayoutType, gesture?: Gesture, uiName?: string, isChartCustom?: boolean): any;
        changeToLayout(layoutType: LayoutType, isFromUi: boolean): any;
        isChartUsingBins(attrName: string): any;
        isMappedToXYZ(colName: string): any;
        isCountOrSumOrGrid(attrName: string, layoutType?: LayoutType): any;
        getAxisColumnsInCurrentChart(): string[];
        applyInsightToChart(insight: InsightData): any;
        captureInsightProperties(preload: Preload): any;
        setDataAndSystemView(data: any, preload: any, svd: any, callback: any): any;
        getSystemViewData(snapShotType: SnapshotType, getReproData: boolean, chartBgColor: string, callback: any): any;
        setPresentationMode(value: boolean): any;
        setCmdId(value: string): any;
        setChartDebugInfo(value: any): any;
        getMemoryUse(callback: any): any;
        getEngineEvents(callback: any): any;
    }
    interface IChartRouter extends IChart {
        getChart(): IChart;
        setChart(value: IChart): any;
    }
    class KeyInfo {
        /** the number of unique keys in the associated column. */
        keyCount: number;
        /** provides a map from key string to its unique key number ("index"). */
        indexesByKey: {
            [key: string]: number;
        };
        /** provides a map from unique key number to key string. */
        keysByIndex: {
            [keyIndex: number]: string;
        };
        /** (TODO: use replace rowNum with PrimaryKey) provides a map from the unsorted data row number to the key. */
        rowsByKey: {
            [s: string]: number[];
        };
        /** (TODO: use replace rowNum with PrimaryKey) provides a map from key to the unsorted data row number. */
        keysByRow: string[];
        /** An array of all keys, in the correct sort order (for axes, legends, etc.). */
        sortedKeys: string[];
        constructor(keyCount: number, indexesByKey: {
            [s: string]: number;
        }, keysByIndex: {
            [keyIndex: number]: string;
        }, rowsByKey: {
            [s: string]: number[];
        }, keysByRow: string[], sortedKeys: string[]);
    }
    interface IAppMin {
        logAction(gesture: Gesture, elementId: string, elementType: ElementType, action: Action, target: Target, isUndoable: boolean, options?: {
            [key: string]: any;
        }, forceLog?: boolean, nonLogOptions?: {
            [key: string]: any;
        }): any;
        isLoggingEnabled(value?: boolean): any;
        getDataTipMgr(): any;
        getAppSettingsMgr(): any;
        getPanelMaster(): any;
        getPaletteMgr(): IPaletteMgr;
        getBlankValueStr(): any;
        setSelectionDesc(selectDesc: SelectionDesc): any;
    }
    interface IPaletteMgr {
        getPaletteItems(): string[];
        getPaletteFromSettings(psName: string, paletteName: string, steps: number, isReversed: boolean, isInverted: boolean): any;
        getPaletteArray(name: string, steps: number, isReversed: boolean, isInverted: boolean): any;
        getColorPaletteEntry(colorAttr: colorAttrClass, index: number): any;
        colorPaletteIndex(colorAttr: colorAttrClass, index: number): any;
    }
    class NamedPalette {
        name: string;
        values: string[];
        constructor(name: string, values: string[]);
    }
    class appMinClass implements IAppMin {
        logAction(gesture: Gesture, elementId: string, elementType: ElementType, action: Action, target: Target, isUndoable: boolean, options?: {
            [key: string]: any;
        }, forceLog?: boolean, nonLogOptions?: {
            [key: string]: any;
        }): void;
        getBlankValueStr(): string;
        getPaletteMgr(): any;
        getDataTipMgr(): any;
        getAppSettingsMgr(): any;
        getPanelMaster(): any;
        setSelectionDesc(selectDesc: SelectionDesc): any;
        isLoggingEnabled(value?: boolean): boolean;
    }
    class SpiralParams {
        seed: number;
        constructor();
    }
    class ScatterParams {
        percentExpandX: number;
        percentExpandY: number;
        constructor(percentExpandX?: number, percentExpandY?: number);
    }
    class FlatParams {
        numColumns: number;
        buildFromTop: boolean;
        constructor();
    }
    class SelectionParams {
        unselectedParams: ColorParams;
        selectedParams: ColorParams;
        constructor();
    }
    /**
     *  Describe a draw/animation cycle that is beginning.
     */
    class CycleDesc {
        sender: any;
        isSelectionChangeOnly: boolean;
    }
    /**
     *  Informaton about a draw/animation cycle that has just ended.
     */
    class CycleStats extends ShapeStats {
        layoutTime: number;
        cmdId: string;
        cmdTime: number;
        buildChartElapsed: number;
        isSelectionChangeOnly: boolean;
    }
}
declare module beachParty {
    class lineAttrClass extends attrClass {
        constructor(chart: chartClass, md: MappingData, target: Target);
        maxLineShapes(value?: number, omitLogging?: boolean): number;
        lineColor(value?: string, omitLogging?: boolean): string;
    }
}
declare module beachParty {
    enum Gesture {
        chatBot = 0,
        click = 1,
        dblClick = 2,
        dial = 3,
        drag = 4,
        editText = 5,
        keyDown = 6,
        none = 7,
        select = 8,
        system = 9,
        automatedTest = 10,
        notAvailable = 11,
    }
    enum ElementType {
        button = 0,
        checkbox = 1,
        canvas = 2,
        none = 3,
        dial = 4,
        insightEntry = 5,
        menuItem = 6,
        numAdjuster = 7,
        slider = 8,
        textBox = 9,
        panelTitle = 10,
        picklist = 11,
        radioButton = 12,
        resizer = 13,
        notAvailable = 14,
    }
    enum Action {
        add = 0,
        adjust = 1,
        capture = 2,
        clear = 3,
        close = 4,
        create = 5,
        delete = 6,
        edit = 7,
        email = 8,
        export = 9,
        hide = 10,
        import = 11,
        load = 12,
        open = 13,
        pause = 14,
        play = 15,
        publish = 16,
        remap = 17,
        rename = 18,
        report = 19,
        resume = 20,
        select = 21,
        show = 22,
        start = 23,
        stop = 24,
    }
    enum Target {
        aboutPanel = 0,
        aggPanel = 1,
        appSettings = 2,
        botPanel = 3,
        browsePanel = 4,
        channelMapping = 5,
        chartOptions = 6,
        chartTitle = 7,
        colorContinuous = 8,
        colorCycling = 9,
        colorInvert = 10,
        colorPalette = 11,
        colorPanel = 12,
        colorReverse = 13,
        colorSpread = 14,
        clusterPanel = 15,
        currentPanel = 16,
        datasetPanel = 17,
        dataTip = 18,
        detailsPanel = 19,
        documentSize = 20,
        facetPanel = 21,
        filterPanel = 22,
        frameStats = 23,
        helpPanel = 24,
        imageMapping = 25,
        imagePanel = 26,
        insights = 27,
        insightPanel = 28,
        itemsPanel = 29,
        isLegendBottomUp = 30,
        layersPanel = 31,
        lineByPanel = 32,
        navPanel = 33,
        palettesPanel = 34,
        paletteSetPickList = 35,
        panelLocation = 36,
        panelSize = 37,
        panelPin = 38,
        panelTab = 39,
        scriptsPanel = 40,
        searchPanel = 41,
        selectionPanel = 42,
        settingsPanel = 43,
        shapePanel = 44,
        sizePanel = 45,
        slicerPanel = 46,
        snapshot = 47,
        sortItemColumn = 48,
        sortParams = 49,
        sortPanel = 50,
        sumPanel = 51,
        tasksPanel = 52,
        textPanel = 53,
        themesPanel = 54,
        timePanel = 55,
        tipsPanel = 56,
        tourLoaderPanel = 57,
        tourStep = 58,
        unknownPanel = 59,
        userResource = 60,
        xPanel = 61,
        yPanel = 62,
        zPanel = 63,
        insightMenu = 64,
        columnPicker = 65,
        chartPicker = 66,
        layoutPicker = 67,
        data = 68,
        selection = 69,
        filter = 70,
        filterAndSelection = 71,
        xMapping = 72,
        yMapping = 73,
        zMapping = 74,
        auxMapping = 75,
        colorMapping = 76,
        sizeMapping = 77,
        shapeMapping = 78,
        textMapping = 79,
        lineMapping = 80,
        facetMapping = 81,
        sumByMapping = 82,
        chartType = 83,
        layout = 84,
        shapeOpacity = 85,
        sizeFactor = 86,
        separationFactor = 87,
        app = 88,
        newAppInstance = 89,
        undoEntry = 90,
        redoEntry = 91,
        insight = 92,
        searchCol = 93,
        threeDimWheel = 94,
        dataZoom = 95,
    }
    class SelectionDesc {
        selectMode: SelectMode;
        legendSource: string;
        searchParams: SearchParams;
        rectSelect: ClientRect;
    }
    class ScriptCmd {
        action: string;
        target: string;
        constructor(action: Action, target: Target);
    }
}
declare module beachParty {
    class paletteHelper {
        static buildColorBreaks(cm: ColorMappingData, colInfo: ColInfo, useNiceNumbers: boolean): void;
        static buildSizeBreaks(sm: SizeMappingData, colInfo: ColInfo, useNiceNumbers: boolean): void;
        static buildShapeBreaks(im: ShapeMappingData, colInfo: ColInfo, useNiceNumbers: boolean, useExperimental: boolean): void;
        static buildCategoryBreaks(colInfo: ColInfo, palette: any, isCycling: boolean): {
            breaks: any[];
            palette: any;
        };
        static buildNumOrDateBreaks(md: MappingData, colInfo: ColInfo, palette: any, useNiceNumbers: boolean): any[];
    }
}
declare module beachParty {
    class rotateRingClass {
        _chart: chartClass;
        _root: HTMLDivElement;
        _fullOpacity: string;
        _pulseInterval: number;
        _pulseTimer: any;
        _pulseDuration: number;
        constructor(chart: chartClass);
        getRcPlot(): any;
        private getFinalRotationBounds();
        enter(): void;
        startPulsing(): void;
        stopPulsing(): void;
        exit(): void;
        pulse(): void;
    }
}
declare module beachParty {
    /** Note: this class hooks mouseDOWN using the chart canvas, and mouseUP using "window",
    so that we can drag outside the chart.  We treat a mouseDOWN with isEnabled=false as a
    notification back to the client (so they can enable an inactive chart).
    
    Also, this control implements its own context menu (when the mouse is not moved for a certain time).  The goal
    is to eventually use the standard browser context menu event in its place. */
    class rubberBandSelectorClass extends dataChangerClass {
        _id: number;
        _isEnabled: boolean;
        _isBanding: boolean;
        _ptMouseDown: any;
        _ptMouseHold: any;
        _holdTimer: any;
        _rubberBand: vp.dom.IWrapperOuter;
        _selectCallback: any;
        _holdCallback: any;
        _dragSelectCanvas: HTMLElement;
        _canvasChanged: boolean;
        _mouseDownOrigin: string;
        _isLeftButtonDown: boolean;
        _isRightButtonDown: boolean;
        _pendingUpEvent: boolean;
        _forceToggle: boolean;
        _onMouseMoveFunc: any;
        _onMouseUpFunc: any;
        _isSetCaptureActive: boolean;
        _isHoldEnabled: boolean;
        constructor(dragSelectCanvas: HTMLElement, isEnabled: boolean);
        forceToggle(value?: boolean): boolean;
        isDragging(): boolean;
        isDraggingRect(): boolean;
        hookEvents(canvasChanged: boolean): void;
        attachOnSelect(callback: any): void;
        attachOnHold(callback: any): void;
        setRubberBand(rc: any): void;
        showRubberBand(value: boolean): void;
        cancelBanding(clearBanding: boolean, evt?: any): void;
        clearCapture(): void;
        clearBanding(): void;
        isToggleKey(evt: any): any;
        onTouchUp(evt: any): void;
        handleClickOnInactiveView(evt: any): void;
        setMouseDown(pt: any): void;
        drawBand(evt: any): void;
        processExternalUp(evt: any): void;
        onMouseUp(evt: any): void;
        cancelPendingUpEvent(): void;
        onRubberUp(evt: any): void;
        onRubberUpCore(evt: any): void;
        changedTouchPosition(e: any, elem?: HTMLElement): {
            x: number;
            y: number;
        };
        touchPosition(e: any, elem?: HTMLElement): {
            x: number;
            y: number;
        };
        onRubberMove(evt: any): void;
        triggerHoldEvent(): void;
        triggerOnDown(e: any): void;
        onRubberDown(evt: any): void;
        clearHoldTimer(): void;
        /** we cannot just check the time in mousemove because the mouse might not be moving after reaching its destination. */
        restartHoldTimer(): void;
        isEnabled(): boolean;
        isEnabled(value: boolean): rubberBandSelectorClass;
        dragSelectElement(): HTMLElement;
        dragSelectElement(value: HTMLElement): rubberBandSelectorClass;
    }
    function createRubberBandSelector(canvas: HTMLElement): rubberBandSelectorClass;
}
declare module beachParty {
    class shapeAttrClass extends attrClass {
        _useExperimentalImages: boolean;
        constructor(chart: chartClass, md: MappingData, target: Target);
        onChartTypeChanged(): void;
        useExperimentalImages(value?: boolean): boolean;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean, rebindColInfo?: boolean): void;
    }
}
declare module beachParty {
    class sizeAttrClass extends attrClass {
        constructor(chart: chartClass, md: MappingData, target: Target);
        onChartTypeChanged(): void;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean): void;
    }
}
declare module beachParty {
    class textAttrClass extends attrClass {
        constructor(chart: chartClass, md: MappingData, target: Target);
        maxTextShapes(value?: number, omitLogging?: boolean): number;
        textColor(value?: string, omitLogging?: boolean): string;
    }
}
declare module beachParty {
    class toolTipMgrClass extends dataChangerClass {
        _app: IAppMin;
        _dataMgr: dataMgrClass;
        _chart: chartClass;
        _areToolTipsEnabled: boolean;
        _showDelay: number;
        _showTimeout: number;
        _colNames: string[];
        _maxToolTipColumns: any;
        _timer: any;
        constructor(app: IAppMin, dataMgr: dataMgrClass, chart: chartClass, maxToolTipColumns: number);
        showToolTipForShape(e: any, primaryKey: string, record: any, colNames: string[]): void;
        positionToolTip(pt: any): void;
        startShowTimer(): void;
        startHideTimer(): void;
        clearTimer(): void;
        showToolTip(): void;
        areToolTipsEnabled(value?: boolean): boolean;
        getToolTipElem(): any;
        hideToolTip(): void;
    }
}
declare module beachParty {
    class chartFrameHelperClass extends dataChangerClass {
        private _root;
        private _tickLength;
        private _clickTickLength;
        private _hideAxes;
        private _chartBuilder;
        private _isYAxisClickable;
        private _isXAxisClickable;
        private _bigChartFrame;
        private _facetChartFrames;
        private _chartFrameData;
        private _dataMgr;
        private _transformer;
        private _leftWidth;
        private _bottomHeight;
        private _xTickBoxElements;
        private _yTickBoxElements;
        private _blankStrValue;
        onTickBoxClick: bpEvent<{
            sender: any;
            buttonType: string;
            axisName: string;
            boxLabel: string;
            searchParams: SearchParams;
        }>;
        constructor(parent: SVGGElement, chartBuilder: chartBuilderClass, dataMgr: dataMgrClass, transformer: transformerClass, blankStrValue: string);
        getRoot(): SVGGElement;
        selectXBoxByIndex(index: number): void;
        selectYBoxByIndex(index: number): void;
        chartFrameRoot(): SVGGElement;
        /**
         * Create a single chartFrame - called multiple times for Facet views.
         */
        createChartFrame(): vp.chartFrame.chartFrameEx;
        getYAxisWidth(): number;
        getXAxisHeight(): number;
        buildFacetFrames(width: number, height: number, cfd: ChartFrameData, dc: DrawContext, hideLabels: boolean, facetLayoutInPixels: FacetLayoutInfo[], isXAxisClickable: boolean, isYAxisClickable: boolean): void;
        /**
         * Creates a facet chart frame for "facetIndex" and lays it out according to "bounds".  This is called
         for all facets, not just the left/bottom ones.  For inner facets, just a rectangle border is created.  For all
         facets, a facet label is also created (on top of the frame).
         * @param cfd
         * @param xAxisData
         * @param yAxisData
         * @param facetIndex
         * @param facetInfo
         * @param groupElem
         * @param bounds
         * @param areLeftLabelsClickable
         * @param areBottomLabelsClickable
         * @param hideAxes
         */
        createFacetChartFrame(width: number, height: number, dc: DrawContext, xBinResults: any, yBinResults: any, cfd: ChartFrameData, xAxisData: vp.chartFrame.axisDataClass, yAxisData: vp.chartFrame.axisDataClass, facetIndex: number, facetInfo: any, groupElem: any, bounds: any, areLeftLabelsClickable: boolean, areBottomLabelsClickable: boolean, hideAxes: boolean, scales: any): void;
        /** converts a WORLD space scale to a SCREEN space scale. */
        cloneScale(oldScale: vp.scales.baseScale, attr: glAttributeClass, rangeMin: number, rangeMax: number, axisName?: string): any;
        transformScaleDomain(scale: vp.scales.baseScale, axisName: string, dataMin: number, dataMax: number): {
            domainMin: any;
            domainMax: any;
        };
        createAxisData(scale: vp.scales.baseScale, attr: glAttributeClass, rangeMin: number, rangeMax: number, axisName?: string): vp.chartFrame.axisDataClass;
        getCategoryKeysInOrder(scale: any): any[];
        close(): void;
        fadeInOut(show: boolean): void;
        show(value: boolean): void;
        build(width: number, height: number, hideAxes: any, usingFacets: boolean, cfd: ChartFrameData, dc: DrawContext, facetLayoutInPixels: FacetLayoutInfo[], isXAxisClickable: boolean, isYAxisClickable: boolean): ClientRect;
        layoutChartFrames(width: number, height: number, dc: DrawContext, cfd: ChartFrameData): ClientRect;
        buildBigChartFrame(width: number, height: number, hideAxes: any, usingFacets: boolean, scales: any, cfd: ChartFrameData, dc: DrawContext, isXAxisClickable: boolean, isYAxisClickable: boolean): void;
        setChartFrameProps(chartFrame: vp.chartFrame.chartFrameEx, width: number, height: number, hideAxes: any, usingFacets: boolean, scales: any, cfd: ChartFrameData, dc: DrawContext, xAxisData: vp.chartFrame.axisDataClass, yAxisData: vp.chartFrame.axisDataClass, isLeft: boolean, isBottom: boolean, isBigChartFrame: boolean): void;
        shadeXAxis(dc: DrawContext, xAxisData: vp.chartFrame.axisDataClass, xBinResults: any, chartType: string, showTickBoxes: boolean, bottomAxis: vp.chartFrame.bottomAxisClass, areBottomLabelsClickable: boolean): void;
        shadeYAxis(dc: DrawContext, yAxisData: vp.chartFrame.axisDataClass, yBinResults: any, chartType: string, showTickBoxes: boolean, leftAxis: vp.chartFrame.leftAxisClass, areLeftLabelsClickable: boolean, isFacet: boolean): void;
        doNewSearch(e: any, axisName: string, boxLabel: string): void;
    }
}
declare module beachParty {
    class chartUtils {
        static fadeIn(elem: any, msDuration?: number): void;
        static fadeOut(elem: any, msDuration?: number): void;
        static isVisible(name: string): boolean;
        static findIgnoreClickElem(elem: any): any;
        static callPanelOpen(e: any, callback: any): void;
        static scaleColData(vector: NumericVector, index: number, scale: vp.scales.baseScale, defaultValue?: number): number;
        static setFilteredMinMaxBreak(md: MappingData, layoutFilterVector: any, nv: NumericVector): any;
        static computeBestCountFactor(maxCount: number, shapesPerRow: number): {
            maxCount: number;
            tickCount: any;
        };
        static computeMaxBinCountForData(dc: any, nv: NamedVectors, cm: MappingData, binCol: string): {
            maxCount: number;
            binResults: BinResult;
        };
        static binTheDataForCount(dc: any, data: any, cm: MappingData, binCol: string): BinResult;
        static computeSumForFacet(dc: DrawContext, data: any, cm: MappingData, binColumn: string, sumByColumn: string): {
            maxPosSum: number;
            maxNegSum: number;
            binResults: BinResult;
        };
        static computeBinNegPosSums(dc: DrawContext, binResult: BinInfo, sumColumn: string): {
            posSum: number;
            negSum: number;
        };
        static getOrderOfBins(bins: BinInfoNum[]): number;
        static adjustScaleForBin(scale: vp.scales.baseScale, binResulsArray: BinResult[], axisName?: string): vp.scales.baseScale;
        static getScatterShapeSize(dc: DrawContext, recordCount?: number, chart?: chartClass): any;
        /** returns the best shape size (in world units) for a scatter-like chart. */
        static getScatterShapeSizeEx(filteredRecordCount: number, width: number, height: number, facetCount: number): number;
        static computeMaxCountOverFacets(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Compute the fixed-width and max-height of bins for a Column Chart. This code is shared to encourage consistent layout results for
         * Column Grid, Column Sum.
         */
        static computeColumnBinSize(facetResult: BinResult, availWidth: number, availHeight: number): {
            binWidth: number;
            binHeight: number;
            xMargin: number;
            xBetween: number;
        };
        /** Compute the max-width and fixed-height of bins for a Bar chart. This code is shared to encourage consistent layout results for
         * Bar Grid, Bar Sum.
         */
        static computeBarBinSize(facetResult: BinResult, availWidth: number, availHeight: number): {
            binWidth: number;
            binHeight: number;
            yMargin: number;
            yBetween: number;
        };
        static capitalizeFirstLetter(value: string): string;
    }
}
declare module beachParty {
    /** information needed to draw a facet/chart. */
    class DrawContext {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        depth: number;
        facetHelper: facetHelperClass;
        nvData: NamedVectors;
        scales: NamedScales;
        /** the default depth for 2D shapes. */
        defaultDepth2d: number;
        /** the size factor used by the gl transformer (varies by which camera is in use). */
        /** the size factor specified by the user (default = 1). */
        userSizeFactor: number;
        /** used by baseGlVis code the scale size to GL sizes after user layout (transformSizeFactor * userSizeFactor. */
        maxShapeSize: number;
        itemSize: number;
        itemHalf: number;
        /** number of records in this facet/chart. */
        recordCount: number;
        /** number of records in this facet/chart after applying filter. */
        filteredRecordCount: number;
        facetIndex: number;
        fromChartType: string;
        toChartType: string;
        /** set when used as count, sum, etc. */
        xCalcName: string;
        /** set when used as count, sum, etc. */
        yCalcName: string;
        layoutFilterVector: Float32Array;
        spacingFactor: number;
        transformer: transformerClass;
        constructor(rcxWorld: Rect3d, facetHelper: facetHelperClass, nvData: NamedVectors, scales: NamedScales, recordCount: number, filteredRecordCount: number, userSizeFactor: number, fromChartType: string, toChartType: string, itemSize: number, transformer: transformerClass, chart: chartClass);
    }
}
declare module beachParty {
    class chartBuilderClass extends dataChangerClass {
        private _parentElem;
        private _glCanvasElem;
        private _buildTimer;
        private _buildNeededReason;
        private _drawNeededReason;
        private _shapeEng;
        private _chart;
        private _isAggChart;
        private _dataMgr;
        private _selectionColor;
        private _dataFrame;
        private _nv;
        private _hideAxes;
        private _transformer;
        private _transformerMgr;
        private _prevChartClass;
        private _currentChartClass;
        private _layout;
        private _chartFrameHelper;
        private _isXAxisClickable;
        private _isYAxisClickable;
        private _shapes;
        private _selectionExists;
        private _animationData;
        private _pendingCanvasResize;
        private _primaryColorCount;
        private _finalColorPalette;
        private _maxColors;
        private _currentChartSpecs;
        private _prevDrawBounds;
        private _isFirstFilteredStage;
        private _isForwardFilter;
        private _prevFilter;
        private _facetHelper;
        private _rcPlotEst;
        private _rcPlotFinal;
        private _clientWidth;
        private _clientHeight;
        private _prepassDc;
        private _maxItems;
        private _isSelectionChangeOnly;
        private _svgDoc;
        private _svgChartGroup;
        private _svgChartFrameGroup;
        private _buildPerf;
        private _drawCount;
        private _buildChartElapsed;
        private _layoutTime;
        onCycleStart: bpEvent<CycleDesc>;
        onCycleEnd: bpEvent<CycleStats>;
        constructor(parentElem: HTMLElement, chart: chartClass);
        getChartBounds(): any;
        onFilteredChanged(isForward: boolean): void;
        getGlCanvasElem(): HTMLCanvasElement;
        getSvgDoc(): SVGSVGElement;
        rectsDiffer(rc: ClientRect, rc2: ClientRect): boolean;
        rebuildCameraIfNeeded(): ClientRect;
        getTransformer(): transformerClass;
        getWorldBounds(): Rect3d;
        setUpShapeEngParams(): void;
        getColorPalette(): any;
        getDrawOrderKey(): any;
        getFacetBins(): FacetBin[];
        getShapeEngine(): IShapeEngine;
        createSvgGroup(): void;
        /**
         * A chart single frame draw has been requested.
         * @param reason
         */
        redrawLastFrame(reason: string): void;
        /**
         * A new animation cycle has been requested.
         * @param reason
         */
        markBuildNeeded(reason: string, ignoreFilterStage?: boolean): void;
        cancelBuildTimer(): void;
        getCol(dataFrame: dataFrameClass, attrName: string, getOrigData?: boolean): NumericVector;
        buildNamedVectors(dataFrame: dataFrameClass): NamedVectors;
        hideAxes(value?: any): any;
        isAggChart(value?: boolean): boolean;
        isXAxisClickable(value?: boolean): boolean;
        getFacetHelper(): facetHelperClass;
        getTransformMgr(): transformMgrClass;
        isYAxisClickable(value?: boolean): boolean;
        updatePlotBounds(left: number, top: number, width: number, height: number, usingFacets: boolean, resizeElements: boolean): void;
        getMaxItemsInView(nv: NamedVectors): number;
        clearMinMaxBreaks(md: MappingData): void;
        buildColorScale(nv: NamedVectors, md: MappingData): any;
        refreshClientSize(): void;
        buildChartFrameHelper(): void;
        onFacetChanged(): void;
        onLayoutNameChanged(): void;
        applyNewChartSpecs(cs: ChartSpecs): void;
        getLayout(): baseLayoutClass;
        getChart(): chartClass;
        getClientWidth(): number;
        getClientHeight(): number;
        buildDefaultScales(nv: NamedVectors, rcxWorld: any, filteredRecordCount: number, facetCount: number): {
            x: vp.scales.baseScale;
            y: vp.scales.baseScale;
            z: vp.scales.baseScale;
            size: vp.scales.baseScale;
            colorIndex: any;
            imageIndex: vp.scales.baseScale;
            red: vp.scales.baseScale;
            green: vp.scales.baseScale;
            blue: vp.scales.baseScale;
        };
        prepassAndFrameBuild(): {
            dc: DrawContext;
            facetCount: number;
            nvBuckets: NamedVectors[];
            facetBinResults: any;
        };
        calcRanges(nv: NamedVectors, facetAdjust: boolean): any;
        buildChartFrame(): ClientRect;
        worldBoundsToSvg(bounds: Bounds): ClientRect;
        getFacetLayoutsInPixels(): FacetLayoutInfo[];
        buildFacetChartFrames(dc: DrawContext): void;
        getDataLength(applyFilter?: boolean): number;
        cancelRequestedDraw(): void;
        private buildChart();
        applyPendingResizeIfNeeded(): void;
        updateTransformerCamera(): void;
        buildShaderColorPalette(shapeColor: string, colorPalette: string[]): void;
        adjustColorPaletteForSelection(colorNames: string[]): any[];
        applyColorParams(rgb: number[], cp: ColorParams, selectionExists: boolean): number[];
        getMostCentralRecord(rcArea: any, columnList: string[]): {
            primaryKey: any;
            colValues: any;
        };
        getChartFrameHelper(): chartFrameHelperClass;
        /**
         * Gets the location of the drawn shapes relative to the CHART'S #clientHolder element.
         * @param useDrawnHeight
         * @param screenRelative - if true, adjusts bounds to be screen relative.
         */
        getPlotBounds(useDrawnHeight: boolean, screenRelative?: boolean): ClientRect;
        buildChartCore(): void;
        addToBuildPerf(name: string, start: number): number;
        processRecord(fri: number, primaryKey: string, shape: Shape, facetOffset: any, nv: NamedVectors, dc: DrawContext, drawBufferIndex: number): void;
        addDefaultLayoutResults(shape: Shape, fri: number, dc: DrawContext, nv: NamedVectors, drawBufferIndex: number, primaryKey: string): void;
        setStaggerOffset(shape: Shape, facetRelativeIndex: number, dc: DrawContext): void;
        getChartRepro(): ChartRepro;
        layoutChartOrFacet(dc: DrawContext, facetOffset: any, drawBufferIndex: number): void;
    }
    class NamedScales {
        x: vp.scales.baseScale;
        y: vp.scales.baseScale;
        z: vp.scales.baseScale;
        red: vp.scales.baseScale;
        green: vp.scales.baseScale;
        blue: vp.scales.baseScale;
        size: vp.scales.baseScale;
        colorIndex: vp.scales.baseScale;
        imageIndex: vp.scales.baseScale;
    }
    class ChartSpecs {
        private _chartType;
        private _layoutType;
        constructor(chartType: ChartType, layoutType?: LayoutType);
        isEqual(cs: ChartSpecs): boolean;
        getChartType(): ChartType;
        layoutType(value?: LayoutType): LayoutType;
        getChartName(): string;
        getLayoutName(): string;
        getUiChartName(): any;
    }
}
declare module beachParty {
    class facetHelperClass {
        _colName: string;
        _requestedFacets: number;
        _maxCategoryFacets: number;
        _layout: FacetLayout;
        _binResult: BinResult;
        _facetCount: number;
        _customScreenBounds: any[];
        _transformer: transformerClass;
        _fm: FacetMappingData;
        constructor(colName: string, requestedFacets: number, maxCategoryFacets: number, customScreenBounds: any[], transformer: transformerClass, fm: FacetMappingData);
        setBinCountFromData(dataFrame: dataFrameClass, nv: NamedVectors, dataVector: NumericVector, fm: FacetMappingData): void;
        facetCount(): number;
        colName(): string;
        layout(): FacetLayout;
        binResult(value?: BinResult): BinResult;
        buildFacetLayout(xMin: number, yMin: number, xMax: number, yMax: number): FacetLayout;
    }
    class FacetLayout {
        facetBounds: Bounds[];
        labelBounds: Bounds[];
        rowCount: number;
        columnCount: number;
    }
}
declare module beachParty {
    /** manages changes to 3D transform of chart, including relative changes,
      dampening, inerita, transformMode, and transformEnabled. */
    class transformMgrClass extends dataChangerClass {
        private _transformer;
        private _gl;
        private _transformMode;
        private _isInertialEnabled;
        private _usePostZ;
        private _xRotDamp;
        private _yRotDamp;
        private _zRotDamp;
        private _currentScale;
        private _currentOffsetX;
        private _currentOffsetY;
        private _currentRotationZ;
        constructor(gl: any, transformer?: transformerClass);
        getRayFromScreenPos(screenX: number, screenY: number): rayClass;
        /** called by dataView when chart frame changes. */
        onFrame(): boolean;
        getTransformer(): transformerClass;
        inertia(value?: number[]): number[];
        resetPanAndPinchDeltas(): void;
        onUiOpStart(): void;
        onUiOpStop(): boolean;
        isInertiaEnabled(value?: boolean): boolean;
        hasInertia(): boolean;
        resetCamera(): void;
        applyPanMovement(xdiff: number, ydiff: number, targetX: number, targetY: number, mousePos: any): void;
        transformMode(value?: number): string;
        resetTransform(): void;
        moveCamera(targetX: number, targetY: number, mousePos: any): void;
        xRotation(value: number): number;
        yRotation(value: number): number;
        zRotation(value: number): number;
        translateCamera(x: number, y: number, z: number): void;
        /** normally adds "value" (in radians) to the current X rotation, in the world matrix.  If additive=false, the x rotation is set
        to "value". */
        rotateMatrixX(value: number, additive?: boolean, useInertia?: boolean): void;
        rotateMatrixY(rotStep: number, usePostZ?: boolean): void;
        rotateMatrixZ(rotStep: number): void;
        /** Scale the camera by a relative amount. */
        scaleCameraRelative(factor: number, mousePos: any, isMousePosInWorldUnits?: boolean): void;
        /** Scale the camera to the specified value (relative to the start of the gesture). */
        scaleCameraAbsolute(scale: number, mousePos: any): void;
    }
}
declare module beachParty {
    class shapeLegendClass extends baseLegendClass {
        _im: ShapeMappingData;
        _isNumeric: boolean;
        _lastValue: any;
        _colType: string;
        _imgSheet: HTMLCanvasElement;
        constructor(chartRouter: IChartRouter, rootName: string);
        shapeMapping(value?: ShapeMappingData): ShapeMappingData;
        search(colName: string, value: string): void;
        rebuildLegend(): void;
        fillLabelEntry(parentW: vp.dom.singleWrapperClass, i: number, yOffset: number): void;
        searchForEntryValues(e: any): void;
        getImageFromSheet(imgSheet: any, width: number, height: number, index: number, count: number): HTMLCanvasElement;
        buildTexturesOnClient(callback: any): void;
        fillPaletteEntry(paletteW: vp.dom.singleWrapperClass, i: number, isTop: boolean): void;
    }
}
declare module beachParty {
    class sizeLegendClass extends baseLegendClass {
        _sm: SizeMappingData;
        _isNumeric: boolean;
        _lastValue: any;
        constructor(chartRouter: IChartRouter, rootName: string);
        sizeMapping(value?: SizeMappingData): SizeMappingData;
        search(colName: string, value: string): void;
        rebuildLegend(): void;
        searchForEntryValues(e: any): void;
        fillPaletteEntry(parentW: vp.dom.singleWrapperClass, i: number, isTop: boolean): void;
        fillLabelEntry(parentW: vp.dom.singleWrapperClass, i: number, yOffset: number): void;
    }
}
declare module beachParty {
    class textLegendClass extends dataChangerClass {
        _tm: TextMappingData;
        _rootElem: HTMLElement;
        _titleElem: HTMLElement;
        _paletteElem: HTMLElement;
        constructor(rootName: string, tm: TextMappingData);
        textMapping(value?: TextMappingData): TextMappingData;
        show(value: boolean): void;
        updateLegend(): void;
        rebuildPalette(): void;
    }
}
declare module beachParty {
    class aggColumnClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxPosSumAllFacets: number;
        _maxNegSumAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binBottoms: number[];
        _itemAssignments: number[];
        _itemBottoms: number[];
        _itemHeights: number[];
        _binWidth: number;
        _binHeight: number;
        _heightFactor: number;
        _inverseSizeFactor: number;
        _xMargin: number;
        _xBetween: number;
        _yMin: number;
        _yMax: number;
        constructor(chart: chartClass);
        /**
         *  truncate data to a single record.  used to bootstrap the development
         *  of aggregation support.
         * @param data
         */
        fakeAggData(data: NamedVectors): void;
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: NamedVectors[]): number;
        /** Responsiblities:
           1. adjust Y scale to reflect maxCount (across all facets).
           2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
       */
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, dc: DrawContext): void;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(itemIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class barCountClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxCountAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binTops: number[];
        _binWidths: number[];
        _itemWidth: number;
        _itemHeight: number;
        _shapesPerCol: number;
        _newColCount: number;
        _maxShapeSize: number;
        _rowToBinNum: number[];
        _rowToBinIndex: number[];
        _yMargin: number;
        _yBetween: number;
        _xMin: number;
        _xMax: number;
        constructor(chart: chartClass);
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
           1. adjust Y scale to reflect maxCount (across all facets).
           2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
       */
        adjustScales(dc: DrawContext): void;
        /** create a new linear scale for X, based on the maximum count for a full bar. */
        xScaleAdjust(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultY: any, dc: DrawContext, maxBinCountForAllFacets: number): number;
        preLayoutLoop(dc: DrawContext): void;
        preLayoutLoopCore(yResult: BinResult, availWidth: number, availHeight: number, binCount: number): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class barSumClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxPosSumAllFacets: number;
        _maxNegSumAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binBottoms: number[];
        _itemAssignments: number[];
        _itemLefts: number[];
        _itemWidths: number[];
        _binWidth: number;
        _binHeight: number;
        _widthFactor: number;
        _inverseSizeFactor: number;
        _yMargin: number;
        _yBetween: number;
        _xMin: number;
        _xMax: number;
        constructor(chart: chartClass);
        /** Two responsiblities: 1. compute max count for any bin, over all facets.  2. adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
         1. adjust Y scale to reflect maxCount (across all facets).
         2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
        */
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultY: any, dc: DrawContext): void;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(itemIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    /** this chart groups the items into N bins (using the X column), and then lays out the item's shapes in a grid for each column. All layout is
     * done based on "_maxCountAllFacets" - the maximum # of items in any bin (across all facets).  This determines the "_shapesPerRow"
     * and the "_rowCount".  Each column then drawn according to these variables.
      */
    class columnCountClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxCountAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binHeights: number[];
        _binWidth: number;
        _binHeight: number;
        _maxShapeWidth: number;
        _maxShapeHeight: number;
        _shapesPerRow: number;
        _rowCount: number;
        _rowToBinNum: number[];
        _rowToBinIndex: number[];
        _xMargin: number;
        _yMin: number;
        _yMax: number;
        _xBetween: number;
        constructor(chart: chartClass);
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. compute xMin, xMax for all data (across facets).
            3. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
            1. adjust Y scale to reflect maxCount (across all facets).
            2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
        */
        adjustScales(dc: DrawContext): void;
        /** create a new linear scale for Y, based on the maximum count for a full column. */
        yScaleAdjust(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, dc: DrawContext, maxBinCountForAllFacets: number): number;
        preLayoutLoop(dc: DrawContext): void;
        preLayoutLoopCore(xResult: BinResult, availWidth: number, availHeight: number, binCount: number): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    /** this chart groups the items into N bins (using the X column), and then lays out the item's shapes in a grid for each column. All layout is
     * done based on "_maxCountAllFacets" - the maximum # of items in any bin (across all facets).  This determines the "_shapesPerRow"
     * and the "_rowCount".  Each column then drawn according to these variables.
      */
    class columnPercentClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxCountAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binWidths: number[];
        _binRowCounts: number[];
        _shapesPerRow: number[];
        _binWidth: number;
        _binHeight: number;
        _maxShapeWidth: number;
        _maxShapeHeight: number;
        _oldShapesPerRow: number;
        _rowCount: number;
        _rowToBinNum: number[];
        _rowToBinIndex: number[];
        _xMargin: number;
        _yMin: number;
        _yMax: number;
        _xBetween: number;
        _stretchWidth: boolean;
        constructor(chart: chartClass);
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. compute xMin, xMax for all data (across facets).
            3. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
            1. adjust Y scale to reflect maxCount (across all facets).
            2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
        */
        adjustScales(dc: DrawContext): void;
        /** create a new linear scale for Y, from 0 to 1. */
        yScaleAdjust(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, dc: DrawContext, maxBinCountForAllFacets: number): number;
        preLayoutLoop(dc: DrawContext): void;
        preLayoutLoopCore(xResult: BinResult, availWidth: number, availHeight: number, binCount: number): void;
        shapeSize(maxSize: number): number;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class columnSquarifyClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxPosSumAllFacets: number;
        _maxNegSumAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binBottoms: number[];
        _itemAssignments: number[];
        _itemBounds: any;
        _binWidth: number;
        _binHeight: number;
        _heightFactor: number;
        _inverseSizeFactor: number;
        _xMargin: number;
        _xBetween: number;
        _yMin: number;
        _yMax: number;
        constructor(chart: chartClass);
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
           1. adjust Y scale to reflect maxCount (across all facets).
           2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
       */
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: BinResult, dc: DrawContext): void;
        layoutBin(rc: any, itemIndexes: number[], binSizes: number[], itemBounds: any, spacing: number): void;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(itemIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class columnSumClass extends baseLayoutClass {
        _facetBinResults: any[];
        _maxPosSumAllFacets: number;
        _maxNegSumAllFacets: number;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binBottoms: number[];
        _itemAssignments: number[];
        _itemBottoms: number[];
        _itemHeights: number[];
        _binWidth: number;
        _binHeight: number;
        _heightFactor: number;
        _inverseSizeFactor: number;
        _xMargin: number;
        _xBetween: number;
        _yMin: number;
        _yMax: number;
        constructor(chart: chartClass);
        /** Responsiblities:
            1. compute max count for any bin, over all facets.
            2. return max count
        */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        /** Responsiblities:
           1. adjust Y scale to reflect maxCount (across all facets).
           2. adjust X scale to reflect bin labels (on ticks, or in middle of ticks).
       */
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, dc: DrawContext): void;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(itemIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class densityCircle extends baseLayoutClass {
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _phyloSeed: number;
        _radius: number;
        _spacing: number;
        _nextIndex: number;
        _binLefts: number[];
        _binTops: number[];
        _sideMargin: number;
        _betweenMargin: number;
        _itemWidth: number;
        _itemHeight: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _binRelativeIndexes: number[];
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        computeCircleParams(rcxWorld: any, maxRecordsInABin: number): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class densityGrid extends baseLayoutClass {
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binTops: number[];
        _itemWidth: number;
        _itemHeight: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _binRelativeIndexes: number[];
        _hMargin: number;
        _vMargin: number;
        _hBetween: number;
        _vBetween: number;
        _binCounts: any;
        _xglobalmax: number;
        _yglobalmax: number;
        _xspace: number;
        _yspace: number;
        _space: number;
        _maxShapeSize: number;
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class densityRandom extends baseLayoutClass {
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binTops: number[];
        _itemWidth: number;
        _itemHeight: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _hMargin: number;
        _vMargin: number;
        _hBetween: number;
        _vBetween: number;
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
    class sandDensityOptions {
        columns: number;
        rows: number;
        layout: string;
        constructor(columns: number, rows: number, layout: string);
    }
}
declare module beachParty {
    class flatCircle extends baseLayoutClass {
        _maxCount: number;
        _radius: number;
        _spacing: number;
        _nextIndex: number;
        _center: {
            x: number;
            y: number;
        };
        _maxShapeSize: number;
        _maxCountOverFacets: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class flatGrid extends baseLayoutClass {
        _maxCountAllFacets: number;
        _colCount: number;
        _rowCount: number;
        _nextIndex: number;
        _maxShapeWidth: number;
        _maxShapeHeight: number;
        _itemSize: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        buildScales(nv: NamedVectors, rcxWorld: any, filteredRecordCount: number, facetCount: number): {
            x: vp.scales.baseScale;
            y: vp.scales.baseScale;
            z: vp.scales.baseScale;
            size: vp.scales.baseScale;
            colorIndex: any;
            imageIndex: vp.scales.baseScale;
            red: vp.scales.baseScale;
            green: vp.scales.baseScale;
            blue: vp.scales.baseScale;
        };
        preLayoutLoop(dc: DrawContext): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class flatRandom extends baseLayoutClass {
        _randomX: any[];
        _randomY: any[];
        _maxShapeSize: number;
        _nextRandIndex: number;
        _itemSize: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        buildScales(nv: NamedVectors, rcxWorld: any, filteredRecordCount: number, facetCount: number): {
            x: vp.scales.baseScale;
            y: vp.scales.baseScale;
            z: vp.scales.baseScale;
            size: vp.scales.baseScale;
            colorIndex: any;
            imageIndex: vp.scales.baseScale;
            red: vp.scales.baseScale;
            green: vp.scales.baseScale;
            blue: vp.scales.baseScale;
        };
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class linePlotClass extends baseLayoutClass {
        _ptLast: any;
        _inverseSizeFactor: number;
        _useLinePrim: boolean;
        _useLinePairs: boolean;
        constructor(chart: chartClass, useLinePrim: boolean, useLinePairs: boolean);
        preLayoutLoop(dc: DrawContext): void;
        positionLine(x1: any, y1: any, x2: any, y2: any): {
            cx: number;
            cy: number;
            width: number;
            theta: number;
        };
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class partyGenPlotClass extends baseLayoutClass {
        _maxCountAllFacets: number;
        _maxShapeSize: number;
        _chartType: string;
        _nextInFilterIndex: number;
        _dataDivider1: DataDivider;
        _dataDivider2: DataDivider;
        _dataDivider3: DataDivider;
        _dataDivider4: DataDivider;
        _spaceDivider1: SpaceDivider;
        _spaceDivider2: SpaceDivider;
        _spaceDivider3: SpaceDivider;
        _spaceDivider4: SpaceDivider;
        _shapeMaker: ShapeMaker;
        _fillCell: boolean;
        _leafRcArray: CellData[];
        constructor(chart: chartClass, chartType: string);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        applyPresets(dc: DrawContext): void;
        resetDividersAndShapes(dc: DrawContext): void;
        addDivider(dividers: ChartDivider[], dd: DataDivider, sd: SpaceDivider, layers?: ShapeMaker[]): ChartDivider;
        /** called for each facet. */
        preLayoutLoop(dc: DrawContext): void;
        genLayout(svg: any, rc: ClientRect, dataFrame: dataFrameClass, dividers: ChartDivider[], divideLevel: number): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class radialClass extends baseLayoutClass {
        _cx: number;
        _cy: number;
        _maxShapeSize: number;
        constructor(chart: chartClass);
        buildScales(nv: NamedVectors, rcxWorld: any, filteredRecordCount: number, facetCount: number): {
            x: vp.scales.baseScale;
            y: vp.scales.baseScale;
            z: vp.scales.baseScale;
            size: vp.scales.baseScale;
            colorIndex: any;
            imageIndex: vp.scales.baseScale;
            red: vp.scales.baseScale;
            green: vp.scales.baseScale;
            blue: vp.scales.baseScale;
        };
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class scatterPlotClass extends baseLayoutClass {
        _maxShapeSize: number;
        _halfSizeSize: number;
        _z: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        modifyXYScales(dc: DrawContext, halfShapeSize?: number): void;
        preLayoutLoop(dc: DrawContext): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class scatterPlot3dClass extends baseLayoutClass {
        _maxShapeSize: number;
        constructor(chart: chartClass);
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(i: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class stacksBinClass extends baseLayoutClass {
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binTops: number[];
        _binWidth: number;
        _binHeight: number;
        _binDepth: number;
        _space: number;
        _maxCubesInAStack: number;
        _itemWidth: number;
        _itemHeight: number;
        _leftOff: number;
        _topOff: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _stackIndexes: number[];
        _hMargin: number;
        _vMargin: number;
        _hBetween: number;
        _vBetween: number;
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class trueCustomClass extends baseLayoutClass {
        _layoutName: string;
        _customParams: CustomParams;
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _maxCount: number;
        _nextIndex: number;
        _isFlat: boolean;
        _binLefts: number[];
        _binTops: number[];
        _radius: number;
        _spacing: number;
        _center: {
            x: number;
            y: number;
        };
        _itemWidth: number;
        _itemHeight: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _binRelativeIndexes: number[];
        _binPts: {};
        _binRects: {};
        _layoutFunc: any;
        _hMargin: number;
        _vMargin: number;
        _hBetween: number;
        _vBetween: number;
        _binCounts: any;
        _xglobalmax: number;
        _yglobalmax: number;
        _xspace: number;
        _yspace: number;
        _space: number;
        _maxShapeSize: number;
        _maxCountOverFacets: number;
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        prepLayouts(dc: DrawContext, nv: NamedVectors, keys: string[]): void;
        preLayoutLoop(dc: DrawContext): void;
        mapLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        radialLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        spiralLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        randomLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        squarifyLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        poissonLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        gridLayout(recordIndex: number, dc: DrawContext, dr: LayoutResult, left: number, top: number, width: number, height: number): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class violinClass extends baseLayoutClass {
        _xFacetBinResults: any;
        _yFacetBinResults: any;
        _maxCount: number;
        _nextIndex: number;
        _binLefts: number[];
        _binTops: number[];
        _maxBinWidth: number;
        _binWidths: number[];
        _binHeight: number;
        _boxWidth: number;
        _boxHeight: number;
        _binIndexesX: number[];
        _binIndexesY: number[];
        _xSpacing: number;
        _ySpacing: number;
        constructor(chart: chartClass);
        /** Adjust scales as needed for our chart. */
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        adjustScales(dc: DrawContext): void;
        assignRecordsToBins(nv: NamedVectors, resultX: any, resultY: any, dc: DrawContext): number;
        preLayoutLoop(dc: DrawContext): void;
        layoutDataForRecord(recordIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class xBandClass extends baseLayoutClass {
        _maxShapeSize: number;
        _halfSizeSize: number;
        _z: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        modifyXYScales(dc: DrawContext, halfShapeSize?: number): void;
        preLayoutLoop(dc: DrawContext): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class yBandClass extends baseLayoutClass {
        _maxShapeSize: number;
        _halfSizeSize: number;
        _z: number;
        constructor(chart: chartClass);
        computeFacetStats(dc: DrawContext, nvFacetBuckets: any[]): number;
        modifyXYScales(dc: DrawContext, halfShapeSize?: number): void;
        preLayoutLoop(dc: DrawContext): void;
        /** "bufferIndex" in the 0-based indexed into the sorted data buffers. */
        layoutDataForRecord(bufferIndex: number, dc: DrawContext, dr: LayoutResult): void;
    }
}
declare module beachParty {
    class bestPoisson {
        grid: any[];
        cellWidth: number;
        cellHeight: number;
        rc: ClientRect;
        avgCellCount: number;
        constructor();
        private distSquared(p1, p2);
        /** if any points in cellPts are closer to pt than minDist, return that new minDist. */
        private checkCellPoints(minDist, pt, cellPts);
        private checkGrid(minDist, pt, r, c);
        /** returns the DIST between pt and closest of points in grid/pts. */
        private findClosest(pts, pt);
        private findBestPoissonCandidate(pts, rc, maxSamples, grid);
        makeGrid(rowCount: any, colCount: any): any[];
        layout(rc: ClientRect, count: number, maxSamples?: number): any[];
    }
}
declare module beachParty {
    class choroplethHelper {
        static atBottom(coords: any[]): boolean;
        static buildPath(rc: ClientRect, ranges: any, coords: any[]): string;
        static makePathPart(rc: ClientRect, linePath: any, coords: any, ranges: any): any;
        static computeXYRange(ranges: any, coords: any[]): void;
        static computeXYRangeEx(ranges: any, coords: any[]): void;
        static getShapeCoords(geoJson: any, shapeName: string): any;
        static getShapeCoordsByIndex(geoJson: any, index: number): any;
    }
}
declare module beachParty {
    class colorPalettesClass {
        static MaxQualitativeColors: number;
        static getColorSchemeNames(colorSchemeType: string): string[];
        static getColorSchemeByName(colorSchemeName: string): any;
        static getColorPaletteTypeFromName(paletteName: string): any;
        static getPaletteFromSettings(colorSchemeName: string, numSteps: number, reverse: boolean, invertColors: boolean): string[];
        static invertThisColor(cr: string): any;
        static getQualitativeColorSchemeIndex(relativeSchemeIndex: number, numColors: number): number;
        static getQualitativePalettes(numQualitativeColors: number, reverseColors: boolean, invertColors?: boolean): any[];
        static getPaletteFromSteps(paletteName: string, scheme: any, stepsRequested: number): any[];
        static getPalettesFromColorSchemeType(colorSchemeType: string, numDesiredColors: number, reverseColors: boolean, invertColors: boolean): any[];
        static getPalettesFromColorScheme(colorSchemeType: string, colorSchemeIndex: number, reverseColors: boolean, invertColors?: boolean): any[];
        static getPalettesFromColorSchemeName(colorSchemeName: string, reverseColors: boolean, invertColors: boolean): any[];
        private static getRgbColorArrayFromRgbColorString(rgbColorString);
        static colorBrewerSchemes: {
            divergingColorSchemes: string[];
            qualitativeColorSchemes: string[];
            sequentialColorSchemes: string[];
            customColorSchemes: string[];
            Spectral: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            RdYlGn: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            RdBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            PiYG: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            PRGn: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            RdYlBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            BrBG: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            RdGy: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            PuOr: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            SpectralEx: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
            };
            RedGreen: {
                2: string[];
            };
            RedBlue: {
                2: string[];
            };
            Khronos: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
            };
            Accent: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
            };
            Dark2: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
            };
            Pastel2: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
            };
            Set2: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
            };
            Pastel1: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Set1: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Paired: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
                12: string[];
            };
            Set3: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
                10: string[];
                11: string[];
                12: string[];
            };
            Blues: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Greens: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Greys: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Oranges: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Purples: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            Reds: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            BuGn: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            BuPu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            GnBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            OrRd: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            PuBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            PuBuGn: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            PuRd: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            RdPu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            YlGn: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            YlGnBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            YlOrBu: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
            YlOrRd: {
                2: string[];
                3: string[];
                4: string[];
                5: string[];
                6: string[];
                7: string[];
                8: string[];
                9: string[];
            };
        };
    }
    enum KnownPalettes {
        Spectral = 0,
        RdYlGn = 1,
        RdBu = 2,
        PiYG = 3,
        PRGn = 4,
        RdYlBu = 5,
        BrBG = 6,
        RdGy = 7,
        PuOr = 8,
        separator1 = 9,
        Blues = 10,
        Greens = 11,
        Greys = 12,
        Oranges = 13,
        Purples = 14,
        Reds = 15,
        separator2 = 16,
        BuGn = 17,
        BuPu = 18,
        GnBu = 19,
        OrRd = 20,
        PuBu = 21,
        PuBuGn = 22,
        separator3 = 23,
        PuRd = 24,
        RdPu = 25,
        YlGn = 26,
        YlGnBu = 27,
        YlOrBu = 28,
        YlOrRd = 29,
        separator4 = 30,
        Accent = 31,
        Dark2 = 32,
        Paired = 33,
        Pastel1 = 34,
        Pastel2 = 35,
        Set1 = 36,
        Set2 = 37,
        Set3 = 38,
    }
}
declare module beachParty {
    class colorTest {
        static colorBrewerSchemesEx: {
            "divergingColorSchemes": string[];
            "qualitativeColorSchemes": string[];
            "sequentialColorSchemes": string[];
            "customColorSchemes": string[];
            "Spectral": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "RdYlGn": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "RdBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "PiYG": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "PRGn": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "RdYlBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "BrBG": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "RdGy": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "PuOr": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "SpectralEx": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
            };
            "RedGreen": {
                "2": string[];
            };
            "RedBlue": {
                "2": string[];
            };
            "Khronos": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
            };
            "Accent": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
            };
            "Dark2": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
            };
            "Pastel2": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
            };
            "Set2": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
            };
            "Pastel1": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Set1": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Paired": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
                "12": string[];
            };
            "Set3": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
                "10": string[];
                "11": string[];
                "12": string[];
            };
            "Blues": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Greens": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Greys": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Oranges": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Purples": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "Reds": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "BuGn": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "BuPu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "GnBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "OrRd": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "PuBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "PuBuGn": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "PuRd": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "RdPu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "YlGn": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "YlGnBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "YlOrBu": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
            "YlOrRd": {
                "2": string[];
                "3": string[];
                "4": string[];
                "5": string[];
                "6": string[];
                "7": string[];
                "8": string[];
                "9": string[];
            };
        };
    }
}
declare module beachParty {
    class Container {
        level: number;
        inputData: dataFrameClass;
        childData: frameOrArrayClass;
        children: Container[];
        statType: StatType;
        statColName: string;
        name: string;
        binMap: any;
        shapeData: dataFrameClass;
        constructor(data: dataFrameClass, level: number, binMap?: any);
        binAndGen(dividers: ChartDivider[]): void;
        measure(dividers: ChartDivider[]): {
            scaleData: ScaleData;
        };
        layout(dividers: ChartDivider[], cellData: CellData, scaleData: ScaleData, svg: any, leafRcArray?: any[]): void;
        addAggColumn(df: dataFrameClass, record: any, stat: StatInfo, colName?: string, statType?: StatType): void;
        aggOrCopy(anyData: frameOrArrayClass, divider: ChartDivider): dataFrameClass;
    }
    class ScaleData {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
        minCount: number;
        maxCount: number;
        allLeafData: dataFrameClass;
    }
    class ChartDivider {
        name: string;
        dd: DataDivider;
        sd: SpaceDivider;
        shapeLayers: ShapeMaker[];
        constructor(svg?: any, dd?: DataDivider, sd?: SpaceDivider, shapeMaker1?: ShapeMaker, shapeMaker2?: ShapeMaker);
    }
}
declare module beachParty {
    class DataDivider {
        colName: string;
        groupingType: GroupingType;
        aggregateType: AggregateType;
        groupCount: number;
        groupSorting: BinSorting;
        isCategoryCol: boolean;
        constructor(colName?: string, groupCount?: number, groupingType?: GroupingType, aggregateType?: AggregateType, groupSorting?: BinSorting);
        divide(dataFrame: dataFrameClass): dataFrameClass[];
    }
    enum GroupingType {
        none = 0,
        bin = 1,
        multiBin = 2,
    }
    enum AggregateType {
        none = 0,
        count = 1,
        sum = 2,
    }
}
declare module beachParty {
    class frameOrArrayClass {
        array: dataFrameClass[];
        single: dataFrameClass;
        length: number;
        name: string;
        constructor(data: any, name: string);
        slice(from: number, to: number): frameOrArrayClass;
        getItem(index: number): any;
        getVector(colName: string, countIfArray?: boolean): any[];
        getNumericVectorFromStat(statInfo: StatInfo, countIfArray?: boolean): NumericVector;
        map(callback: any): any;
    }
}
declare module beachParty {
    class ShapeMaker {
        shapeType: ShapeType;
        strokeSize: number;
        shapeSize: number;
        svg: SVGElement;
        maxShapes: number;
        opacity: number;
        textCol: string;
        textSize: number;
        showTooltips: boolean;
        toolTipFields: string[];
        shapeFill: string;
        fillColorMapping: ColorMappingData;
        fillColorStat: StatType;
        fillScale: vp.scales.baseScale;
        fillVector: number[];
        shapeStroke: string;
        strokeColorMapping: ColorMappingData;
        strokeColorStat: StatType;
        strokeScale: vp.scales.baseScale;
        strokeVector: number[];
        constructor(svg: SVGElement, shapeType?: ShapeType, shapeSize?: number, shapeFill?: string, shapeStroke?: string, strokeSize?: number);
        generate(cellArray: CellData[], data: dataFrameClass, allData: dataFrameClass): void;
        genLine(cellData: CellData[], data: dataFrameClass): void;
        makeTooltip(record: any, dataFrame: dataFrameClass): string;
        getFillColor(index: number): string;
        getStrokeColor(index: number): string;
        genSinglePath(cellData: CellData, dataRecord: any[], index: number, dataFrame: dataFrameClass): void;
        genSingle(cellData: CellData, dataRecord: any[], index: number, dataFrame: dataFrameClass): void;
        buildShapeColorScale(cm: ColorMappingData, statType: StatType, allData: dataFrameClass): {
            scale: any;
            keys: any;
            colName: string;
        };
        buildColorPaletteFromSettings(cm: ColorMappingData, dataFrame: dataFrameClass): void;
    }
    enum ShapeType {
        none = 0,
        circle = 1,
        circleFill = 2,
        line = 3,
        path = 4,
        square = 5,
        rectangle = 6,
        text = 7,
    }
}
declare module beachParty {
    var maxContainers: number;
    class SpaceDivider {
        spaceType: SpaceType;
        cellShape: CellShape;
        margin: number;
        cellMargin: number;
        reverse: boolean;
        showContainers: boolean;
        showCounts: boolean;
        showLabels: boolean;
        labelColName: string;
        labelAddColon: boolean;
        labelPosition: LabelPositon;
        labelHalfCell: boolean;
        labelSize: number;
        labelFill: string;
        labelOpacity: number;
        xStat: StatInfo;
        yStat: StatInfo;
        xVector: number[];
        yVector: number[];
        containerFill: string;
        containerStroke: string;
        containerStrokeSize: number;
        hAlign: HAlign;
        vAlign: VAlign;
        xMaxPeer: boolean;
        yMaxPeer: boolean;
        xRandom: Float32Array;
        yRandom: Float32Array;
        scaleData: ScaleData;
        choroData: any;
        choroMapType: ChoroMapType;
        choroColName: string;
        constructor(spaceType?: SpaceType, margin?: number);
        drawLabelsOnTop(cellData: CellData, svg: any, name: string): CellData;
        /** data can be either a dataFrameClass or an array of DataFrameClass objects. */
        divide(cellData: CellData, name: string, data: frameOrArrayClass, shapeSize: number, scaleData: ScaleData, svg?: SVGElement): CellData[];
        choroLayout(rcMarg: ClientRect, data: frameOrArrayClass): any[];
        makeScaleForCol(vector: number[], colType: string, minRange: number, maxRange: number, maxPeer?: number, zeroBased?: boolean): vp.scales.baseScale;
        /** lays out containers, one per     */
        record(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** lays out containers in a single-level squarified treemap.  Here, the "color" of a squarify cell
        will be determined by the shapes that populate it.  The size of each cell at the leaf nodes can be based
        on a column or just "1".  The size of intermediate container cells is based on the child data groups: count of    */
        squarify(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** maps X, Y values to polar coordinates to plot shapes.  */
        polarXY(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** maps shapes along the X/Y axis using the xCol and yCol values.  */
        plotXY(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** does a FILL along the X axis, where the width and height of each cell is proportional to xCol/yCol. */
        fillXWithProp(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** does a FILL along the Y axis, where the width and height of each cell is proportional to xCol/yCol. */
        fillYWithProp(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** puts first shape at center, then packs other shapes around the first, starting at upper left corner of first shape. repeats
        until all shapes have been placed around the prior shapes.  */
        packOut(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        /** uses sunFlower drawing algorithm (aka fermat's apiral and disc phyllotaxis) to layout shapes in a spiral pattern that
        fills the specified space. */
        fillOut(rcMarg: ClientRect, data: frameOrArrayClass, shapeSize: number): any[];
        fillXY(rcMarg: ClientRect, data: frameOrArrayClass): any[];
        packXY(rcMarg: ClientRect, data: frameOrArrayClass): any;
        packYX(rcMarg: ClientRect, data: frameOrArrayClass): any;
        getMaxCountInGroups(frameOrArray: frameOrArrayClass): number;
        drawContainerOutlines(svg: any, cellArray: CellData[], data: frameOrArrayClass): void;
        showStuff(showContainers: any, showCounts: any): void;
    }
    enum SpaceType {
        none = 0,
        choropleth = 1,
        fillX = 2,
        fillY = 3,
        fillXY = 4,
        fillOut = 5,
        packXY = 6,
        packYX = 7,
        packOut = 8,
        plotXY = 9,
        polarXY = 10,
        overlay = 11,
        poisson = 12,
        random = 13,
        record = 14,
        squarify = 15,
    }
    enum CellShape {
        circle = 0,
        path = 1,
        pieSlice = 2,
        rectangle = 3,
    }
    enum HAlign {
        left = 0,
        center = 1,
        right = 2,
    }
    enum VAlign {
        top = 0,
        middle = 1,
        bottom = 2,
    }
    /** Type of statistic to gather about children of current container. Some stats use "statCol". */
    enum StatType {
        none = 0,
        count = 1,
        min = 2,
        max = 3,
        sum = 4,
        avg = 5,
        median = 6,
        mode = 7,
        std = 8,
        variance = 9,
    }
    class StatInfo {
        statType: StatType;
        colName: string;
        colValueTransform: any;
        peerScale: boolean;
        constructor(colName?: string, statType?: StatType);
        getAggColName(): string;
    }
    class CircleData {
        cx: number;
        cy: number;
        radius: number;
        constructor(cx: number, cy: number, radius: number);
    }
    class PieSliceData extends CircleData {
        innerRadius: number;
        startAngle: number;
        endAngle: number;
    }
    class CellData {
        cellShape: CellShape;
        rect: ClientRect;
        circle: CircleData;
        pieSlice: PieSliceData;
        path: string;
        static fromRect(rect: ClientRect, cellShape: CellShape): CellData;
    }
    enum ChoroMapType {
        none = 0,
        usStates = 1,
        usCounties = 2,
    }
    enum LabelPositon {
        left = 0,
        top = 1,
        right = 2,
        bottom = 3,
    }
}
declare module beachParty {
    class squarifyLayoutClass {
        _values: number[];
        _rc: ClientRect;
        _isRowVertical: boolean;
        _cellArray: CellData[];
        _cellMargin: number;
        _sortedPairs: any[];
        constructor();
        layout(origValues: number[], rc: ClientRect, cellMargin: number): CellData[];
        /** Returns the highest aspect ratio of the list of rectangles represented by "row". */
        worst(row: number[], w: number): number;
        /** layout out the relative area sizes in "row", as a vertical or horizontal row in "rc". */
        layoutRow(row: number[], rowIndexes: number[], remainingChildren: number[]): void;
        /** returns the length of the shortest side of remaining subrect in which current row is placed (this._rc). */
        width(): number;
        squarify(): void;
    }
}
declare module beachParty {
    class dampenerClass {
        static windowDuration: number;
        _target: number;
        _accum: number;
        _applyCallback: any;
        _dampenFactor: number;
        _keepMoving: boolean;
        _firstActual: number;
        _isOperationActive: boolean;
        _firstTargetFrame: boolean;
        _slidingWindow: slidingWindowClass;
        constructor(applyCallback: any);
        inertia(value?: number): number;
        hasInertia(): boolean;
        startUiOperation(): void;
        stopUIOperation(): void;
        setTarget(value: number): void;
        apply(value: number): void;
        /**
         *  this must be called on each frame move.
         */
        onFrameApply(): boolean;
        static createCycle(group: SVGGElement, data: string[]): void;
    }
}
