var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    shapeInterfaces.ts - Shape Engine API.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var DrawParams = (function () {
        function DrawParams() {
        }
        return DrawParams;
    }());
    beachParty.DrawParams = DrawParams;
    var AmbientLight = (function () {
        function AmbientLight() {
            this.lightFactor = .25;
            this.color = [1, 1, 1]; // white
        }
        return AmbientLight;
    }());
    beachParty.AmbientLight = AmbientLight;
    var DirectionalLight = (function (_super) {
        __extends(DirectionalLight, _super);
        function DirectionalLight() {
            _super.call(this);
            this.lightFactor = 1;
        }
        return DirectionalLight;
    }(AmbientLight));
    beachParty.DirectionalLight = DirectionalLight;
    var Lighting = (function () {
        function Lighting() {
            this.ambientLight = new AmbientLight();
            //---- currently, these lights are defined in the cubeVertexShader.c shader ----
            this.light1 = new DirectionalLight();
            this.light2 = new DirectionalLight();
        }
        return Lighting;
    }());
    beachParty.Lighting = Lighting;
    (function (ColorEffect) {
        ColorEffect[ColorEffect["none"] = 0] = "none";
        ColorEffect[ColorEffect["setColor"] = 1] = "setColor";
        ColorEffect[ColorEffect["adjustHue"] = 2] = "adjustHue";
        ColorEffect[ColorEffect["adjustSaturation"] = 3] = "adjustSaturation";
        ColorEffect[ColorEffect["adjustValue"] = 4] = "adjustValue";
    })(beachParty.ColorEffect || (beachParty.ColorEffect = {}));
    var ColorEffect = beachParty.ColorEffect;
    /** this can be applied to SELECTED and UNSELECTED shapes. */
    var ColorParams = (function () {
        function ColorParams(colorEffect, color, colorFactor) {
            if (colorEffect === void 0) { colorEffect = ColorEffect.none; }
            if (color === void 0) { color = "yellow"; }
            if (colorFactor === void 0) { colorFactor = .25; }
            this.colorEffect = colorEffect;
            this.color = color;
            this.colorFactor = colorFactor;
        }
        return ColorParams;
    }());
    beachParty.ColorParams = ColorParams;
    var InstancingParams = (function () {
        function InstancingParams(isEnabled) {
            this.isInstancingEnabled = isEnabled;
        }
        return InstancingParams;
    }());
    beachParty.InstancingParams = InstancingParams;
    var FacetBin = (function () {
        function FacetBin() {
        }
        return FacetBin;
    }());
    beachParty.FacetBin = FacetBin;
    var CameraParams = (function () {
        function CameraParams() {
        }
        return CameraParams;
    }());
    beachParty.CameraParams = CameraParams;
    var ShapeStats = (function () {
        function ShapeStats() {
        }
        return ShapeStats;
    }());
    beachParty.ShapeStats = ShapeStats;
    (function (EaseFunction) {
        EaseFunction[EaseFunction["none"] = 0] = "none";
        EaseFunction[EaseFunction["quadratic"] = 1] = "quadratic";
        EaseFunction[EaseFunction["cubic"] = 2] = "cubic";
        EaseFunction[EaseFunction["quartic"] = 3] = "quartic";
        EaseFunction[EaseFunction["quintic"] = 4] = "quintic";
        EaseFunction[EaseFunction["exponential"] = 5] = "exponential";
        EaseFunction[EaseFunction["sine"] = 6] = "sine";
        EaseFunction[EaseFunction["circle"] = 7] = "circle";
    })(beachParty.EaseFunction || (beachParty.EaseFunction = {}));
    var EaseFunction = beachParty.EaseFunction;
    (function (EaseType) {
        EaseType[EaseType["in"] = 0] = "in";
        EaseType[EaseType["out"] = 1] = "out";
        EaseType[EaseType["inOut"] = 2] = "inOut";
    })(beachParty.EaseType || (beachParty.EaseType = {}));
    var EaseType = beachParty.EaseType;
    (function (DrawPrimitive) {
        DrawPrimitive[DrawPrimitive["auto"] = 0] = "auto";
        DrawPrimitive[DrawPrimitive["point"] = 1] = "point";
        DrawPrimitive[DrawPrimitive["triangle"] = 2] = "triangle";
        DrawPrimitive[DrawPrimitive["quad"] = 3] = "quad";
        DrawPrimitive[DrawPrimitive["cube"] = 4] = "cube";
        DrawPrimitive[DrawPrimitive["lineStrip"] = 5] = "lineStrip";
        DrawPrimitive[DrawPrimitive["linePairs"] = 6] = "linePairs";
        DrawPrimitive[DrawPrimitive["thickLine"] = 7] = "thickLine";
    })(beachParty.DrawPrimitive || (beachParty.DrawPrimitive = {}));
    var DrawPrimitive = beachParty.DrawPrimitive;
    var AnimationData = (function () {
        function AnimationData() {
            this.isAnimationEnabled = true;
            this.animationDuration = .45; // .35
            this.isStaggeringEnabled = true;
            this.isStaggerForward = true;
            this.maxStaggerTime = .45; // .35
            this.easeFunction = EaseFunction.quadratic;
            this.easeType = EaseType.out;
        }
        return AnimationData;
    }());
    beachParty.AnimationData = AnimationData;
    (function (HoverMatch) {
        HoverMatch[HoverMatch["none"] = 0] = "none";
        HoverMatch[HoverMatch["point"] = 1] = "point";
        HoverMatch[HoverMatch["square"] = 2] = "square";
    })(beachParty.HoverMatch || (beachParty.HoverMatch = {}));
    var HoverMatch = beachParty.HoverMatch;
    (function (HoverEffect) {
        /** this means that hover has no visual effect on shapes. */
        HoverEffect[HoverEffect["none"] = 0] = "none";
        /** this means that hover shape will be drawn on top with this color. */
        HoverEffect[HoverEffect["setColor"] = 1] = "setColor";
        /** this means that hover shape will be drawn on top with its original color. */
        HoverEffect[HoverEffect["sameColor"] = 2] = "sameColor";
    })(beachParty.HoverEffect || (beachParty.HoverEffect = {}));
    var HoverEffect = beachParty.HoverEffect;
    var HoverParams = (function () {
        function HoverParams(matchType, squareSize, hoverEffect, hoverColor) {
            if (matchType === void 0) { matchType = HoverMatch.point; }
            if (squareSize === void 0) { squareSize = 10; }
            if (hoverEffect === void 0) { hoverEffect = HoverEffect.setColor; }
            if (hoverColor === void 0) { hoverColor = "purple"; }
            this.hoverMatch = matchType;
            this.squareSize = squareSize;
            this.hoverEffect = hoverEffect;
            this.hoverColor = hoverColor;
        }
        return HoverParams;
    }());
    beachParty.HoverParams = HoverParams;
    /** 10 floats (80 bytes). */
    var LayoutResult = (function () {
        function LayoutResult() {
        }
        return LayoutResult;
    }());
    beachParty.LayoutResult = LayoutResult;
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            _super.apply(this, arguments);
        }
        return Shape;
    }(LayoutResult));
    beachParty.Shape = Shape;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    dataChanger.ts - base class for classes that change data (supports lightweight MVC).
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    beachParty.dcRegisterCount = 0;
    beachParty.dcChangedCount = 0;
    beachParty.dcCallbackCount = 0;
    beachParty.dcUnregisterCount = 0;
    /// Lightweight MVC rules:
    ///
    ///    1. each chunk of data shared between classes (e.g. the app, controls, and dialogs) should be associated with exactly one
    ///          owner class.
    ///
    ///    2. [MODEL] any class that owns shared data should:
    ///         - extend the base class "dataChangerClass" 
    ///         - expose the data with a property getter/setter function
    ///         - when the data is changed (thru the setter or directly), the "onDataChanged()" method should be called
    ///
    ///    3. [VIEW-write] any class that changes shared data should:
    ///         - extend the base class "dataChangerClass" 
    ///         - expose the data with a property getter/setter function
    ///         - when the data is changed (thru the setter or directly), the "onDataChanged()" method should be called
    ///
    ///    5. [CONTROLLER] the code creating a VIEW class should call "connectModelView()" to connect shared data changes
    ///         between the view and the associated owner class.
    ///
    /// This way, the model classes don't have to track the connected view classes and the view classes don't have to known who
    /// the owner/model classes are.  It makes model classes easier to maintain, and enables view classes to be reusable.  The 
    /// messy event-connection code is handled by the "connectModelView()" calls.
    var dataChangerClass = (function () {
        function dataChangerClass() {
            this._callbacks = {}; // used to register listeners for changes to specific names
            this._anyCallbacks = []; // used to register listeners for changes for any names
            this._pendingDataChange = {}; // used to set "changer" for an upcoming "onDataChanged()" call
        }
        dataChangerClass.prototype.registerForChange = function (name, callback, context) {
            beachParty.dcRegisterCount++;
            var callbacks = null;
            if (name) {
                //---- register for a specific property ----
                var callbacks = this._callbacks[name];
                if (!callbacks) {
                    callbacks = [];
                    this._callbacks[name] = callbacks;
                }
            }
            else {
                //---- register for any callback ----
                callbacks = this._anyCallbacks;
            }
            var entry = new callbackEntry(context, callback);
            //---- don't add if already there ----
            if (callbacks.indexOf(entry) == -1) {
                callbacks.push(entry);
            }
        };
        dataChangerClass.prototype.registerForRemovableChange = function (name, context, callback) {
            this.registerForChange(name, callback, context);
        };
        dataChangerClass.prototype.registerForAnyChange = function (callback, context) {
            this.registerForChange(null, callback, context);
        };
        dataChangerClass.prototype.unregisterForChanges = function (context, name, clearAnyCallback) {
            beachParty.dcUnregisterCount++;
            var callbacks = null;
            if (clearAnyCallback) {
                //---- unhook caller from anyCallback ----
                callbacks = this._anyCallbacks;
            }
            else if (name) {
                //---- unhook caller from named event ----
                callbacks = this._callbacks[name];
            }
            else {
                //---- unhook caller from all events ----
                var keys = vp.utils.keys(this._callbacks);
                if (keys) {
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        this.unregisterForChanges(context, key);
                    }
                }
            }
            if (callbacks) {
                for (var i = callbacks.length - 1; i >= 0; i--) {
                    var entry = callbacks[i];
                    if (entry.context == context) {
                        callbacks.removeAt(i);
                    }
                }
            }
        };
        dataChangerClass.prototype.onDataChanged = function (name, changedBy) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            beachParty.dcChangedCount++;
            //---- if caller did not specify changedBy, use the "_pendingDataChange" map to get its value ----
            if (!changedBy) {
                changedBy = this._pendingDataChange[name];
                if (changedBy) {
                    //---- clear it ----
                    delete this._pendingDataChange[name];
                }
            }
            changedBy = changedBy || this;
            if (name === null) {
                //---- trigger all names ----
                var keys = vp.utils.keys(this._callbacks);
                for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];
                    var callbacks = this._callbacks[name];
                    this.triggerCallbacks(name, callbacks, changedBy, params);
                }
            }
            else {
                var callbacks = this._callbacks[name];
                this.triggerCallbacks(name, callbacks, changedBy, params);
            }
            //---- trigger ANY callbacks ----
            var callbacks = this._anyCallbacks;
            this.triggerCallbacks(name, callbacks, changedBy, params);
        };
        dataChangerClass.prototype.triggerCallbacks = function (name, callbacks, changedBy, params) {
            if (callbacks) {
                for (var i = 0; i < callbacks.length; i++) {
                    var entry = callbacks[i];
                    var callback = entry.callback;
                    if (!entry.context || entry.context != changedBy) {
                        //callback(name, changedBy);
                        var newParams = [name, changedBy];
                        if (params) {
                            newParams = newParams.concat(params);
                        }
                        beachParty.dcCallbackCount++;
                        callback.apply(undefined, newParams);
                    }
                }
            }
        };
        dataChangerClass.prototype.setDataWithChanger = function (name, value, changer) {
            this._pendingDataChange[name] = changer;
            try {
                this[name](value);
            }
            finally {
                this._pendingDataChange[name] = null;
            }
        };
        return dataChangerClass;
    }());
    beachParty.dataChangerClass = dataChangerClass;
    function connectModelView(model, modelDataName, view, viewDataName) {
        //--- send changes from model to view ----
        model.registerForRemovableChange(modelDataName, view, function (name, changer) {
            var value = model[modelDataName]();
            view.setDataWithChanger(viewDataName, value, model);
        });
        //--- send changes from view to model ----
        view.registerForRemovableChange(viewDataName, model, function (name, changer) {
            var value = view[viewDataName]();
            model.setDataWithChanger(modelDataName, value, view);
        });
    }
    beachParty.connectModelView = connectModelView;
    var callbackEntry = (function () {
        function callbackEntry(context, callback) {
            this.context = context;
            this.callback = callback;
        }
        return callbackEntry;
    }());
    beachParty.callbackEntry = callbackEntry;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    shapeEng.ts - draws animated batches of shapes.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var ShapeEngClass = (function () {
        function ShapeEngClass(canvas) {
            this._isShuttingDown = false;
            this._prevWidth = null;
            this._prevHeight = null;
            //---- CONTEXT ----
            this._gl = null;
            this._mostRecentTextureCount = 0;
            this._needTextureSwap = false;
            //---- PER SHAPE stuff ----
            this._pkToDrawIndex = null;
            this._textRects = [];
            //---- what to gather on each draw cycle ----
            this._buildLayoutResults = false;
            this._buildBoundingBoxes = true;
            this._buildNeeded = false;
            this._rebuildAttrBuffers = true;
            this._isLastDrawOfCycle = false;
            this._isSingleDrawNeeded = false;
            this._newCycleNeeded = false;
            this._recordCount = 0;
            //---- misc LAST flags ----
            this._opacityLast = 1;
            this._sizeFactorLast = 1;
            //---- GL ATTRIBUTES ----
            //_vertexCount = 0;
            this._verticesPerRecord = 1;
            this._lastVerticesPerRecord = null;
            //---- BUFFERS ----
            //_usingPointCubes = false;
            this._drawOrderKey = "none";
            this._gridLinesBuffer = null;
            //private _isFirstFilteredStage = false;
            //---- HIT TESTING ----
            this._lastRayHitTestInfo = null;
            this._lastRectHitTestInfo = null;
            this._lastWorld = null;
            this._lerpWorld = null;
            this._hitTestCount = 0; // for this chart
            //---- UNIFORM (shader constants) ----
            this._uniforms = {};
            this._isBlendingEnabled = false;
            this._instantSizeChange = false;
            this._firstDraw = true;
            this._isCullingEnabled = true;
            this._maxColors = 2;
            this._maxColors2 = 2;
            this._primaryColorCount = 0;
            this._isChannelLast = false;
            //---- ANIMATION TIMING ----
            this._toPercentUneased = 1;
            this._toStartTime = 0;
            this._isCycleActive = false;
            this._isUiOpActive = false; // if a drag-based 3D transform is active (keep animation running)
            this._isInertiaActive = false; // if initeria is continuously applying a 3D transform
            this._toPercent = 1;
            this._animCycleCount = 0;
            this._maxPercent = 0;
            this._isSmoothLast = false; // isSmooth setting from last anim cycle
            this._animTimer = null;
            this._omitAnimOnNextBuild = false;
            //---- PERF STATS ----
            this._drawPerf = {};
            this._buildPerf = {};
            this._drawFrameStatsMsg = null;
            this._lastFrameTime = 0;
            this._lastCycleFrameRate = 0;
            this._lastCycleFrameCount = 0;
            this._frameCount = 0;
            this._frameRate = 0;
            this._renderCount = 0;
            this._moveFrameCount = 0;
            this._drawFrameCount = 0;
            this._cycleFrameCount = 0;
            this._nextBuildId = 0;
            //---- events ----
            this.onCycleStart = new beachParty.bpEvent();
            this.onCycleEnd = new beachParty.bpEvent();
            this.onMoveFrame = new beachParty.bpEvent();
            this.onDrawFrame = new beachParty.bpEvent();
            this._canvas = canvas;
            this.init();
        }
        ShapeEngClass.prototype.init = function () {
            //---- specify "preserveDrawingBuffer=true" so we can capture images using toDataUrl() ----
            this._gl = beachParty.glUtils.getContext(this._canvas, { preserveDrawingBuffer: true }); // true });
            this._glInst = null; // set in onDrawPrimitiveChanged()
            this._boundingBoxMgr = new beachParty.boundingBoxMgrClass();
            this._transformer = new beachParty.transformerClass(this._gl);
            this.setOptionsToDefaults();
            beachParty.buildCubeMesh();
            this._bufferMgr = new beachParty.bufferMgrClass(this._gl, this._glInst, this);
            this.processDrawParamChanges(this._drawParams);
        };
        ShapeEngClass.prototype.clearCanvas = function () {
            this.startNewFrame();
        };
        /**
         *  Clears shapes and buffers.
         */
        ShapeEngClass.prototype.resetBuffers = function () {
            this._pkToDrawIndex = null;
            this._shapes = [];
            this._shapeCount = 0;
            this.clearFromBuffers();
            this._bufferMgr.createGlAttributes(this._shapesProgram, true);
            this._boundingBoxMgr = new beachParty.boundingBoxMgrClass();
        };
        /**
        *  Shutdown the shape engine & release as much memory as possible.
       */
        ShapeEngClass.prototype.shutDown = function () {
            this._isShuttingDown = true;
        };
        ShapeEngClass.prototype.onDrawPrimitiveChanged = function (needBufferRebuild, needProgramBuild) {
            var dp = this._drawParams;
            //---- refresh glInst for this build ----
            //---- using POINT and INST together slow perf on IE11, so prevent that ----
            if (dp.useInstancing && dp.drawPrimitive != beachParty.DrawPrimitive.point) {
                this._glInst = beachParty.glUtils.getExtension(this._gl, "ANGLE_instanced_arrays");
            }
            else {
                this._glInst = null;
            }
            //---- update the glInst used by bufferMgr ----
            this._bufferMgr.glInst(this._glInst);
            this._drawPrimitive = dp.drawPrimitive;
            this.onDrawPrimitiveChangedPost(needBufferRebuild, needProgramBuild);
        };
        ShapeEngClass.prototype.overrideDrawPrimitive = function (value) {
            this._drawPrimitive = value;
            this.onDrawPrimitiveChangedPost(true, false);
        };
        ShapeEngClass.prototype.onDrawPrimitiveChangedPost = function (needBufferRebuild, needProgramBuild) {
            this.computeCulling();
            this.onDataOrPrimitiveChanged(needProgramBuild);
            this.createGlUniforms();
            this.markBuildNeeded("onDrawPrimitiveChanged");
            if (needBufferRebuild) {
                this._rebuildAttrBuffers = true;
            }
        };
        ShapeEngClass.prototype.computeCulling = function () {
            this._isCullingEnabled = false;
            if (this._drawPrimitive == beachParty.DrawPrimitive.cube) {
                if (this._drawParams.useCulling) {
                    this._isCullingEnabled = true;
                }
            }
        };
        ShapeEngClass.prototype.rectsDiffer = function (rc, rc2) {
            var isDiff = (rc.left != rc2.left || rc.top != rc2.top || rc.width != rc2.width || rc.height != rc2.height);
            return isDiff;
        };
        ShapeEngClass.prototype.processDrawParamChanges = function (dp) {
            this.onEaseFunctionChanged();
            var newDrawPrim = this._drawParams.drawPrimitive;
            if (newDrawPrim != this._drawPrimitive || (this._glInst != null) != this._drawParams.useInstancing) {
                //---- previous chart changed drawingPrimitive - restore it now ----
                this._drawPrimitive = newDrawPrim;
                this.onDrawPrimitiveChanged(true, false); //  this.onDrawPrimitiveChangedPost(true, false);
            }
            else {
                this.onDrawPrimitiveChanged(false, false); // true);
            }
            this._bufferMgr.createGlAttributes(this._shapesProgram, false);
            this.createGlUniforms();
            //---- rebuild camera if needed ----
            if (this._prevWidth != dp.canvasWidth || this._prevHeight != dp.canvasHeight) {
                this._transformer.updateCamera(false, dp.canvasWidth, dp.canvasHeight);
                this._prevWidth = dp.canvasWidth;
                this._prevHeight = dp.canvasHeight;
            }
        };
        ShapeEngClass.prototype.onEaseFunctionChanged = function () {
            var ad = this._drawParams.animationParams;
            this._easeFunction = utils.getEasingFunction(ad.easeFunction);
        };
        ShapeEngClass.prototype.onCanvasColorChanged = function () {
            var cr = this._drawParams.clearColor;
            if (!cr || cr == "none" || cr == "transparent") {
                var crArray = [0, 0, 0, 0]; // transparent
            }
            else {
                var clearColor = vp.color.getColorFromString(cr);
                if (!clearColor) {
                    var crArray = [0, 0, 0, 0]; // transparent
                }
                else {
                    var crArray = vp.color.makeColorArrayForWebGL(clearColor);
                }
            }
            this._clearColor = crArray;
        };
        ShapeEngClass.prototype.getTotalVertexCount = function () {
            var shapeCount = this._shapeCount;
            var verticesPerRecord = this.getNumVerticesInBuffer();
            var vertexCount = shapeCount * verticesPerRecord;
            return vertexCount;
        };
        ShapeEngClass.prototype.getLastVerticesPerRecord = function () {
            return this._lastVerticesPerRecord;
        };
        ShapeEngClass.prototype.getShapeCount = function () {
            return this._shapeCount;
        };
        ShapeEngClass.prototype.setLastVerticesPerRecord = function () {
            this._lastVerticesPerRecord = this.getNumVerticesInBuffer();
        };
        /** The true vertex count for the current drawing primitive. */
        ShapeEngClass.prototype.getNumVerticesPerShape = function () {
            //auto,         // not seen here, but take its value into account
            //point,
            //triangle,
            //quad,
            //cube,
            //lineStrip,
            //linePairs,
            //thickLine,
            var verticesByPrim = [1, 1, 3, 6, 36, 1, 1, 6];
            var verticesPer = verticesByPrim[this._drawParams.drawPrimitive];
            return verticesPer;
        };
        /** vertex count for buffers. */
        ShapeEngClass.prototype.getNumVerticesInBuffer = function () {
            var vertexCount = 1;
            if (!this._glInst) {
                vertexCount = this.getNumVerticesPerShape();
            }
            return vertexCount;
        };
        ShapeEngClass.prototype.setOptionsToDefaults = function () {
            var dp = new beachParty.DrawParams();
            this._drawParams = dp;
            dp.isBlendingEnabled = false;
            dp.areShapesLines = false;
            dp.useContinuousDrawing = false;
            dp.useWireFrameDraw = false;
            dp.useCulling = false;
            dp.useContinuousColor = false;
            dp.useColorChannels = false;
            dp.useTextures = false;
            dp.useInstancing = false; // be conservative
            dp.sizeFactor = 1;
            dp.shapeOpacity = 1;
            dp.maxGlBufferLength = null;
            dp.animPercentOverride = undefined;
            dp.colorPalette = ["blue", "red", "green"];
            dp.hoverPrimaryKey = null;
            dp.drawOrderKey = null;
            dp.shapeImage = null;
            dp.clearColor = "transparent";
            dp.imagePalette = null;
            dp.drawPrimitive = beachParty.DrawPrimitive.cube;
            dp.facetBins = null;
            dp.canvasWidth = 100;
            dp.canvasHeight = 100;
            var camera = new beachParty.transformerClass(this._gl);
            dp.cameraParams = camera.cameraParams();
            dp.hoverParams = new beachParty.HoverParams();
            dp.animationParams = new beachParty.AnimationData();
            dp.lightParams = new beachParty.Lighting();
            dp.cameraParams = new beachParty.CameraParams();
            this.onCanvasColorChanged();
        };
        /** called when the user has changed the images used to build the texture sheet.  Starts the building of a new texture, if needed. */
        ShapeEngClass.prototype.checkForTexPaletteChanged = function () {
            var texPalette = null;
            //---- shapeMappingPalette takes priority ----
            if (this._shapeMappingPalette && this._shapeMappingPalette.length) {
                texPalette = this._shapeMappingPalette;
            }
            else {
                var imgName = this._drawParams.shapeImage;
                if (imgName && imgName != "none") {
                    texPalette = [imgName];
                }
            }
            if (texPalette != this._texPalette) {
                this.onTexPaletteChanged(texPalette);
                this._texPalette = texPalette;
            }
        };
        ShapeEngClass.prototype.onTexPaletteChanged = function (texPalette) {
            var _this = this;
            var gl = this._gl;
            if (texPalette && texPalette.length) {
                var isShapeNames = (!texPalette[0].contains("."));
                var textureMaker = new beachParty.textureMakerClass(texPalette);
                textureMaker.registerForChange("loaded", function (e) {
                    var texture = textureMaker.getTexture();
                    var potCount = textureMaker.getPotCount();
                    _this.onTextureLoaded(texture, potCount);
                });
                textureMaker.buildAsync(gl, texPalette, isShapeNames);
            }
            else {
                this.onTextureLoaded(null, 0);
                vp.select("#imgDebug")
                    .css("display", "none");
            }
        };
        /** called when a new texture is ready to be applied. */
        ShapeEngClass.prototype.onTextureLoaded = function (newTexture, textureCount) {
            this._mostRecentTexture = newTexture;
            this._mostRecentTextureCount = textureCount;
            this._needTextureSwap = (newTexture != null);
            vp.utils.debug("onTextureLoaded: newTexture=" + newTexture + ", newTextureCount=" + textureCount);
            this.markBuildNeeded("onTextureLoaded");
        };
        ShapeEngClass.prototype.drawShapes = function (shapes) {
            this._shapes = shapes;
            if (this._shapeCount != shapes.length) {
                this.clearFromBuffers();
                this._shapeCount = shapes.length;
            }
            this.buildPlot();
            this._newCycleNeeded = true;
            this.startAnimationIfNeeded();
        };
        ShapeEngClass.prototype.getFacetBins = function () {
            return this._drawParams.facetBins;
        };
        ShapeEngClass.prototype.getPkToDrawIndex = function (key) {
            return this._pkToDrawIndex[key];
        };
        ShapeEngClass.prototype.forceDomApiCall = function () {
            //---- this code is NECESSARY to enable JIT-ing (make a DOM API call) ----
            var canvas = document.createElement("canvas");
            var ctxJit = canvas.getContext("2d");
            ctxJit.globalAlpha = 1;
            ctxJit.font = "16px Tahoma";
        };
        ShapeEngClass.prototype.addToDrawPerf = function (name, start) {
            var now = vp.utils.now();
            var elapsed = now - start;
            this._drawPerf[name] += elapsed;
            return now;
        };
        ShapeEngClass.prototype.addToBuildPerf = function (name, start) {
            var now = vp.utils.now();
            var elapsed = now - start;
            this._buildPerf[name] += elapsed;
            return now;
        };
        ShapeEngClass.prototype.resetDrawPerf = function () {
            this._drawPerf = {};
            this._drawPerf.configDevice = 0;
            this._drawPerf.clear = 0;
            this._drawPerf.applyUniforms = 0;
            this._drawPerf.drawBuffers = 0;
            this._drawPerf.onFrame = 0;
            this._drawPerf.total = 0;
        };
        ShapeEngClass.prototype.resetBuildPerf = function () {
            this._buildPerf = {};
            this._buildPerf.layoutPrep = 0;
            this._buildPerf.preLayout = 0;
            this._buildPerf.layoutEx = 0;
            this._buildPerf.reorderBuffer = 0;
            this._buildPerf.layoutPost = 0;
            this._buildPerf.total = 0;
        };
        ShapeEngClass.prototype.getBuildPerfTime = function (name) {
            return this._buildPerf[name];
        };
        ShapeEngClass.prototype.buildPlot = function () {
            var buildPlotStart = vp.utils.now();
            var buildStart = vp.utils.now();
            this.resetBuildPerf();
            var buildId = this._nextBuildId++;
            try {
                this.updateTransformerFromDrawParmas();
                this.checkForTexPaletteChanged();
                this.buildGlStuff();
                this.fillGlBuffers(buildStart);
            }
            finally {
                //---- clear flags for next build ----
                this._rebuildAttrBuffers = false;
            }
            this.addToBuildPerf("total", buildStart);
            this._buildPerf.glBufferFill = vp.utils.now() - buildPlotStart;
        };
        ShapeEngClass.prototype.setShaderColorPalette = function (newColors, maxColors) {
            //this._colorPalette = newColors;
            var newFloats = (newColors) ? beachParty.glUtils.colorNamesOrValuesToFloats(newColors) : null;
            if (this.isUsingPrimaryBuffers()) {
                this._colorFloats = newFloats;
                this._maxColors = maxColors;
                if (!this._colorFloats2) {
                    this._colorFloats2 = newFloats;
                    this._maxColors2 = maxColors;
                }
            }
            else {
                this._colorFloats2 = newFloats;
                this._maxColors2 = maxColors;
                if (!this._colorFloats) {
                    this._colorFloats = newFloats;
                    this._maxColors = maxColors;
                }
            }
        };
        /** fill buffers with attribute values for each object. */
        ShapeEngClass.prototype.fillGlBuffers = function (buildStart) {
            this._textRects = [];
            //this._spheres = [];
            this._gridLinesBuffer = [];
            this._drawInfos = [];
            //---- to minimize impact on memory, re-use this array (rather than reallocating it) ----
            //this._boundingBoxes = [];
            var fillStart = vp.utils.now();
            var dp = this._drawParams;
            var maxColors = dp.colorPalette.length; // is this all we need?
            this.setShaderColorPalette(dp.colorPalette, maxColors);
            var counters = { next1: 0, next3: 0 };
            var verticesPerRecord = this._verticesPerRecord;
            var layoutStart = vp.utils.now();
            //this._facetLabelRects = [];
            var usingPrimary = this.isUsingPrimaryBuffers();
            var attributes = this._bufferMgr.getAttributesForCycle(usingPrimary);
            var buffers = this._bufferMgr.getNamedBuffers(attributes);
            //---- for now, always re-order the buffer ----
            var reorderResult = null;
            var start = this.addToBuildPerf("reorderBuffer", buildStart);
            //---- if sort order has changed, REORDER record data in FROM buffer ---
            var drawOrderKey = this._drawParams.drawOrderKey;
            if (drawOrderKey != this._drawOrderKey) {
                reorderResult = this._bufferMgr.reorderFromBuffers(verticesPerRecord);
            }
            //---- now its safe to clear this ----
            this._pkToDrawIndex = {};
            this._drawOrderKey = drawOrderKey;
            start = this.addToBuildPerf("layoutPrep", start);
            var drawBufferIndex = 0; // where to put next record layout data
            var verticesPerShape = this.getNumVerticesPerShape();
            var verticesInBuffer = this.getNumVerticesInBuffer();
            var facetBins = this._drawParams.facetBins;
            if (facetBins && facetBins.length) {
                // var facetResult = facetHelper.layout();
                //---- now, do the REGULAR PASS on all facets ----
                for (var i = 0; i < facetBins.length; i++) {
                    var facetOffset = facetBins[i].drawOffset;
                    //---- update drawing context for this facet ----
                    var facetRecordCount = facetBins[i].rowIndexes.length; //  utils.getDataLength(nvBucket);
                    /// NOTE: we do NOT update the scales or the dc bounds - chart draws into first facet bounds and then system offsets x/y as needed afterwards. 
                    /// calcRanges() uses the FIRST facet bounds to set: dc.x, dc.y, dc.width, dc.height also.  
                    this.drawChartOrFacet(verticesPerRecord, buffers, counters, facetOffset, drawBufferIndex, facetRecordCount);
                    var drawInfo = new DrawInfo(drawBufferIndex, facetRecordCount);
                    this._drawInfos.push(drawInfo);
                    drawBufferIndex += facetRecordCount;
                }
            }
            else {
                var shapeCount = this._shapeCount;
                //---- REGULAR PASS (no facets) ----
                this.drawChartOrFacet(verticesPerRecord, buffers, counters, { x: 0, y: 0 }, drawBufferIndex, shapeCount);
                this.addNewDrawingBatch(drawBufferIndex, shapeCount);
            }
            //vp.utils.debug("after layout of all records, keyCount(this._pkToDrawIndex): " + vp.utils.keys(this._pkToDrawIndex).length);
            if (true) {
                //---- add DrawInfo for HOVER SHAPE (will dynamically set the hoverVectorIndex) ----
                this.addNewDrawingBatch(-1, 1);
            }
            this._bufferMgr.allocateBuffers(this._drawInfos);
            var drawIndexes = vp.data.range(0, this._drawInfos.length - 1);
            this._bufferMgr.bindBuffersToArrayData(drawIndexes);
            var elapsed = vp.utils.now() - layoutStart;
            //vp.utils.debug("layoutChartOrFacet took: " + elapsed + " ms");
            var start = vp.utils.now();
            this._bufferMgr.setArraysFromNamedBuffers(attributes, buffers);
            //this.dumpVertexBuffers("FILL toBuffers", verticesPerRecord, buffers);
            if (reorderResult) {
                this._bufferMgr.setArraysFromNamedBuffers(reorderResult.attributes, reorderResult.buffers);
            }
            this._bufferMgr.setFromBufferHasData(true);
            //this.bindGridLinesBuffer();
            this.addToBuildPerf("layoutPost", start);
            var elapsed = vp.utils.now() - fillStart;
            //vp.utils.debug("fillBuffers took: " + elapsed + " ms");
        };
        ShapeEngClass.prototype.addNewDrawingBatch = function (drawBufferIndex, shapeCount) {
            var maxLen = this._drawParams.maxGlBufferLength;
            if (maxLen) {
                while (shapeCount > maxLen) {
                    var drawInfo = new DrawInfo(drawBufferIndex, maxLen);
                    this._drawInfos.push(drawInfo);
                    drawBufferIndex += maxLen;
                    shapeCount -= maxLen;
                }
            }
            var drawInfo = new DrawInfo(drawBufferIndex, shapeCount);
            this._drawInfos.push(drawInfo);
        };
        ShapeEngClass.prototype.getPrimaryColorCount = function () {
            return this._primaryColorCount;
        };
        ShapeEngClass.prototype.hitTestRay = function (ray, mousePt) {
            var itemsFound = [];
            //var textRects = this._textRects;
            var bbCount = this._boundingBoxMgr.getCount();
            //---- do hit testing using bounding spheres, then test at triangle level ----
            var start = vp.utils.now();
            //---- test against 3D objects ----
            for (var i = 0; i < bbCount; i++) {
                var box = this._boundingBoxMgr.getBoxByIndex(i);
                var dist = ray.intersectBox(box);
                if (dist !== null) {
                    var hit = new beachParty.HitTestResult(dist, box.primaryKey, box);
                    itemsFound.push(hit);
                }
            }
            ////---- test against 2d TEXT boxes ----
            //for (var i = 0; i < textRects.length; i++)
            //{
            //    var rc = textRects[i];
            //    if (vp.geom.rectContainsPoint(rc, mousePt))
            //    {
            //        var hit = new HitTestResult(0, rc.primaryKey, rc);
            //        itemsFound.push(hit);
            //    }
            //}
            var elapsed = vp.utils.now() - start;
            //vp.utils.debug("hitTestRay: itemsFound=" + itemsFound.length + ", elapsed: " + elapsed + " ms");
            this._lastRayHitTestInfo = { type: "ray", elapsed: elapsed, itemsFoundCount: itemsFound.length };
            this._hitTestCount++;
            return itemsFound;
        };
        ShapeEngClass.prototype.drawChartOrFacet = function (verticesPerRecord, buffers, counters, facetOffset, drawBufferIndex, dcRecordCount) {
            //---- opt out if just forcing JIT ----
            if (!this._shapeCount) {
                return;
            }
            //vp.utils.debug("layoutChartOrFacet: facetOffset.x=" + facetOffset.x + ", facetOffset.y=" + facetOffset.y);
            var start = vp.utils.now();
            start = this.addToBuildPerf("preLayout", start);
            var textDrawCount = 0;
            var bufferOffset = drawBufferIndex;
            /// NOTE: taking perf measurements each time thru the loop causes a HUGE slowdown in the layout process,
            /// so we now just take a sample at the end (without the layout, fill, process breakdown). 
            for (var fri = 0; fri < dcRecordCount; fri++) {
                //var primaryKey = nv.primaryKey.getRawData(fri) + "";
                var myIndex = fri + bufferOffset;
                var shape = this._shapes[myIndex];
                var primaryKey = shape.primaryKey;
                start = this.addToBuildPerf("layout", start);
                var rect = this.processResultsForHitTesting(fri, primaryKey, shape, facetOffset, drawBufferIndex);
                start = this.addToBuildPerf("process", start);
                //---- for IE code JIT-ing purposes, the fill buffers loop must be in its own function ----
                this._bufferMgr.fillBuffersForRecord(buffers, shape, facetOffset, verticesPerRecord, primaryKey, drawBufferIndex, fri);
                //if (this._tm.colName != null && textDrawCount < this._tm.maxShapes)
                //{
                //    //---- use "fri" (vs. "drawBufferIndex") so that we index nv.* correctly ----
                //    this.drawTextForItem(this._ctx, fri, rect, nv, dr, primaryKey);
                //    textDrawCount++;
                //}
                this._pkToDrawIndex[primaryKey] = drawBufferIndex;
                //start = this.addToBuildPerf("fill", start);
                drawBufferIndex++;
            }
            //var debugMsg = "record drawn: " + i;
            //vp.select("#consoleDiv").text(debugMsg);
            //if (this._lm.colName)
            //{
            //    this.drawLinesBetweenShapes(dc, buffers, facetOffset);
            //}
            start = this.addToBuildPerf("layoutEx", start);
            //vp.utils.debug("finished layout of " + dc.recordCount + " shapes");
            //this.fillGridLinesBuffer(dc, facetOffset);
            this.addToBuildPerf("layoutPost", start);
        };
        ShapeEngClass.prototype.processResultsForHitTesting = function (fri, primaryKey, dr, facetOffset, drawBufferIndex) {
            var rect = null;
            //---- create a bouding-box RECT for hit-testing on this shape ----
            if (dr.opacity > 0) {
                var sizeFactor = this._drawParams.sizeFactor; //  dc.userSizeFactor;
                var hitTestWidth = dr.width * sizeFactor;
                var hitTestHeight = dr.height * sizeFactor;
                rect = vp.geom.createRect(dr.x - hitTestWidth / 2, dr.y - hitTestHeight / 2, hitTestWidth, hitTestHeight);
                if (this._buildBoundingBoxes) {
                    var halfDepth = dr.depth / 2;
                    //---- bug workaround - for some reason, this "halfDepth" results in front/back mappings that are too far apart. ----
                    //---- so, for now, we adjust it here. "10" seems to provide better answers than no adjustment.  ----
                    halfDepth /= 10;
                    this._boundingBoxMgr.addBox(rect.left, rect.top, dr.z - halfDepth, rect.right, rect.bottom, dr.z + halfDepth, dr.theta, primaryKey);
                }
            }
            return rect;
        };
        ShapeEngClass.prototype.isUsingPrimaryBuffers = function () {
            return this._bufferMgr.getUsingPrimaryBuffers();
        };
        ShapeEngClass.prototype.buildTexture = function () {
            var gl = this._gl;
            var newTexture = this._mostRecentTexture;
            var textureCount = this._mostRecentTextureCount;
            /// webGL bug/misunderstanding workaround: seems that creating a new webGL texture somehow corrupts the existing texture activations, so we 
            /// always reactive the existing textures here.
            if (this.isUsingPrimaryBuffers()) {
                //---- move NEW texture to texture1 ----
                this._texture1 = newTexture;
                this._textureCount1 = textureCount;
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, newTexture);
                // vp.utils.debug("new texture assigned to: gl.TEXTURE0");
                //---- rebind prev texture to texture2 ----
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this._texture2);
            }
            else {
                //---- move NEW texture to texture2 ----
                this._texture2 = newTexture;
                this._textureCount2 = textureCount;
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, newTexture);
                //vp.utils.debug("new texture assigned to: gl.TEXTURE1");
                //---- rebind prev texture to texture0 ----
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this._texture1);
            }
            //vp.utils.debug("buildTexture: texture1=" + this._texture1 + ", texture2=" + this._texture2);
            //this._isAnimatingTexture = true;
        };
        ShapeEngClass.prototype.buildGlStuff = function () {
            var lightParams = this._drawParams.lightParams;
            //---- TODO: sort when using blending and 3D objects ----
            //---- for now, turn off blending if are in a 3D chart ----
            this._isBlendingEnabled = (this._drawParams.isBlendingEnabled && !this._textureCount1 && !this._textureCount2);
            this.onCanvasColorChanged(); // recalculate this._clearColor
            var usingPrimary = this.isUsingPrimaryBuffers();
            //vp.utils.debug("buildNonLayoutStuff: this._usingPrimaryBuffers=" + usingPrimary);
            this.buildTexture();
            var forceVisualBreak = false;
            if (this._firstDraw) {
                this.onDataOrPrimitiveChanged(true);
                //---- is ALL this needed when we change data? ----
                this._bufferMgr.createGlAttributes(this._shapesProgram, true);
                this.createGlUniforms();
                //---- clear hover index ----
                //this._drawParams.hoverPrimaryKey = null;     
                this._rebuildAttrBuffers = true;
                this._firstDraw = false;
                forceVisualBreak = true;
            }
            //---- NOTE: the boundingBoxes only hold FILTERED-IN shapes - you cannot find shapes directly using "vectorIndex" for them ----
            //var filteredInCount = this._drawParams.filteredInShapeCount;        //  this._dataMgr.getFilteredInCount();
            this._boundingBoxMgr.adjustSizeAndClearList(this._shapeCount);
            this._bufferMgr.createAttributeArraysIfNeeded(this._rebuildAttrBuffers, forceVisualBreak);
        };
        ShapeEngClass.prototype.getClosestBox = function (boxes) {
            var box = null;
            var minDist = Number.MAX_VALUE;
            for (var i = 0; i < boxes.length; i++) {
                var b = boxes[i];
                if (i == 0 || b.dist < minDist) {
                    minDist = b.dist;
                    box = b;
                }
            }
            return box;
        };
        ShapeEngClass.prototype.hitTestFromRect = function (rcScreen, isChartRelative, onlyMostCentral) {
            var start = vp.utils.now();
            var boxes = null;
            //vp.utils.debug("hitTestRect: left=" + rcScreen.left + ", top=" + rcScreen.top);
            //---- ensure the _boundingBoxes match the current data set ----
            //if (this._boundingBoxMgr.getCount() == this._shapeCount)
            if (this._boundingBoxMgr.getCount() > 0) {
                //---- adjust for margins ----
                if (isChartRelative) {
                    var left = +rcScreen.left; // - this._frameLeft;
                    var top = +rcScreen.top; // - this._frameTop;
                }
                else {
                    var left = rcScreen.left;
                    var top = rcScreen.top;
                }
                //---- adjust for plot topOffset=10 ----
                //top -= 10;
                rcScreen = vp.geom.createRect(left, top, rcScreen.width, rcScreen.height);
                boxes = beachParty.hitTestRect.intersectUsingTransforms(rcScreen, this._transformer, this._boundingBoxMgr);
                if (onlyMostCentral) {
                    var centralBox = this.getClosestBox(boxes);
                    boxes = (centralBox) ? [centralBox] : [];
                }
                var elapsed = vp.utils.now() - start;
                //vp.utils.debug("hitTestRect: boxes=" + boxes.length + ", elapsed: " + elapsed + " ms");
                this._lastRectHitTestInfo = { type: "rect", elapsed: elapsed, itemsFoundCount: boxes.length };
                this._hitTestCount++;
            }
            return boxes;
        };
        ShapeEngClass.prototype.createGlUniforms = function () {
            var gl = this._gl;
            var program = this._shapesProgram;
            var uniforms = this._uniforms;
            //---- these are constant values (and don't have to be updated again) ----
            var matProjection = this._transformer.getProjection(); // .toFloat32Array();
            beachParty.glUtils.addUniform(uniforms, gl, program, "projectionMatrix", "matrix4fv", matProjection);
            beachParty.glUtils.addUniform(uniforms, gl, program, "invMvpMatrix", "matrix4fv");
            beachParty.glUtils.addUniform(uniforms, gl, program, "invWorldMatrix", "matrix4fv");
            beachParty.glUtils.addUniform(uniforms, gl, program, "colorPalette", "3fv", this._colorFloats);
            beachParty.glUtils.addUniform(uniforms, gl, program, "colorPalette2", "3fv", this._colorFloats2);
            beachParty.glUtils.addUniform(uniforms, gl, program, "isColorDiscrete", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "isColorDiscrete2", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "isColorDirect", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "isColorDirect2", "1f");
            //if (this._usingPointCubes)
            //{
            //    glUtils.addUniform(uniforms, gl, program, "canvasSize", "2f");
            //    glUtils.addUniform(uniforms, gl, program, "szCanvas", "2f");
            //    glUtils.addUniform(uniforms, gl, program, "ndcZ", "1f");
            //    glUtils.addUniform(uniforms, gl, program, "cameraPos", "3fv");
            //    glUtils.addUniform(uniforms, gl, program, "mvpMatrix", "matrix4fv");
            //    glUtils.addUniform(uniforms, gl, program, "worldMatrix", "matrix4fv");
            //}
            //else
            {
                beachParty.glUtils.addUniform(uniforms, gl, program, "cubeVertices", "3fv", beachParty.cubeMesh.vertices);
                beachParty.glUtils.addUniform(uniforms, gl, program, "cubeNormals", "3fv", beachParty.cubeMesh.vertexNormals);
                beachParty.glUtils.addUniform(uniforms, gl, program, "cubeTexCoords", "2fv", beachParty.cubeMesh.uvFrontOnly);
                beachParty.glUtils.addUniform(uniforms, gl, program, "cubeTriangles", "1fv", beachParty.cubeMesh.triangles);
                beachParty.glUtils.addUniform(uniforms, gl, program, "drawingPoints", "1f");
                beachParty.glUtils.addUniform(uniforms, gl, program, "ambientFactor", "1f");
                beachParty.glUtils.addUniform(uniforms, gl, program, "lightFactor1", "1f"); // set in view
                //glUtils.addUniform(uniforms, gl, program, "lightFactor2", "1f");        // set in view
                beachParty.glUtils.addUniform(uniforms, gl, program, "lightingEnabled", "1f");
                beachParty.glUtils.addUniform(uniforms, gl, program, "triangleIndex", "1f", 0);
            }
            //---- these are updated every frame ----
            beachParty.glUtils.addUniform(uniforms, gl, program, "maxColors", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "maxColors2", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "globalOpacity", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "globalOpacity2", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "toPercent", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "toPercentTheta", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "toPercentUneased", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "sizeFactor", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "sizeFactor2", "1f");
            beachParty.glUtils.addUniform(uniforms, gl, program, "modelViewMatrix", "matrix4fv");
            beachParty.glUtils.addUniform(uniforms, gl, program, "normalMatrix", "matrix3fv");
            //---- texture uniforms ----
            beachParty.glUtils.addUniform(uniforms, gl, program, "toPercentFrag", "1f", -1);
            beachParty.glUtils.addUniform(uniforms, gl, program, "usingTexture1", "1f", -1);
            beachParty.glUtils.addUniform(uniforms, gl, program, "usingTexture2", "1f", -1);
            beachParty.glUtils.addUniform(uniforms, gl, program, "uSampler1", "1i", 0);
            beachParty.glUtils.addUniform(uniforms, gl, program, "uSampler2", "1i", 1);
            beachParty.glUtils.addUniform(uniforms, gl, program, "textureCount1", "1f", 0);
            beachParty.glUtils.addUniform(uniforms, gl, program, "textureCount2", "1f", 0);
            //---- hover stuff ----
            beachParty.glUtils.addUniform(uniforms, gl, program, "hoverVectorIndex", "1f", -1);
            beachParty.glUtils.addUniform(uniforms, gl, program, "hoverColor", "3f");
        };
        ShapeEngClass.prototype.onDataOrPrimitiveChanged = function (needRebuild) {
            var shapeCount = this._shapeCount;
            var verticesPerRecord = this.getNumVerticesInBuffer();
            var vertexCount = shapeCount * verticesPerRecord;
            //this._vertexCount = vertexCount;
            this._verticesPerRecord = verticesPerRecord;
            var rebuiltProgram = false;
            //if (false)      // this._drawPrimitive == DrawPrimitive.point)
            //{
            //    var shaderChanged = this.setShaders("pointCube/pointVertex.c",
            //        "pointCube/pointFragment.c");
            //}
            //else
            {
                var shaderChanged = this.setShaders("cubeVertexShader.c", "fragmentShader.c");
            }
            if (needRebuild || shaderChanged) {
                this.buildAndUseGlProgram();
            }
        };
        ShapeEngClass.prototype.getPrimaryKeys = function () {
            var primaryKeys = this._shapes.map(function (shape) { return shape.primaryKey; });
            return primaryKeys;
        };
        ShapeEngClass.prototype.buildAndUseGlProgram = function () {
            var gl = this._gl;
            //---- SHAPES program ----
            var vertexShader = beachParty.glUtils.findAndCompileShader(gl, this._vertexShaderId, true);
            var fragmentShader = beachParty.glUtils.findAndCompileShader(gl, this._fragmentShaderId, false);
            this._shapesProgram = beachParty.glUtils.buildProgram(gl, [vertexShader, fragmentShader]);
            //---- GRID LINES program ----
            var vertexShader = beachParty.glUtils.findAndCompileShader(gl, "gridLinesVertexShader.c", true);
            var fragmentShader = beachParty.glUtils.findAndCompileShader(gl, "gridLinesFragmentShader.c", false);
            this._gridLinesProgram = beachParty.glUtils.buildProgram(gl, [vertexShader, fragmentShader]);
            //---- make SHAPES the current program ----
            gl.useProgram(this._shapesProgram);
        };
        ShapeEngClass.prototype.setShaders = function (fnVertex, fnFragment) {
            var shaderChanged = false;
            if (this._vertexShaderId != fnVertex || this._fragmentShaderId != fnFragment) {
                this._vertexShaderId = fnVertex;
                this._fragmentShaderId = fnFragment;
                shaderChanged = true;
            }
            return shaderChanged;
        };
        ShapeEngClass.prototype.drawToPng = function () {
            return null;
        };
        ShapeEngClass.prototype.setParams = function (dp) {
            this.processDrawParamChanges(dp);
            this.markBuildNeeded("params");
        };
        ShapeEngClass.prototype.getParams = function () {
            return this._drawParams;
        };
        ShapeEngClass.prototype.clearFromBuffers = function () {
            this._firstDraw = true;
            //this._bufferMgr.setFromBufferHasData(false);
            //this._bufferMgr = new bufferMgrClass(this._gl, this._glInst, this);
            //this.processDrawParamChanges();
        };
        ShapeEngClass.prototype.updateStats = function () {
            //---- update stats ----
            var now = vp.utils.now();
            this._frameCount++;
            this._renderCount++;
            var duration = now - this._lastFrameTime;
            if (duration > 1000) {
                var frameCount = this._frameCount;
                this._frameRate = Math.floor(frameCount * 1000 / duration);
                if (this._frameRate > 80) {
                    var a = 9999;
                }
                this._frameCount = 0;
                this._lastFrameTime = now;
                if (true) {
                    var perf = this._drawPerf;
                    var msg = "total=" + round(perf.total) + " ms, configDevice=" + round(perf.configDevice) + ", clear="
                        + round(perf.clear) + ", applyUniforms=" + round(perf.applyUniforms) + ", applyCount=" +
                        beachParty.glUniformClass.uniformSetCount + ", drawBuffers="
                        + round(perf.drawBuffers) + ", stats=" + round(perf.onFrame);
                    this._drawFrameStatsMsg = msg;
                    this.resetDrawPerf();
                }
            }
        };
        ShapeEngClass.prototype.startAnimationIfNeeded = function () {
            this.setTimerForNextFrame();
        };
        ShapeEngClass.prototype.moveFrame = function () {
            this._animTimer = null; // the timer that got us here is now expired
            var isReadyToBuild = (this._renderCount > 0 || this._shapeCount > 0);
            //vp.utils.debug("moveFrame: this._renderCount=" + this._renderCount + ", dataFrame=" + dataFrame +
            //    ", dataFrame.getRecordCount()=" + dataFrame.getRecordCount() + ", x..colName=" + xm.colName + 
            //    ", isReadyToBuild = " + isReadyToBuild);
            if (isReadyToBuild && this._newCycleNeeded) {
                if (this._drawParams.animPercentOverride !== undefined) {
                    vp.utils.debug("moveFrame: texture1=" + this._texture1 + ", texture2=" + this._texture2);
                }
                //---- CAUTION: using IE trace collection API (performance.mark, etc.) may cost PERF ----
                //---- do NOT enable these calls for released builds ----
                //performance.mark("beforeBuildChart");
                //this.buildChart();
                //performance.mark("afterBuildChart");
                //performance.measure("buildChartElapsed");
                //---- make visible after the first chart has been built ----
                this._canvas.style.opacity = "1";
                this._moveFrameCount++;
                ////---- hide canvas2d until animation is complete ----
                //vp.select(this._view.getContext2d())
                //    .css("opacity", ".4")
                //    .css("transition", "opacity .s ease- in -out")
                if (!this._omitAnimOnNextBuild) {
                    //---- start new ANIMATION CYCLE ("toPercent") ----
                    //---- note: this start the animation timing AFTER the chart has been built ----
                    this.onStartOfCycle();
                    this._newCycleNeeded = false;
                }
                this._omitAnimOnNextBuild = false;
            }
            if (this._isCycleActive) {
                this._cycleFrameCount++;
            }
            if (this._instantSizeChange) {
                //---- this gets captured at end of frame, not cycle, because it is set instantly ----
                this._sizeFactorLast = this._drawParams.sizeFactor;
            }
            //---- animation timing ----
            var toPercentOverride = this._drawParams.animPercentOverride;
            if (toPercentOverride !== undefined || this._isCycleActive) {
                this.calcAniPercent();
            }
            //if (this._enableBuildNeededMarkOnNextFrame)
            //{
            //    this._buildNeeded = true;
            //    this._enableBuildNeededMarkOnNextFrame = false;
            //}
            this.onMoveFrame.trigger({});
        };
        ShapeEngClass.prototype.onStartOfCycle = function () {
            vp.utils.debug("onStartOfCycle");
            this._lastFrameTime = vp.utils.now();
            this._bufferMgr.flipIsUsingPrimaryBuffers();
            this._isCycleActive = true;
            //---- set time for start of to/from animation ----
            this._toStartTime = vp.utils.now();
            //this._chartFrameHelper.fadeInOut(false);
            this.onCycleStart.trigger({ sender: this });
            this._cycleFrameCount = 0;
            this._animCycleCount++; //so that cycle number is avail early on
        };
        ShapeEngClass.prototype.calcAniPercent = function (forceMax) {
            var ad = this._drawParams.animationParams;
            //---- use milliseconds for all times here ----
            var aniDuration = 1000 * ad.animationDuration;
            var staggerDuration = 1000 * ad.maxStaggerTime;
            var maxPercent = (ad.isStaggeringEnabled) ? (aniDuration + staggerDuration) / aniDuration : 1;
            var now = vp.utils.now();
            var toPercent = maxPercent;
            var toPercentUneased = maxPercent;
            var elapsed = 0;
            if (ad.isAnimationEnabled && !forceMax) {
                elapsed = now - this._toStartTime;
                toPercent = Math.min(maxPercent, elapsed / aniDuration);
                toPercentUneased = toPercent;
                //---- apply easing ---- 
                if (ad.easeFunction) {
                    toPercent = this.easeInOut(toPercent, maxPercent);
                }
            }
            //vp.utils.debug("toPercentUneased=" + toPercentUneased);
            var toPercentOverride = this._drawParams.animPercentOverride;
            if (toPercentOverride !== undefined) {
                toPercentUneased = toPercentOverride * maxPercent;
                toPercent = toPercentUneased;
            }
            if ((toPercentUneased == maxPercent && this._isCycleActive) || (toPercentOverride !== undefined)) {
                ////---- cycle ended ----
                //this.onEndOfCycle(elapsed);
                //this._isDrawNeeded = true;      // we need one final draw
                this._isLastDrawOfCycle = true;
            }
            this._toPercentUnflipped = toPercentUneased;
            if (!this.isUsingPrimaryBuffers()) {
                //---- flip percent ----
                toPercent = maxPercent - toPercent;
                toPercentUneased = maxPercent - toPercentUneased;
            }
            this._toPercent = toPercent;
            this._toPercentUneased = toPercentUneased;
            this._maxPercent = maxPercent;
        };
        ShapeEngClass.prototype.easeInOut = function (t, maxPercent) {
            var ap = this._drawParams.animationParams;
            var easeFunc = this._easeFunction;
            var easeType = ap.easeType;
            //---- normalize t ----
            t /= maxPercent;
            var value = t;
            //---- divide into IN and OUT cases ----
            if ((t < .5) && (easeType != beachParty.EaseType.out)) {
                var coreValue = easeFunc(t * 2);
                value = coreValue * .5;
            }
            if ((t >= .5) && (easeType != beachParty.EaseType.in)) {
                var coreValue = easeFunc(2 * (1 - t));
                value = .5 + (1 - coreValue) * .5;
            }
            //---- unnormalize value ----
            value *= maxPercent;
            return value;
        };
        ShapeEngClass.prototype.requestAnimationFrame = function (callback) {
            var timer = window.requestAnimationFrame(callback);
            return timer;
        };
        ShapeEngClass.prototype.setTimerForNextFrame = function () {
            var _this = this;
            if (!this._animTimer && !this._isShuttingDown) {
                this._animTimer = this.requestAnimationFrame(function (e) {
                    if (!_this._isShuttingDown) {
                        _this.moveFrame();
                        //---- don't start drawing frames until first chart build has occured ----
                        if (_this._shapes && _this._shapes.length) {
                            _this.drawFrame();
                        }
                        else if (_this._buildNeeded) {
                            _this.startAnimationIfNeeded();
                        }
                    }
                });
            }
        };
        ShapeEngClass.prototype.updateTransformerFromDrawParmas = function () {
            this._transformer.cameraParams(this._drawParams.cameraParams);
        };
        ShapeEngClass.prototype.captureLastWorld = function () {
            var matWorld = this._transformer.world();
            //---- matWorld can be an array or a Float32Array, depending on if insight has been loaded ----
            if (vp.utils.isArray(matWorld)) {
                this._lastWorld = vp.utils.copyArray(matWorld);
            }
            else {
                this._lastWorld = new Float32Array(matWorld);
            }
            //vp.utils.debug("captureLastWorld: matWorld=" + matWorld.toString() + ", this._lastWorld=" + this._lastWorld.toString() +
            //    ", this._lastWorld[6]=" + this._lastWorld[6]);
        };
        ShapeEngClass.prototype.drawFrame = function () {
            var drawFrameStart = vp.utils.now();
            var dfStart = vp.utils.now();
            var dp = this._drawParams;
            this.updateStats();
            var toPercentOverride = dp.animPercentOverride;
            if (dp.useContinuousDrawing || this._isCycleActive || this._isUiOpActive || this._isSingleDrawNeeded || toPercentOverride !== undefined) {
                if (this._isSingleDrawNeeded) {
                    //---- increment this to keep track info correct ----
                    this._nextBuildId++;
                }
                this.drawFrameCore();
                if (this._isSingleDrawNeeded) {
                    this._isSingleDrawNeeded = false;
                    this.captureLastProperties();
                }
            }
            var start = vp.utils.now();
            //this.onDataChanged("drawFrame");
            this.onDrawFrame.trigger({ sender: this });
            this.addToDrawPerf("onFrame", start);
            this.addToDrawPerf("total", dfStart);
            if (this._isLastDrawOfCycle) {
                this._isLastDrawOfCycle = false;
                this.onEndOfCycle(vp.utils.now() - this._toStartTime);
            }
            //---- always set this, so we can keep accurate stats ----
            this.setTimerForNextFrame();
            var drawFrameElapsed = vp.utils.now() - drawFrameStart;
            this._drawPerf.drawFrameElapsed = drawFrameElapsed;
        };
        ShapeEngClass.prototype.captureLastProperties = function () {
            var dp = this._drawParams;
            this._isSmoothLast = dp.useContinuousColor;
            this._isChannelLast = dp.useColorChannels;
            this._opacityLast = dp.shapeOpacity;
            this._sizeFactorLast = dp.sizeFactor;
            this.captureLastWorld();
        };
        ShapeEngClass.prototype.redrawLastFrame = function () {
            this.updateTransformerFromDrawParmas();
            ////---- we change sizeFactor without animation, so user can use gauge to control it with immediate feedback ----
            this._isSingleDrawNeeded = true;
        };
        ShapeEngClass.prototype.markBuildNeeded = function (reason) {
            if (!this._buildNeeded) {
                this._buildNeeded = true;
            }
        };
        ShapeEngClass.prototype.onEndOfCycle = function (duration) {
            var dp = this._drawParams;
            this._needTextureSwap = false;
            this._isCycleActive = false;
            this._lastCycleFrameRate = Math.floor(this._cycleFrameCount * 1000 / duration);
            this._lastCycleFrameCount = this._cycleFrameCount;
            this.captureLastProperties();
            vp.utils.debug("onEndOfCycle: cycleFrameCount=" + this._cycleFrameCount +
                ", continuousDrawing=" + dp.useContinuousDrawing);
            beachParty.hitTestRect.markCacheBuildNeeded(this._transformer, this._boundingBoxMgr);
            var ss = new beachParty.ShapeStats();
            ss.shapeCount = this._shapeCount;
            ss.drawPrimitive = this._drawParams.drawPrimitive;
            ss.isInstancing = (this._glInst != null);
            ss.maxGlBufferLength = dp.maxGlBufferLength;
            ss.bufferMemUsage = this._bufferMgr.getArrayMemoryUsage();
            //ss.isFirstFilterStage = this._isFirstFilteredStage;
            //ss.maxScatterSizeInPixels = this._drawParams.defaultShapeSize;
            ss.totalVertexCount = this.getTotalVertexCount();
            ss.lastCycleFrameCount = this._lastCycleFrameCount;
            ss.lastCycleFrameRate = this._lastCycleFrameRate;
            ss.cycleNum = this._animCycleCount;
            ss.drawBatchCount = this._drawInfos.length;
            ss.glBufferTime = this._buildPerf.glBufferFill;
            ss.glDrawTime = this._drawPerf.drawFrameElapsed;
            this.onCycleEnd.trigger(ss);
        };
        ShapeEngClass.prototype.startNewFrame = function () {
            //var windowMgr = this._opts._windowMgr;
            var gl = this._gl;
            var start = vp.utils.now();
            var startGlFill = vp.utils.now();
            var buildId = this._nextBuildId - 1;
            //addTrace("drawFrame", this._currentChart, TraceEventType.start, "f" + buildId + "-" + this._frameCount);
            //vp.utils.debug("drawFrameCore: frameCount=" + this._frameCount);
            //---- apply various params that may have changed ----
            var dp = this._drawParams;
            beachParty.glUtils.configDevice(gl, dp.canvasWidth, dp.canvasHeight, this._clearColor, this._isBlendingEnabled, this._isCullingEnabled);
            start = this.addToDrawPerf("configDevice", start);
            //---- clear buffers ----
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
            return start;
        };
        ShapeEngClass.prototype.drawFrameCore = function () {
            var start = this.startNewFrame();
            start = this.addToDrawPerf("clear", start);
            this.applyUniformsToShaders();
            var startDraw = vp.utils.now();
            start = this.addToDrawPerf("applyUniforms", start);
            //if (!this._usingPointCubes)
            {
                //---- set triangleIndex ----
                this._uniforms.triangleIndex.setValue(0);
            }
            //performance.mark("startDrawBuffers");
            this.drawAllBuffers();
            //performance.mark("endDrawBuffers");
            //performance.measure("drawBuffersElapsed", "startDrawBuffers", "endDrawBuffers");
            this._drawFrameCount++;
            start = this.addToDrawPerf("drawBuffers", start);
            if (!this._isCycleActive) {
                if (this._transformer._transformChanged) {
                    beachParty.hitTestRect.markCacheBuildNeeded(this._transformer, this._boundingBoxMgr);
                    this._transformer._transformChanged = false;
                }
            }
            //this.onDataChanged("drawFrameCore");
            //addTrace("drawFrame", this._currentChart, TraceEventType.end, "f" + buildId + "-" + this._frameCount);
            this._drawPerf.drawBuffers = vp.utils.now() - startDraw;
        };
        ShapeEngClass.prototype.drawAllBuffers = function () {
            this.drawAllShapes();
            //---- known Chrome/Firefox bug workaround: mixing instanced and non-instanced drawing on same ctx ----
            //---- causes a drawing error here; so, we turn off 3D gridlines for these guys ----
            if (!this._glInst || vp.utils.isIE) {
            }
        };
        ShapeEngClass.prototype.drawAllShapes = function () {
            var gl = this._gl;
            var diCount = this._drawInfos.length;
            //---- draw shapes ----
            gl.useProgram(this._shapesProgram);
            var isWireframe = this._drawParams.useWireFrameDraw;
            var glInst = this._glInst;
            var geomType = null;
            if (this._drawParams.drawPrimitive == beachParty.DrawPrimitive.point) {
                geomType = gl.POINTS;
            }
            else if (isWireframe || this._drawParams.drawPrimitive == beachParty.DrawPrimitive.lineStrip) {
                geomType = gl.LINE_STRIP;
            }
            else if (this._drawParams.drawPrimitive == beachParty.DrawPrimitive.linePairs) {
                geomType = gl.LINES;
            }
            else {
                geomType = gl.TRIANGLES;
            }
            var verticesPerShape = this.getNumVerticesPerShape();
            for (var i = 0; i < diCount; i++) {
                var di = this._drawInfos[i];
                if (i == diCount - 1) {
                    this.doHoverDrawPrep();
                }
                if (di.instOffset >= 0) {
                    this._bufferMgr.bindBufferForDrawing(i);
                    if (glInst) {
                        glInst.drawArraysInstancedANGLE(geomType, 0, verticesPerShape, di.instCount);
                    }
                    else {
                        gl.drawArrays(geomType, 0, di.instCount * verticesPerShape);
                    }
                    var error = gl.getError();
                    if (error) {
                    }
                }
            }
        };
        ShapeEngClass.prototype.getGlContext = function () {
            return this._gl;
        };
        ShapeEngClass.prototype.getHoverIndex = function () {
            var hvi = -1;
            //---- draw hover shape on top ----
            var hp = this._drawParams.hoverParams;
            if (hp.hoverEffect != beachParty.HoverEffect.none) {
                var drawOnTop = false;
                var hpk = this._drawParams.hoverPrimaryKey;
                if (hpk !== null) {
                    hvi = this._pkToDrawIndex[hpk]; //  this.getVectorIndexByKey(hpk);
                }
            }
            return hvi;
        };
        ShapeEngClass.prototype.doHoverDrawPrep = function () {
            //---- update hoverIndex in drawInfos[] ----
            var hvi = this.getHoverIndex();
            if (hvi > -1) {
                //---- hover stuff ----
                var hp = this._drawParams.hoverParams;
                var hoverColor = hp.hoverColor;
                //var drawHover = false;
                if (!hoverColor || hoverColor == "none" || hp.hoverEffect == beachParty.HoverEffect.sameColor) {
                    hvi = -1;
                }
                else {
                    var cr3 = vp.color.getColorFromName(hoverColor);
                    var hRed = cr3[0] / 255;
                    var hGreen = cr3[1] / 255;
                    var hBlue = cr3[2] / 255;
                    this._uniforms.hoverColor.setValue(hRed, hGreen, hBlue);
                }
            }
            this._uniforms.hoverVectorIndex.setValue(hvi);
            //---- apply "hvi" to last drawInfos[] ----
            var diCount = this._drawInfos.length;
            var diLast = this._drawInfos[diCount - 1];
            diLast.instOffset = hvi;
            this._bufferMgr.bindBuffersToArrayData([diCount - 1]);
        };
        ShapeEngClass.prototype.applyUniformsToShaders = function () {
            beachParty.glUniformClass.uniformSetCount = 0;
            //---- local variables, for easy access ----
            var opts = this._drawParams;
            var dp = this._drawParams;
            var usingPrimary = this.isUsingPrimaryBuffers();
            //var drawPrim = this._drawPrimitive;
            //var changed = this._uniformsChanged;
            //vp.utils.debug("applyUniformsToShaders: usingPrimary=" + usingPrimary);
            //if (this._usingPointCubes)
            //{
            //    //---- for vertex shader ----
            //    this._uniforms.szCanvas.setValue(this._canvasWidth, this._canvasHeight);
            //    //---- for fragment shader ----
            //    this._uniforms.canvasSize.setValue(this._canvasWidth, this._canvasHeight);
            //    this._uniforms.ndcZ.setValue(this._transformer.getNdcZ());
            //    this._uniforms.cameraPos.setValue(this._transformer.getCameraPosAsArray());
            //    this._uniforms.invMvpMatrix.setValue(this._transformer.getInvMvpMatrix());
            //    this._uniforms.invWorldMatrix.setValue(this._transformer.getInvWorldpMatrix());
            //}
            if (true) {
                //---- toPercent ----
                this._uniforms.toPercent.setValue(this._toPercent);
                this._uniforms.toPercentUneased.setValue(this._toPercentUneased);
            }
            if (true) {
                //---- toPercentTheta ----
                var toPercentTheta = this._toPercent;
                var isPrevLine = (this._lastDrawParams && this._lastDrawParams.areShapesLines);
                var isCurrLine = (this._drawParams.areShapesLines);
                if (isPrevLine) {
                    if (!isCurrLine) {
                        //---- LINE to NON-LINE ----
                        toPercentTheta = (usingPrimary) ? 0 : 1;
                    }
                }
                else {
                    if (isCurrLine) {
                        //---- NON-LINE to LINE ----
                        toPercentTheta = (usingPrimary) ? 1 : 0;
                    }
                }
                this._uniforms.toPercentTheta.setValue(toPercentTheta);
            }
            if (true) {
                //---- color palette ----
                this._uniforms.colorPalette.setValue(this._colorFloats);
                this._uniforms.colorPalette2.setValue(this._colorFloats2);
                this._uniforms.maxColors.setValue(this._maxColors);
                this._uniforms.maxColors2.setValue(this._maxColors2);
            }
            if (true) {
                //---- texture stuff ----
                //---- normalize toFrag ----
                var toFrag = this._toPercent / this._maxPercent;
                var tc1 = this._textureCount1;
                var tc2 = this._textureCount2;
                var isTextureEnabled = this._drawParams.useTextures;
                var ut1 = (this._texture1 != null && isTextureEnabled) ? 1 : 0;
                var ut2 = (this._texture2 != null && isTextureEnabled) ? 1 : 0;
                //---- these do NOT need to be swapped ----
                this._uniforms.toPercentFrag.setValue(toFrag);
                //vp.utils.debug("toFrag=" + toFrag);
                this._uniforms.usingTexture1.setValue(ut1);
                this._uniforms.usingTexture2.setValue(ut2);
                this._uniforms.textureCount1.setValue(tc1);
                this._uniforms.textureCount2.setValue(tc2);
            }
            if (true) {
                var opacity = dp.shapeOpacity;
                var opacityLast = this._opacityLast;
                if (usingPrimary) {
                    var temp = opacity;
                    opacity = opacityLast;
                    opacityLast = temp;
                }
                this._uniforms.globalOpacity.setValue(opacity);
                this._uniforms.globalOpacity2.setValue(opacityLast);
            }
            if (true) {
                //var cm = this._opts.colorMapping();
                var isSmooth = dp.useContinuousColor; //  opts.colorMapping().isContinuous;
                var isSmoothLast = this._isSmoothLast;
                var isChannel = dp.useColorChannels; //  (cm.channelMapping != null);
                var isChannelLast = this._isChannelLast;
                if (usingPrimary) {
                    var temp2 = isSmooth;
                    isSmooth = isSmoothLast;
                    isSmoothLast = temp2;
                    var temp2 = isChannel;
                    isChannel = isChannelLast;
                    isChannelLast = temp2;
                }
                this._uniforms.isColorDiscrete.setValue(!isSmooth);
                this._uniforms.isColorDiscrete2.setValue(!isSmoothLast);
                this._uniforms.isColorDirect.setValue(isChannel);
                this._uniforms.isColorDirect2.setValue(isChannelLast);
            }
            if (true) {
                var sizeFactor = dp.sizeFactor; //  opts.userSizeFactor();
                var sizeFactorLast = this._sizeFactorLast;
                if (usingPrimary) {
                    var temp3 = sizeFactor;
                    sizeFactor = sizeFactorLast;
                    sizeFactorLast = temp3;
                }
                var ptFactor = 1;
                //---- for POINT drawing, we need to compute the size in PIXELS (vs. WORLD space) ----
                if (this._drawParams.drawPrimitive == beachParty.DrawPrimitive.point) {
                    ptFactor = this._transformer.worldSizeToScreen(ptFactor);
                }
                this._uniforms.sizeFactor.setValue(ptFactor * sizeFactor);
                this._uniforms.sizeFactor2.setValue(ptFactor * sizeFactorLast);
            }
            //if (this._cycleIsActive)
            //{
            //    vp.utils.debug("opacity=" + opacity + ", opacityLast=" + opacityLast + ", _toPercentUneased=" + this._toPercentUneased);
            //}
            //if (!this._usingPointCubes)       // changed.lighting)
            {
                var lightParams = opts.lightParams; //  <Lighting>opts.lightingParams();
                //---- ambientFactor ----
                this._uniforms.ambientFactor.setValue(lightParams.ambientLight.lightFactor);
                //---- lights ----
                this._uniforms.lightFactor1.setValue(lightParams.light1.lightFactor);
                //this._uniforms.lightFactor2.setValue(lightParams.light2.lightFactor);
                this._uniforms.lightingEnabled.setValue(lightParams.isLightingEnabled);
            }
            if (true) {
                //---- projection ----
                var matProjection = this._transformer.getProjection(); //.toFloat32Array();
                this._uniforms.projectionMatrix.setValue(matProjection);
                //---- viewMatrix ----
                var matView = this._transformer.getView();
                //this._uniforms.viewMatrix.setValue(matView);        //.toFloat32Array());
                //---- modelViewMatrix ----
                var currWorld = this._transformer.world();
                var lastWorld = this._lastWorld;
                if (lastWorld != null) {
                    //---- LERP the world matrix ----
                    var truePercent = this._toPercent / this._maxPercent;
                    if (this.isUsingPrimaryBuffers()) {
                        var lerpWorld = this.lerpMatrix(truePercent, lastWorld, currWorld);
                    }
                    else {
                        var lerpWorld = this.lerpMatrix(truePercent, currWorld, lastWorld);
                    }
                }
                else {
                    var lerpWorld = currWorld;
                }
                //---- save for use by gridLine drawing ----
                this._lerpWorld = lerpWorld;
                var modelView = new Float32Array(16);
                mat4.multiply(modelView, matView, lerpWorld);
                this._uniforms.modelViewMatrix.setValue(modelView);
                var dpv = (this._drawParams.drawPrimitive == beachParty.DrawPrimitive.point || this._drawParams.drawPrimitive == beachParty.DrawPrimitive.linePairs) ? 1.0 : 0.0;
                this._uniforms.drawingPoints.setValue(dpv);
                var normalMatrix = null;
                normalMatrix = mat3.create();
                //---- this seems to work better for lighting ----
                mat3.fromMat4(normalMatrix, modelView);
                mat3.invert(normalMatrix, normalMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                this._uniforms.normalMatrix.setValue(normalMatrix);
            }
            //---- set this to -1 for the normal drawing ----
            this._uniforms.hoverVectorIndex.setValue(-1);
            //changed.reset();
        };
        /** "vectorIndex" is the index into the current set of sorted shapes.  It is NOT the unsorted natural record index. */
        ShapeEngClass.prototype.getShapeBoundingBox = function (primaryKey) {
            var bb = this._boundingBoxMgr.getBoxByKey(primaryKey);
            return bb;
        };
        ShapeEngClass.prototype.lerpMatrix = function (percent, fromMat, toMat) {
            var result = new Float32Array(fromMat.length);
            for (var i = 0; i < fromMat.length; i++) {
                var value = vp.data.lerp(percent, fromMat[i], toMat[i]);
                result[i] = value;
            }
            return result;
        };
        return ShapeEngClass;
    }());
    beachParty.ShapeEngClass = ShapeEngClass;
    function round(value) {
        return Math.round(value);
    }
    var BoundingBox = (function () {
        function BoundingBox() {
        }
        return BoundingBox;
    }());
    beachParty.BoundingBox = BoundingBox;
    /** world unit bounds. */
    var Bounds = (function () {
        function Bounds() {
        }
        return Bounds;
    }());
    beachParty.Bounds = Bounds;
    var DrawInfo = (function () {
        function DrawInfo(offset, count) {
            this.instOffset = offset;
            this.instCount = count;
        }
        return DrawInfo;
    }());
    beachParty.DrawInfo = DrawInfo;
    //---- these are the arrays we fill with the vertex data ----
    //---- these arrays are later used to populate the GL buffers for the GPU ----
    var NamedBuffers = (function () {
        function NamedBuffers() {
        }
        return NamedBuffers;
    }());
    beachParty.NamedBuffers = NamedBuffers;
})(beachParty || (beachParty = {}));
//---- NOTE: this file should be directly in the project folder (NOT under "scripts") ----
//---- NOTE #2: this file does NOT need to be referenced by each *.ts file; it will be implicitly referenced by VS/TSC.
/// <reference path="scripts/vuePlotCore.d.ts" /> 
/// <reference path="scripts/thirdParty/gl-matrix.d.ts" /> 
//---- this list of TS files is needed to control the order the files in which the files and processed and loaded ----
/// <reference path="classes/shapeInterfaces.ts" /> 
/// <reference path="classes/dataChanger.ts" /> 
/// <reference path="classes/shapeEng.ts" />
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    boundingBoxMgr.ts - manages the set of bounding boxes as a set of arrays, for minimizing the memory usage.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    /// An array of BoundingBox class objects requires 156 bytes per object in IE11.  By breaking up data into 
    /// Float32Arrays, we can reduce object size to 44 bytes per object.
    /// Note: this class holds data for EACH RECORD in the current dataset (independent of the filter setting).
    var boundingBoxMgrClass = (function () {
        function boundingBoxMgrClass() {
            this._nextIndex = 0;
            //---- arrays are allocated in adjustSizeAndClearList below. ----
        }
        /**
         *  Allocate Float32Arrays for our properties.
         */
        boundingBoxMgrClass.prototype.adjustSizeAndClearList = function (count) {
            //---- clear boxes for each animation cycle so that we don't end up with entries for FILTERED-OUT shapes ----
            if (true) {
                this._mins = new Float32Array(3 * count);
                this._maxes = new Float32Array(3 * count);
                this._thetas = new Float32Array(count);
                this._distances = new Float32Array(count);
                this._primaryKeys = [];
            }
            this._nextIndex = 0;
        };
        boundingBoxMgrClass.prototype.addBox = function (xMin, yMin, zMin, xMax, yMax, zMax, theta, primaryKey, dist) {
            var index = this._nextIndex++;
            var index3 = index * 3;
            this._mins[index3 + 0] = xMin;
            this._mins[index3 + 1] = yMin;
            this._mins[index3 + 2] = zMin;
            this._maxes[index3 + 0] = xMax;
            this._maxes[index3 + 1] = yMax;
            this._maxes[index3 + 2] = zMax;
            this._thetas[index] = theta;
            this._distances[index] = dist;
            this._primaryKeys[index] = primaryKey;
        };
        boundingBoxMgrClass.prototype.getBoxByKey = function (primaryKey) {
            var index = this._primaryKeys.indexOf(primaryKey);
            var box = null;
            if (index > -1) {
                box = new beachParty.BoundingBox();
                var index3 = index * 3;
                box.xMin = this._mins[index3 + 0];
                box.yMin = this._mins[index3 + 1];
                box.zMin = this._mins[index3 + 2];
                box.xMax = this._maxes[index3 + 0];
                box.yMax = this._maxes[index3 + 1];
                box.zMax = this._maxes[index3 + 2];
                box.theta = this._thetas[index];
                box.dist = this._distances[index];
                box.primaryKey = this._primaryKeys[index];
            }
            return box;
        };
        /** warning - this is a boundBox index only, not the vectorIndex associated with all shapes in draw buffers. */
        boundingBoxMgrClass.prototype.getBoxByIndex = function (boxIndex) {
            var box = new beachParty.BoundingBox();
            var index3 = boxIndex * 3;
            box.xMin = this._mins[index3 + 0];
            box.yMin = this._mins[index3 + 1];
            box.zMin = this._mins[index3 + 2];
            box.xMax = this._maxes[index3 + 0];
            box.yMax = this._maxes[index3 + 1];
            box.zMax = this._maxes[index3 + 2];
            box.theta = this._thetas[boxIndex];
            box.dist = this._distances[boxIndex];
            box.primaryKey = this._primaryKeys[boxIndex];
            return box;
        };
        boundingBoxMgrClass.prototype.getCount = function () {
            var len = (this._primaryKeys) ? this._primaryKeys.length : 0;
            return len;
        };
        return boundingBoxMgrClass;
    }());
    beachParty.boundingBoxMgrClass = boundingBoxMgrClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    bpEvent.ts - lightweight explict event class.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    //---- new experimental class for strongly typed but lightweight events ----
    var bpEvent = (function () {
        function bpEvent() {
            this._hookers = [];
        }
        bpEvent.prototype.attach = function (callerId, callback) {
            var hooker = new hookerClass(callerId, callback);
            this._hookers.push(hooker);
        };
        bpEvent.prototype.detach = function (callerId) {
            var hookers = this._hookers;
            for (var i = 0; i < hookers.length; i++) {
                if (hookers[i]._callId = callerId) {
                    hookers.removeAt(i);
                    break;
                }
            }
        };
        /**
         *  calls all of the callbacks attached to this event.
         * @param e: a map that includes "sender" (the class instance that originated the event) and other parameters.
         */
        bpEvent.prototype.trigger = function (e) {
            var hookers = this._hookers;
            for (var i = 0; i < hookers.length; i++) {
                var hooker = hookers[i];
                var callback = hooker._callback;
                callback(e);
            }
        };
        return bpEvent;
    }());
    beachParty.bpEvent = bpEvent;
    var hookerClass = (function () {
        function hookerClass(callerId, callback) {
            this._callId = callerId;
            this._callback = callback;
        }
        return hookerClass;
    }());
    beachParty.hookerClass = hookerClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    bufferMgr - manages the attributes and gl buffers for a chart.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    /// Note: the actual arrays and buffers used here are held (owned) by each attribute. 
    ///
    /// This class manages the "from" and "to" buffers for our set of 15 attributes. Various operations on the underlying data
    /// require this class to manipulate the current "from" buffer (recording records, converting from N to M vertices per record, etc.).
    var bufferMgrClass = (function (_super) {
        __extends(bufferMgrClass, _super);
        function bufferMgrClass(gl, glInst, baseGlVis) {
            _super.call(this);
            //---- buffers are the arrays attached to each glAttribute ----
            this._glAttributes = null;
            this._usingPrimaryBuffers = true;
            this._fromBuffersHaveData = false;
            this._arrayMemoryBytesInUse = 0;
            this._gl = gl;
            this._glInst = glInst;
            //this._dataMgr = dataMgr;
            this._shapeEng = baseGlVis;
        }
        bufferMgrClass.prototype.getArrayMemoryUsage = function () {
            return this._arrayMemoryBytesInUse;
        };
        bufferMgrClass.prototype.createGlAttributes = function (program, force) {
            if (force || !this._glAttributes) {
                var gl = this._gl;
                var glInst = this._glInst;
                var attrs = {};
                this._glAttributes = attrs;
                //---- 15 attributes, 27 floats per vertex ----
                //---- for each of these attributes, we have a "from" and "to" buffer ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "xyz", 3);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "xyz2", 3);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "size", 3);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "size2", 3);
                //---- color channel mapping ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "rgbBuff", 3, true, true);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "rgbBuff2", 3, true, true);
                //---- color palette mapping ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "colorIndex", 1, false, false);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "colorIndex2", 1, false, false);
                //---- image mapping ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "imageIndex", 1, true, false);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "imageIndex2", 1, true, false);
                //---- line rotation ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "theta", 1);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "theta2", 1);
                //---- for these, we only have a single buffer ----
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "vertexId", 1, true, false, false, true);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "staggerOffset", 1);
                beachParty.glUtils.addAttribute(attrs, gl, glInst, program, "vectorIndex", 1);
            }
        };
        bufferMgrClass.prototype.createAttributeArraysIfNeeded = function (forceNewArrays, forceVisualBreak) {
            if (forceNewArrays || (this._glAttributes && !this._glAttributes.xyz._array)) {
                this.createAttributeArrays(forceVisualBreak);
            }
        };
        /** "forceVisualBreak" should be set to true when a new dataFrame has been loaded, so that we do NOT visually connect the from/to plots.
        Also, the number of records may have changed, which would invalid the visuals anyway. */
        bufferMgrClass.prototype.createAttributeArrays = function (forceVisualBreak) {
            var vertexCount = this._shapeEng.getTotalVertexCount();
            var totalSpace = 0;
            //---- save the FROM vertex data so we can do correct animation (even though the drawingPrimitive is changing) ----
            if (!forceVisualBreak) {
                var tempBuffers = this.copyVertexDataToTemp();
            }
            if (vertexCount > 0) {
                var attrs = this._glAttributes;
                totalSpace = this.createAttributeArraysCore(attrs, vertexCount);
            }
            this._arrayMemoryBytesInUse = totalSpace;
            this._fromBuffersHaveData = false;
            if (tempBuffers) {
                //---- apply temp vertex data to FROM buffers ----
                this.copyTempToFromBuffers(tempBuffers);
                //---- don't reorder, since we built the fromBuffer with the correct order ----
                this._fromBuffersHaveData = false;
            }
            this._shapeEng.setLastVerticesPerRecord();
        };
        bufferMgrClass.prototype.createAttributeArraysCore = function (attrs, totalVertexCount, arrayMap) {
            var keys = vp.utils.keys(attrs);
            var totalSpace = 0;
            var recordCount = this._shapeEng.getShapeCount();
            //vp.utils.debug("--> createAttributeBuffers: recordCount=" + recordCount +
            //    ", totalVertexCount=" + totalVertexCount);
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                var attr = attrs[name];
                if (attr._attrLoc != -1) {
                    var myVertexCount = totalVertexCount;
                    if (name == "vertexId" && this._glInst) {
                        //---- only need one copy of the vertex ids - it will be shared with each instance ----
                        myVertexCount = this._shapeEng.getNumVerticesPerShape();
                    }
                    var numberCount = myVertexCount * attr._sizeInFloats;
                    var array = null;
                    if (attr._isByte) {
                        array = new Int8Array(numberCount);
                        var space = 1 * numberCount;
                    }
                    else {
                        array = new Float32Array(numberCount);
                        var space = 4 * numberCount;
                    }
                    if (arrayMap) {
                        var arrayName = name.substr(0, name.length - 4) + "Array"; // remove last 4 chars
                        arrayMap[arrayName] = array;
                    }
                    else {
                        attr.setArray(array);
                    }
                    //vp.utils.debug("createAttributeBuffers: name=" + name + ", space=" + space);
                    totalSpace += space;
                }
            }
            return totalSpace;
        };
        //dumpVertexBuffers(name: string, verticesPerRecord: number, buffers: NamedBuffers)
        //{
        //    vp.utils.debug("---> dump of: " + name);
        //    for (var i = 0; i < 5; i++)
        //    {
        //        var inx = i * 3 * verticesPerRecord;
        //        var x = buffers.xyzArray[inx + 0];
        //        var y = buffers.xyzArray[inx + 1];
        //        var z = buffers.xyzArray[inx + 2];
        //        vp.utils.debug("  x=" + x + ", y=" + y + ", z=" + z);
        //    }
        //}
        /** make a (single vertex per record) copy of the latest (from/to) vertex data.  */
        bufferMgrClass.prototype.copyVertexDataToTemp = function () {
            var fromVerticesPerRecord = this._shapeEng.getLastVerticesPerRecord();
            var tempBuffers = null;
            if (fromVerticesPerRecord !== null) {
                var usePrimBuff = (!this._usingPrimaryBuffers);
                vp.utils.debug("copyVertexDataToTemp: getting FROM data with usePrimBuff=" + usePrimBuff);
                var attributes = this.getAttributesForCycle(usePrimBuff);
                var fromBuffers = this.getNamedBuffers(attributes);
                if (fromBuffers && fromBuffers.xyzArray) {
                    var drawIndexes = this.buildRecordToDrawIndexes();
                    var recordCount = fromBuffers.xyzArray.length / (3 * fromVerticesPerRecord);
                    //var dataFrame = this._dataMgr.getDataFrame();
                    //var primaryKey = dataFrame.getNumericVector(primaryKeyName);
                    var toVerticesPerRecord = 1;
                    //---- create toBuffers ----
                    tempBuffers = new beachParty.NamedBuffers();
                    this.createAttributeArraysCore(attributes, 1 * recordCount, tempBuffers);
                    var primaryKeys = this._shapeEng.getPrimaryKeys();
                    this.copyVertexBuffers(fromBuffers, tempBuffers, primaryKeys, recordCount, fromVerticesPerRecord, toVerticesPerRecord, drawIndexes);
                }
            }
            return tempBuffers;
        };
        /** copy from temp (single vertex per record) to from buffers.  */
        bufferMgrClass.prototype.copyTempToFromBuffers = function (tempBuffers) {
            var fromVerticesPerRecord = 1;
            var toVerticesPerRecord = this._shapeEng.getNumVerticesInBuffer();
            var usePrimBuff = (!this._usingPrimaryBuffers);
            vp.utils.debug("copyTempToFromBuffers: getting FROM data with usePrimBuff=" + usePrimBuff);
            var attributes = this.getAttributesForCycle(usePrimBuff);
            var toBuffers = this.getNamedBuffers(attributes);
            var drawIndexes = this.buildRecordToDrawIndexes();
            var recordCount = toBuffers.xyzArray.length / (3 * toVerticesPerRecord);
            //var dataFrame = this._dataMgr.getDataFrame();
            //var primaryKey = dataFrame.getNumericVector(primaryKeyName);
            var primaryKeys = this._shapeEng.getPrimaryKeys();
            this.copyVertexBuffers(tempBuffers, toBuffers, primaryKeys, recordCount, fromVerticesPerRecord, toVerticesPerRecord, drawIndexes);
            this.setArraysFromNamedBuffers(attributes, toBuffers);
            //this.dumpVertexBuffers("toBuffers", toVerticesPerRecord, toBuffers);
        };
        /** This rearranges the record values in the "from" buffer to match the current sort order. */
        bufferMgrClass.prototype.reorderFromBuffer = function (fromAttrs, fb, recordCount, verticesPerRecord) {
            //---- the idea is to reorder the entries in fromBuff - to do this, we move entries from fromBuff ----
            //---- to toBuff, and then copy it back to fromBuff when completed.  ----
            var toAttrs = this.getAttributesForCycle(this._usingPrimaryBuffers);
            var tb = this.getNamedBuffers(toAttrs);
            //var isFromPrimary = (fromAttrs.xyzAttr == this._glAttributes.xyz);
            //if (isFromPrimary)
            //{
            //    vp.utils.debug("reorderFromBuffer: moving " + recordCount + " items from PRIMARY to SECONDARY");
            //}
            //else
            //{
            //    vp.utils.debug("reorderFromBuffer: moving " + recordCount + " items from SECONDARY to PRIMARY");
            //}
            var drawIndexes = this.buildRecordToDrawIndexes();
            var primaryKeys = this._shapeEng.getPrimaryKeys();
            this.copyVertexBuffers(fb, tb, primaryKeys, recordCount, verticesPerRecord, verticesPerRecord, drawIndexes);
            //---- now copy data back, in correct order, from TB to FB ----
            this.arrayCopy(tb.xyzArray, fb.xyzArray);
            this.arrayCopy(tb.sizeArray, fb.sizeArray);
            this.arrayCopy(tb.rgbArray, fb.rgbArray);
            this.arrayCopy(tb.colorArray, fb.colorArray);
            this.arrayCopy(tb.imageIndexArray, fb.imageIndexArray);
            this.arrayCopy(tb.staggerOffsetArray, fb.staggerOffsetArray);
            if (fb.thetaArray) {
                this.arrayCopy(tb.thetaArray, fb.thetaArray);
            }
            if (fb.vertexIdArray) {
                this.arrayCopy(tb.vertexIdArray, fb.vertexIdArray);
            }
            if (fb.vectorIndexArray) {
                this.arrayCopy(tb.vectorIndexArray, fb.vectorIndexArray);
            }
        };
        /** copies 1 multiple of vertex data from "fb" to verticesPerRecord multiples at "tb" */
        bufferMgrClass.prototype.copyVertexBuffers = function (fb, tb, primaryKeys, recordCount, fromVerticesPerRecord, toVerticesPerRecord, drawIndexes) {
            //vp.utils.debug("copyVertexBuffers: called");
            for (var ri = 0; ri < recordCount; ri++) {
                var vi = (drawIndexes) ? drawIndexes[ri] : ri;
                var ti = toVerticesPerRecord * vi; // to index
                var ti3 = 3 * ti; // to index for xyz and size
                var key = primaryKeys[ri]; // primaryKey.getRawData(ri) + "";
                var fromVi = this._shapeEng.getPkToDrawIndex(key);
                var fi = fromVerticesPerRecord * fromVi; // from index
                var fi3 = 3 * fi; // from index for xyz and size
                //if (vi < 4)
                //{
                //    vp.utils.debug("reorderFromBuffer: vi=" + vi + ", key=" + key + ", fromVi=" + fromVi);
                //}
                for (var j = 0; j < toVerticesPerRecord; j++) {
                    tb.xyzArray[ti3] = fb.xyzArray[fi3];
                    tb.xyzArray[ti3 + 1] = fb.xyzArray[fi3 + 1];
                    tb.xyzArray[ti3 + 2] = fb.xyzArray[fi3 + 2];
                    tb.sizeArray[ti3] = fb.sizeArray[fi3];
                    tb.sizeArray[ti3 + 1] = fb.sizeArray[fi3 + 1];
                    tb.sizeArray[ti3 + 2] = fb.sizeArray[fi3 + 2];
                    tb.rgbArray[ti3] = fb.rgbArray[fi3];
                    tb.rgbArray[ti3 + 1] = fb.rgbArray[fi3 + 1];
                    tb.rgbArray[ti3 + 2] = fb.rgbArray[fi3 + 2];
                    tb.colorArray[ti] = fb.colorArray[fi];
                    tb.imageIndexArray[ti] = fb.imageIndexArray[fi];
                    tb.staggerOffsetArray[ti] = fb.staggerOffsetArray[fi];
                    if (fb.thetaArray) {
                        tb.thetaArray[ti] = fb.thetaArray[fi];
                    }
                    if (fb.vertexIdArray) {
                        tb.vertexIdArray[ti] = fb.vertexIdArray[fi];
                    }
                    if (fb.vectorIndexArray) {
                        tb.vectorIndexArray[ti] = fb.vectorIndexArray[fi];
                    }
                    ti3 += 3;
                    ti++;
                }
            }
        };
        /** copy a Float32Array or other array type. */
        bufferMgrClass.prototype.arrayCopy = function (fb, tb) {
            for (var i = 0; i < fb.length; i++) {
                tb[i] = fb[i];
            }
        };
        bufferMgrClass.prototype.getAttributesForCycle = function (usingPrimaryBuffers) {
            var attr = {};
            attr.vertexIdAttr = this._glAttributes.vertexId;
            attr.staggerOffsetAttr = this._glAttributes.staggerOffset;
            attr.vectorIndexAttr = this._glAttributes.vectorIndex;
            if (usingPrimaryBuffers) {
                attr.xyzAttr = this._glAttributes.xyz;
                attr.sizeAttr = this._glAttributes.size;
                attr.rgbAttr = this._glAttributes.rgbBuff;
                attr.colorAttr = this._glAttributes.colorIndex;
                attr.imageIndexAttr = this._glAttributes.imageIndex;
                attr.thetaAttr = this._glAttributes.theta;
            }
            else {
                attr.xyzAttr = this._glAttributes.xyz2;
                attr.sizeAttr = this._glAttributes.size2;
                attr.rgbAttr = this._glAttributes.rgbBuff2;
                attr.colorAttr = this._glAttributes.colorIndex2;
                attr.imageIndexAttr = this._glAttributes.imageIndex2;
                attr.thetaAttr = this._glAttributes.theta2;
            }
            return attr;
        };
        bufferMgrClass.prototype.getNamedBuffers = function (attributes) {
            var buffers = new beachParty.NamedBuffers();
            buffers.xyzArray = attributes.xyzAttr._array;
            buffers.sizeArray = attributes.sizeAttr._array;
            buffers.rgbArray = attributes.rgbAttr._array;
            buffers.colorArray = attributes.colorAttr._array;
            buffers.imageIndexArray = attributes.imageIndexAttr._array;
            buffers.thetaArray = attributes.thetaAttr._array;
            buffers.staggerOffsetArray = attributes.staggerOffsetAttr._array;
            buffers.vertexIdArray = attributes.vertexIdAttr._array;
            buffers.vectorIndexArray = attributes.vectorIndexAttr._array;
            return buffers;
        };
        bufferMgrClass.prototype.setArraysFromNamedBuffers = function (attributes, buffers) {
            attributes.xyzAttr.setArray(buffers.xyzArray);
            attributes.sizeAttr.setArray(buffers.sizeArray);
            attributes.rgbAttr.setArray(buffers.rgbArray);
            attributes.colorAttr.setArray(buffers.colorArray);
            attributes.imageIndexAttr.setArray(buffers.imageIndexArray);
            attributes.thetaAttr.setArray(buffers.thetaArray);
            if (attributes.staggerOffsetAttr) {
                attributes.staggerOffsetAttr.setArray(buffers.staggerOffsetArray);
            }
            if (attributes.vertexIdAttr) {
                attributes.vertexIdAttr.setArray(buffers.vertexIdArray);
            }
            if (attributes.vectorIndexAttr) {
                attributes.vectorIndexAttr.setArray(buffers.vectorIndexArray);
            }
        };
        bufferMgrClass.prototype.flipIsUsingPrimaryBuffers = function () {
            this._usingPrimaryBuffers = (!this._usingPrimaryBuffers);
        };
        bufferMgrClass.prototype.glInst = function (value) {
            if (arguments.length == 0) {
                return this._glInst;
            }
            if (value != this._glInst) {
                this._glInst = value;
                this.onDataChanged("glInst");
                this.updateAttributesWithGlInst();
            }
        };
        bufferMgrClass.prototype.updateAttributesWithGlInst = function () {
            if (this._glAttributes) {
                var keys = vp.utils.keys(this._glAttributes);
                var glInst = this._glInst;
                for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];
                    var attr = this._glAttributes[name];
                    attr.glInst(glInst);
                }
            }
        };
        bufferMgrClass.prototype.allocateBuffers = function (drawInfos) {
            this._drawInfos = drawInfos;
            var keys = vp.utils.keys(this._glAttributes);
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                var attr = this._glAttributes[name];
                attr.allocateBuffersForAttr(drawInfos);
            }
        };
        bufferMgrClass.prototype.bindBuffersToArrayData = function (drawIndexes) {
            var keys = vp.utils.keys(this._glAttributes);
            var verticesInBuffer = this._shapeEng.getNumVerticesInBuffer();
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                var attr = this._glAttributes[name];
                attr.bindBuffersToArrayData(drawIndexes, verticesInBuffer);
            }
        };
        bufferMgrClass.prototype.bindBufferForDrawing = function (drawInfoIndex) {
            var keys = vp.utils.keys(this._glAttributes);
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                var attr = this._glAttributes[name];
                attr.bindBufferForDrawing(drawInfoIndex);
            }
        };
        bufferMgrClass.prototype.rebindBuffersAfterProgramSwitch = function () {
            //this._glAttributes.xyz.rebindBuffer();
        };
        bufferMgrClass.prototype.reorderFromBuffers = function (verticesPerRecord) {
            var result = null;
            if (this._fromBuffersHaveData) {
                var fromAttributes = this.getAttributesForCycle(!this._usingPrimaryBuffers);
                var fromBuffers = this.getNamedBuffers(fromAttributes);
                this.reorderFromBuffer(fromAttributes, fromBuffers, this._shapeEng.getShapeCount(), verticesPerRecord);
                result = { attributes: fromAttributes, buffers: fromBuffers };
            }
            return result;
        };
        bufferMgrClass.prototype.setFromBufferHasData = function (value) {
            this._fromBuffersHaveData = value;
        };
        bufferMgrClass.prototype.getUsingPrimaryBuffers = function () {
            return this._usingPrimaryBuffers;
        };
        bufferMgrClass.prototype.buildRecordToDrawIndexes = function () {
            var drawIndexes = null;
            var facetBins = this._shapeEng.getFacetBins();
            if (facetBins) {
                var nextDrawIndex = 0;
                drawIndexes = [];
                for (var b = 0; b < facetBins.length; b++) {
                    var bin = facetBins[b];
                    for (var i = 0; i < bin.rowIndexes.length; i++) {
                        var recordIndex = bin.rowIndexes[i];
                        drawIndexes[recordIndex] = nextDrawIndex++;
                    }
                }
            }
            return drawIndexes;
        };
        bufferMgrClass.prototype.fillBuffersForRecord = function (buffers, dr, facetOffset, verticesPerRecord, primaryKey, vectorIndex, facetRelativeIndex) {
            var innerLoopCount = 0;
            var staggerOffset = 0;
            //---- find next spot for vertices, based on vectorIndex (keep primary/secondary buffers in sync, in spite of sorting ----
            //---- that is, the GL buffers are always in natural (vectorIndex) order. ----
            var next1 = verticesPerRecord * vectorIndex;
            //if (vectorIndex < 4)
            //{
            //    var isFillingPrimary = (buffers.xyzArray == this._glAttributes.xyz._array);
            //    vp.utils.debug("fillBuffersForRecord: fillingPrimary=" + isFillingPrimary +
            //        ", vectorIndex=" + vectorIndex + ", primaryKey=" + primaryKey + ", next1=" + next1);
            //}
            var next3 = 3 * next1;
            if (vectorIndex == 0) {
                //---- this code is NECESSARY to enable JIT-ing (make a DOM API call) ----
                this._shapeEng.forceDomApiCall();
            }
            for (var j = 0; j < verticesPerRecord; j++) {
                buffers.xyzArray[next3] = dr.x;
                buffers.sizeArray[next3] = dr.width;
                buffers.rgbArray[next3] = dr.redChannel;
                next3++;
                buffers.xyzArray[next3] = dr.y;
                buffers.sizeArray[next3] = dr.height;
                buffers.rgbArray[next3] = dr.greenChannel;
                next3++;
                buffers.xyzArray[next3] = dr.z;
                buffers.sizeArray[next3] = dr.depth;
                buffers.rgbArray[next3] = dr.blueChannel;
                next3++;
                buffers.colorArray[next1] = dr.colorIndex;
                if (buffers.imageIndexArray) {
                    buffers.imageIndexArray[next1] = dr.imageIndex;
                }
                if (buffers.staggerOffsetArray) {
                    buffers.staggerOffsetArray[next1] = dr.staggerOffset;
                }
                if (buffers.thetaArray) {
                    buffers.thetaArray[next1] = dr.theta;
                }
                if (buffers.vectorIndexArray) {
                    buffers.vectorIndexArray[next1] = vectorIndex;
                }
                //---- special handling for vertexId ----
                if (buffers.vertexIdArray && !this._glInst) {
                    //---- if glInst is off, do the normal filling of vertexId's for each instance ----
                    buffers.vertexIdArray[next1] = j;
                }
                next1++;
                innerLoopCount++;
            }
            //---- special handling for vertexId ----
            if (buffers.vertexIdArray && this._glInst) {
                var shapeVertexCount = this._shapeEng.getNumVerticesPerShape();
                for (var j = 0; j < shapeVertexCount; j++) {
                    buffers.vertexIdArray[j] = j;
                }
            }
        };
        return bufferMgrClass;
    }(beachParty.dataChangerClass));
    beachParty.bufferMgrClass = bufferMgrClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    easeFuncs.ts - ease functions for animation.
