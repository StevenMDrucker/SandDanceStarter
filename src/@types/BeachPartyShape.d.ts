/// <reference path="vuePlotCore.d.ts" />
/// <reference path="thirdParty/gl-matrix.d.ts" />
declare module beachParty {
    interface IShapeEngine {
        /** Draw the specified shapes, as per the current drawing parameters.  The core method for using the shape engine. */
        drawShapes(shapes: Shape[]): any;
        /** Redraw the last frame using updated drawing parameters (e.g., to change transform, size factor, the hover shape, etc.). */
        redrawLastFrame(): any;
        /** Clear the drawing canvas associated with the shape engine.  Mostly for internal use. */
        clearCanvas(): any;
        /** releases memory associated with shapes and gl buffers.  Mostly for internal use. */
        resetBuffers(): any;
        /** get the parameters that control how shapes are drawn. */
        getParams(): DrawParams;
        /** set the parameters that control how shapes are drawn.  Typical pattern is to get the current parameters (using getParms()), change a few, and then
        call setParams() to send them back to the shape engine. */
        setParams(options: DrawParams): any;
        /** get bounds of a shaped, specified by its primary key. Bounding box is in 3D coordinates. */
        getShapeBoundingBox(primaryKey: string): BoundingBox;
        /** find all shapes that reside in rcScreen bounds (specified pixel coordinates).  This is commonly used as part of a determining the shapes in a
        drag-rectangle selection. */
        hitTestFromRect(rcScreen: any, isChartRelative: boolean, onlyMostCentral: boolean): BoundingBox[];
        hitTestRay(ray: rayClass, mousePt: any): HitTestResult[];
        /** returns true if the primary set of buffers are being filled, false if the secondard set is being used. Each drawShapes() request alternates between
        these 2 sets of buffers.  */
        isUsingPrimaryBuffers(): boolean;
        /** Used to start drawing with a new data set.  Should be called before the drawShapes() call using the new data. */
        clearFromBuffers(): any;
        /** returns the webGL rendering context that the shape engine uses to draw on its canvas. */
        getGlContext(): WebGLRenderingContext;
        /** NOT YET IMPLEMENTED: will draw shapes to a PNG image and return the base64 string of the image. */
        drawToPng(): string;
        /** shutdown the frame timer. */
        shutDown(): any;
        onCycleStart: bpEvent<any>;
        onCycleEnd: bpEvent<ShapeStats>;
        onDrawFrame: bpEvent<any>;
    }
    class DrawParams {
        canvasWidth: number;
        canvasHeight: number;
        cameraParams: CameraParams;
        lightParams: Lighting;
        animationParams: AnimationData;
        hoverParams: HoverParams;
        useContinuousDrawing: boolean;
        useWireFrameDraw: boolean;
        useCulling: boolean;
        useContinuousColor: boolean;
        useColorChannels: boolean;
        useTextures: boolean;
        useInstancing: boolean;
        isBlendingEnabled: boolean;
        areShapesLines: boolean;
        sizeFactor: number;
        shapeOpacity: number;
        maxGlBufferLength: number;
        animPercentOverride: number;
        colorPalette: string[];
        hoverPrimaryKey: string;
        drawOrderKey: string;
        shapeImage: string;
        clearColor: string;
        imagePalette: any[];
        drawPrimitive: DrawPrimitive;
        facetBins: FacetBin[];
    }
    class AmbientLight {
        lightFactor: number;
        color: number[];
        constructor();
    }
    class DirectionalLight extends AmbientLight {
        direction: number[];
        constructor();
    }
    class Lighting {
        isLightingEnabled: boolean;
        ambientLight: AmbientLight;
        light1: DirectionalLight;
        light2: DirectionalLight;
        constructor();
    }
    enum ColorEffect {
        none = 0,
        setColor = 1,
        adjustHue = 2,
        adjustSaturation = 3,
        adjustValue = 4,
    }
    /** this can be applied to SELECTED and UNSELECTED shapes. */
    class ColorParams {
        colorEffect: ColorEffect;
        color: string;
        rgb: number[];
        colorFactor: number;
        constructor(colorEffect?: ColorEffect, color?: string, colorFactor?: number);
    }
    class InstancingParams {
        isInstancingEnabled: boolean;
        constructor(isEnabled?: boolean);
    }
    class FacetBin {
        rowIndexes: number[];
        drawOffset: {
            x: number;
            y: number;
        };
    }
    class CameraParams {
        projection: Float32Array;
        view: Float32Array;
        world: Float32Array;
        rcxWorld: Rect3d;
    }
    class ShapeStats {
        isInstancing: boolean;
        shapeCount: number;
        drawPrimitive: DrawPrimitive;
        totalVertexCount: number;
        bufferMemUsage: number;
        isFirstFilterStage: boolean;
        maxScatterSizeInPixels: number;
        maxGlBufferLength: number;
        drawBatchCount: number;
        lastCycleFrameCount: number;
        lastCycleFrameRate: number;
        cycleNum: number;
        glBufferTime: number;
        glDrawTime: number;
    }
    enum EaseFunction {
        none = 0,
        quadratic = 1,
        cubic = 2,
        quartic = 3,
        quintic = 4,
        exponential = 5,
        sine = 6,
        circle = 7,
    }
    enum EaseType {
        in = 0,
        out = 1,
        inOut = 2,
    }
    enum DrawPrimitive {
        auto = 0,
        point = 1,
        triangle = 2,
        quad = 3,
        cube = 4,
        lineStrip = 5,
        linePairs = 6,
        thickLine = 7,
    }
    class AnimationData {
        isAnimationEnabled: boolean;
        animationDuration: number;
        isStaggeringEnabled: boolean;
        isStaggerForward: boolean;
        maxStaggerTime: number;
        easeFunction: EaseFunction;
        easeType: EaseType;
        constructor();
    }
    enum HoverMatch {
        none = 0,
        point = 1,
        square = 2,
    }
    enum HoverEffect {
        /** this means that hover has no visual effect on shapes. */
        none = 0,
        /** this means that hover shape will be drawn on top with this color. */
        setColor = 1,
        /** this means that hover shape will be drawn on top with its original color. */
        sameColor = 2,
    }
    class HoverParams {
        hoverMatch: HoverMatch;
        squareSize: number;
        hoverEffect: HoverEffect;
        hoverColor: string;
        constructor(matchType?: HoverMatch, squareSize?: number, hoverEffect?: HoverEffect, hoverColor?: string);
    }
    /** 10 floats (80 bytes). */
    class LayoutResult {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        depth: number;
        colorIndex: number;
        imageIndex: number;
        opacity: number;
        theta: number;
        staggerOffset: number;
        redChannel: number;
        greenChannel: number;
        blueChannel: number;
    }
    class Shape extends LayoutResult {
        primaryKey: string;
    }
}
declare module beachParty {
    var dcRegisterCount: number;
    var dcChangedCount: number;
    var dcCallbackCount: number;
    var dcUnregisterCount: number;
    class dataChangerClass implements IDataChanger {
        _callbacks: any;
        _anyCallbacks: any[];
        _pendingDataChange: any;
        constructor();
        registerForChange(name: string, callback: any, context?: any): void;
        registerForRemovableChange(name: string, context: any, callback: any): void;
        registerForAnyChange(callback: any, context?: any): void;
        unregisterForChanges(context: any, name?: string, clearAnyCallback?: boolean): void;
        onDataChanged(name: string, changedBy?: any, ...params: string[]): void;
        triggerCallbacks(name: string, callbacks: callbackEntry[], changedBy: string, params: string[]): void;
        setDataWithChanger(name: string, value: any, changer: any): void;
    }
    function connectModelView(model: dataChangerClass, modelDataName: string, view: dataChangerClass, viewDataName: string): void;
    class callbackEntry {
        context: any;
        callback: any;
        constructor(context: any, callback: any);
    }
    interface IDataChanger {
        registerForChange(name: string, callback: any): any;
        registerForRemovableChange(name: string, context: any, callback: any): any;
        unregisterForChanges(context: any, name?: string): any;
        onDataChanged(name: string, changedBy?: any, ...params: string[]): any;
        setDataWithChanger(name: string, value: any, changer: any): any;
    }
}
declare module beachParty {
    class ShapeEngClass implements IShapeEngine {
        private _canvas;
        private _shapeCount;
        private _isShuttingDown;
        private _prevWidth;
        private _prevHeight;
        private _bufferMgr;
        private _vertexShaderId;
        private _fragmentShaderId;
        private _shapesProgram;
        private _gridLinesProgram;
        private _gl;
        private _glInst;
        private _drawPrimitive;
        private _texture1;
        private _texture2;
        private _textureCount1;
        private _textureCount2;
        private _mostRecentTexture;
        private _mostRecentTextureCount;
        private _needTextureSwap;
        private _shapeMappingPalette;
        private _texPalette;
        private _pkToDrawIndex;
        private _textRects;
        private _boundingBoxMgr;
        private _buildLayoutResults;
        private _buildBoundingBoxes;
        private _transformer;
        private _buildNeeded;
        private _rebuildAttrBuffers;
        private _isLastDrawOfCycle;
        private _isSingleDrawNeeded;
        private _newCycleNeeded;
        private _clearColor;
        private _recordCount;
        private _opacityLast;
        private _sizeFactorLast;
        private _verticesPerRecord;
        private _lastVerticesPerRecord;
        private _drawOrderKey;
        private _drawInfos;
        private _gridLinesBuffer;
        private _lastRayHitTestInfo;
        private _lastRectHitTestInfo;
        private _lastWorld;
        private _lerpWorld;
        private _hitTestCount;
        private _uniforms;
        private _isBlendingEnabled;
        private _instantSizeChange;
        private _firstDraw;
        private _isCullingEnabled;
        private _colorFloats;
        private _colorFloats2;
        private _maxColors;
        private _maxColors2;
        private _primaryColorCount;
        private _isChannelLast;
        private _selectionColor;
        private _drawParams;
        private _lastDrawParams;
        private _shapes;
        private _toPercentUneased;
        private _toStartTime;
        private _isCycleActive;
        private _isUiOpActive;
        private _isInertiaActive;
        private _toPercent;
        private _animCycleCount;
        private _toPercentUnflipped;
        private _maxPercent;
        private _isSmoothLast;
        private _animTimer;
        private _easeFunction;
        private _omitAnimOnNextBuild;
        private _drawPerf;
        private _buildPerf;
        private _drawFrameStatsMsg;
        private _lastFrameTime;
        private _lastCycleFrameRate;
        private _lastCycleFrameCount;
        private _frameCount;
        private _frameRate;
        private _renderCount;
        private _moveFrameCount;
        private _drawFrameCount;
        private _cycleFrameCount;
        private _nextBuildId;
        onCycleStart: bpEvent<{}>;
        onCycleEnd: bpEvent<ShapeStats>;
        onMoveFrame: bpEvent<{}>;
        onDrawFrame: bpEvent<{}>;
        constructor(canvas: HTMLCanvasElement);
        init(): void;
        clearCanvas(): void;
        /**
         *  Clears shapes and buffers.
         */
        resetBuffers(): void;
        /**
        *  Shutdown the shape engine & release as much memory as possible.
       */
        shutDown(): void;
        onDrawPrimitiveChanged(needBufferRebuild: boolean, needProgramBuild: boolean): void;
        overrideDrawPrimitive(value: DrawPrimitive): void;
        onDrawPrimitiveChangedPost(needBufferRebuild: boolean, needProgramBuild: boolean): void;
        computeCulling(): void;
        rectsDiffer(rc: ClientRect, rc2: ClientRect): boolean;
        processDrawParamChanges(dp: DrawParams): void;
        onEaseFunctionChanged(): void;
        onCanvasColorChanged(): void;
        getTotalVertexCount(): number;
        getLastVerticesPerRecord(): number;
        getShapeCount(): number;
        setLastVerticesPerRecord(): void;
        /** The true vertex count for the current drawing primitive. */
        getNumVerticesPerShape(): number;
        /** vertex count for buffers. */
        getNumVerticesInBuffer(): number;
        private setOptionsToDefaults();
        /** called when the user has changed the images used to build the texture sheet.  Starts the building of a new texture, if needed. */
        checkForTexPaletteChanged(): void;
        onTexPaletteChanged(texPalette: string[]): void;
        /** called when a new texture is ready to be applied. */
        onTextureLoaded(newTexture: any, textureCount: number): void;
        drawShapes(shapes: Shape[]): void;
        getFacetBins(): FacetBin[];
        getPkToDrawIndex(key: string): any;
        forceDomApiCall(): void;
        addToDrawPerf(name: string, start: number): number;
        addToBuildPerf(name: string, start: number): number;
        resetDrawPerf(): void;
        resetBuildPerf(): void;
        getBuildPerfTime(name: string): any;
        buildPlot(): void;
        setShaderColorPalette(newColors: string[], maxColors: any): void;
        /** fill buffers with attribute values for each object. */
        fillGlBuffers(buildStart: number): void;
        addNewDrawingBatch(drawBufferIndex: number, shapeCount: number): void;
        getPrimaryColorCount(): number;
        hitTestRay(ray: rayClass, mousePt: any): HitTestResult[];
        drawChartOrFacet(verticesPerRecord: number, buffers: NamedBuffers, counters: any, facetOffset: any, drawBufferIndex: number, dcRecordCount: number): void;
        processResultsForHitTesting(fri: number, primaryKey: string, dr: LayoutResult, facetOffset: any, drawBufferIndex: number): any;
        isUsingPrimaryBuffers(): boolean;
        buildTexture(): void;
        buildGlStuff(): void;
        private getClosestBox(boxes);
        hitTestFromRect(rcScreen: any, isChartRelative: boolean, onlyMostCentral: boolean): BoundingBox[];
        createGlUniforms(): void;
        onDataOrPrimitiveChanged(needRebuild: boolean): void;
        getPrimaryKeys(): string[];
        buildAndUseGlProgram(): void;
        setShaders(fnVertex: string, fnFragment: string): boolean;
        drawToPng(): string;
        setParams(dp: DrawParams): void;
        getParams(): DrawParams;
        clearFromBuffers(): void;
        updateStats(): void;
        startAnimationIfNeeded(): void;
        moveFrame(): void;
        onStartOfCycle(): void;
        calcAniPercent(forceMax?: boolean): void;
        easeInOut(t: any, maxPercent: any): any;
        requestAnimationFrame(callback: any): number;
        setTimerForNextFrame(): void;
        updateTransformerFromDrawParmas(): void;
        captureLastWorld(): void;
        drawFrame(): void;
        captureLastProperties(): void;
        redrawLastFrame(): void;
        private markBuildNeeded(reason);
        onEndOfCycle(duration: number): void;
        startNewFrame(): number;
        drawFrameCore(): void;
        drawAllBuffers(): void;
        drawAllShapes(): void;
        getGlContext(): WebGLRenderingContext;
        getHoverIndex(): number;
        doHoverDrawPrep(): void;
        applyUniformsToShaders(): void;
        /** "vectorIndex" is the index into the current set of sorted shapes.  It is NOT the unsorted natural record index. */
        getShapeBoundingBox(primaryKey: string): BoundingBox;
        private lerpMatrix(percent, fromMat, toMat);
    }
    class BoundingBox {
        xMin: number;
        yMin: number;
        zMin: number;
        xMax: number;
        yMax: number;
        zMax: number;
        theta: number;
        dist: number;
        primaryKey: string;
    }
    /** world unit bounds. */
    class Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    class DrawInfo {
        instOffset: number;
        instCount: number;
        constructor(offset: number, count: number);
    }
    class NamedBuffers {
        xyzArray: Float32Array;
        sizeArray: Float32Array;
        rgbArray: Float32Array;
        colorArray: Float32Array;
        imageIndexArray: Float32Array;
        staggerOffsetArray: Float32Array;
        thetaArray: Float32Array;
        vertexIdArray: Float32Array;
        vectorIndexArray: Float32Array;
    }
}
declare module beachParty {
    class boundingBoxMgrClass {
        private _mins;
        private _maxes;
        private _thetas;
        private _distances;
        private _primaryKeys;
        private _nextIndex;
        constructor();
        /**
         *  Allocate Float32Arrays for our properties.
         */
        adjustSizeAndClearList(count: number): void;
        addBox(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, theta: number, primaryKey: string, dist?: number): void;
        getBoxByKey(primaryKey: string): BoundingBox;
        /** warning - this is a boundBox index only, not the vectorIndex associated with all shapes in draw buffers. */
        getBoxByIndex(boxIndex: number): BoundingBox;
        getCount(): any;
    }
}
declare module beachParty {
    class bpEvent<T> {
        _hookers: hookerClass<T>[];
        attach(callerId: any, callback: (e: T) => void): void;
        detach(callerId: any): void;
        /**
         *  calls all of the callbacks attached to this event.
         * @param e: a map that includes "sender" (the class instance that originated the event) and other parameters.
         */
        trigger(e: T): void;
    }
    class hookerClass<T> {
        _callId: any;
        _callback: (e: T) => void;
        constructor(callerId: any, callback: any);
    }
}
declare module beachParty {
    class bufferMgrClass extends dataChangerClass {
        _gl: WebGLRenderingContext;
        _glInst: ANGLE_instanced_arrays;
        _glAttributes: IAttributes;
        _drawInfos: DrawInfo[];
        _usingPrimaryBuffers: boolean;
        _fromBuffersHaveData: boolean;
        _arrayMemoryBytesInUse: number;
        _shapeEng: ShapeEngClass;
        constructor(gl: WebGLRenderingContext, glInst: ANGLE_instanced_arrays, baseGlVis: ShapeEngClass);
        getArrayMemoryUsage(): number;
        createGlAttributes(program: any, force: boolean): void;
        createAttributeArraysIfNeeded(forceNewArrays: boolean, forceVisualBreak: any): void;
        /** "forceVisualBreak" should be set to true when a new dataFrame has been loaded, so that we do NOT visually connect the from/to plots.
        Also, the number of records may have changed, which would invalid the visuals anyway. */
        private createAttributeArrays(forceVisualBreak);
        private createAttributeArraysCore(attrs, totalVertexCount, arrayMap?);
        /** make a (single vertex per record) copy of the latest (from/to) vertex data.  */
        copyVertexDataToTemp(): any;
        /** copy from temp (single vertex per record) to from buffers.  */
        copyTempToFromBuffers(tempBuffers: NamedBuffers): void;
        /** This rearranges the record values in the "from" buffer to match the current sort order. */
        reorderFromBuffer(fromAttrs: any, fb: NamedBuffers, recordCount: number, verticesPerRecord: number): void;
        /** copies 1 multiple of vertex data from "fb" to verticesPerRecord multiples at "tb" */
        copyVertexBuffers(fb: NamedBuffers, tb: NamedBuffers, primaryKeys: string[], recordCount: number, fromVerticesPerRecord: number, toVerticesPerRecord: number, drawIndexes: any): void;
        /** copy a Float32Array or other array type. */
        arrayCopy(fb: Float32Array, tb: Float32Array): void;
        getAttributesForCycle(usingPrimaryBuffers: boolean): any;
        getNamedBuffers(attributes: any): NamedBuffers;
        setArraysFromNamedBuffers(attributes: any, buffers: NamedBuffers): void;
        flipIsUsingPrimaryBuffers(): void;
        glInst(value?: ANGLE_instanced_arrays): ANGLE_instanced_arrays;
        updateAttributesWithGlInst(): void;
        allocateBuffers(drawInfos: DrawInfo[]): void;
        bindBuffersToArrayData(drawIndexes: number[]): void;
        bindBufferForDrawing(drawInfoIndex: number): void;
        rebindBuffersAfterProgramSwitch(): void;
        reorderFromBuffers(verticesPerRecord: number): any;
        setFromBufferHasData(value: boolean): void;
        getUsingPrimaryBuffers(): boolean;
        buildRecordToDrawIndexes(): any;
        fillBuffersForRecord(buffers: NamedBuffers, dr: LayoutResult, facetOffset: any, verticesPerRecord: number, primaryKey: string, vectorIndex: number, facetRelativeIndex: number): void;
    }
    interface IAttributes {
        xyz?: glAttributeClass;
        xyz2?: glAttributeClass;
        rgbBuff?: glAttributeClass;
        rgbBuff2?: glAttributeClass;
        colorIndex?: glAttributeClass;
        colorIndex2?: glAttributeClass;
        theta?: glAttributeClass;
        theta2?: glAttributeClass;
        size?: glAttributeClass;
        size2?: glAttributeClass;
        imageIndex?: glAttributeClass;
        imageIndex2?: glAttributeClass;
        vectorIndex?: glAttributeClass;
        vertexId?: glAttributeClass;
        staggerOffset?: glAttributeClass;
    }
}
declare module utils {
    import EaseFunction = beachParty.EaseFunction;
    function getEasingFunction(value: EaseFunction): any;
}
declare var shaders: any;
declare function getTextFromFunc(func: any): any;
declare module beachParty {
    function error(msg: string): void;
    /**
     * This is a minimum webGL drawing routine, to test the "gl" context and help debug more complex code.
     * @param gl
     * @param width
     * @param height
     * @param buildShaders
     * @param buildGlBuffers
     */
    function testGlDraw(gl: WebGLRenderingContext, width: number, height: number, buildShaders: boolean, buildGlBuffers: boolean): void;
}
declare module beachParty {
    var cubeMesh: any;
    /** Defines the geometry for a CUBE object (vertices, normals, and texture coordinates).  Note
        that triangles are defined with FRONT side trinagle points in CCW (counter-clockwise) order. */
    function buildCubeMesh(): void;
}
declare module beachParty {
    class glAttributeClass {
        _gl: any;
        _program: any;
        _attrLoc: any;
        _glBuffers: any[];
        _sizeInFloats: number;
        _array: Float32Array;
        _nameInShader: string;
        _isByte: boolean;
        _normalizeOnGpu: boolean;
        _isVertexCommon: boolean;
        _isSingleBuffer: boolean;
        _glInst: any;
        _drawInfos: beachParty.DrawInfo[];
        constructor(gl: any, glInst: any, program: any, nameInShader: string, sizeInFloats: number, isByte?: boolean, normalizeOnGpu?: boolean, isVertexCommon?: boolean, isSingleBuffer?: boolean);
        glInst(value?: ANGLE_instanced_arrays): any;
        allocateBuffersForAttr(drawInfos: beachParty.DrawInfo[]): void;
        unbindBuffer(gl: any): void;
        bindBuffersToArrayData(drawIndexes: number[], verticesInBuffer: number): void;
        bindBufferForDrawing(drawInfoIndex: number): void;
        private bindAttributeToBuffer(buffer);
        setArray(array: any): void;
    }
}
declare module beachParty {
    class glUniformClass {
        static uniformSetCount: number;
        _gl: any;
        _program: any;
        _uniformLoc: any;
        _value: any;
        _typeStr: string;
        _nameInShader: string;
        _glSetter: any;
        constructor(gl: any, program: any, nameInShader: string, typeStr: string, initValue: any);
        isValueEqual(value: any): boolean;
        setValue(value: any): void;
    }
}
declare module beachParty {
    class glUtils {
        static hostShaders: {};
        static addHostShader(name: string, value: any): void;
        static error(msg: string): void;
        static getContext(canvas: HTMLCanvasElement, options?: any): any;
        static getExtension(gl: any, name: string): any;
        /** read TEXT file sync. from server relative path. */
        private static readServerTextFile(relPath);
        static findAndCompileShader(gl: any, shaderId: string, isVertexShader: boolean): any;
        static buildProgram(gl: any, shaders: any[]): any;
        static addAttribute(attributeMap: any, gl: any, glInst: any, program: any, nameInShader: string, sizeInFloats: number, isByte?: boolean, normalizeOnGpu?: boolean, isVertexCommon?: boolean, isSingleBuffer?: boolean): glAttributeClass;
        static addUniform(uniformMap: any, gl: any, program: any, nameInShader: string, typeStr: string, initialValue?: any): glUniformClass;
        static colorNamesOrValuesToFloats(names: string[]): Float32Array;
        static configDevice(gl: any, width: number, height: number, clearColor: any, useBlending: boolean, useCulling: boolean): void;
    }
}
declare module beachParty {
    class hitTestRect {
        private static ndcRects;
        private static buildTimer;
        static markCacheBuildNeeded(transformer: transformerClass, boxMgr: boundingBoxMgrClass): void;
        private static clearBuildTimer();
        static buildNdcRects(transformer: transformerClass, boxMgr: boundingBoxMgrClass): void;
        static getRectToPtDist(rc: ClientRect, pt: any): number;
        static intersectUsingTransforms(rcScreen: ClientRect, transformer: transformerClass, boxMgr: boundingBoxMgrClass): any[];
        static transformBox(box: BoundingBox, matWVP: Float32Array): ClientRect;
        private static transformPoint(x, y, z, matrix);
        static intersectUsingFrustrum(rcScreen: ClientRect, transformer: transformerClass, origBoxes: any[]): any;
        private static eliminateBoxesOutsidePlane(boxes, p1, p2, p3, p4);
        private static isBoxOutsidePlane(box, plane);
        private static isPointOutsidePlane(x, y, z, plane);
        private static getPlaneNormal(plane);
    }
}
declare module beachParty {
    /** This code adpoted from XNA 4 Ray and BoundingBox classes (Microsoft). */
    class rayClass {
        position: vp.geom.point3;
        direction: vp.geom.vector3;
        constructor(position: vp.geom.point3, direction: vp.geom.vector3);
        /** return null if no intersection found; otherwise returns distance to  intersection point. */
        intersectSphere(sphere: any): number;
        /** return null if no intersection found; otherwise returns distance to intersection point. */
        intersectBox(box: BoundingBox): number;
    }
    class HitTestResult {
        distance: number;
        primaryKey: string;
        boundingBox: BoundingBox;
        constructor(dist: number, primaryKey: string, boundingBox: BoundingBox);
    }
}
declare module beachParty {
    class textureMakerClass extends dataChangerClass {
        static textureCache: any;
        static nextTextureId: number;
        private _gl;
        private _makers;
        private _texture;
        private _shapeCount;
        private _potCount;
        private _texPalette;
        private _images;
        private _imagesLoaded;
        private _imgSheet;
        constructor(texPalette: string[]);
        getImageSheet(): any;
        getTexture(): any;
        getPotCount(): number;
        nearestPowerOfTwo(value: number): number;
        buildAsync(gl: any, texPalette: string[], isShapeNames: boolean): void;
        buildShapeMakers(texPalette: any): void;
        private circleMaker(ctx, size, strokeSize, xOffset, isFilled);
        private triangleMaker(ctx, size, strokeSize, xOffset, isFilled);
        private squareMaker(ctx, size, strokeSize, xOffset, isFilled);
        /** create an image sheet from loaded image elements. All images will be drawn using the size of the first image. */
        createImageSheet(images: HTMLImageElement[]): HTMLCanvasElement;
        /** create an image sheet from the shapes to be drawn. */
        createShapeImages(size: number, strokeSize: number): HTMLCanvasElement;
        private loadImagesFromPalette(urls);
        /** imgSheet can be HTMLImageElement or canvas. */
        loadTextureFromSheet(imgSheet: any): void;
        cacheTextureIfPossible(): void;
        private makeTextureLevel(level, size, strokeSize);
    }
}
declare module beachParty {
    class transformerClass extends dataChangerClass {
        _matProjection: Float32Array;
        _matView: Float32Array;
        _matWorld: Float32Array;
        _gl: any;
        _zPos: number;
        _xRotation: number;
        _yRotation: number;
        _zRotation: number;
        _cameraPos: vp.geom.vector3;
        _cameraLookAt: vp.geom.vector3;
        _rcxWorld: Rect3d;
        _canvasWidth: number;
        _canvasHeight: number;
        _isOrthoCamera: boolean;
        _transformChanged: boolean;
        _useScreenUnits: boolean;
        constructor(gl: any);
        rebuildProjectionMatrix(): void;
        resetMatrices(): void;
        testXnaPick(): void;
        getProjection(): Float32Array;
        getView(): Float32Array;
        world(value?: Float32Array): Float32Array;
        private multiplyTransform(matTransform);
        clearTransforms(): void;
        getWorldViewProjection(): Float32Array;
        postProjTransformAdjust(v: vp.geom.vector4): vp.geom.vector3;
        /** map a point from MODEL space to SCREEN space. */
        projectToScreen(x: number, y: number, z: number): vp.geom.vector3;
        transformPtWithMatrix(x: number, y: number, z: number, mat: any): vp.geom.point3;
        /** map a point from MODEL space to NDC space (-1 to 1). */
        projectToNDC(x: number, y: number, z: number): vp.geom.point3;
        unprojectFromNDCUsingMarksApproach(x: number, y: number): vp.geom.point3;
        /** map from NDC (-1 to 1) to WORLD space */
        unprojectFromNDC(x: number, y: number): any;
        getRayFromScreenPos(x: number, y: number): rayClass;
        /** map from NDC (-1 to 1) to WORLD space (using glmatrix library) */
        unprojectFromNDCEx(x: number, y: number): {
            x: any;
            y: any;
            z: any;
        };
        /** map from HC (-1 to 1) to WORLD space */
        unprojectFromNDCCore(x: number, y: number, z: number, omitWorld?: boolean): vp.geom.point3;
        getInvMvpMatrix(): GLM.IArray;
        getInvWorldpMatrix(): GLM.IArray;
        /** static version of unprojectFromScreen(), XNA style. */
        static unprojectXna(vScr: any, vpWidth: number, vpHeight: number, matWorld: any, matView: any, matProjection: any): vp.geom.point3;
        static withinEpsilon(a: number, b: number): boolean;
        /** static version of unprojectFromScreen(). */
        static unprojectEx(vScr: any, vpWidth: number, vpHeight: number, matWorld: any, matView: any, matProjection: any): vp.geom.point3;
        getCameraPosAsArray(): number[];
        getNdcZ(): number;
        /** map a point from SCREEN space to MODEL space. */
        unprojectFromScreen(xScreen: number, yScreen: number, zNorm?: number, omitWorld?: boolean): vp.geom.point3;
        /** maps point from homogeneous space (-1 to +1) to screen space. */
        viewportTransformPoint(v: vp.geom.vector3): vp.geom.vector3;
        /** maps point from screen space to homogeneous space (-1 to +1). */
        viewportUntransformPoint(v: vp.geom.vector3): vp.geom.vector3;
        scaleMatrix(factor: number, mousePos: any, isMousePosInWorldUnits?: boolean): void;
        /** here, bounds.x is xMin, bounds.y is yMin.  */
        worldBoundsToScreen(bounds: Bounds): ClientRect;
        worldPointToScreen(wx: number, wy: number, wz: number): vp.geom.vector3;
        worldSizeToScreen(size: number): number;
        screenSizeXToWorld(size: number): number;
        screenSizeYToWorld(size: number): number;
        screenSizeZToWorld(size: number): number;
        mapLinearFromScreenToWorld(x: number, y: number): {
            x: number;
            y: number;
            z: number;
        };
        screenToWorldBounds(rc: any): ClientRect;
        translateMatrixEx(x: number, y: number, z: number): void;
        scaleMatrixAt(factor: number, atPos: vp.geom.vector3): void;
        rotateMatrixX(value: number, additive?: boolean): void;
        rotateMatrixY(value: number, additive?: boolean, usePostZ?: boolean): void;
        rotateMatrixZ(value: number): void;
        xRotation(value?: number): number;
        yRotation(value?: number): number;
        zRotation(value?: number): number;
        getMatrix(): Float32Array;
        /** "width" is the width of the camera's canvas, is pixels.  "height" is height of canvas. */
        updateCamera(isOrthoCamera: boolean, width: number, height: number): void;
        cameraParams(cp?: CameraParams): CameraParams;
        getWorldBounds(): Rect3d;
        toFloatv3(v: any): Float32Array;
    }
    class Rect3d {
        left: number;
        right: number;
        top: number;
        bottom: number;
        front: number;
        back: number;
        constructor(left: number, right: number, top: number, bottom: number, front: number, back: number);
    }
}