//-------------------------------------------------------------------------------------
var utils;
(function (utils) {
    var EaseFunction = beachParty.EaseFunction;
    function quadratic(t) {
        return t * t;
    }
    function cubic(t) {
        return t * t * t;
    }
    function quartic(t) {
        return t * t * t * t;
    }
    function quintic(t) {
        return t * t * t * t * t;
    }
    function exponential(t) {
        var a = 3;
        return (Math.exp(a * t) - 1) / (Math.exp(a) - 1);
    }
    function sine(t) {
        return 1 - Math.sin(Math.PI * .5 * (1 - t));
    }
    function circle(t) {
        return 1 - Math.sqrt(1 - t * t);
    }
    function getEasingFunction(value) {
        var func = null;
        switch (value) {
            case EaseFunction.quadratic:
                func = quadratic;
                break;
            case EaseFunction.cubic:
                func = cubic;
                break;
            case EaseFunction.quartic:
                func = quartic;
                break;
            case EaseFunction.quintic:
                func = quintic;
                break;
            case EaseFunction.sine:
                func = sine;
                break;
            case EaseFunction.exponential:
                func = exponential;
                break;
            case EaseFunction.circle:
                func = circle;
                break;
        }
        return func;
    }
    utils.getEasingFunction = getEasingFunction;
})(utils || (utils = {}));
//----------------------------------------------------------------------
// shaders.ts - generated by buildShaderScript.bat 
//----------------------------------------------------------------------
var shaders = {};
function getTextFromFunc(func) {
    var str = func.toString().replace(/(^[^\n]*\n)|(\n\*\/\})/g, "");
    str = str.replace(/\\r\\n/g, "\r\n");
    str = str.substr(8); // remove junk at start
    str = str.substr(0, str.length - 4); // remove junk at end
    return str;
}
shaders.cubevertexshader = getTextFromFunc(function () {
    /*
    //-------------------------------------------------------------------------------------
    //  Copyright (c) 2015 - Microsoft Corporation.
    //   cubeVertexShader.c - an GLSL vertex shader for drawing non-POINT primitives in BeachParty.
    //-------------------------------------------------------------------------------------
    
    /// NOTE: "light direction" here should be specified as the light position, pointing towards the origin.
    const vec3 crLight = vec3(1.0, 1.0, 1.0);
    const vec3 dirLight = vec3(0, 0, 1);			// z=+1 point to negative z, where shapes are (camera is at (0, 0, 7))
    
    //const vec3 crLight2 = vec3(1.0, 1.0, 1.0);
    //const vec3 dirLight2 = vec3(0, -1, 0);			// from above
    
    //---- constants: set just once ----
    uniform vec3 cubeVertices[24];
    uniform vec3 cubeNormals[24];
    uniform vec2 cubeTexCoords[24];
    uniform float cubeTriangles[36];
    uniform mat4 projectionMatrix;
    
    //---- constants: set on every draw ----
    
    //---- IOS is limited to 128 4xfloat's for their vertex shader, so we reduce color palette size ----
    //---- when compiling the shader.  Effectively, that means that IOS can only use 1 color for selection ----
    
    uniform vec3 colorPalette[@cpSize];		// we replace @cpSize just before we compile this file
    uniform vec3 colorPalette2[@cpSize];
    uniform float isColorDiscrete;
    uniform float isColorDiscrete2;
    uniform float isColorDirect;
    uniform float isColorDirect2;
    uniform float maxColors;
    uniform float maxColors2;
    
    uniform mat3 normalMatrix;
    uniform mat4 modelViewMatrix;
    uniform float lightFactor1;
    uniform float lightFactor2;
    uniform float toPercent;
    uniform float toPercentTheta;
    uniform float toPercentUneased;
    uniform float ambientFactor;
    uniform float triangleIndex;
    uniform float sizeFactor;			// adjust incoming sizes to default sizedFactor=1
    uniform float sizeFactor2;		    // size change can be INSTANT or ANIMATED
    uniform float lightingEnabled;
    uniform float globalOpacity;
    uniform float globalOpacity2;
    uniform float textureCount1;
    uniform float textureCount2;
    uniform float drawingPoints;
    uniform float hoverVectorIndex;
    uniform vec3 hoverColor;
    uniform float canvasWidth;
    uniform float canvasHeight;
    
    //---- attribute buffers ----
    attribute vec3 xyz;
    attribute vec3 xyz2;
    attribute vec3 size;
    attribute vec3 size2;
    attribute float theta;
    attribute float theta2;
    
    //---- attribute buffers that expand bytes into floats ----
    attribute float colorIndex;
    attribute float colorIndex2;
    attribute float imageIndex;
    attribute float imageIndex2;
    attribute float vertexId;
    
    //---- opacity mapping currently not supported ----
    //attribute float opacity;
    //attribute float opacity2;
    
    attribute vec3 rgbBuff;
    attribute vec3 rgbBuff2;
    
    attribute float vectorIndex;
    attribute float staggerOffset;
    
    //---- output to fragment shader ----
    varying vec3 v_color;
    varying float v_opacity;
    varying highp vec2 v_texCoord1;
    varying highp vec2 v_texCoord2;
    //varying vec2 vPosition;
    //varying vec2 vSize;
    
    void main()
    {
        //---- stagger movement & color changes ----
        float toPercentStag = clamp(toPercent + staggerOffset, 0.0, 1.0);
        float toPercenUneasedStag = clamp(toPercentUneased + staggerOffset, 0.0, 1.0);
    
        //---- DISCRETE/CONTINUOUS COLOR PALETTE ----
        vec3 color;
        vec3 color2;
    
        if (isColorDirect == 1.0)
        {
            color = rgbBuff;
        }
        else
        {
            int ci = int(clamp(colorIndex, 0.0, maxColors));
            color = (isColorDiscrete == 1.0) ? (colorPalette[ci]) : (mix(colorPalette[ci], colorPalette[ci + 1], colorIndex - float(ci)));
        }
    
        if (isColorDirect2 == 1.0)
        {
            color2 = rgbBuff2;
        }
        else
        {
            int ci2 = int(clamp(colorIndex2, 0.0, maxColors2));
            color2 = (isColorDiscrete2 == 1.0) ? (colorPalette2[ci2]) : (mix(colorPalette2[ci2], colorPalette2[ci2 + 1], colorIndex2 - float(ci2)));
        }
        vec3 colorMixed = mix(color, color2, toPercenUneasedStag);
    
        //---- set VERTEX ID ----
        int vi = int(cubeTriangles[int(vertexId + 3.0*triangleIndex)]);
    
        //---- INTERPOLATE between from/to values for SIZE and XYZ ----
        vec3 szMixed = mix(size*sizeFactor, size2*sizeFactor2, toPercentStag);
        vec3 posMixed = mix(xyz, xyz2, toPercentStag);
    
        ////---- info for RAY CASTING in fragment shader ----
        mat4 matPMV = projectionMatrix * modelViewMatrix;
    
        //vec4 posNorm = matPMV * vec4(posMixed, 1);
        //vec4 szNorm = matPMV * vec4(szMixed, 1);
        //vec4 szZero = matPMV * vec4(0, 0, 0, 1);
    
        //vSize.x = (szNorm.x - szZero.x) * (canvasWidth / 2.0) / szNorm.w ;
        //vSize.y = (szNorm.y - szZero.y) * (canvasHeight / 2.0) / szNorm.w;
    
        //vPosition.x = (posNorm.x + 1.0) * (canvasWidth / 2.0) / posNorm.w;
        //vPosition.y = (posNorm.y + 1.0) * (canvasHeight / 2.0) / posNorm.w;
        
        //---- rotate line by theta / theta2 ----
        float thetaMix = mix(theta, theta2, toPercentTheta);
        float sint = sin(thetaMix);
        float cost = cos(thetaMix);
        mat3 matRot = mat3(cost, sint, 0, -sint, cost, 0, 0, 0, 1);
        vec3 vertPos = (drawingPoints == 1.0) ? vec3(0, 0, 0) : (cubeVertices[vi] * szMixed);
        vec3 pos = matRot * vertPos + posMixed;
    
        //---- texture coordinates ----
        v_texCoord1 = cubeTexCoords[vi];
        v_texCoord2 = cubeTexCoords[vi];
        v_texCoord1.x = (v_texCoord1.x + imageIndex) / textureCount1;
        v_texCoord2.x = (v_texCoord2.x + imageIndex2) / textureCount2;
    
        //---- LIGHTING ----
        vec3 transNormal = normalize(normalMatrix *  cubeNormals[vi]);
        vec3 totalLight = vec3(ambientFactor, ambientFactor, ambientFactor);
    
        //---- LIGHT # 1 ----
        float dirWeighting = lightFactor1 * max(dot(transNormal, normalize(dirLight)), 0.0);
        totalLight += (dirWeighting * crLight);
    
        //---- LIGHT # 2 ----
        //float dirWeighting2 = lightFactor2 * max(dot(transNormal, normalize(dirLight2)), 0.0);
        //totalLight += (dirWeighting2 * crLight2);
    
        //---- important: do not distort original colors - ensure totalLight dies not exceed 1 ----
        totalLight = clamp(totalLight, vec3(0, 0, 0), vec3(1, 1, 1));
    
        //---- debug ----
        //totalLight = 0.0 + 0.000000001 * totalLight;
    
        v_color = (lightingEnabled == 1.0) ? colorMixed * totalLight : colorMixed;
    
        //---- debug ----
        //v_color = vec3(0, 0, 0) + 0.000000001 * v_color;
        
        //---- hover (total override of lit color) ----
        if (vectorIndex == hoverVectorIndex)
        {
            v_color = hoverColor;
        }
    
        //---- opacity ----
        //v_opacity = mix(opacity*globalOpacity, opacity2*globalOpacity2, toPercenUneasedStag);
        v_opacity = mix(globalOpacity, globalOpacity2, toPercenUneasedStag);
    
        //---- pass values to fragment shader ----
        //gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1);
        gl_Position = matPMV * vec4(pos, 1);
    
        //gl_Position = .0000000001*gl_Position + ((vertexId == 0.0) ? vec4(-.5, -.5, 0, 1) : ((vertexId == 1.0) ? vec4(.5, -.5, 0, 1) : vec4(.5, .5, 0, 1)));
    
        //---- this sets the size of POINT drawing primitives -----
        gl_PointSize = szMixed.x;
    
    }
    */ });
shaders.fragmentshader = getTextFromFunc(function () {
    /*
    //-------------------------------------------------------------------------------------
    //  Copyright (c) 2015 - Microsoft Corporation.
    //    fragmentShader.c - an GLSL fragment shader for drawing in BeachParty.
    //-------------------------------------------------------------------------------------
    
    precision mediump float;
    
    varying vec3 v_color;
    varying float v_opacity;
    
    varying highp vec2 v_texCoord1;
    varying highp vec2 v_texCoord2;
    
    uniform sampler2D uSampler1;		// set to "0"
    uniform sampler2D uSampler2;		// set to "1"
    
    uniform float usingTexture1;
    uniform float usingTexture2;
    uniform float toPercentFrag;
    
    void main()
    {
        //---- hide pixels of opacity=0, even if we are not blending ----
        if (v_opacity == 0.0)
        {
            discard;
        }
    
        //---- Note: vPosition is the center of the shape being drawn ----
    
        ////---- get distance from center of shape ----
        //float xDiff = gl_FragCoord.x - vPosition.x;
        //float yDiff = gl_FragCoord.y - vPosition.y;
    
        //if ((abs(xDiff) > vSize.x) || (abs(yDiff) > vSize.y))
        //{
        //	//discard;
        //}
    
        /// NOTE: the use of "texture2D(uSampler, xx)" when uSampler is not bound to a texture
        /// issues a warning to the Chrome console for every draw.  TODO: figure out a way to avoid this.
    
        //---- compute FROM color ----
        vec4 texColor1 = (usingTexture1 == 1.0) ? texture2D(uSampler1, v_texCoord1) : vec4(1, 1, 1, 1);
    
        //---- compute TO color ----
        vec4 texColor2 = (usingTexture2 == 1.0) ? texture2D(uSampler2, v_texCoord2) : vec4(1, 1, 1, 1);
    
        //---- mix them ----
        vec4 texColorMixed = mix(texColor1, texColor2, toPercentFrag);
    
        //---- debug - JUST USE TEXTRUE REGISTER #1 ----
        //texColorMixed = texture2D(uSampler1, v_texCoord2) + .00001 * texColorMixed;
    
        gl_FragColor = vec4(v_color, v_opacity) * texColorMixed;
    
        //---- debug ----
        //gl_FragColor = .00001*gl_FragColor + vec4(1, 0, 0, 1);
    }
    */ });
shaders.gridlinesvertexshader = getTextFromFunc(function () {
    /*
    //-------------------------------------------------------------------------------------
    //  Copyright (c) 2015 - Microsoft Corporation.
    //   gridLinesVertexShader.c - an GLSL vertex shader for drawing 3D GRLD LINES in BeachParty.
    //-------------------------------------------------------------------------------------
    
    attribute vec3 a_position;
    uniform mat4 u_mvMatrix;
    uniform mat4 u_pMatrix;
    
    void main()
    {
        gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.0);
    }
    
    
    */ });
shaders.gridlinesfragmentshader = getTextFromFunc(function () {
    /*
    //-------------------------------------------------------------------------------------
    //  Copyright (c) 2015 - Microsoft Corporation.
    //    gridLinesFragmentShader.c - an GLSL fragment shader for drawing 3D GRID LINES in BeachParty.
    //-------------------------------------------------------------------------------------
    
    precision mediump float;
    uniform vec4 u_color;
    
    void main()
    {
        gl_FragColor = u_color;
    
        //---- debug ----
        //gl_FragColor = .00001*gl_FragColor + vec4(1, 0, 0, 1);
    }
    
    */ });
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    shapeUtils.ts - misc. functions that support shapeEng.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    function error(msg) {
        throw msg;
    }
    beachParty.error = error;
    /**
     * This is a minimum webGL drawing routine, to test the "gl" context and help debug more complex code.
     * @param gl
     * @param width
     * @param height
     * @param buildShaders
     * @param buildGlBuffers
     */
    function testGlDraw(gl, width, height, buildShaders, buildGlBuffers) {
        if (buildShaders) {
            //---- init shaders/program ----
            var fragShaderStr = "precision mediump float; void main(void) { gl_FragColor = vec4(1, 0, 1, 1); }";
            var vertexShaderStr = "    void main(void) { gl_Position = vec4(0, 0, 0, 1);  gl_PointSize = 100.0; }";
            var vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertexShaderStr);
            gl.compileShader(vertexShader);
            var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragShader, fragShaderStr);
            gl.compileShader(fragShader);
            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragShader);
            gl.linkProgram(shaderProgram);
            gl.useProgram(shaderProgram);
        }
        if (buildGlBuffers) {
            //---- init buffers ----
            var vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            var vertices = [1];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            var numVertexItems = 1;
        }
        //---- draw scene ----
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, numVertexItems);
    }
    beachParty.testGlDraw = testGlDraw;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    cubeMesh.ts - defines cube vertices, normals, and triangles.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    beachParty.cubeMesh = {};
    /** Defines the geometry for a CUBE object (vertices, normals, and texture coordinates).  Note
        that triangles are defined with FRONT side trinagle points in CCW (counter-clockwise) order. */
    function buildCubeMesh() {
        beachParty.cubeMesh = {};
        beachParty.cubeMesh.vertices = [
            // Front face
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            // Back face
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            // Top face
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            // Bottom face
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            // Right face
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0
        ];
        //---- normalize the mesh ----
        beachParty.cubeMesh.vertices = beachParty.cubeMesh.vertices.map(function (d, i) { return d / 2; });
        beachParty.cubeMesh.vertexNormals = [
            // Front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Back face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // Top face
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // Left face
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
        ];
        beachParty.cubeMesh.uv = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];
        /** This allows us to draw with perspective camera but still only see the front of a cube (to emulate a 2D view). */
        beachParty.cubeMesh.uvFrontOnly = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            // Top
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            // Bottom
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            // Right
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            // Left
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0
        ];
        //---- these are the indicies (reference the vertexes/uv by index) ----
        beachParty.cubeMesh.triangles =
            [
                //---- FOR 24 VERTICES ----
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // left (CCW)
            ];
        //---- flip UV vertically (to correct for upside-down bitmap ----
        for (var i = 1; i < beachParty.cubeMesh.uv.length; i += 2) {
            var v = beachParty.cubeMesh.uv[i];
            beachParty.cubeMesh.uv[i] = (v == 0) ? 1 : 0;
        }
        //---- convert to float32Arrays for setting as shader uniform values ----
        beachParty.cubeMesh.vertices = new Float32Array(beachParty.cubeMesh.vertices);
        beachParty.cubeMesh.vertexNormals = new Float32Array(beachParty.cubeMesh.vertexNormals);
        beachParty.cubeMesh.uv = new Float32Array(beachParty.cubeMesh.uv);
        beachParty.cubeMesh.triangles = new Float32Array(beachParty.cubeMesh.triangles);
    }
    beachParty.buildCubeMesh = buildCubeMesh;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    glAttribute.ts - small class to manage a webGL attribute.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    /// Need a description of how arrays and buffers are allocated for this class...
    var glAttributeClass = (function () {
        function glAttributeClass(gl, glInst, program, nameInShader, sizeInFloats, isByte, normalizeOnGpu, isVertexCommon, isSingleBuffer) {
            if (isVertexCommon === void 0) { isVertexCommon = true; }
            this._gl = gl;
            this._glInst = glInst;
            this._program = program;
            this._sizeInFloats = sizeInFloats;
            this._nameInShader = nameInShader;
            this._isByte = isByte;
            this._normalizeOnGpu = normalizeOnGpu;
            this._isVertexCommon = isVertexCommon;
            this._array = null;
            this._isSingleBuffer = isSingleBuffer;
            var attrLoc = gl.getAttribLocation(program, nameInShader);
            this._attrLoc = attrLoc;
            this._glBuffers = [];
            if (attrLoc == -1) {
                //----for debugging/development purposes, ignore this error ----
                if (nameInShader != "size2" && nameInShader != "theta" && nameInShader != "theta2") {
                }
            }
            else {
                if (isSingleBuffer) {
                    var glBuffer = gl.createBuffer();
                    this._glBuffers.push(glBuffer);
                }
            }
        }
        glAttributeClass.prototype.glInst = function (value) {
            if (arguments.length == 0) {
                return this._glInst;
            }
            this._glInst = value;
            //this.onDataChanged("glInst");
        };
        glAttributeClass.prototype.allocateBuffersForAttr = function (drawInfos) {
            var gl = this._gl;
            this._drawInfos = drawInfos;
            if (!this._isSingleBuffer) {
                if (this._glBuffers.length != drawInfos.length) {
                    //---- deallocate previous buffers ----
                    for (var i = 0; i < this._glBuffers.length; i++) {
                        var oldBuff = this._glBuffers[i];
                        gl.deleteBuffer(oldBuff);
                    }
                    //---- allocate NEW buffers ----
                    this._glBuffers = [];
                    for (var i = 0; i < drawInfos.length; i++) {
                        var glBuffer = gl.createBuffer();
                        this._glBuffers.push(glBuffer);
                    }
                }
            }
        };
        glAttributeClass.prototype.unbindBuffer = function (gl) {
            //---- looks like we don't need to do this on any platform ----
            //if (!vp.utils.isSafari)
            //{
            //    gl.bindBuffer(gl.ARRAY_BUFFER, null);
            //}
        };
        glAttributeClass.prototype.bindBuffersToArrayData = function (drawIndexes, verticesInBuffer) {
            var gl = this._gl;
            var drawInfos = this._drawInfos;
            if (this._isSingleBuffer) {
                var glBuffer = this._glBuffers[0];
                gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this._array, gl.STATIC_DRAW);
                this.unbindBuffer(gl);
            }
            else {
                //---- bind a buffer to the specified subset, so that we can draw this subset using instancing ----
                if (this._attrLoc !== undefined && this._attrLoc != -1 && this._array != undefined) {
                    //---- bind buffers to subArrays ----
                    var mySizeInFloats = this._sizeInFloats;
                    if (!(this._glInst && this._isVertexCommon)) {
                        mySizeInFloats *= verticesInBuffer;
                    }
                    for (var i = 0; i < drawIndexes.length; i++) {
                        var drawIndex = drawIndexes[i];
                        var drawInfo = drawInfos[drawIndex];
                        var glBuffer = this._glBuffers[drawIndex];
                        var start = drawInfo.instOffset;
                        var end = start + drawInfo.instCount; // - 1;
                        var subarrayView = this._array.subarray(start * mySizeInFloats, end * mySizeInFloats);
                        //vp.utils.debug("bindBuffers: attr=" + this._nameInShader + ", drawIndex=" + drawIndex +
                        //    ", offset=" + drawInfo.instOffset + ", length=" + subarrayView.length);
                        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, subarrayView, gl.STATIC_DRAW);
                        this.unbindBuffer(gl);
                    }
                }
            }
        };
        glAttributeClass.prototype.bindBufferForDrawing = function (drawInfoIndex) {
            if (this._isSingleBuffer) {
                drawInfoIndex = 0;
            }
            var buffer = this._glBuffers[drawInfoIndex];
            this.bindAttributeToBuffer(buffer);
        };
        glAttributeClass.prototype.bindAttributeToBuffer = function (buffer) {
            var gl = this._gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.enableVertexAttribArray(this._attrLoc);
            var dataType = (this._isByte) ? gl.UNSIGNED_BYTE : gl.FLOAT;
            var normalize = this._normalizeOnGpu;
            gl.vertexAttribPointer(this._attrLoc, this._sizeInFloats, dataType, normalize, 0, 0);
            if (this._isVertexCommon && this._glInst) {
                this._glInst.vertexAttribDivisorANGLE(this._attrLoc, 1);
            }
            this.unbindBuffer(gl);
        };
        glAttributeClass.prototype.setArray = function (array) {
            var gl = this._gl;
            this._array = array;
        };
        return glAttributeClass;
    }());
    beachParty.glAttributeClass = glAttributeClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    glUniform.ts - small class to manage a webGL uniform.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var glUniformClass = (function () {
        function glUniformClass(gl, program, nameInShader, typeStr, initValue) {
            this._gl = gl;
            this._program = program;
            this._nameInShader = nameInShader;
            var uniformLoc = gl.getUniformLocation(program, nameInShader);
            if (uniformLoc == -1) {
                beachParty.error("Cannot locate shader uniform: " + nameInShader);
            }
            this._uniformLoc = uniformLoc;
            this._typeStr = typeStr;
            var setter = null;
            if (typeStr == "1i") {
                setter = gl.uniform1i;
            }
            else if (typeStr == "1f" || typeStr == "f") {
                setter = gl.uniform1f;
            }
            else if (typeStr == "2f") {
                setter = gl.uniform2f;
            }
            else if (typeStr == "3f") {
                setter = gl.uniform3f;
            }
            else if (typeStr == "4f") {
                setter = gl.uniform4f;
            }
            else if (typeStr == "1fv" || typeStr == "fv") {
                setter = gl.uniform1fv;
            }
            else if (typeStr == "2fv") {
                setter = gl.uniform2fv;
            }
            else if (typeStr == "3fv") {
                setter = gl.uniform3fv;
            }
            else if (typeStr == "4fv") {
                setter = gl.uniform4fv;
            }
            else if (typeStr == "matrix3fv") {
                setter = gl.uniformMatrix3fv;
            }
            else if (typeStr == "matrix4fv") {
                setter = gl.uniformMatrix4fv;
            }
            else {
                beachParty.error("Unknown uniform type: " + typeStr);
            }
            this._glSetter = setter;
            if (initValue !== undefined && initValue != null) {
                this.setValue(initValue);
            }
        }
        glUniformClass.prototype.isValueEqual = function (value) {
            if (vp.utils.isArray(value) || value instanceof Float32Array) {
                var eq = vp.arrayEquals(value, this._value);
            }
            else {
                var eq = (value == this._value);
            }
            return eq;
        };
        glUniformClass.prototype.setValue = function (value) {
            var changed = (!this.isValueEqual(value));
            //---- don't call the relative expensive GPU setter unless value has actually changed ----
            if (changed) {
                //vp.utils.debug("goUniform.setValue: name=" + this._nameInShader + ", old=" + this._value + ", new=" + value +
                //    ", changed=" + changed);
                this._value = value;
                glUniformClass.uniformSetCount++;
                if (this._glSetter) {
                    var gl = this._gl;
                    var uniformLoc = this._uniformLoc;
                    if (!uniformLoc) {
                        throw "uniformLoc is null for var name=" + this._nameInShader;
                    }
                    //vp.utils.debug("setValue uniformLoc=" + uniformLoc + ", value=" + value);
                    if (this._typeStr == "matrix4fv") {
                        this._gl.uniformMatrix4fv(uniformLoc, gl.FALSE, value);
                    }
                    else if (this._typeStr == "matrix3fv") {
                        this._gl.uniformMatrix3fv(uniformLoc, gl.FALSE, value);
                    }
                    else {
                        //---- note: we must pass "gl" as the "this" ptr AND must pass all of our params  ----
                        var argArray = vp.utils.toArray(arguments);
                        argArray.insert(0, uniformLoc);
                        //this._glSetter.call(gl, uniformLoc, value);
                        this._glSetter.apply(gl, argArray);
                    }
                    if (gl.getError()) {
                        var msg = "glUniform.setValue error: name=" + this._nameInShader + ", value=" + value + ", uniformLoc=" + uniformLoc;
                        vp.utils.debug(msg);
                        throw msg;
                    }
                }
            }
        };
        glUniformClass.uniformSetCount = 0;
        return glUniformClass;
    }());
    beachParty.glUniformClass = glUniformClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    ts - webGL utility functions.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var glUtils = (function () {
        function glUtils() {
        }
        glUtils.addHostShader = function (name, value) {
            name = name.toLowerCase();
            //alert("adding host resource inner: " + fullName);
            glUtils.hostShaders[name] = value;
        };
        glUtils.error = function (msg) {
            throw msg;
        };
        glUtils.getContext = function (canvas, options) {
            var gl = null;
            try {
                gl = canvas.getContext("webgl", options);
                if (!gl) {
                    gl = canvas.getContext("experimental-webgl", options);
                }
            }
            catch (ex) {
                beachParty.error("error getting WebGL context: " + ex);
            }
            if (!gl) {
                beachParty.error("Unable to initialize WebGL");
            }
            return gl;
        };
        glUtils.getExtension = function (gl, name) {
            var glExt = null;
            var prefixes = ["", "WEBKIT_", "MOZ_"];
            for (var i = 0; i < prefixes.length; i++) {
                var prefix = prefixes[i];
                glExt = gl.getExtension(prefix + name);
                if (glExt) {
                    break;
                }
            }
            return glExt;
        };
        /** read TEXT file sync. from server relative path. */
        glUtils.readServerTextFile = function (relPath) {
            //---- read file SYNC from my host (same directory) ----
            var request = new XMLHttpRequest();
            //---- try to disable caching here by using time as a unique URL argument ----
            //relPath += "?foo=" + Date.now();
            request.open("GET", relPath, false);
            request.send();
            var str = request.responseText;
            return str;
        };
        glUtils.findAndCompileShader = function (gl, shaderId, isVertexShader) {
            shaderId = shaderId.toLowerCase();
            var index = shaderId.indexOf(".");
            if (index > -1) {
                shaderId = shaderId.substr(0, index);
            }
            var win = window;
            var shaderStr = (win && win.shaders) ? win.shaders[shaderId] : null;
            if (window.external && window.external.isHosted) {
            }
            else if (!shaderStr) {
                //var url = getMyPath() + "/../shaders/" + shaderId;    
                var url = "./../shaders/" + shaderId;
                shaderStr = glUtils.readServerTextFile(url);
            }
            var shader = null;
            if (isVertexShader) {
                if (vp.utils.isIOS) {
                    //---- limit the size of colorPalette (normal + selected colors) for iOS to reduce ----
                    //---- its UNIFORM usage, since iOS only supports 128 4xfloat's ----
                    //---- "13" supports 12 normal colors and 1 selected color ----
                    shaderStr = shaderStr.replace(/@cpSize/g, "13");
                }
                else {
                    //---- "28" supports 14 normal and 14 selected colors ----
                    shaderStr = shaderStr.replace(/@cpSize/g, "28");
                }
                shader = gl.createShader(gl.VERTEX_SHADER);
            }
            else {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            }
            gl.shaderSource(shader, shaderStr);
            gl.compileShader(shader);
            var status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!status) {
                var errMsg = gl.getShaderInfoLog(shader);
                beachParty.error("compiling shader: " + shaderId + ", error=" + errMsg);
            }
            return shader;
        };
        glUtils.buildProgram = function (gl, shaders) {
            var program = gl.createProgram();
            for (var i = 0; i < shaders.length; i++) {
                var shader = shaders[i];
                gl.attachShader(program, shader);
            }
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                var errMsg = gl.getProgramInfoLog(program);
                beachParty.error("Error building webGL program: " + errMsg);
            }
            return program;
        };
        glUtils.addAttribute = function (attributeMap, gl, glInst, program, nameInShader, sizeInFloats, isByte, normalizeOnGpu, isVertexCommon, isSingleBuffer) {
            var attr = new beachParty.glAttributeClass(gl, glInst, program, nameInShader, sizeInFloats, isByte, normalizeOnGpu, isVertexCommon, isSingleBuffer);
            attributeMap[nameInShader] = attr;
            return attr;
        };
        glUtils.addUniform = function (uniformMap, gl, program, nameInShader, typeStr, initialValue) {
            var uniform = new beachParty.glUniformClass(gl, program, nameInShader, typeStr, initialValue);
            uniformMap[nameInShader] = uniform;
            return uniform;
        };
        glUtils.colorNamesOrValuesToFloats = function (names) {
            var floats = new Float32Array(names.length * 3);
            var nextOffset = 0;
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                var rgb;
                if (vp.utils.isString(name)) {
                    rgb = vp.color.getColorFromString(name);
                }
                else {
                    rgb = name;
                }
                floats[nextOffset++] = rgb[0] / 255;
                floats[nextOffset++] = rgb[1] / 255;
                floats[nextOffset++] = rgb[2] / 255;
            }
            return floats;
        };
        glUtils.configDevice = function (gl, width, height, clearColor, useBlending, useCulling) {
            //vp.utils.debug("configDevice: width=" + width + ", height=" + height);
            //---- avoid WebGL errors before window is resized (during initialization) ----
            width = Math.max(0, width);
            height = Math.max(0, height);
            gl.viewport(0, 0, width, height);
            //---- store in custom properties for later use as needed ----
            gl.canvasWidth = width;
            gl.canvasHeight = height;
            //---- CLEAR GL rendering target ----
            gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
            if (useCulling) {
                gl.frontFace(gl.CCW); // counter-clockwise triangles are FRONT faces
                //---- don't understand why, but gl.FRONT seems to match normal non-culled drawing whereas gl.BACK doesn't ----
                gl.cullFace(gl.FRONT); // BACK);              // gl.BACK is the default (do not draw back faces)
                gl.enable(gl.CULL_FACE); // enable culling
            }
            else {
                gl.disable(gl.CULL_FACE);
            }
            gl.enable(gl.DEPTH_TEST);
            //---- init blending ----
            if (useBlending) {
                //---- TODO: for proper blending, we need to sort shapes (mesh primitives) by scaled z value ----
                //---- can we do the sorting somehow on the GPU (gp-gpu)? ----
                //---- CPU idea to try: map z-bound data to a large set of discreet values (say ints from 0-999) ----
                //---- and as they are mapped, assign them to a bucket for that discreet value ----
                //---- then, load all shapes in bucket order.  this just requires 1 pass over data ----
                //---- the z-scaling and bucket assignment, and then 1 more pass for the shape loading.  ----
                //---- much better than a sort of 5 million items, for example! ----
                gl.disable(gl.DEPTH_TEST); // must turn off (takes priority over blending)
                gl.enable(gl.BLEND);
                //var isIE11 = vp.utils.isIE11;
                if (!gl.blendFuncSeparat) {
                    //---- IE11 bug workaround - use simple blending because IE11 doesn't support the below alternative ----
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }
                else {
                    //---- TODO: this does not exactly match canvas blending, but it is VERY CLOSE ----
                    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA_SATURATE, gl.DST_ALPHA);
                }
            }
            else {
                //---- we can either set to zbuffer testing or blending (but not both) ----
                gl.disable(gl.BLEND);
                gl.enable(gl.DEPTH_TEST);
            }
        };
        //---- shaders loaded by the host of our app (WinSandDance or Power BI) ----
        glUtils.hostShaders = {};
        return glUtils;
    }());
    beachParty.glUtils = glUtils;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    hitTestRect.ts - hit-testing of screen rectangle against set of bounding boxes.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var hitTestRect = (function () {
        function hitTestRect() {
        }
        //---- schedule a build the next time we are idle (should only be called AFTER animation is completed) ----
        hitTestRect.markCacheBuildNeeded = function (transformer, boxMgr) {
            this.ndcRects = null;
            this.clearBuildTimer();
            //this.buildTimer = setTimeout((e) =>
            //{
            //    this.clearBuildTimer();
            //    this.buildNdcRects(transformer, boxes);
            //}, 100);
        };
        hitTestRect.clearBuildTimer = function () {
            if (this.buildTimer) {
                clearTimeout(this.buildTimer);
                this.buildTimer = null;
            }
        };
        hitTestRect.buildNdcRects = function (transformer, boxMgr) {
            var bbCount = boxMgr.getCount();
            vp.utils.debug("** buildNdcRects: bbCount=" + bbCount + "**");
            var matWVP = transformer.getWorldViewProjection();
            this.ndcRects = [];
            //---- now, transform & test each box ----
            for (var i = 0; i < bbCount; i++) {
                var box = boxMgr.getBoxByIndex(i);
                var rcBox = this.transformBox(box, matWVP);
                this.ndcRects.push(rcBox);
            }
        };
        hitTestRect.getRectToPtDist = function (rc, pt) {
            //---- for now, just compute distance to center of rc ----
            var cx = (rc.left + rc.right) / 2;
            var cy = (rc.top + rc.bottom) / 2;
            var dx = pt.x - cx;
            var dy = pt.y - cy;
            var dist = dx * dx + dy * dy; // don't need true dist (sqrt)
            return dist;
        };
        hitTestRect.intersectUsingTransforms = function (rcScreen, transformer, boxMgr) {
            /// algorithm: transform each bounding box into NDC and then do simple rect/rect intersection test 
            if (!rcScreen) {
                throw "Error; rcScreen is null";
            }
            if (this.ndcRects === null) {
                this.buildNdcRects(transformer, boxMgr);
            }
            var intersections = [];
            var matWVP = transformer.getWorldViewProjection();
            //---- first, translate mouse rect from screen coordinates into NDC ----
            var mrLeftTop = transformer.viewportUntransformPoint(vp.geom.createVector3(rcScreen.left, rcScreen.top, 0));
            var mrRightBot = transformer.viewportUntransformPoint(vp.geom.createVector3(rcScreen.right, rcScreen.bottom, 0));
            //---- note: y values are swamped here because axis is flipped ----
            var rcMouse = vp.geom.createRect(mrLeftTop.x, mrRightBot.y, mrRightBot.x - mrLeftTop.x, mrLeftTop.y - mrRightBot.y);
            //---- ptMouse is used for distance testing ----
            var ptMouse = { x: (rcMouse.left + rcMouse.right) / 2, y: (rcMouse.top + rcMouse.bottom) / 2 };
            var bbCount = boxMgr.getCount();
            //---- now, transform & test each box ----
            for (var i = 0; i < bbCount; i++) {
                var rcBox = this.ndcRects[i];
                if (rcBox && vp.geom.rectIntersectsRect(rcBox, rcMouse)) {
                    var dist = this.getRectToPtDist(rcBox, ptMouse);
                    var box = boxMgr.getBoxByIndex(i);
                    box.dist = dist;
                    intersections.push(box);
                }
            }
            return intersections;
        };
        hitTestRect.transformBox = function (box, matWVP) {
            //---- transform 8 points of box, and then form bounding rect from new points ----
            var xMin = box.xMin;
            var yMin = box.yMin;
            var zMin = box.zMin;
            var xMax = box.xMax;
            var yMax = box.yMax;
            var zMax = box.zMax;
            //---- allow for z-rotation ----
            if (box.theta) {
                var cx = (xMin + xMax) / 2;
                var cy = (yMin + yMax) / 2;
                var cz = (zMin + zMax) / 2;
                var sin = Math.sin(box.theta);
                var cos = Math.cos(box.theta);
                //var matCenter = mat4.translate(-cx, -cy, -cz);
                //var matPos = mat4.translate(cx, cy, cz);
                var mat = new Float32Array(16);
                mat4.identity(mat);
                //---- (in reverse order): move to center, rotate about z, move back, transform by WorldViewProjection ----
                mat4.multiply(mat, mat, matWVP);
                mat4.translate(mat, mat, [cx, cy, cz]);
                mat4.rotateZ(mat, mat, box.theta);
                mat4.translate(mat, mat, [-cx, -cy, -cz]);
                matWVP = mat;
            }
            var p1 = this.transformPoint(xMin, yMin, zMin, matWVP);
            var p2 = this.transformPoint(xMin, yMax, zMin, matWVP);
            var p3 = this.transformPoint(xMax, yMax, zMin, matWVP);
            var p4 = this.transformPoint(xMax, yMin, zMin, matWVP);
            var p5 = this.transformPoint(xMin, yMin, zMax, matWVP);
            var p6 = this.transformPoint(xMin, yMax, zMax, matWVP);
            var p7 = this.transformPoint(xMax, yMax, zMax, matWVP);
            var p8 = this.transformPoint(xMax, yMin, zMax, matWVP);
            var xMin = Math.min(p1.x, p2.x, p3.x, p4.x, p5.x, p6.x, p7.x, p8.x);
            var yMin = Math.min(p1.y, p2.y, p3.y, p4.y, p5.y, p6.y, p7.y, p8.y);
            var xMax = Math.max(p1.x, p2.x, p3.x, p4.x, p5.x, p6.x, p7.x, p8.x);
            var yMax = Math.max(p1.y, p2.y, p3.y, p4.y, p5.y, p6.y, p7.y, p8.y);
            var rc = vp.geom.createRect(xMin, yMin, xMax - xMin, yMax - yMin);
            return rc;
        };
        hitTestRect.transformPoint = function (x, y, z, matrix) {
            var pos3 = new Float32Array(3);
            vec3.transformMat4(pos3, [x, y, z], matrix);
            var pos3x = vp.geom.createPoint3(pos3[0], pos3[1], pos3[2]);
            return pos3x;
        };
        hitTestRect.intersectUsingFrustrum = function (rcScreen, transformer, origBoxes) {
            /// Our algorithm removes boxes that are outside the bounding frustrum of rcScreen
            /// projected from the near to the far clipping planes.  Any objects that remain must be
            /// in, or overlap with, our frustrum.
            //---- make a copy of the list of boxes ----
            var boxes = vp.utils.copyArray(origBoxes);
            var zNear = 0;
            var zFar = .999;
            //---- get points aligned with near plane ---
            var np1 = transformer.unprojectFromScreen(rcScreen.left, rcScreen.bottom, zNear);
            var np2 = transformer.unprojectFromScreen(rcScreen.left, rcScreen.top, zNear);
            var np3 = transformer.unprojectFromScreen(rcScreen.right, rcScreen.top, zNear);
            var np4 = transformer.unprojectFromScreen(rcScreen.right, rcScreen.bottom, zNear);
            //---- get points aligned with far plane ---
            var fp1 = transformer.unprojectFromScreen(rcScreen.left, rcScreen.bottom, zFar);
            var fp2 = transformer.unprojectFromScreen(rcScreen.left, rcScreen.top, zFar);
            var fp3 = transformer.unprojectFromScreen(rcScreen.right, rcScreen.top, zFar);
            var fp4 = transformer.unprojectFromScreen(rcScreen.right, rcScreen.bottom, zFar);
            //---- eliminate boxes outside of each plane ----
            this.eliminateBoxesOutsidePlane(boxes, np1, np2, np3, np4); // FRONT plane
            this.eliminateBoxesOutsidePlane(boxes, fp1, fp2, np2, np1); // LEFT plane
            this.eliminateBoxesOutsidePlane(boxes, fp1, fp2, fp3, fp4); // BACK plane
            this.eliminateBoxesOutsidePlane(boxes, np4, np3, fp3, fp4); // RIGHT plane
            this.eliminateBoxesOutsidePlane(boxes, np3, np2, fp2, fp3); // TOP plane
            this.eliminateBoxesOutsidePlane(boxes, np4, np1, fp1, fp4); // BOTTOM plane
            return boxes;
        };
        hitTestRect.eliminateBoxesOutsidePlane = function (boxes, p1, p2, p3, p4) {
            var plane = { p1: p2, p2: p2, p3: p3 };
            for (var i = boxes.length - 1; i >= 0; i--) {
                var box = boxes[i];
                if (this.isBoxOutsidePlane(box, plane)) {
                    boxes.removeAt(i);
                }
            }
        };
        hitTestRect.isBoxOutsidePlane = function (box, plane) {
            //---- box is outside if all 8 of its points are outside ----
            var isOutside = true;
            var xMin = box.xMin;
            var yMin = box.yMin;
            var zMin = box.zMin;
            var xMax = box.xMax;
            var yMax = box.yMax;
            var zMax = box.zMax;
            if (!this.isPointOutsidePlane(xMin, yMin, zMin, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMin, yMax, zMin, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMax, yMax, zMin, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMax, yMin, zMin, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMin, yMin, zMax, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMin, yMax, zMax, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMax, yMax, zMax, plane)) {
                isOutside = false;
            }
            else if (!this.isPointOutsidePlane(xMax, yMin, zMax, plane)) {
                isOutside = false;
            }
            return isOutside;
        };
        hitTestRect.isPointOutsidePlane = function (x, y, z, plane) {
            var q = vp.geom.createPoint3(x, y, z);
            //---- compute vector from pt1 of plane to q ----
            var pq = vp.geom.vector3.subtract(plane.p1, q);
            //---- compute normal of plane ----
            var normal = (plane.normal === undefined) ? this.getPlaneNormal(plane) : plane.normal;
            var dotValue = vp.geom.vector3.dot(normal, pq);
            var isOutside = (dotValue < 0);
            return isOutside;
        };
        hitTestRect.getPlaneNormal = function (plane) {
            var vector3 = vp.geom.vector3;
            var u = vector3.subtract(plane.p2, plane.p1);
            var v = vector3.subtract(plane.p3, plane.p1);
            var x = (u.y * v.z) - (u.z - v.y);
            var y = (u.z * v.x) - (u.x - v.z);
            var z = (u.x * v.y) - (u.y - v.x);
            var normal = vp.geom.createVector3(x, y, z);
            plane.normal = normal; // cache for later use
            return normal;
        };
        hitTestRect.ndcRects = null;
        hitTestRect.buildTimer = null;
        return hitTestRect;
    }());
    beachParty.hitTestRect = hitTestRect;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    ray.ts - ray-based hit testing.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    /** This code adpoted from XNA 4 Ray and BoundingBox classes (Microsoft). */
    var rayClass = (function () {
        function rayClass(position, direction) {
            this.position = position;
            this.direction = direction;
        }
        /** return null if no intersection found; otherwise returns distance to  intersection point. */
        rayClass.prototype.intersectSphere = function (sphere) {
            var spx = sphere.center.x - this.position.x;
            var spy = sphere.center.y - this.position.y;
            var spz = sphere.center.z - this.position.z;
            var num7 = ((spx * spx) + (spy * spy)) + (spz * spz);
            var num2 = sphere.radius * sphere.radius;
            if (num7 <= num2) {
                return 0;
            }
            var num = ((spx * this.direction.x) + (spy * this.direction.y)) + (spz * this.direction.z);
            if (num < 0) {
                return null;
            }
            var num6 = num7 - (num * num);
            if (num6 > num2) {
                return null;
            }
            var num8 = Math.sqrt(num2 - num6);
            return (num - num8);
        };
        /** return null if no intersection found; otherwise returns distance to intersection point. */
        rayClass.prototype.intersectBox = function (box) {
            var num = 0;
            var maxValue = Number.MAX_VALUE;
            if (Math.abs(this.direction.x) < 1E-06) {
                if ((this.position.x < box.xMin) || (this.position.x > box.xMax)) {
                    return null;
                }
            }
            else {
                var num11 = 1 / this.direction.x;
                var num8 = (box.xMin - this.position.x) * num11;
                var num7 = (box.xMax - this.position.x) * num11;
                if (num8 > num7) {
                    var num14 = num8;
                    num8 = num7;
                    num7 = num14;
                }
                num = Math.max(num8, num);
                maxValue = Math.min(num7, maxValue);
                if (num > maxValue) {
                    return null;
                }
            }
            if (Math.abs(this.direction.y) < 1E-06) {
                if ((this.position.y < box.yMin) || (this.position.y > box.yMax)) {
                    return null;
                }
            }
            else {
                var num10 = 1 / this.direction.y;
                var num6 = (box.yMin - this.position.y) * num10;
                var num5 = (box.yMax - this.position.y) * num10;
                if (num6 > num5) {
                    var num13 = num6;
                    num6 = num5;
                    num5 = num13;
                }
                num = Math.max(num6, num);
                maxValue = Math.min(num5, maxValue);
                if (num > maxValue) {
                    return null;
                }
            }
            if (Math.abs(this.direction.z) < 1E-06) {
                if ((this.position.z < box.zMin) || (this.position.z > box.zMax)) {
                    return null;
                }
            }
            else {
                var num9 = 1 / this.direction.z;
                var num4 = (box.zMin - this.position.z) * num9;
                var num3 = (box.zMax - this.position.z) * num9;
                if (num4 > num3) {
                    var num12 = num4;
                    num4 = num3;
                    num3 = num12;
                }
                num = Math.max(num4, num);
                maxValue = Math.min(num3, maxValue);
                if (num > maxValue) {
                    return null;
                }
            }
            return num;
        };
        return rayClass;
    }());
    beachParty.rayClass = rayClass;
    var HitTestResult = (function () {
        function HitTestResult(dist, primaryKey, boundingBox) {
            this.distance = dist;
            this.primaryKey = primaryKey;
            this.boundingBox = boundingBox;
        }
        return HitTestResult;
    }());
    beachParty.HitTestResult = HitTestResult;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    textureMaker.ts - utility class for building shape textures
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var textureMakerClass = (function (_super) {
        __extends(textureMakerClass, _super);
        function textureMakerClass(texPalette) {
            _super.call(this);
            this._shapeCount = 0;
            this._potCount = 0; // nearest powerOfTwo of shapeCount
            this._imagesLoaded = 0;
            this._texPalette = texPalette;
            this._shapeCount = texPalette.length;
            this._potCount = this.nearestPowerOfTwo(this._shapeCount);
        }
        textureMakerClass.prototype.getImageSheet = function () {
            return this._imgSheet;
        };
        textureMakerClass.prototype.getTexture = function () {
            return this._texture;
        };
        textureMakerClass.prototype.getPotCount = function () {
            return this._potCount;
        };
        textureMakerClass.prototype.nearestPowerOfTwo = function (value) {
            var log = Math.log2(value);
            var ceil = Math.ceil(log);
            var pot = Math.pow(2, ceil);
            return pot;
        };
        textureMakerClass.prototype.buildAsync = function (gl, texPalette, isShapeNames) {
            this._gl = gl;
            var texture = null;
            if (texPalette.length == 1) {
                //---- cache only supports single entries ----
                var singleName = texPalette[0];
                texture = textureMakerClass.textureCache[singleName];
            }
            if (texture) {
                //---- texture found in cache! ----
                this._texture = texture;
                ////---- waste time ----
                //var dummy = 3;
                //for (var i = 0; i < 10000; i++)
                //{
                //    for (var j = 0; j < 10000; j++)
                //    {
                //        dummy += i * 3;
                //    }
                //}
                this.onDataChanged("loaded");
            }
            else {
                var texture = gl.createTexture();
                this._texture = texture;
                /// Note: non-power-of-two (NPOT) textures can NOT be used for mipmapping (setting image for each level) .
                //---- try to use powerOfTwo, since quality is MUCH higher ----
                var powerOfTwo = isShapeNames;
                gl.bindTexture(gl.TEXTURE_2D, texture); // normal 2D texture
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // flip texture about Y axis (like normal)
                if (powerOfTwo) {
                    //---- this is the important one, since our images are bigger and we need to shrink them when we map to a shape ----
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST); //_MIPMAP_NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                }
                else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                }
                if (isShapeNames) {
                    this.buildShapeMakers(texPalette);
                    //---- now, load all of the minmap's manually ----
                    this.makeTextureLevel(0, 1024, 96);
                    this.makeTextureLevel(1, 512, 48);
                    this.makeTextureLevel(2, 256, 24);
                    this.makeTextureLevel(3, 128, 12);
                    this.makeTextureLevel(4, 64, 6); // this is the largest size we currently draw
                    this.makeTextureLevel(5, 32, 3);
                    this.makeTextureLevel(6, 16, 2);
                    this.makeTextureLevel(7, 8, 1.5);
                    this.makeTextureLevel(8, 4, 1.25);
                    this.makeTextureLevel(9, 2, 1.125);
                    //---- have to keep calling until actualWidth (size * nearestPot(shapeCount)) gets down to 1 ----
                    var size = 1;
                    var level = 10;
                    while (true) {
                        this.makeTextureLevel(level, size, 1);
                        var actualWidth = size * this._potCount;
                        if (actualWidth <= 1) {
                            break;
                        }
                        size /= 2;
                        level++;
                    }
                    //---- texture COMPLETED ----
                    this.cacheTextureIfPossible();
                    this.onDataChanged("loaded");
                }
                else {
                    this.loadImagesFromPalette(texPalette);
                }
            }
        };
        textureMakerClass.prototype.buildShapeMakers = function (texPalette) {
            var makers = [];
            for (var i = 0; i < texPalette.length; i++) {
                var name = texPalette[i];
                var maker = {};
                maker.isFilled = name.startsWith("filled ");
                if (name.endsWith("circle")) {
                    maker.shapeMaker = this.circleMaker;
                }
                else if (name.endsWith("square")) {
                    maker.shapeMaker = this.squareMaker;
                }
                else if (name.endsWith("triangle")) {
                    maker.shapeMaker = this.triangleMaker;
                }
                else {
                    throw "Error: unknown texture shape: " + name;
                }
                makers.push(maker);
            }
            this._makers = makers;
        };
        textureMakerClass.prototype.circleMaker = function (ctx, size, strokeSize, xOffset, isFilled) {
            //---- draw the circle ----
            ctx.clearRect(xOffset, 0, size, size);
            var r = size / 2 - strokeSize / 2;
            ctx.beginPath();
            ctx.arc(xOffset + size / 2, size / 2, r, 0, 2 * Math.PI, false);
            if (!isFilled) {
                //---- outline ----
                ctx.lineWidth = strokeSize;
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
            else {
                //---- filled ----
                ctx.fillStyle = "white";
                ctx.fill();
            }
        };
        textureMakerClass.prototype.triangleMaker = function (ctx, size, strokeSize, xOffset, isFilled) {
            //---- draw the triangle ----
            ctx.clearRect(xOffset, 0, size, size);
            if (isFilled) {
                var xMin = xOffset;
                var xMax = xOffset + size;
                var yMin = 0;
                var yMax = size;
            }
            else {
                var fudge = .45 * strokeSize;
                var halfStroke = (strokeSize / 2) + fudge;
                var xMin = xOffset + halfStroke;
                var xMax = xOffset + size - halfStroke;
                var yMin = halfStroke;
                var yMax = size - halfStroke;
            }
            ctx.beginPath();
            ctx.moveTo(xMin, yMax);
            ctx.lineTo((xMin + xMax) / 2, yMin);
            ctx.lineTo(xMax, yMax);
            //ctx.lineTo(xMin, yMax);
            ctx.closePath();
            if (!isFilled) {
                //---- outline ----
                ctx.lineWidth = strokeSize;
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
            else {
                //---- filled ----
                ctx.fillStyle = "white";
                ctx.fill();
            }
        };
        textureMakerClass.prototype.squareMaker = function (ctx, size, strokeSize, xOffset, isFilled) {
            if (isFilled) {
                //---- SOLID square ----
                var fudge = .45 * strokeSize;
                ctx.fillStyle = "white";
                var sz = size - 2 * fudge;
                ctx.fillRect(xOffset + fudge, 0 + fudge, sz, sz);
            }
            else {
                var fudge = .45 * strokeSize;
                var halfStroke = (strokeSize / 2) + fudge;
                var xMin = xOffset + halfStroke;
                var xMax = xOffset + size - halfStroke;
                var yMin = halfStroke;
                var yMax = size - halfStroke;
                //---- OUTLINE rect ----
                ctx.clearRect(xOffset, 0, size, size);
                ctx.lineWidth = strokeSize;
                ctx.strokeStyle = "white";
                ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
            }
        };
        /** create an image sheet from loaded image elements. All images will be drawn using the size of the first image. */
        textureMakerClass.prototype.createImageSheet = function (images) {
            var imageCount = images.length;
            var width = images[0].width;
            var height = images[0].height;
            var totalWidth = imageCount * width;
            //---- create canvas we can draw on ----
            var canvasW = vp.select(document.createElement("canvas"))
                .attr("width", totalWidth)
                .attr("height", height);
            //---- get drawing context ----
            var canvas = canvasW[0];
            var ctx = canvas.getContext("2d");
            ctx.translate(0.5, 0.5);
            //---- draw the shapes onto the canvas ----
            for (var i = 0; i < imageCount; i++) {
                var image = images[i];
                //ctx.msImageSmoothingEnabled = true;
                ctx.drawImage(image, 0, 0, image.width, image.height, i * width, 0, width, height);
            }
            return canvas;
        };
        /** create an image sheet from the shapes to be drawn. */
        textureMakerClass.prototype.createShapeImages = function (size, strokeSize) {
            var shapeCount = this._makers.length;
            //---- use next highest power of 2, to keep images looking good ----
            var potShapeCount = this._potCount;
            var actualSize = Math.max(1, size);
            var totalWidth = Math.max(1, potShapeCount * size);
            var totalHeight = actualSize;
            //---- create canvas we can draw on ----
            var canvasW = vp.select(document.createElement("canvas"))
                .attr("width", totalWidth)
                .attr("height", totalHeight);
            //---- get drawing context ----
            var canvas = canvasW[0];
            var ctx = canvas.getContext("2d");
            //---- draw the shapes ----
            for (var i = 0; i < this._makers.length; i++) {
                var maker = this._makers[i];
                maker.shapeMaker(ctx, actualSize, strokeSize, i * actualSize, maker.isFilled);
            }
            return canvas;
        };
        textureMakerClass.prototype.loadImagesFromPalette = function (urls) {
            var _this = this;
            this._images = [];
            this._imagesLoaded = 0;
            for (var i = 0; i < urls.length; i++) {
                var url = urls[i];
                var img = new Image();
                img.onload = function (e) {
                    _this._imagesLoaded++;
                    vp.utils.debug("URL image loaded:" + url);
                    if (_this._imagesLoaded == urls.length) {
                        //---- all needed images have now been loaded ----
                        if (urls.length == 1) {
                            //---- simple case; don't need to create a sheet ----
                            _this.loadTextureFromSheet(img);
                        }
                        else {
                            var imgSheet = _this.createImageSheet(_this._images);
                            _this._imgSheet = imgSheet;
                            _this.loadTextureFromSheet(imgSheet);
                        }
                    }
                };
                this._images.push(img);
                img.src = url;
            }
        };
        /** imgSheet can be HTMLImageElement or canvas. */
        textureMakerClass.prototype.loadTextureFromSheet = function (imgSheet) {
            var gl = this._gl;
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgSheet);
            this.cacheTextureIfPossible();
            this.onDataChanged("loaded");
        };
        textureMakerClass.prototype.cacheTextureIfPossible = function () {
            var _this = this;
            if (this._texPalette.length == 1) {
                var name = this._texPalette[0];
                textureMakerClass.textureCache[name] = this._texture;
            }
            this._texture._id = textureMakerClass.nextTextureId++;
            this._texture.toString = function (e) {
                return "texture#" + _this._texture._id;
            };
        };
        textureMakerClass.prototype.makeTextureLevel = function (level, size, strokeSize) {
            var gl = this._gl;
            var img = this.createShapeImages(size, strokeSize);
            //---- bind this img as the specified level for the texture ----
            //vp.utils.debug("makeTextureLevel: binding img to texture: level=" + level + " width=" + img.width + ", height=" + img.height);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, level, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            //if (level == 5)
            //{
            //    vp.select("#imgDebug")
            //        .attr("src", img.toDataURL())
            //        .css("display", "block")
            //}
        };
        textureMakerClass.textureCache = {};
        textureMakerClass.nextTextureId = 1;
        return textureMakerClass;
    }(beachParty.dataChangerClass));
    beachParty.textureMakerClass = textureMakerClass;
})(beachParty || (beachParty = {}));
//-------------------------------------------------------------------------------------
//  Copyright (c) 2016 - Microsoft Corporation.
//    transformer.ts - manages the projection, view, and world matrices for a visualization.
//-------------------------------------------------------------------------------------
var beachParty;
(function (beachParty) {
    var transformerClass = (function (_super) {
        __extends(transformerClass, _super);
        function transformerClass(gl) {
            _super.call(this);
            this._xRotation = 0;
            this._yRotation = 0;
            this._zRotation = 0;
            this._rcxWorld = null;
            //_baseSizeFactor = 1;
            this._canvasWidth = 1;
            this._canvasHeight = 1;
            this._isOrthoCamera = false;
            this._transformChanged = true;
            /// When "_useScreenUnits" is true:
            ///   - shapes with depth are greatly extruded in Z (looks wrong)
            ///   - rotation about the Y and X axis make the chart disappear.
            /// So, as of 2/3/2015, we are sticking to using perspectiveFOV for non-ortho camera
            /// even though this means we cannot use screen coordinates (which are handy, especially when
            /// specifying the size of shapes).
            //---- when true, use SCREEN units for perspective camera ----
            this._useScreenUnits = false;
            this._gl = gl;
            this.resetMatrices();
            //this.testXnaPick();
        }
        transformerClass.prototype.rebuildProjectionMatrix = function () {
            var cameraPosZ = this._zPos;
            var rads = vp.utils.toRadians(45);
            var gl = this._gl;
            var cw = this._canvasWidth;
            var ch = this._canvasHeight;
            var nearDist = .001;
            var farDist = 20000;
            var margin = 15;
            var cwx = cw - margin;
            var chx = ch - margin;
            var aspect = cwx / chx;
            //vp.utils.debug("rebuildProjectionMatrix: cw=" + cw + ", ch=" + ch + ", aspect=" + aspect);
            this._matProjection = new Float32Array(16);
            if (this._isOrthoCamera) {
                //---- ORTHO: using screen coordinates ----
                this._rcxWorld = { left: -cwx / 2, right: cwx / 2, top: -chx / 2, bottom: chx / 2, front: nearDist, back: farDist };
                var nearPos = -5000; // cameraPosZ - nearDist;
                var farPos = 20000; // cameraPosZ - farDist;
                mat4.ortho(this._matProjection, -cw / 2, cw / 2, ch / 2, -ch / 2, nearPos, farPos);
            }
            else {
                if (this._useScreenUnits) {
                    //---- PERSPECTIVE: using screen coordinates ----
                    this._rcxWorld = { left: -cwx / 2, right: cwx / 2, top: -chx / 2, bottom: chx / 2, front: nearDist, back: farDist };
                    mat4.frustum(this._matProjection, -cw / 2, cw / 2, ch / 2, -ch / 2, nearDist, farDist);
                }
                else {
                    //---- this is the DEFAULT BEACHPARTY CAMERA ----
                    var percentToUse = 1; //.98;
                    var zDepth = 4; // the range of z values in world units where we place models
                    //---- according to this article, the near plane should not be too close to zero ----
                    //---- https://www.opengl.org/archives/resources/faq/technical/depthbuffer.htm ----
                    var nearDist = 1;
                    var farDist = nearDist + 100;
                    //zDepth = 20;  
                    var zBack = -zDepth / 2; // farDist;        
                    var zFront = zDepth / 2; // zNear
                    mat4.perspective(this._matProjection, rads, aspect, nearDist, farDist);
                    var ptWorld = this.unprojectFromScreen(0, 0, undefined, true);
                    var xb = Math.abs(ptWorld.x);
                    var yb = Math.abs(ptWorld.y);
                    //---- PERSPECTIVE: using 3D camera coordinates ----
                    this._rcxWorld = { left: -xb, right: xb, top: yb, bottom: -yb, front: zFront, back: zBack };
                }
            }
        };
        transformerClass.prototype.resetMatrices = function () {
            var zPos = (this._useScreenUnits) ? .001 : 7; // why do we need to specify exactly ".001" for perspective with screen units?
            this._zPos = zPos;
            var cameraPos = vp.geom.createVector3(0, 0, zPos);
            var lookAt = vp.geom.createVector3(0, 0, -1);
            var up = vp.geom.createVector3(0, 1, 0);
            var matrix4View = vp.geom.matrix4.createLookAt(cameraPos, lookAt, up);
            this._matView = new Float32Array(16);
            mat4.lookAt(this._matView, this.toFloatv3(cameraPos), this.toFloatv3(lookAt), this.toFloatv3(up));
            this._cameraLookAt = lookAt;
            this._cameraPos = cameraPos;
            //this._matWorld = vp.geom.matrix4.identity();
            this._matWorld = new Float32Array(16);
            mat4.identity(this._matWorld);
            this.rebuildProjectionMatrix();
            //this.updateRcxWorld();
            this._transformChanged = true;
        };
        transformerClass.prototype.testXnaPick = function () {
            var width = 880;
            var height = 580;
            var near = .001;
            var far = 20000;
            var geom = vp.geom;
            var matrix4 = geom.matrix4;
            var vector3 = geom.vector3;
            var rads = vp.utils.toRadians(45);
            var aspect = width / height;
            var matWorld = matrix4.identity();
            var matView = matrix4.createLookAt(geom.createVector3(0, 0, 7), geom.createVector3(0, 0, 0), geom.createVector3(0, 1, 0));
            var matProjection = matrix4.createPerspectiveFovLH(rads, aspect, near, far); // use LH for this test ONLY!
            var ptNear = transformerClass.unprojectXna(vp.geom.createVector3(875, 575, 0), width, height, matWorld, matView, matProjection);
            var ptFar = transformerClass.unprojectXna(vp.geom.createVector3(875, 575, .9999), width, height, matWorld, matView, matProjection);
            //vp.utils.debug("------------------");
            //vp.utils.debug("ptNear: " + ptNear);
            //vp.utils.debug("ptFar: " + ptFar);
            //vp.utils.debug("------------------");
        };
        transformerClass.prototype.getProjection = function () {
            return this._matProjection;
        };
        transformerClass.prototype.getView = function () {
            return this._matView;
        };
        transformerClass.prototype.world = function (value) {
            if (arguments.length == 0) {
                return this._matWorld;
            }
            if (value) {
                this._matWorld = value;
                this.onDataChanged("world");
            }
        };
        transformerClass.prototype.multiplyTransform = function (matTransform) {
            //---- for RIGHT HAND WebGL - matrix are applied in reverse order (right to left) ----
            //if (false)
            //{
            //    //---- as per Mark Finch's advice, we switched the order here and got ----
            //    //---- the screen-based axis rotation that we wanted! ----
            //    mat4.multiply(this._matWorld, this._matWorld, matTransform);
            //}
            //else
            {
                //---- something changed as of May-27-2015; we seem to be tranforming the CAMERA instead of the SHAPES, so let's try the old order ----
                mat4.multiply(this._matWorld, matTransform, this._matWorld);
            }
            this._transformChanged = true;
        };
        transformerClass.prototype.clearTransforms = function () {
            mat4.identity(this._matWorld);
            this._transformChanged = true;
        };
        transformerClass.prototype.getWorldViewProjection = function () {
            //---- webGL order (mat = mat x new) ----
            var matAll = new Float32Array(16);
            mat4.identity(matAll);
            mat4.multiply(matAll, matAll, this._matProjection);
            mat4.multiply(matAll, matAll, this._matView);
            mat4.multiply(matAll, matAll, this._matWorld);
            return matAll;
        };
        transformerClass.prototype.postProjTransformAdjust = function (v) {
            var w = (v.w == 0) ? 1 : v.w;
            return new vp.geom.vector3(v.x / w, v.y / w, v.z / w);
        };
        /** map a point from MODEL space to SCREEN space. */
        transformerClass.prototype.projectToScreen = function (x, y, z) {
            var pos3x = this.projectToNDC(x, y, z);
            var screenPos = this.viewportTransformPoint(pos3x);
            return screenPos;
        };
        transformerClass.prototype.transformPtWithMatrix = function (x, y, z, mat) {
            var pt = new Float32Array(3);
            vec3.transformMat4(pt, [x, y, z], mat);
            var pos3x = vp.geom.createPoint3(pt[0], pt[1], pt[2]);
            return pos3x;
        };
        /** map a point from MODEL space to NDC space (-1 to 1). */
        transformerClass.prototype.projectToNDC = function (x, y, z) {
            var gl = this._gl;
            //var pos = new vp.geom.vector3(x, y, z);
            z = z || 0;
            var wvp = this.getWorldViewProjection();
            var pos3 = new Float32Array(3);
            vec3.transformMat4(pos3, [x, y, z], wvp);
            var pos3x = vp.geom.createPoint3(pos3[0], pos3[1], pos3[2]);
            return pos3x;
        };
        transformerClass.prototype.unprojectFromNDCUsingMarksApproach = function (x, y) {
            //---- technique for determining zScreen ----
            //---- objPos is the center of the object is camera space ----
            var objPos = [0, 0, 0];
            vec3.transformMat4(objPos, objPos, this._matWorld);
            vec3.transformMat4(objPos, objPos, this._matView);
            //---- dist = lookAt dot (cameraPos - objPos) ----
            var pos = [0, 0, 0];
            vec3.subtract(pos, this.toFloatv3(this._cameraPos), objPos);
            var distance = vec3.dot(this.toFloatv3(this._cameraLookAt), pos);
            //--- zScreen = dist * proj.m22 + proj.m32 (per mark finch) ----
            var matProj = this._matProjection;
            var zScreen = Math.abs(distance * matProj[5] + matProj[6]); // is m32  matProj[6] or matProj[9]?   
            //var test = this.projectToNDC(x, y, 0);
            //zScreen = test.z;
            vp.utils.debug("unproject: distance=" + distance + ", zScreen=" + zScreen);
            var posScr = this.unprojectFromNDCCore(x, y, zScreen);
            return posScr;
        };
        /** map from NDC (-1 to 1) to WORLD space */
        transformerClass.prototype.unprojectFromNDC = function (x, y) {
            var pt = null;
            //---- build ray from near to far plane ----
            var ptNear = this.unprojectFromNDCCore(x, y, 0);
            var ptFar = this.unprojectFromNDCCore(x, y, 1);
            var rayOrigin = ptNear;
            var ptDiffs = vp.geom.vector3.subtract(ptFar, ptNear);
            if (ptDiffs.x == 0 && ptDiffs.y == 0 && ptDiffs.z == 0) {
                pt = ptNear; // ptNear=ptFar
            }
            else {
                var rayDir = vp.geom.vector3.normal(ptDiffs);
                //---- now, caculate the point where ray intersects the z=0 plane ----
                var dist = -rayOrigin.z / rayDir.z;
                dist = 5.8; // this is about what dist should be (actually, 6.999) 
                pt = vp.geom.vector3.add(rayOrigin, vp.geom.vector3.multiply(rayDir, dist));
            }
            return pt;
        };
        transformerClass.prototype.getRayFromScreenPos = function (x, y) {
            var pt = null;
            //---- build ray from near to far plane ----
            var ptn = this.unprojectFromScreen(x, y, 0);
            var ptf = this.unprojectFromScreen(x, y, .9999);
            var ptNear = this.toFloatv3(ptn);
            var ptFar = this.toFloatv3(ptf);
            var rayOrigin = ptNear;
            var rayDir = new Float32Array(3);
            var diffs = new Float32Array(3);
            vec3.subtract(diffs, ptFar, ptNear); // ptNear, ptFar);
            if (diffs[0] == 0 && diffs[1] == 0 && diffs[2] == 0) {
                pt = ptNear; // ptNear=ptFar
            }
            else {
                vec3.normalize(rayDir, diffs);
            }
            var origin = vp.geom.createVector3(rayOrigin[0], rayOrigin[1], rayOrigin[2]);
            var dir = vp.geom.createVector3(rayDir[0], rayDir[1], rayDir[2]);
            var ray = new beachParty.rayClass(origin, dir);
            return ray;
        };
        /** map from NDC (-1 to 1) to WORLD space (using glmatrix library) */
        transformerClass.prototype.unprojectFromNDCEx = function (x, y) {
            var pt = null;
            //---- build ray from near to far plane ----
            var ptNear = this.toFloatv3(this.unprojectFromNDCCore(x, y, 0));
            var ptFar = this.toFloatv3(this.unprojectFromNDCCore(x, y, 1));
            var rayOrigin = ptNear;
            var diffs = new Float32Array(3);
            vec3.subtract(diffs, ptFar, ptNear); // ptNear, ptFar);
            if (diffs[0] == 0 && diffs[1] == 0 && diffs[2] == 0) {
                pt = ptNear; // ptNear=ptFar
            }
            else {
                var rayDir = new Float32Array(3);
                vec3.normalize(rayDir, diffs);
                //---- now, caculate the point where ray intersects the z = 0 plane ----
                var dist = -rayOrigin[2] / rayDir[2]; // .z;
                var product = new Float32Array(3);
                pt = new Float32Array(3);
                vec3.scale(product, rayDir, dist);
                vec3.add(pt, product, rayOrigin);
            }
            return { x: pt[0], y: pt[1], z: pt[2] };
        };
        /** map from HC (-1 to 1) to WORLD space */
        transformerClass.prototype.unprojectFromNDCCore = function (x, y, z, omitWorld) {
            var invProjection = mat4.create();
            mat4.invert(invProjection, this._matProjection);
            var invView = mat4.create();
            mat4.invert(invView, this._matView);
            var invWorld = mat4.create();
            mat4.invert(invWorld, this._matWorld);
            //---- apply INV PROJECTION ----
            var pt3 = new Float32Array(3);
            vec3.transformMat4(pt3, [x, y, z], invProjection);
            //---- apply INV VIEW ----
            var pp = new Float32Array(3);
            vec3.transformMat4(pp, pt3, invView);
            //---- apply INV WORLD ----
            if (omitWorld) {
                vWorld = pp;
            }
            else {
                var vWorld = new Float32Array(3);
                vec3.transformMat4(vWorld, pp, invWorld);
            }
            var posWorld = vp.geom.createPoint3(vWorld[0], vWorld[1], vWorld[2]);
            return posWorld;
        };
        transformerClass.prototype.getInvMvpMatrix = function () {
            var mat = mat4.create();
            mat4.identity(mat);
            mat4.multiply(mat, mat, this._matProjection);
            mat4.multiply(mat, mat, this._matView);
            mat4.multiply(mat, mat, this._matWorld);
            mat4.invert(mat, mat);
            return mat;
        };
        transformerClass.prototype.getInvWorldpMatrix = function () {
            var mat = mat4.create();
            mat4.invert(mat, this._matWorld);
            return mat;
        };
        /** static version of unprojectFromScreen(), XNA style. */
        transformerClass.unprojectXna = function (vScr, vpWidth, vpHeight, matWorld, matView, matProjection) {
            var vpX = 0;
            var vpY = 0;
            var vpMinDepth = 0;
            var vpMaxDepth = 1;
            //---- transform from screen to NDC ---
            var position = new Float32Array(3);
            position[0] = (((vScr.x - vpX) / (vpWidth)) * 2) - 1;
            position[1] = -((((vScr.y - vpY) / (vpHeight)) * 2) - 1);
            position[2] = (vScr.z - vpMinDepth) / (vpMaxDepth - vpMinDepth);
            //---- this is the order that matches XNA results, but may have to be reverse for WebGL: projection, view, world ----
            var mat = mat4.create();
            mat4.identity(mat);
            mat4.multiply(mat, mat, matProjection);
            mat4.multiply(mat, mat, matView);
            mat4.multiply(mat, mat, matWorld);
            mat4.invert(mat, mat);
            //---- transform position with mat ----
            var vector = new Float32Array(3);
            vec3.transformMat4(vector, position, mat);
            //---- adjust vector with "a" ----
            var m14 = mat[3];
            var m24 = mat[7];
            var m34 = mat[11];
            var m44 = mat[15];
            var posWorld = vp.geom.createPoint3(vector[0], vector[1], vector[2]);
            return posWorld;
        };
        transformerClass.withinEpsilon = function (a, b) {
            var epsilon = 1.401298E-45;
            var num = a - b;
            return ((-1.401298E-45 <= num) && (num <= epsilon));
        };
        /** static version of unprojectFromScreen(). */
        transformerClass.unprojectEx = function (vScr, vpWidth, vpHeight, matWorld, matView, matProjection) {
            //---- transform from screen to NDC ---
            var newX = vp.data.mapValue(vScr.x, 0, vpWidth - 1, -1, 1);
            var newY = vp.data.mapValue(vScr.y, 0, vpHeight - 1, 1, -1);
            var newZ = vScr.z;
            //---- invert matrices ----
            var invProjection = mat4.create();
            mat4.invert(invProjection, matProjection);
            var invView = mat4.create();
            mat4.invert(invView, matView);
            var invWorld = mat4.create();
            mat4.invert(invWorld, matWorld);
            //---- apply inverted PROJECTION ----
            var pt4 = new Float32Array(4);
            vec4.transformMat4(pt4, [newX, newY, newZ, 1], invProjection);
            //--- correct with "w" when going from vec4 to vec3 ----
            var w = pt4[3];
            var vp3 = [pt4[0] / w, pt4[1] / w, pt4[2] / w];
            //---- apply inverted VIEW ----
            var ptView = new Float32Array(3);
            vec3.transformMat4(ptView, vp3, invView);
            //---- apply inverted WORLD ----
            var ptWorld = new Float32Array(3);
            vec3.transformMat4(ptWorld, ptView, invWorld);
            var posWorld = vp.geom.createPoint3(ptWorld[0], ptWorld[1], ptWorld[2]);
            return posWorld;
        };
        transformerClass.prototype.getCameraPosAsArray = function () {
            return [this._cameraPos.x, this._cameraPos.y, this._cameraPos.z];
        };
        transformerClass.prototype.getNdcZ = function () {
            //---- before we can unproject screen boundaries to get world space, we need to get the z from projection ----
            var pt3 = this.projectToNDC(0, 0, 0);
            var zNorm = pt3.z;
            return zNorm;
        };
        /** map a point from SCREEN space to MODEL space. */
        transformerClass.prototype.unprojectFromScreen = function (xScreen, yScreen, zNorm, omitWorld) {
            if (zNorm === undefined) {
                zNorm = this.getNdcZ();
            }
            var ptNC = this.viewportUntransformPoint(vp.geom.createVector3(xScreen, yScreen, 0));
            var ptWorld = this.unprojectFromNDCCore(ptNC.x, ptNC.y, zNorm, omitWorld);
            return ptWorld;
        };
        /** maps point from homogeneous space (-1 to +1) to screen space. */
        transformerClass.prototype.viewportTransformPoint = function (v) {
            var gl = this._gl;
            var width = this._canvasWidth;
            var height = this._canvasHeight;
            var newX = vp.data.mapValue(v.x, -1, 1, 0, width);
            var newY = vp.data.mapValue(v.y, -1, 1, height, 0);
            var newZ = v.z; //vp.data.mapValue(v.z, 0, 1, 0, ??);
            return new vp.geom.vector3(newX, newY, newZ);
        };
        /** maps point from screen space to homogeneous space (-1 to +1). */
        transformerClass.prototype.viewportUntransformPoint = function (v) {
            var gl = this._gl;
            var width = this._canvasWidth;
            var height = this._canvasHeight;
            var newX = vp.data.mapValue(v.x, 0, width, -1, 1);
            var newY = vp.data.mapValue(v.y, height, 0, -1, 1);
            var newZ = v.z;
            return new vp.geom.vector3(newX, newY, newZ);
        };
        transformerClass.prototype.scaleMatrix = function (factor, mousePos, isMousePosInWorldUnits) {
            if (isMousePosInWorldUnits) {
                var modelPos = { x: mousePos.x, y: mousePos.y, z: mousePos.z };
            }
            else {
                //---- map mouse position from screen to world coordinates ----
                var modelPos = this.unprojectFromScreen(mousePos.x, mousePos.y);
            }
            this.scaleMatrixAt(factor, modelPos);
        };
        /** here, bounds.x is xMin, bounds.y is yMin.  */
        transformerClass.prototype.worldBoundsToScreen = function (bounds) {
            var min = this.projectToScreen(bounds.x, bounds.y, 0);
            var max = this.projectToScreen(bounds.x + bounds.width, bounds.y + bounds.height, 0);
            //---- in screen coordinates, the Y flips, so the max.y becomes the rc.top ----
            var rc = vp.geom.createRect(min.x, max.y, max.x - min.x, min.y - max.y);
            return rc;
        };
        transformerClass.prototype.worldPointToScreen = function (wx, wy, wz) {
            var ptNew = this.projectToScreen(wx, wy, wz);
            return ptNew;
        };
        transformerClass.prototype.worldSizeToScreen = function (size) {
            var max = this.projectToScreen(size, 0, 0);
            var min = this.projectToScreen(0, 0, 0);
            var sizePx = max.x - min.x;
            return sizePx;
        };
        transformerClass.prototype.screenSizeXToWorld = function (size) {
            var max = this.unprojectFromScreen(size, 0, undefined, true);
            var min = this.unprojectFromScreen(0, 0, undefined, true);
            var sizePx = max.x - min.x;
            return sizePx;
        };
        transformerClass.prototype.screenSizeYToWorld = function (size) {
            var max = this.unprojectFromScreen(0, size, undefined, true);
            var min = this.unprojectFromScreen(0, 0, undefined, true);
            var sizePx = -(max.y - min.y);
            return sizePx;
        };
        transformerClass.prototype.screenSizeZToWorld = function (size) {
            var max = this.unprojectFromScreen(0, 0, size, true);
            var min = this.unprojectFromScreen(0, 0, 0, true);
            var sizePx = -(max.z - min.z);
            return sizePx;
        };
        transformerClass.prototype.mapLinearFromScreenToWorld = function (x, y) {
            //---- used for mapping bounds on the Z plane from screen to world (not for general object mapping) ----
            var xPercent = x / this._canvasWidth;
            var yPercent = (this._canvasHeight - y) / this._canvasHeight; // flip it 
            var wb = this.getWorldBounds();
            var xWorld = wb.left + xPercent * (wb.right - wb.left);
            var yWorld = wb.bottom + yPercent * (wb.top - wb.bottom);
            var pt3 = { x: xWorld, y: yWorld, z: 0 };
            return pt3;
        };
        transformerClass.prototype.screenToWorldBounds = function (rc) {
            var min = this.mapLinearFromScreenToWorld(rc.left, rc.bottom);
            var max = this.mapLinearFromScreenToWorld(rc.right, rc.top);
            var worldBounds = vp.geom.createRect(min.x, min.y, max.x - min.x, max.y - min.y);
            return worldBounds;
        };
        transformerClass.prototype.translateMatrixEx = function (x, y, z) {
            var mat2 = vp.geom.matrix4.createTranslation(x, y, z);
            this.multiplyTransform(mat2);
        };
        transformerClass.prototype.scaleMatrixAt = function (factor, atPos) {
            vp.utils.debug("scaleMatrixAt: factor=" + factor);
            //---- to scale at "atPos", we need to make atPos to the origin ----
            //---- translate by -atPos, scale, translate by +atPos ----
            var mat1 = vp.geom.matrix4.createTranslation(-atPos.x, -atPos.y, -atPos.z);
            var mat2 = vp.geom.matrix4.createScale(factor, factor, factor);
            var mat3 = vp.geom.matrix4.createTranslation(atPos.x, atPos.y, atPos.z);
            //---- until this is reliable, just use a simple scaling ----
            //this.multiplyTransform(mat1);
            this.multiplyTransform(mat2);
            //this.multiplyTransform(mat3);
        };
        transformerClass.prototype.rotateMatrixX = function (value, additive) {
            if (additive === void 0) { additive = true; }
            var aaRot = vp.geom.matrix4.createRotationX(value);
            this.multiplyTransform(aaRot);
        };
        transformerClass.prototype.rotateMatrixY = function (value, additive, usePostZ) {
            if (additive === void 0) { additive = true; }
            if (usePostZ) {
                // instead of premultiplying by Y rotation, we're postmultiplying by Z which gives the effect 
                // rotating around the Y axis while keeping the x rotation fixed.
                mat4.rotateZ(this._matWorld, this._matWorld, value);
                this._transformChanged = true;
            }
            else {
                var aaRot = vp.geom.matrix4.createRotationY(value);
                this.multiplyTransform(aaRot);
            }
        };
        transformerClass.prototype.rotateMatrixZ = function (value) {
            var aaRot = vp.geom.matrix4.createRotationZ(value);
            this.multiplyTransform(aaRot);
        };
        transformerClass.prototype.xRotation = function (value) {
            if (value === undefined) {
                return vp.utils.toDegrees(this._xRotation);
            }
            value = vp.utils.toRadians(value);
            this.rotateMatrixX(value - this._xRotation);
            this._xRotation = value;
        };
        transformerClass.prototype.yRotation = function (value) {
            if (value === undefined) {
                return vp.utils.toDegrees(this._yRotation);
            }
            value = vp.utils.toRadians(value);
            this.rotateMatrixY(value - this._yRotation);
            this._yRotation = value;
        };
        transformerClass.prototype.zRotation = function (value) {
            if (value === undefined) {
                return vp.utils.toDegrees(this._zRotation);
            }
            value = vp.utils.toRadians(value);
            this.rotateMatrixZ(value - this._zRotation);
            this._zRotation = value;
        };
        transformerClass.prototype.getMatrix = function () {
            return this._matWorld;
        };
        /** "width" is the width of the camera's canvas, is pixels.  "height" is height of canvas. */
        transformerClass.prototype.updateCamera = function (isOrthoCamera, width, height) {
            this._canvasWidth = width;
            this._canvasHeight = height;
            this._isOrthoCamera = isOrthoCamera;
            this.rebuildProjectionMatrix();
        };
        transformerClass.prototype.cameraParams = function (cp) {
            if (arguments.length == 0) {
                var cp = new beachParty.CameraParams();
                cp.world = this._matWorld;
                cp.view = this._matView;
                cp.projection = this._matProjection;
                cp.rcxWorld = this._rcxWorld;
                //cp.width = this._canvasWidth;
                //cp.height = this._canvasHeight;
                return cp;
            }
            this._matWorld = cp.world;
            this._matProjection = cp.projection;
            this._matView = cp.view;
            //this._canvasWidth = cp.width;
            //this._canvasHeight = cp.height;
            //---- since we did not this camera, invalidate our own extended camera properties ----
            this._rcxWorld = cp.rcxWorld; //  undefined;
            this._isOrthoCamera = undefined;
            this.onDataChanged("world");
            this.onDataChanged("view");
            this.onDataChanged("projection");
        };
        transformerClass.prototype.getWorldBounds = function () {
            return this._rcxWorld;
        };
        transformerClass.prototype.toFloatv3 = function (v) {
            var a = new Float32Array(3);
            a[0] = v.x;
            a[1] = v.y;
            a[2] = v.z;
            return a;
        };
        return transformerClass;
    }(beachParty.dataChangerClass));
    beachParty.transformerClass = transformerClass;
    var Rect3d = (function () {
        function Rect3d(left, right, top, bottom, front, back) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
            this.front = front;
            this.back = back;
        }
        return Rect3d;
    }());
    beachParty.Rect3d = Rect3d;
})(beachParty || (beachParty = {}));
