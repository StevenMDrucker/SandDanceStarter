/// <reference path="thirdParty/hammer.d.ts" />
/// <reference path="thirdParty/jszip.d.ts" />
/// <reference path="vuePlotCore.d.ts" />
/// <reference path="beachPartyShape.d.ts" />
/// <reference path="beachPartyChart.d.ts" />
declare module beachParty {
    class baseAppControlClass extends dataChangerClass implements IAppControl {
        _root: HTMLElement;
        _isClosing: boolean;
        getRootElem(): HTMLElement;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number): void;
        hide(): void;
        remove(): void;
        onClose(): void;
        /** Remove the panel from the DOM and unhook non-DOM event handlers on this._dataOwner. */
        close(): void;
    }
    interface IPanelMgr extends IDataChanger {
        getRootElem(): HTMLElement;
        close(): any;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number): any;
        show(): any;
        hide(): any;
        getJsonPanel(): jsonPanelClass;
    }
    interface IAppControl {
        getRootElem(): HTMLElement;
        close(): any;
        remove(): any;
        hide(): any;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number): any;
        registerForChange(name: string, callback: any): void;
    }
}
declare module beachParty {
    class basePopupClass extends baseAppControlClass {
        _ownerElem: HTMLElement;
        _keyboardFunc: any;
        _mouseDownFunc: any;
        _dblClickFunc: any;
        _autoCloseOnDblClick: boolean;
        _autoCloseOnOwnerMouseDown: boolean;
        _autoCloseOnOwneeMouseDown: boolean;
        _openerIds: string;
        _isOpenId: string;
        _popupId: number;
        /** "openerIds" are id's of controls that can open this panel. */
        constructor(openerIds: string, ownerElem?: HTMLElement, isOpenId?: string);
        getTopLevelParent(elem: HTMLElement): HTMLElement;
        setOpenerSelected(value: boolean): void;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number, clearBounds?: boolean): void;
        checkForTopOverlap(top: number, bottom: number, yMargin: number, panelHeight: number): number;
        checkForLeftOverlap(left: number, right: number, xMargin: number, panelWidth: number): number;
        /** Open the specified panel so that it is near x,y but not overlapping with any of the 4 window edges. */
        openWithoutOverlap(left: number, top: number, right: number, bottom: number, fadeInOpts?: number, clearBounds?: boolean): void;
        fixUpMouseEvent(e: any): any;
        onAnyKeyDown(e: any): void;
        onMyDblClick(e: any): void;
        /** is overriden by subclasses, like basePopup. */
        isAutoClose(): boolean;
        doesElementBelongToMe(elem: HTMLElement): any;
        onAnyMouseDown(e: any): void;
        isMyOpener(id: string): boolean;
        isVisible(): boolean;
        installEventHandlers(): void;
        show(value?: boolean): void;
        hide(): void;
        /** Remove the panel from the DOM and unhook non-DOM event handlers on this._dataOwner. */
        close(): void;
    }
}
declare module beachParty {
    class basePanelClass extends basePopupClass {
        static panelCount: number;
        _app: appClass;
        _imgPin: HTMLImageElement;
        _titleElem: HTMLElement;
        _contentRow: HTMLElement;
        _autoCloseRow: HTMLElement;
        _titleRowElem: HTMLElement;
        _isDialog: boolean;
        _primaryControl: any;
        _dataOwner: dataChangerClass;
        _hasTitle: boolean;
        _title: string;
        _hideTitleCloseButton: boolean;
        _tooltip: string;
        _isOpacityDisabled: boolean;
        _isFlexPanel: boolean;
        _onMouseMoveFunc: any;
        _onMouseUpFunc: any;
        _ptDown: any;
        _isDragging: boolean;
        _isFloating: boolean;
        _closeOnAction: boolean;
        _isUserSized: boolean;
        _sizeAtMouseDown: any;
        _onResizeMouseMoveFunc: any;
        _onResizeMouseUpFunc: any;
        _onResizeCallback: any;
        constructor(app: appClass, name: string, isDialog: boolean, bgColor?: string, title?: string, width?: number, height?: number, resizeable?: boolean, tooltip?: string, hideTitleCloseButton?: boolean, addAutoClose?: boolean, omitCloseButtons?: boolean, isOpacityDisabled?: boolean, isFlexPanel?: boolean, uiOpenName?: string);
        setHeightForIE(): void;
        getContentRoot(): HTMLElement;
        buildTitleRow(rootW: vp.dom.singleWrapperClass, text: any): void;
        updateTextBoxClasses(newClassName: string): void;
        isAutoClose(): boolean;
        getDataOwner(memberName: string): any;
        callMethod(methodName: string, ...params: any[]): any;
        getValue(propName: string): any;
        setValue(propName: string, value: any): void;
        onUserAction(row: any, isCloseAction?: boolean, gesture?: Gesture, elementType?: ElementType, name?: string): void;
        isFloating(value?: boolean): boolean;
        onPinnedDownChanged(): void;
        onLayoutChanged(): void;
        togglePin(e: any, fromUserClick?: boolean): void;
        centerPanel(): void;
        onFocus(e: any): void;
        createResizer(rootW: any): void;
        setFloatingClass(value: any): void;
        showTitle(value: boolean): void;
        isShowingTitle(): boolean;
        open(left?: number, top?: number, right?: number, bottom?: number): void;
        onResizeMouseMove(e: any): void;
        removeRightBottomAlignment(elem: HTMLElement): void;
        changePanelSize(width: number, height: number): void;
        onResizeMouseUp(e: any): void;
        onDragMouseDown(e: any): void;
        onDragMouseMove(e: any): void;
        onDragMouseUp(e: any): void;
        onAnyKeyDown(e: any): void;
        commitEditOnCurrentControl(): void;
        processOnEnter(): void;
        scheduleClose(): void;
        onEnterKey(isFromKeyboard: boolean, fromAcceptButton: boolean): void;
        onEscapeKey(): void;
        close(): void;
    }
}
declare module beachParty {
    class jsonPanelClass extends basePanelClass {
        static nextPickerButtonId: number;
        _tabParentElem: HTMLElement;
        _currentTabContentElem: HTMLElement;
        _currentTabButtonElem: HTMLElement;
        _isPanelLoading: boolean;
        _groupDataName: string;
        _lastRowW: any;
        _controlsById: any;
        _primaryControl: IAppControl;
        _isCol1Indent: boolean;
        _rowSpacing: any;
        _controls: any[];
        _lastTdW: any;
        _acceptDataName: any;
        _firstRowOfContent: boolean;
        _currentTabId: string;
        _nameOfTabBeingBuilt: string;
        _grid: gridLayoutClass;
        _jsonObj: any;
        _promptForCurrentRow: HTMLElement;
        _panelName: string;
        _defaultButton: HTMLElement;
        _app: appClass;
        _tabNames: string[];
        _isColFillGrid: boolean;
        _ownersWithCallbacks: dataChangerClass[];
        constructor(app: appClass, openerIds: string, dataOwner: dataChangerClass, name: string, json: any, bgColor?: string, isCol1Indent?: boolean, title?: string, tip?: string, localeName?: string, isFlexPanel?: boolean, uiOpenName?: string);
        showTab(tabName: string, show: boolean): void;
        getTabContentRoot(tabName: string): any;
        setFocusToFirstControl(tabId?: string): void;
        buildTabs(parentW: vp.dom.IWrapperOuter, tabs: any, rightAlignTabs: boolean): void;
        getTabIndex(tabName: string): number;
        selectTab(tabId: any): void;
        onTabSelected(tabButton: HTMLElement): void;
        forceTabBuild(tabIndex: number): vp.dom.IWrapperOuter;
        addRow(tableW: any): any;
        startNewTable(parentW: any, rowSpanPos?: string): {
            normalTableW: any;
            rowSpanTdW: vp.dom.IWrapperOuter;
        };
        createTabContent(parentW: vp.dom.IWrapperOuter, id: string, rows: any, parentObj: any): vp.dom.singleWrapperClass;
        getControlById(id: string): any;
        /** we return 'tableW', in case we created a new table that caller should continue using. */
        buildRow(grid: gridLayoutClass, row: any): void;
        createCustomControl(prompt: string, grid: gridLayoutClass, row: any): void;
        createCustomList(prompt: string, grid: gridLayoutClass, row: any): void;
        rebuildCustomList(listW: any, row: any): void;
        createButton(prompt: string, grid: gridLayoutClass, row: any): void;
        createImage(src: string, grid: gridLayoutClass, row: any): void;
        createProgress(prompt: string, grid: gridLayoutClass, row: any): void;
        onEnterKey(isFromKeyboard: boolean, fromAcceptButton: boolean): void;
        onAcceptButton(): void;
        onCancelButton(): void;
        close(): void;
        onClickButton(e: any): void;
        layoutFix(): void;
        applyCommonProperties(grid: gridLayoutClass, row: any): void;
        getSizeWithUnits(value: any): any;
        sendText(row: any, e: any, text: string, optArg?: boolean): void;
        createTextBox(prompt: string, grid: gridLayoutClass, row: any): void;
        /** create a div that displays readonly text. */
        createDisplay(prompt: string, grid: gridLayoutClass, row: any): void;
        removePromptSuffix(prompt: string): string;
        createPromptElem(parentW: vp.dom.IWrapperOuter, prompt: string, tip: string, isHtml?: boolean, elemName?: string): vp.dom.singleWrapperClass;
        createLabel(prompt: string, grid: gridLayoutClass, row: any, isPromptForElem: boolean): vp.dom.singleWrapperClass;
        createLongPrompt(prompt: string, grid: gridLayoutClass, row: any, isPromptForElem: boolean): vp.dom.singleWrapperClass;
        createHorizontalRule(prompt: string, grid: gridLayoutClass, row: any): vp.dom.singleWrapperClass;
        createTextArea(prompt: string, grid: gridLayoutClass, row: any): void;
        createNumAdjuster(prompt: string, grid: gridLayoutClass, row: any): void;
        createColorPicker(prompt: string, grid: gridLayoutClass, row: any): void;
        createPicker(prompt: string, grid: gridLayoutClass, row: any, onOpenCallback: any, noneName?: string): void;
        showGeneralPicker(row: any, prompt: string, propName: string, ddTextW: any, chevronW: any, e: any, p2: any, creatorFuncName: string, valueCallback?: any, noneName?: string): void;
        createOpenDataPickerList(prompt: any, grid: gridLayoutClass, row: any): any;
        createKnownDataPickerList(propName: any, grid: gridLayoutClass, row: any, useTestData: boolean): any;
        getParentForListOutsideOfGrid(grid: gridLayoutClass): vp.dom.IWrapperOuter;
        createGeneralList(prompt: string, grid: gridLayoutClass, row: any, creatorFuncName: string, id: string): any;
        callPanelCreator(creatorMethod: string, parent: HTMLElement, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any): any;
        openPicker(picker: popupMenuClass, chevronW: any): void;
        createCheckbox(prompt: string, grid: gridLayoutClass, row: any): void;
        registerForRemovableChangeInOwner(thisObj: any, dataName: string, callback: any): void;
        createRadioButton(prompt: string, grid: gridLayoutClass, row: any): void;
        createPane(prompt: string, grid: gridLayoutClass, row: any): void;
        updateRadio(dataName: string, myValue: any, rbElem: HTMLInputElement): void;
    }
    function buildJsonPanel(app: appClass, openerIds: string, dataOwner: dataChangerClass, panelName: string, openPanel: boolean, left?: number, top?: number, right?: number, bottom?: number, toggleOpen?: boolean, isCol1Indent?: boolean, isFlexPanel?: boolean, uiOpenName?: string): jsonPanelClass;
}
declare module beachParty {
    class baseJsonControlClass extends dataChangerClass implements IPanelMgr {
        _jsonPanel: jsonPanelClass;
        getRootElem(): HTMLElement;
        getButtonRect(buttonId: string): any;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number): void;
        show(value?: boolean): void;
        hide(): void;
        remove(): void;
        getJsonPanel(): jsonPanelClass;
        close(): void;
    }
}
declare module beachParty {
    class numAdjustDial extends dataChangerClass {
        _root: HTMLElement;
        _nameText: HTMLElement;
        _valueText: HTMLElement;
        _draggingLine: HTMLElement;
        _imgCircle: HTMLElement;
        _className: string;
        _valueAtStartOfDrag: number;
        _isEndOfDrag: boolean;
        _isDragging: boolean;
        _ptDown: any;
        _isMouseDown: boolean;
        _delayTimer: any;
        _xCircle: number;
        _yCircle: number;
        _angleAdj: number;
        private _numValue;
        _name: string;
        _minValue: number;
        private _maxValue;
        _tooltip: string;
        _style: AdjusterStyle;
        _roundValues: boolean;
        _syncChanges: boolean;
        _spreadLow: boolean;
        /** if "syncChanges" is true, a dataChanged event on "value" is issued whenever the numAdjuster value is changed.  if false,
        event is only triggered on mouse up. */
        constructor(rootName: string, name: string, initialValue: number, minValue: number, maxValue: number, tooltip: string, style: AdjusterStyle, roundValues?: boolean, syncChanges?: boolean, spreadLow?: boolean);
        minValue(value?: number): number;
        maxValue(value?: number): number;
        getRoot(): HTMLElement;
        value(value?: number, notifyChanged?: boolean): number;
        buildControlParts(root: vp.dom.IWrapperOuter): void;
        show(value: boolean): void;
        isShowing(): boolean;
        /** if user clicked on left side of circle, decrement count by 1; otherwise, increment count by 1. */
        onClickInCircle(e: any): void;
        positionLine(p1: any, p2: any): void;
        updateValueText(): void;
        onMouseDown(e: any): void;
        onMouseMove(e: any): void;
        setValueFromPercent(percent: number, inDeadZone: boolean): void;
        setNextMsgDelay(): void;
        onMouseUp(e: any): void;
        hookEvents(): void;
    }
    /** Choose the style according to where the adjuster will be placed within the window.  Use "bottom" for centeral placements. */
    enum AdjusterStyle {
        left = 0,
        top = 1,
        right = 2,
        bottom = 3,
        bottomInPanel = 4,
        topInPanel = 5,
    }
}
declare module beachParty {
    class numAdjustSliderClass extends dataChangerClass {
        _app: appClass;
        _root: HTMLElement;
        _textElem: HTMLElement;
        _chevronElem: HTMLElement;
        _sliderHostElem: HTMLElement;
        _popupHost: basePopupClass;
        _prompt: string;
        _minValue: number;
        _maxValue: number;
        _numValue: number;
        _syncChanges: boolean;
        _spreadLow: boolean;
        _roundValues: boolean;
        _isMouseDownOnChevon: boolean;
        _sliderAssembly: sliderAssemblyClass;
        _hostSliderInPanel: boolean;
        _nameValueMap: any;
        _sliderWidth: number;
        _textForWidth: any;
        constructor(app: appClass, parentElem: HTMLElement, prompt: string, initialValue: number, minValue: number, maxValue: number, tooltip: string, style: AdjusterStyle, roundValues?: boolean, syncChanges?: boolean, spreadLow?: boolean, sliderWidth?: number, useDeskStyle?: boolean, hostSliderInPanel?: boolean, nameValueMap?: any, textForWidth?: string);
        addChevron(tdW: any): void;
        closeSlider(): void;
        toggleSliderAssembly(): void;
        createPopupHost(): basePopupClass;
        updateAssemblyPosition(): void;
        openSlider(): void;
        refreshChevron(): void;
        onUpOrDown(isUp: boolean): boolean;
        addTextBox(textRowW: vp.dom.IWrapperOuter, text: string, useDeskStyle: boolean): void;
        setWidthForFont(): void;
        onTextKeyDown(e: any): void;
        format(value: number, decimals: number): any;
        show(value: boolean): void;
        isShowing(): boolean;
        minValue(value?: number): number;
        maxValue(value?: number): number;
        getRoot(): HTMLElement;
        getKeyMatch(str: string): any;
        valueToDisplay(value: number): any;
        displayToValue(str: string): any;
        value(value?: any, notifyChanged?: boolean, source?: string): number;
        updateSliderValue(): void;
        updateTextBox(): void;
    }
    function createNumAdjusterClass(app: appClass, parent: any, name: string, initialValue: number, minValue: number, maxValue: number, tooltip: string, style: AdjusterStyle, roundValues?: boolean, syncChanges?: boolean, spreadLow?: boolean, sliderWidth?: number, useDeskStyle?: boolean, hostSliderInPanel?: boolean, nameValueMap?: any, textForWidth?: string): any;
}
declare module beachParty {
    class popupMenuClass extends basePopupClass {
        context: any;
        _app: appClass;
        _table: HTMLTableElement;
        _hideAfterCallback: boolean;
        _callback: any;
        _iconWidth: number;
        _verticalMargin: number;
        _maxPanelHeight: number;
        _iconClassName: string;
        constructor(app: appClass, openerIds: string, id: string, items: any[], callback: any, hideAfterCallback?: boolean, limitHeight?: boolean, verticalMargin?: number, iconWidth?: number, ownerElem?: HTMLElement, iconClassName?: string);
        setDockedTheme(value: any): void;
        buildMenu(items: any[]): void;
        changeRootClass(newClass: string): void;
        static addItem(themeMgr: themeMgrClass, itemsW: vp.dom.IWrapperOuter, item: any, indexes: any, hideAfterCallback: boolean, clickCallback: any, hideCallback?: any, iconWidth?: number, clipText?: boolean, iconClassName?: string, ownerElem?: any): vp.dom.singleWrapperClass;
        close(): void;
    }
    class MenuItemData {
        iconSrc: string;
        preText: string;
        text: string;
        isDisabled: boolean;
        tooltip: string;
        padding: string;
        constructor(text: string, tooltip?: string, iconSrc?: string, isDisabled?: boolean, padding?: string, preText?: string);
    }
}
declare module beachParty {
    class appClass extends dataChangerClass implements IAppMin {
        static buildId: string;
        static maxPanelHeight: number;
        static maxPanelWidth: number;
        _nextSnapShotNum: number;
        _chartIsLoaded: boolean;
        _knownFileParams: Preload[];
        _activeContextMenu: popupMenuClass;
        _searchCol: string;
        _searchValue: string;
        _insightMgr: insightMgrClass;
        _dataTipMgr: dataTipMgrClass;
        _initSessionId: string;
        _edition: string;
        _machineId: string;
        _sessionId: string;
        _serverCmds: any[];
        _undoMgr: undoMgrClass;
        _finishInitNeeded: boolean;
        _fileLoadCount: number;
        _isLoggingEnabled: boolean;
        _notesPanel: notesPanelClass;
        _showInsightPanelOnStop: boolean;
        _scriptRunner: scriptRunnerClass;
        _chartCycleNum: number;
        _infoMsgTimer: any;
        _animateDisabledFromUrlParams: boolean;
        _blankValueStr: string;
        _unnamedColStr: string;
        _fileOpenMgr: dataPanelMgr;
        _iconBarBuilt: boolean;
        _maxScatterSizeInPixels: number;
        _panelMaster: panelMasterClass;
        _defaultCol: string;
        _dataToLoadOnInit: string;
        _tourToLoadOnInit: string;
        _fakeLabel: HTMLElement;
        _scriptRecorder: scriptRecorderClass;
        _themeMgr: themeMgrClass;
        _layoutTimer: any;
        _trueRecordCount: number;
        _aggFilteredRecordCount: number;
        _bigDataMgr: bigDataMgrClass;
        _isUiVisible: boolean;
        _errorCount: number;
        _iconBarMgr: iconBarMgrClass;
        _bigBarMgr: bigBarMgrClass;
        _isInstancing: boolean;
        _frameStatsMsgBlock: CycleStats;
        _forceExternalSession: boolean;
        _includeMissingData: boolean;
        _forceCategory: boolean;
        _appSettingsMgr: appSettingsMgr;
        _botChat: botChatClass;
        _initialLocale: string;
        _localeMgr: localeMgrClass;
        _selectionMode: SelectMode;
        _hideLogoOnInit: boolean;
        _hideUiOnInit: boolean;
        _dataEngine: dataEngineClass;
        _paletteMgr: IPaletteMgr;
        _areLegendsEnabled: boolean;
        _hasCmdServer: boolean;
        _webSocket: WebSocket;
        _webSocketConnected: boolean;
        _cmdServerUrl: any;
        _sceenLayouts: any[];
        _uiVisibleTimer: any;
        _auxMgr: auxMgrClass;
        _xMgr: attrMgrClass;
        _yMgr: attrMgrClass;
        _zMgr: attrMgrClass;
        _sizeMgr: sizeMgrClass;
        _shapeMgr: shapeMgrClass;
        _facetMgr: attrMgrClass;
        _colorMgr: colorMgrClass;
        _imageMgr: attrMgrClass;
        _lineMgr: lineMgrClass;
        _textMgr: textMgrClass;
        _isFirstInfoBox: boolean;
        _isInitializing: boolean;
        _charts: IChart[];
        _chartRouter: IChartRouter;
        _isInsightLoading: boolean;
        _insightWaitingForFilterChanged: boolean;
        _scrubberDialog: scrubberDialogClass;
        _slicerPanel: jsonPanelClass;
        _clientAppId: any;
        _hostDomain: any;
        _slicerColName: string;
        _slicerData: BinResult;
        _slicerInitialValue: any;
        _slicerControl: slicerControlClass;
        _filterMgr: filterMgrClass;
        _selectionMgr: selectionMgrClass;
        _layersMgr: layersMgrClass;
        _timeMgr: timeMgrClass;
        _detailsMgr: detailsPanelMgrClass;
        _colorLegend: colorLegendClass;
        _sizeLegend: sizeLegendClass;
        _shapeLegend: shapeLegendClass;
        _textLegend: textLegendClass;
        _facetLegend: facetLegendClass;
        _generalPicker: popupMenuClass;
        _xBinAdjuster: numAdjustSliderClass;
        _yBinAdjuster: numAdjustSliderClass;
        _zBinAdjuster: numAdjustSliderClass;
        _filterDesc: SelectionDesc;
        _selectionDesc: SelectionDesc;
        constructor();
        run(): void;
        rebuildBothToolBars(): void;
        stopUiVisibleTimer(): void;
        startListeningForServerCommands(url: string): void;
        runNextServerCmd(displayCmds: boolean, delayBetweenCmds: boolean): void;
        mapCompositeAttr(attrName: string, value: string): void;
        runCompositeCmd(cmdObj: any): void;
        createChart(chartName: string): chartClass;
        onSortByChanged(): void;
        onDataFrame(chart: IChart): void;
        getAppDivElem(): any;
        getBlankValueStr(): string;
        updateUiAfterChartViewChanged(): void;
        updateUiAfterFileChange(): void;
        updateBigButton(baseName: string, attrName: string): void;
        createCharts(): void;
        currentChart(value?: IChart): IChart;
        dataToLoadOnInit(value?: string): string;
        addStyleSheetToCharts(rule: string): void;
        getChartDataMgr(): dataMgrClassEx;
        initChartSubscriptions(chart: IChart): void;
        initPart2(): void;
        onFrameStats(cs: CycleStats): void;
        toggleDatasetPanel(e: any, isFromLegend: boolean): void;
        onSelectedCountChanged(): void;
        onSelectionChanged(): void;
        getDataTipMgr(): dataTipMgrClass;
        getAppSettingsMgr(): appSettingsMgr;
        includeMissingData(value?: boolean): boolean;
        isLineByEnabled(): boolean;
        runBotCommand(cmd: string): void;
        finishInitAfterFileLoad(): void;
        startTourName(tourName: string): void;
        isHosted(): any;
        startTourFromJson(name: string, strJson: string, delay?: number): void;
        isNextEdition(): boolean;
        updateSelectionButton(buttonBaseName: string, selectDesc: SelectionDesc, count: number): void;
        onResetTransforms(): void;
        appInit(): void;
        setElemIcon(selectExp: string, fn: string): void;
        showMsg(title: string, objName: string, msg: string): void;
        /**
         *  Shutdown the app & release as much memory as possible.
        */
        shutDown(): void;
        updateIconNames(): void;
        createAppSettings(): void;
        getPanelMaster(): panelMasterClass;
        setSelectionDesc(selectDesc: SelectionDesc): void;
        isBrowserModern(): boolean;
        setHelperCmdId(value: string): void;
        hookLocalStorageChanges(): void;
        onShowInsightBarChanged(): void;
        onFilenameChanged(): void;
        onAppFileLoaded(): void;
        markIconBarBuildNeeded(): void;
        buildInsightBar(): void;
        toBlob(canvas: HTMLCanvasElement, callback: any): void;
        buildAxisButtons(): void;
        addAxisButton(axisName: string, tooltip: string, prompt: string, addChevron?: boolean, isRotated?: boolean, maxTextWidth?: number): void;
        addIconButton(toolbar: toolbarClass, callbackName: string, rootName: string, tip: string, imgSrc: string, prompt: string, isRotated?: boolean, textForWidth?: string): vp.dom.IWrapperOuter;
        postIconBarBuild(): void;
        onRelationsClick(): void;
        toggleStats(): void;
        disableIconButton(baseName: string, isDisabled: boolean): void;
        disableBigButton(baseName: string, isDisabled: boolean): void;
        onSelectClick(): void;
        onSelectionModeChanged(imgSrc: string): void;
        fixUpButtonsAfterRuleChange(): void;
        onWindowMouseDown(e?: any): void;
        onWindowKeyDown(e?: any): void;
        closeAllPopups(): void;
        showTestAlert(): void;
        onInsightPlayingChanged(): void;
        stopPlayback(): void;
        pausePlayback(): void;
        showPlayUI(isPlaying: boolean, isPaused?: boolean): void;
        onPlaybackStarted(wasPaused?: boolean): void;
        onPlaybackPaused(): void;
        onPlaybackStopped(): void;
        onPlayExClick(e: any): void;
        startPlayback(useAnimation?: boolean): void;
        /**
         *  Switch from pause/stop buttons to the prev/next buttons.
         * @param value
         */
        switchPlaybackButtons(usePrevNext: boolean): void;
        startInsightsShow(): void;
        onNextInsight(delta: number, preventTimer?: boolean): void;
        resumePlayback(): void;
        onChartNotesClick(): void;
        onCurrentInsightChanged(): void;
        onInsightBoundsChange(insight: InsightData): void;
        closeNotesPanel(): void;
        applyDefaultBins(): void;
        onAddView(e: any): void;
        createTestMgrIfNeeded(): void;
        plotTestResults(): void;
        plotEngineEvents(): void;
        addClientMemoryUse(memUse: any): void;
        plotEngineMemoryUse(): void;
        startAutomatedTest(scriptData: ScriptData, fn?: string, runCount?: number): void;
        stopAutomatedTest(): void;
        getPlotBounds(): any;
        quickStats(msg: string): void;
        showAllCharts(value: boolean): void;
        toggleXPanel(e: any, fromLegend: boolean): void;
        toggleYPanel(e: any, fromLegend: boolean): void;
        toggleZPanel(e: any, fromLegend: boolean): void;
        makeUIVisible(): void;
        showRightPanel(value: boolean): void;
        selectFacetBox(index: number): void;
        getIndexOfFacetLabel(label: string): any;
        selectXBox(index: number): void;
        selectYBox(index: number): void;
        selectColorBox(index: number): void;
        selectSizeBox(index: number): void;
        selectShapeBox(index: number): void;
        onChartsCreated(): void;
        loadBotPanel(): void;
        dockPanel(panel: jsonPanelClass, newParent: HTMLElement): vp.dom.singleWrapperClass;
        getNameFromUrl(path: string): string;
        loadInitialDataSet(): void;
        loadLastSession(): any;
        loadInsight(): void;
        onInsightLoadStarted(): void;
        onInsightLoadCompleted(): void;
        loadInsightCore(insight: InsightData): void;
        buildSystemViewData(insight: InsightData): SystemViewData;
        loadInsightPost(insight: InsightData, msgBlock: any): void;
        applyInsightViewParams(insight: InsightData): void;
        openScrubberDialog(e: any): void;
        closeScrubberDialog(): void;
        loadDataTips(dataTips: DataTipData[]): void;
        isSlicerPanelOpen(value?: boolean): boolean;
        /**
         * this is used by WinSandDance (SandDance.exe).
         * @param source
         * @param name
         * @param fn
         * @param delim
         * @param text
         */
        setDataFromHost(source: string, name: string, fn: string, delim: string, text: string): void;
        getContextMenuItems(isDragSelecting: boolean): any[];
        /**
         *  Return build info & instancing info used by About Panel.
         */
        buildInfo(): string;
        opsInfo(): string;
        lastCycleInfo(): string;
        buildChartDetail(): string;
        setContextMenu(pm: popupMenuClass): void;
        closeContextMenu(): void;
        /**
         * Cmd line arguments:
            - reset=true    (resets all local storage - all app options and all other SandDance-related cached data)
            - data=xx       (specifies initial data file)
            - theme=xx      (specifies theme to use)
            - script=xx     (specifies script to load on init)
            - session=guid  (loads a set of insights from the bpServer)

            - edition=next  (specifies that certain in-progress features are visible)
            - zoom=1.5          (OBSOLETE - sets the current zoom factor in use)
            - animate=false     (turns off animation)
            - persistchanges=false      (turns off saving of app settings)
            - isbrowsercontrol=xx       (?)
         */
        processUrlParams(): void;
        areLegendsEnabled(value?: boolean): void;
        setInsightTitleStyle(value: string): void;
        setAppBackgroundStyle(value: string): void;
        showLogo(value?: boolean): void;
        deleteLocalStorageInfo(onlyAppSettings: boolean): void;
        setEdition(value: string): void;
        slicerColName(value?: string): string;
        rebinDataForSlicer(): void;
        slicerData(value?: BinResult): BinResult;
        onItemsByColorClick(): void;
        useCustomXBreaks(): boolean;
        customXBreaks(): string;
        resetMappingsForNewFile(): void;
        getDefaultCol(): string;
        updatePanelColPickers(defaultCol: string): void;
        postFilterChange(): void;
        chart(value?: string): any;
        registerStdPanels(): void;
        colorColumn(): any;
        registerMgrPanels(): void;
        toggleNavPanel(e: any): void;
        showBigBar(value: boolean): void;
        onLockSelection(e: any): void;
        onWheelUp(e: any): void;
        buildShapePalette(steps: number): any[];
        setMappingDataFormatting(md: MappingData): void;
        buildSizePalette(steps: number): any[];
        getColInfo(colName: string, ignoreCase?: boolean): ColInfo;
        colNames(includeSysCols?: boolean): any[];
        getColType(colName: string): string;
        manualLayoutForYStuff(): void;
        onAppPlaybackDurationChanged(): void;
        onAppPlaybackLoopngChanged(): void;
        infoMsg(msg: string): void;
        showError(msg: any): void;
        showInfoMsg(title: string, msg: string, timeout?: number): void;
        cancelErrorTimer(): void;
        openErrorPanel(): void;
        searchCol(value?: string): string;
        searchValue(legendSource: string, value?: string, searchType?: TextSearchType, forceSet?: boolean, selectMode?: SelectMode): string;
        onSearchParamsChanged(searchType?: TextSearchType, selectMode?: SelectMode): void;
        createShapesUrl(shapeTypes: string[]): string;
        drawShapeType(ctx: CanvasRenderingContext2D, shapeType: string, x: number, y: number, width: number, height: number): void;
        buildLegends(): void;
        rebuildLegends(): void;
        loadAutomatedTest(): void;
        buildBinAdjusters(): void;
        isLoggingEnabled(value?: boolean): boolean;
        logAction(gesture: Gesture, elementId: string, elementType: ElementType, action: Action, target: Target, isUndoable: boolean, options?: {
            [key: string]: any;
        }, forceLog?: boolean, nonLogOptions?: {
            [key: string]: any;
        }): void;
        logActionToAzureInsights(sessionId: string, gesture: string, elementId: string, elementType: string, action: string, target: string, options?: any): void;
        sendCmdToServer(cmd: any): void;
        appendTip(tip: string, name: string, value: string): string;
        requestFullChartBuild(): void;
        toggleSettingsPanel(e: any): void;
        toggleAboutPanel(e: any, fromButton?: string): void;
        addMicrosoftFooterToPanel(panel: jsonPanelClass): void;
        /** At some point, we might want to support opening of multiple slicer panels. */
        onSlicerClick(e: any): void;
        toggleSlicerPanel(e: any): void;
        openSlicerPanel(e: any): void;
        openSlicerCore(colName: string, value?: string, toggleOpen?: boolean): void;
        doSearch(legendSource: string, colName: string, minValue: any, maxValue: any, searchType: TextSearchType, selectMode?: SelectMode, selectKey?: string): void;
        closeSlicerPanel(): void;
        createDataTip(title: string, colNames: string[], includeNames?: boolean): void;
        toggleHelpPanel(e?: any, isFromLegend?: boolean): void;
        toggleBotPanel(e?: any, isFromLegend?: boolean): void;
        toggleScriptsPanel(e?: any, isFromLegend?: boolean): void;
        toggleThemesPanel(e?: any, isFromLegend?: boolean): void;
        toggleAggPanel(e?: any, isFromLegend?: boolean): void;
        togglePalettesPanel(e?: any, isFromLegend?: boolean): void;
        toggleTipsPanel(e?: any, isFromLegend?: boolean): void;
        toggleSearchPanel(e?: any, isFromLegend?: boolean): void;
        toggleBrowsePanel(e?: any, isFromLegend?: boolean): void;
        /**
         *  this launches the specified tour.
         * @param tour
         */
        startTour(tour: TourData): void;
        stopTour(): boolean;
        toggleTourLoaderPanel(e?: any, isFromLegend?: boolean): void;
        /**
         * Returns TRUE if this session is being run by someone on the SANDDANCE team.
         */
        isInternalSession(): boolean;
        toggleClusterPanel(e: any): void;
        toggleDetailsPanel(e: any): void;
        imgUrlToBlob(url: string, callback: any): void;
        onSnapshotClick(e: any): void;
        makeQuotedString(value: string, delimiter: string): string;
        dataVectorsToCsv(colNames: string[], nv: any, delimiter: string): string;
        onExportData(e: any): void;
        finishSnapshot(img: HTMLImageElement): HTMLCanvasElement;
        preventHtmlSelection(): void;
        getKnownFiles(useTestData?: boolean): any[];
        /** get files from the current dataset. */
        getOpenFiles(): any[];
        isKnownFile(name: string): boolean;
        onClusterIdCreated(newColInfos: ColInfo[], action: ClusterResultMapping, outputColName: string, numClusters: number): void;
        getMappingCols(includeNone: boolean, noneName?: string): MenuItemData[];
        createKnownDataPicker(openerIds: string, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        /** should be called: on chart change, on x/y/z col change, on data change. */
        updateClusterPanel(): void;
        applySearchPanelParams(e: any, searchCol: string, searchValue: string, selectMode?: SelectMode, searchType?: TextSearchType): void;
        doValueSearch(e: any, legendSource: string, gesture: Gesture, text: string, selectMode?: SelectMode, searchType?: TextSearchType): void;
        doRangeSearch(e: any, legendSource: string, gesture: Gesture, minValue: any, scanner: vp.utils.scannerClass, tok: string, selectMode?: SelectMode): void;
        doOperatorSearch(e: any, legendSource: string, gesture: Gesture, text: string, searchCol: string, selectMode?: SelectMode): void;
        onSearchColClick(e: any): void;
        getTourItems(): string[];
        createEnumPicker(openerIds: string, enumType: any, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        getCurrentFileParams(value?: WorkingDataParams): Preload;
        createScrubberPicker(openerIds: any, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createColumnPicker(openerIds: string, includeBlank: boolean, callback: any, ownerElem?: HTMLElement, noneName?: string): popupMenuClass;
        createTourPicker(openerIds: string, includeBlank: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createPalettePicker(openerIds: string, includeBlank: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createScriptPicker(openerIds: string, includeBlank: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createThemePicker(openerIds: string, includeBlank: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createColumnPickerList(parent: HTMLElement, includeBlank: boolean, callback: any): listBoxClass;
        createKnownDataPickerList(parent: HTMLElement, includeBlank: boolean, callback: any, useTestData: boolean): listBoxClass;
        createOpenDataPickerList(parent: HTMLElement, includeBlank: boolean, callback: any): listBoxClass;
        createColorPicker(openerIds: string, includeTransparent: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createLineColorPicker(openerIds: string, includeShapeColor: boolean, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        createShapePicker(openerIds: string, p2: any, callback: any, ownerElem?: HTMLElement): popupMenuClass;
        closeGeneralPicker(): void;
        createGeneralPicker(openerIds: string, name: string, colItems: any[], callback: any, verticalMargin?: number, iconWidth?: number, ownerElem?: HTMLElement, iconClassName?: string): popupMenuClass;
        createListBox(colItems: any[], callback: any): void;
        getPreload(name: string): any;
        clipTextLength(text: string, maxLength: number): string;
        createFakeTextElement(): void;
        setBigPrompt(baseName: string, value: string): void;
        setBigValue(baseName: string, value: string, toolTip?: string): void;
        toggleWheelMode(e?: any): void;
        onRecordCountChanged(): void;
        onUndoClick(): void;
        onRedoClick(): void;
        onUndoStackChange(): void;
        updateResetButton(): void;
        onFilteredInCountChanged(): void;
        onIsolateClick(e?: any): void;
        toggleTasksPanel(e: any, isFromLegend?: boolean): void;
        onExcludeClick(e?: any): void;
        onResetClick(e?: any, filterOnly?: boolean): void;
        resetSelection(): void;
        onBigBarChanged(): void;
        /**
         * Show or hide the AXIS BUTTONS and BIN COUNT ADJUSTERS, based on current view.  Also, adjust layout "X" and "Y" layouts, as needed.
         * @param hideBins
         */
        toggleAxisButtonsAndBins(hideBins?: boolean): void;
        setAxisButtonText(attrName: string, colName: string): void;
        isSumByEnabled(): boolean;
        showOrHideLineBy(): void;
        isMappingChartAndNot3d(): boolean;
        toggleInsightPanel(e: any): void;
        showInsightsPanel(value?: boolean): void;
        showInsightMenu(e: any): void;
        addNewInsight(e: any): void;
        setAllChartsProperty(propName: string, value: any): void;
        onInsightAdded(): void;
        restoreInsightsFromLastSession(): void;
        createInsight(snapshotType: SnapshotType, getRepro: boolean, callback: any): void;
        isSet(md: MappingData): boolean;
        onLegendsChanged(): void;
        markLayoutNeeded(reason: string): void;
        getPaletteMgr(): IPaletteMgr;
        isVisible(name: string): boolean;
        /**
         *  get bounds of an element, relative to the appDiv (the div containing our HTML app instance).
         */
        getAppRelBounds(selector: any): any;
        layoutScreen(layoutReason: string): void;
        pickGoodColorColumn(): any;
        hideInfoMsg(): void;
        getDefaultXYZCols(): {
            x: any;
            y: any;
            z: any;
        };
    }
    class FilterStack {
        filters: SelectionStack;
    }
    class SelectionStack {
        selects: SelectionDesc[];
    }
}
declare module beachParty {
    class attrMgrClass extends dataChangerClass implements IPanelMgr {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        _attributeName: string;
        _chartRouter: IChartRouter;
        _currentChart: IChart;
        constructor(app: appClass, chartRouter: IChartRouter, attributeName: string);
        getRootElem(): HTMLElement;
        close(): void;
        showAt(left: number, top: number, right?: number, bottom?: number, fadeInOpts?: number): void;
        show(): void;
        hide(): void;
        getJsonPanel(): jsonPanelClass;
        onCurrentChartChanged(): void;
        getAttribute(): attrClass;
        isSet(): any;
        mappingData(value?: MappingData): any;
        colName(value?: string, omitLogging?: boolean, rebindColInfo?: boolean): any;
        defaultBinCountForColumn(colName: string): any;
        getMaxKeysForColumn(colName: string): any;
        onColNameChanged(forceColRemap?: boolean, omitOnMappingCall?: boolean): void;
        calcCustomBreaks(): any;
        getCommaSeparatedValues(str: string): any;
        onCustomStuffChanged(): any;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean): any;
        pushUiUpdate(): void;
        setBinCountFromDefault(): any;
        binCount(value?: number): any;
        sliderBinCount(value?: number): any;
        binSorting(value?: string, disableNotify?: boolean, skipOptionUpdate?: boolean): any;
        setMappingDataFormatting(): any;
        forceCategory(value?: boolean, skipOptionUpdate?: boolean): any;
        useNiceNumbers(value?: boolean, omitOptionUpdate?: boolean): any;
        updateNiceNumbersInMapping(md: MappingData): any;
        valueSpread(value?: string, omitOptionUpdate?: boolean): any;
        useCustomBreaks(value?: boolean, skipOptUpdate?: boolean): any;
        customBreaks(value?: string, skipOptUpdate?: boolean): any;
        useCustomLabels(value?: boolean, skipOptUpdate?: boolean): any;
        customLabels(value?: string, skipOptUpdate?: boolean): any;
        isLegendBottomUp(value?: boolean, omitOptionUpdate?: boolean): any;
        clearForDataChanged(): any;
        updateAttrPanel(jsonPanel: jsonPanelClass): void;
        onClose(): void;
    }
}
declare module beachParty {
    class lineMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        maxLineShapes(value?: number, omitLogging?: boolean): any;
        lineColor(value?: string, omitLogging?: boolean): any;
    }
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
    class dataEngineClass extends beachParty.dataChangerClass {
        private _app;
        private _preloadMgr;
        private _relationMgr;
        private _dataCacheParams;
        constructor(app: appClass, isCachingWebFiles: boolean);
        getRelationMgr(): relationMgrClass;
        createDataMgr(): dataMgrClassEx;
        getKnownPreloads(callback: any): void;
        dataCacheParams(value?: DataCacheParams): DataCacheParams;
        isCacheWebFiles(value?: boolean): boolean;
    }
}
declare module beachParty {
    class dataMgrClassEx extends beachParty.dataMgrClass implements dataMgrClass {
        private _dataEngine;
        private _app;
        private _loadedFileOpenText;
        private _fileOpenObjs;
        private _pendingChangeFlags;
        private _changeTimer;
        constructor(app: IAppMin, dataEngine: dataEngineClass, preloadMgr: beachParty.preloadMgrClass, isCachingWebFiles: boolean);
        queueDataChangeFlag(flag: DataChangeFlags): void;
        triggerDataChange(): void;
        loadFileFromRelationMgr(name: string, callback: any): void;
        getWdParams(url: string, fileType: string, scrubberTemplate?: string, fileHasHeader?: boolean): any;
        loadLocalFile(url: string, fileType: string, dataScrubberName: string, fileHasHeader: boolean, callback?: any): void;
        reloadDataPerScrubbing(editInfos: editColInfo[], preload: Preload, callback: any): void;
        getDataFrameMin(): dataFrameClass;
        loadedFileOpenText(value?: string): any;
        loadData(wdParams: any, callback?: any): void;
        loadDataFromServer(wdParams: WorkingDataParams, callback: any): void;
        setFileOpenObjects(objs: any[]): void;
        loadKnownDataFromServer(name: string, callback: any): void;
        /** load the file from cache or as known file. */
        autoloadFile(wdParams: WorkingDataParams, callback?: any): boolean;
        loadFrom(data: any, fn: string, wdParams?: WorkingDataParams, callback?: any): void;
        getLocalFileFromCache(wdParams: WorkingDataParams, reportError?: boolean): any;
        isHosted(): any;
        /**
         * This is the normal start of loading a known data file. It supports just closing the current file,
         * loading a file via a hosting app, loading from local storage/cache, and calling our beachParty server
         * to load the file.
         * @param name
         * @param fromUI
         * @param callback
         */
        openKnownFile(name: string, fromUI: boolean, callback?: any): void;
        getPreloadFromLocalStorage(fn: string, fileSource?: string, tableName?: string): Preload;
    }
}
declare module beachParty {
    class localFileHelper {
        static loadFile(settings: appSettingsMgr, fileExts: string, callback: any): void;
        static isZipFile(fn: string): boolean;
        static loadFileFromFileObj(settings: appSettingsMgr, file: File, callback: any): void;
        /** loads image as 1 pixel per row, with columns: x, y, r, g, b, a. */
        static loadImageFromUrl(url: string, callback: any): void;
        static getFileOpenSelections(fileExts: string, callback: any): void;
        /**
         * Truncate text after seeing (1 + sampleCount) newline chars.
         * @param text
         * @param sampleCount
         */
        private static truncateRecords(text, sampleCount);
        private static countLinesInText(text);
        /**
         *  For now, only "First" sampling is supported for local text files.
         * @param fileToLoad
         * @param callback
         */
        private static sampleLargeTextFile(settings, firstText, bytesPerRecord, fileToLoad, callback);
        private static loadTextFileFromFileObj(settings, fileToLoad, callback);
        private static loadTextFileWithoutSampling(firstText, fileToLoad, callback);
        private static loadTextFileWithSampledChunk(settings, sampledTextChunk, fileToLoad, callback);
        private static loadImgFileFromFileObj(fileToLoad, callback);
        private static loadBlobFileFromFileObj(fileToLoad, callback);
        static saveToLocalFile(fn: string, value: any, blobType?: string): void;
        static saveBlobToLocalFile(fn: string, blobObject: Blob, blobType?: string): void;
    }
}
declare module beachParty {
    class relationMgrClass extends beachParty.dataChangerClass {
        _app: appClass;
        _preload: Preload;
        _fileObjs: File[];
        _tableInfos: TableInfo[];
        _relationMap: {};
        constructor(app: appClass);
        getFileObjs(): File[];
        setFileObjs(value: File[], preload: Preload): void;
        buildRelations(): void;
        buildTableInfos(index: number): void;
        private buildColInfos(tableInfo, fileObj);
        getFileObj(name: string): any;
        getFileText(name: string, callback: any): void;
        getFileCount(): number;
        getFileNames(): any[];
    }
    enum RelType {
        oneToOne = 0,
        oneToMany = 1,
        manyToOne = 2,
    }
    class Relation {
        sourceName: string;
        destName: string;
        sourceColumn: string;
        destColumn: string;
        relType: RelType;
    }
    class TableInfo {
        name: string;
        fileObj: File;
        colInfos: ColInfo[];
    }
}
declare function loadHtmlAndCreateApp(appDiv: HTMLElement, iconPath?: string, scriptCmds?: string): void;
declare function getSymbolValue(str: any, name: any): any;
declare function loadAppHtml(appDiv: HTMLElement): void;
declare function loadAppStyle(): void;
declare module beachParty {
    enum FontWeight {
        lighter = 0,
        normal = 1,
        bold = 2,
        bolder = 3,
    }
}
declare module beachParty {
    class toolbarClass {
        _root: HTMLElement;
        _app: appClass;
        _cbInstances: any;
        _textSize: number;
        _valueSize: number;
        _iconSize: number;
        _showIcon: boolean;
        _showText: boolean;
        _showChevron: boolean;
        constructor(app: appClass, toolbarDiv: HTMLElement, callbackInstances: any[]);
        startBuild(forceTextVisible?: boolean): void;
        callMethod(methodName: string, e: any): void;
        addBigButton(button: BigButtonData): any;
        addIconButton(button: IconButtonData): any;
        addBigSpacer(): void;
        addIconSpacer(): void;
    }
    class IconButtonData {
        root: string;
        prompt: string;
        icon: string;
        tip: string;
        chevron: boolean;
        disabled: boolean;
        cbName: string;
        rotated: boolean;
        inToolbar: boolean;
        textForWidth: string;
    }
    class BigButtonData {
        btName: string;
        baseName: string;
        prompt: string;
        value: string;
        tip: string;
        chevron: boolean;
        cb: string;
    }
}
declare module beachParty {
    class dataTipClass extends baseAppControlClass {
        _app: appClass;
        _img: HTMLImageElement;
        _text: HTMLDivElement;
        _chart: IChart;
        _title: string;
        _columnNames: string[];
        _includeNames: boolean;
        _dataTipOffset: any;
        _primaryKey: string;
        _rcImgInPlot: any;
        _ptMouseDown: any;
        _onMouseMoveFunc: any;
        _onMouseUpFunc: any;
        _isRealDrag: boolean;
        _szIcon: any;
        constructor(app: appClass, parentElem: HTMLElement, chart: IChart);
        showContextMenu(e: any): void;
        onMouseDown(e: any): void;
        getIconBounds(): any;
        getDataTipData(): DataTipData;
        setDataTipData(dtd: DataTipData): void;
        setParams(title: string, colNames: string[], includeNames: boolean): void;
        show(value?: boolean): void;
        getDefaultColumns(): string[];
        /**
         * The dataTip normally shows the information for the shape that it is closest to.  When the data tip is locked, it is bound to
         * a particular shape and will follow the shape as the view changes.  The data tip becomes locked to a shape when it finds a shape that is within its radius.
         * @param unlock - when true, unlock the primary key binding for this shape.
         */
        updateTextAndOffset(unlock?: boolean): void;
        buildTextFromColumnValues(colNames: string[], colValues: string[]): void;
        startDrag(e: any, offset: any): void;
        onMouseMove(e: any): void;
        moveToPoint(x: number, y: number, centerRelative?: boolean): void;
        onMouseUp(e: any): void;
    }
}
declare module beachParty {
    class dataTipMgrClass extends dataChangerClass {
        _dataTips: dataTipClass[];
        _app: appClass;
        constructor(app: appClass);
        addDataTip(chart: IChart, title: string, colNames: string[], includeNames: boolean, pt?: any): dataTipClass;
        getDataTip(primaryKey: string): any;
        closeDataTip(dataTip: dataTipClass): void;
        hideDataTipsBeforeLayout(): void;
        updateDataTipsAfterLayout(): void;
        clearDataTips(): void;
        getDataFromDataTips(preload: Preload): void;
    }
}
declare module beachParty {
    class auxMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        countLayout(value?: boolean): any;
        sumLayout(value?: boolean): any;
        onChartTypeChanged(): void;
    }
}
declare module beachParty {
    class shapeMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        onChartTypeChanged(): any;
        useExperimentalImages(value?: boolean): any;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean, rebindColInfo?: boolean): any;
    }
}
declare module beachParty {
    class sizeMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        onChartTypeChanged(): any;
        onMappingChanged(binCountChanged?: boolean, omitDataChangedCall?: boolean): any;
    }
}
declare module beachParty {
    class localeMgrClass extends dataChangerClass {
        _app: appClass;
        _locale: LocaleData;
        constructor(app: appClass, localeName: string);
        loadLocale(name: string): LocaleData;
        getText(key: string): any;
        buildSkiLocale(): LocaleData;
    }
    /**
     * Information needed to localize SandDance.
     */
    class LocaleData {
        /** localized strings. */
        text: any;
        dateFormats: any;
        numberFormats: any;
        currencyFormats: any;
    }
}
declare module beachParty {
    class iconBarMgrClass extends dataChangerClass {
        _app: appClass;
        _chartRouter: IChartRouter;
        _panelMaster: panelMasterClass;
        _iconButtons: any[];
        _iconBarBuilt: boolean;
        _groupIconBarIcons: boolean;
        constructor(app: appClass, panelMgr: panelMasterClass, chartRouter: IChartRouter);
        buildButtonTable(newGroupForSettings: boolean): void;
        getButtonTable(): any[];
        buildIconBar(): void;
        buildIconBarFromTable(): void;
    }
}
declare module beachParty {
    class colorMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        paletteMgr(): IPaletteMgr;
        setCustomPalette(palette: string[]): any;
        /**
         * If stepsRequested==0, compute an automatic value that gives nice results for numeric and date values.  For
           category, use 999 to allow all numbers to show
         */
        stepsRequested(): any;
        onMappingChanged(rebuildPalette: boolean, rebindColInfo?: boolean): any;
        getNamedPaletteFromSet(setName: string, name: string): any;
        setPaletteFromName(name: string, omitOptionUpdate?: boolean): any;
        onColNameChanged(): any;
        zapColorChannels(): any;
        colorPaletteIndex(index: number): any;
        getColorPaletteEntry(index: number): any;
        remapColorData(): any;
        colorSpread(value?: string): any;
        colorForceCategory(value?: boolean): any;
        reverseColorPalette(value?: boolean, omitOptionUpdate?: boolean): any;
        invertColorPalette(value?: boolean, omitOptionUpdate?: boolean): any;
        colorIsContinuous(value?: boolean, omitOptionUpdate?: boolean): any;
        colorIsCycling(value?: boolean, omitOptionUpdate?: boolean): any;
        redColumn(value?: string, omitOptionUpdate?: boolean): any;
        onChannelColumnChanged(): any;
        greenColumn(value?: string, omitOptionUpdate?: boolean): any;
        blueColumn(value?: string, omitOptionUpdate?: boolean): any;
        rgbColumn(value?: string, omitOptionUpdate?: boolean): any;
        paletteSetName(value: string, omitOptionUpdate?: boolean): any;
        colorPalette(value?: NamedPalette, omitOptionUpdate?: boolean): any;
    }
}
declare module beachParty {
    class timeMgrClass extends dataChangerClass {
        _app: appClass;
        _isPlaying: boolean;
        constructor(app: appClass);
        isPlaying(value?: boolean, omitLogging?: boolean): boolean;
    }
}
declare module beachParty {
    class textMgrClass extends attrMgrClass {
        constructor(app: appClass, currentChart: IChartRouter);
        maxTextShapes(value?: number, omitLogging?: boolean): any;
        textColor(value?: string, omitLogging?: boolean): any;
    }
}
declare module beachParty {
    function createCheckboxAssembly(parent: HTMLElement, text: string, value: boolean, callback: any): any;
}
declare module beachParty {
    class DoubleSliderControl extends baseAppControlClass {
        _rangeElem: HTMLElement;
        _leftElem: HTMLElement;
        _rightElem: HTMLElement;
        _outer: Range;
        _inner: Range;
        _padding: Range;
        _handles: Range;
        _handleWidth: number;
        _ptDown: any;
        _locOnDown: string;
        _handlesOnDown: Range;
        _onMouseMoveFunc: any;
        _onMouseUpFunc: any;
        /**
         *
         * @param parentElem - the HTML element we will create our root element under.
         * @param outer - the outermost left/right data values (as shown on the slider axis).
         * @param inner - the current lef/right of data values (as set by the user).
         * @param padding - defines the start and end of the axis (in pixels).
         */
        constructor(parentElem: HTMLElement, outer: Range, inner: Range, padding: Range);
        inner(value?: Range): Range;
        onBarDown(e: any, downLoc: string): void;
        onBarUp(e: any): void;
        onBarMove(e: any): void;
        /**
         * calculate handle left/right positions from the inner left/right data values.
         */
        calcHandlesFromInner(): void;
        /**
         * calculate the inner left/right data values from the handle left/right positions.
         */
        calcInnerFromHandles(): void;
        updateRangeElemsFromHandles(locOnDown?: string): void;
        getRootElem(): HTMLElement;
        close(): void;
    }
    class Range {
        left: number;
        right: number;
        constructor(left: number, right: number);
    }
}
declare module beachParty {
    class listBoxClass extends dataChangerClass {
        _app: appClass;
        _root: HTMLElement;
        _selectedElem: HTMLElement;
        _tableElem: HTMLElement;
        _items: any[];
        _selectedValue: string;
        _clickCallback: any;
        _iconWidth: number;
        _clipText: boolean;
        constructor(app: appClass, parent: HTMLElement, items: any[], clickCallback: any, iconWidth?: number, clipText?: boolean, iconClassName?: string);
        buildList(items: any[], iconClassName: string): void;
        adjustRightMarginWhenScrolling(): void;
        selectedValue(value?: string): string;
        getElemByTextValue(value: string): HTMLElement;
        private changeSelectedItem(newValue);
    }
}
declare module beachParty {
    class colorPickerClass extends dataChangerClass {
        _app: appClass;
        _root: HTMLElement;
        _textElem: HTMLElement;
        _sampleElem: HTMLElement;
        _paletteHostElem: HTMLElement;
        _popupHost: basePopupClass;
        _value: string;
        _paletteAssembly: paletteAssemblyClass;
        constructor(app: appClass, parentElem: HTMLElement, initialValue: string, tooltip: string, textWidth?: number);
        addSampleBox(tdW: any): void;
        updateSample(): void;
        closePalette(): void;
        togglePaletteAssembly(): void;
        createPopupHost(): basePopupClass;
        openPalette(): void;
        addTextBox(rootW: vp.dom.IWrapperOuter, text: string, textWidth: number): void;
        onTextKeyDown(e: any): void;
        show(value: boolean): void;
        isShowing(): boolean;
        getRoot(): HTMLElement;
        value(value?: any, source?: string): any;
        updatePaletteValue(): void;
        updateTextBox(): void;
    }
}
declare module beachParty {
    class numSpreaderClass {
        _root: HTMLElement;
        _colNameElem: HTMLSpanElement;
        _rangeButton: HTMLSpanElement;
        _slider: HTMLInputElement;
        _sliderText: HTMLSpanElement;
        _colName: string;
        _value: number;
        _minValue: number;
        _maxValue: number;
        _chartRouter: IChartRouter;
        _minSpread: number;
        _maxSpread: number;
        _isOpen: boolean;
        _searchCallback: any;
        constructor(chartRouter: IChartRouter, colName: string, value: number, minValue: number, maxValue: number, parentElem: HTMLElement, initialPercent: any, searchCallback: any);
        onRangeClick(e: any): void;
        isOpen(): boolean;
        close(): void;
        format(value: number, decimals: number): string;
        onSliderChange(): void;
    }
}
declare module beachParty {
    class pickerClass extends dataChangerClass {
        static nextPickerClassButtonId: number;
        _app: appClass;
        _root: HTMLDivElement;
        _parentElem: HTMLElement;
        _textElem: HTMLElement;
        _chevronElem: HTMLImageElement;
        _values: string[];
        _value: string;
        _iconWidth: number;
        _openerIds: string;
        constructor(app: appClass, parentElem: HTMLElement, prompt: string, values: string[], initialValue: string, tooltip: string, capitalizeFirstValue?: boolean, iconWidth?: number);
        getRoot(): HTMLDivElement;
        value(value?: string): string;
        values(value?: string[]): string[];
        static buildStringsFromEnum(enumType: any, capitalizeFirstLetter?: boolean): string[];
        onPickerClick(e: any): void;
    }
}
declare module beachParty {
    class searchNodeClass extends baseAppControlClass {
        _app: appClass;
        _titleElem: HTMLElement;
        _contentElem: HTMLElement;
        _lowerContentElem: HTMLElement;
        _barParent: HTMLElement;
        _titleRowElem: HTMLElement;
        _nodeData: SearchNodeData;
        _isOpen: boolean;
        _dblSlider: DoubleSliderControl;
        _allName: string;
        _isSortByCount: boolean;
        _isDescendingSort: boolean;
        _maxKeys: number;
        constructor(app: appClass, parentElem: HTMLElement, name: string, includeTitleRow: boolean);
        getNodeData(): SearchNodeData;
        toggleOpen(): void;
        colName(value?: string): string;
        onColNameChanged(): void;
        values(value?: string[], isIncremental?: boolean): string[];
        updateTitle(): void;
        buildShellContent(contentW: vp.dom.singleWrapperClass): void;
        onTextKeyDown(e: any): void;
        rebuildLowerContent(): void;
        rebuildCheckboxes(): void;
        buildCheckBoxesCore(keyCountList: any[]): any;
        toggleDescending(e: any): void;
        toggleSortByCount(e: any): void;
        onCheckboxClick(e: any): void;
        onValuesChanged(isIncremental?: boolean): void;
        onNodeDataChanged(notify: boolean, isIncremental?: boolean): void;
        updateRowColors(rowElem: any, markAsSelected: boolean): void;
        buildRange(): void;
        /**
         * Set the bar colors (by setting data-selected true/false) according to the current nodeData
         min/max values;
         */
        updateBarColors(): void;
        onBarClick(e: any): void;
        getRootElem(): HTMLElement;
        close(): void;
    }
}
declare module beachParty {
    class paletteAssemblyClass extends dataChangerClass {
        _app: appClass;
        _root: HTMLElement;
        _value: string;
        constructor(app: appClass, parentElem: HTMLElement, initialValue: string);
        buildAssembly(parent: HTMLElement): void;
        value(value?: string, fromSlider?: boolean, notifyComplete?: boolean): string;
        setFocusToPalette(): void;
    }
}
declare module beachParty {
    class sliderAssemblyClass extends dataChangerClass {
        _app: appClass;
        _trackElem: HTMLElement;
        _thumbElem: HTMLElement;
        _plusElem: HTMLElement;
        _minusElem: HTMLElement;
        _value: number;
        _minValue: number;
        _maxValue: number;
        _roundValue: boolean;
        _spreadLow: boolean;
        _isDragging: boolean;
        _onMouseMoveFunc: any;
        _onMouseUpFunc: any;
        _mouseDownOffset: number;
        _sliderWidth: number;
        _percentAtMouseDown: number;
        _autoDelayTimer: any;
        _autoRepeatTimer: any;
        _autoDelay: number;
        _autoRepeat: number;
        constructor(app: appClass, parentElem: HTMLElement, initialValue: number, minValue: number, maxValue: number, roundValue: boolean, spreadLow: boolean, sliderWidth?: number, sliderClass?: string);
        onMouseUp(e: any): void;
        onMouseMove(e: any): void;
        value(value?: number): number;
        updateThumbPosition(): void;
        setFocusToSlider(): void;
        build(parentElem: HTMLElement, initialValue: number, sliderWidth: number, sliderClass: string): void;
        onButtonDown(delta: number): void;
        stopTimers(): void;
        onButtonUp(delta: number): void;
        onUpDown(delta: number, notifyComplete: boolean): boolean;
        normalizeValue(value: number): number;
        denormalizeValue(value: number): number;
    }
}
declare module beachParty {
    class botPanelMgrClass extends baseJsonControlClass {
        _app: appClass;
        _suggestionDiv: HTMLElement;
        _historyDiv: HTMLElement;
        _suggestions: string[];
        _history: string[];
        _chatResponse: string;
        _chatInput: string;
        _botChat: botChatClass;
        constructor(app: appClass, buttonId: string);
        addSuggestion(text: string): void;
        addToHistory(text: string): void;
        rebuildSuggestionsList(): void;
        rebuildHistory(): void;
        onSuggestion(e: any, isFromHistory?: boolean): void;
        chatResponse(value?: string): string;
        chatInput(value?: string): string;
        setFocusToTextbox(): void;
        setInputText(text: string): void;
    }
}
declare module beachParty {
    class layersMgrClass extends dataChangerClass {
        _app: IAppMin;
        _currentChart: IChartRouter;
        _lineMgr: lineMgrClass;
        _textMgr: textMgrClass;
        _showShapes: boolean;
        _showText: boolean;
        _showLines: boolean;
        _showOverlays: boolean;
        _showMaps: boolean;
        constructor(app: IAppMin, currentChart: IChartRouter, textMgr: textMgrClass, lineMgr: lineMgrClass);
        showShapes(value?: boolean, omitLogging?: boolean): boolean;
        showText(value?: boolean, omitLogging?: boolean): boolean;
        showLines(value?: boolean, omitLogging?: boolean): boolean;
        showOverlays(value?: boolean, omitLogging?: boolean): boolean;
        showMaps(value?: boolean, omitLogging?: boolean): boolean;
    }
}
declare module beachParty {
    class bigBarMgrClass extends dataChangerClass {
        _panelMaster: panelMasterClass;
        _chartRouter: IChartRouter;
        _app: appClass;
        _isVertical: boolean;
        _bigBarLoc: string;
        _doubleEntryMode: boolean;
        _groupIcons: boolean;
        _tableElem: HTMLTableElement;
        _useBigGroups: boolean;
        _lastAddedElem: HTMLElement;
        _dividerHeight: number;
        _lastElemIsDivider: boolean;
        _bigButtonsTable: any[];
        constructor(app: appClass, panelMgr: panelMasterClass, chartRouter: IChartRouter);
        buildButtonsTable(): void;
        appendRow(): vp.dom.singleWrapperClass;
        buildButtonsFromTable(): void;
        buildBigBar(): void;
        addIconButtons(toolbar: toolbarClass): void;
        getRootName(): string;
        show(value: boolean): void;
        hideInPlace(): void;
        getLoc(): string;
        toggleDataPanel(e: any, isFromLegend?: boolean): void;
        toggleItemsPanel(e?: any, isFromLegend?: boolean): void;
        toggleFilterPanel(e: any): void;
        onFilteredInCountClick(e: any): void;
        toggleSelectionPanel(e: any): void;
        onSelectedCountClick(e: any): void;
        toggleViewAsPanel(e: any): void;
        onChartPicked(uiName: string): void;
        toggleXPanel(e: any, isFromLegend?: boolean): void;
        toggleYPanel(e: any, isFromLegend?: boolean): void;
        toggleZPanel(e: any, isFromLegend?: boolean): void;
        toggleFacetPanel(e: any): void;
        togglImagePanel(e: any): void;
        toggleColorPanel(e: any, isFromLegend?: boolean): void;
        /** Show color panel. */
        onColorPanelOpened(panel: jsonPanelClass, isFromLegend?: boolean): void;
        toggleSizePanel(e?: any, isFromLegend?: boolean): void;
        toggleSumPanel(e?: any): void;
        toggleTextPanel(e?: any, isFromLegend?: boolean): void;
        toggleImagePanel(e?: any, isFromLegend?: boolean): void;
        onLineClick(e?: any, isFromLegend?: boolean): void;
        toggleShapePanel(e?: any, isFromLegend?: boolean): void;
        toggleSortPanel(e: any): void;
        toggleTimePanel(e?: any): void;
        toggleLayersPanel(e: any): void;
        openChartPanel(forCustom: boolean, onRight: boolean): void;
    }
}
declare module beachParty {
    class bigDataMgrClass extends dataChangerClass {
        _itemViewType: ItemViewType;
        _app: appClass;
        _isSampEnabled: boolean;
        _sampType: SampleType;
        _sampleCount: number;
        _aggType: AggType;
        _aggFilters: any[];
        _chartName: string;
        _isAggChart: boolean;
        _isResetting: boolean;
        constructor(app: appClass);
        processDataSetChange(): void;
        isSampEnabled(value?: boolean): boolean;
        sampType(value?: string): string;
        aggType(value?: string): string;
        sampleCount(value?: number): number;
        itemViewType(value?: string): string;
        reset(): void;
        processResetPressed(): void;
        addToFilter(colName: string, colValues: string[], isMember: boolean): void;
        trueRecordCount(): any;
        serverFilteredRecordCount(): any;
        processIsolatePressed(): void;
        processExcludePressed(): void;
        canViewDirect(): boolean;
        processChartChange(): void;
        updateAggData(): void;
        requestNewData(): void;
    }
    enum ItemViewType {
        allUnits = 0,
        sampling = 1,
        aggregation = 2,
    }
}
declare module beachParty {
    class botChatClass extends dataChangerClass {
        _app: appClass;
        _botMgr: botPanelMgrClass;
        _knownFiles: string[];
        _testFiles: string[];
        _views: KnownValue[];
        _sortOrders: KnownValue[];
        _colors: string[];
        _panelNames: string[];
        _paletteSetNames: string[];
        _paletteNames: string[];
        _tourNames: string[];
        _themeNames: string[];
        _colNames: string[];
        _attrNames: string[];
        _apis: ChatApi[];
        _roles: any;
        _context: ChatContext;
        constructor(app: appClass, botMgr: botPanelMgrClass);
        onDataLoaded(): void;
        removeRoleType(roleType: string): void;
        buildFeaturesFromInput(str: string): any;
        scoreApisByFeatures(features: any): {
            api: any;
            isQuery: boolean;
        };
        parseChatInput(text: string): void;
        buildKnownValues(): void;
        addRole(roles: any, token: string, name: string, roleType: string, roleClass: RoleClass): void;
        addRolesFromValues(roles: any, values: string[], roleType: string): void;
        addRolesFromKnownValues(roles: any, values: KnownValue[], roleType: string): void;
        buildRoles(): void;
        buildSetApis(): void;
        buildOtherApis(): void;
        stopTourOrInsights(): void;
        selectTab(panelName: string, tabName: string): void;
        buildProperties(): void;
        sortBy(attrName: any, colName: any, sortOrder: any): void;
        showBars(name: string, value: boolean): void;
        showPanel(e: any, name: string, value: boolean): void;
        enableOption(name: string, value: boolean): void;
        getBoxIndex(axisName: string, label: string): any;
        selectBox(axisName: string, boxId: string): void;
        isClearVerb(features: any, str: string): void;
        isPaletteNoun(features: any, str: string): void;
        isSelectionNoun(features: any, str: string): void;
        isFilterNoun(features: any, str: string): void;
        isTourVerb(features: any, str: string): void;
        isRandomPick(features: any, str: string): void;
        isHideVerb(features: any, str: string): void;
        isShowVerb(features: any, str: string): void;
        getMapableAttribute(features: any, str: string): any;
        isSizeFactorNoun(features: any, str: string): void;
        isOpacityNoun(features: any, str: string): void;
        isQueryNoun(features: any, str: string): void;
        isColorNoun(features: any, str: string): boolean;
        getKnownFiles(features: any, str: string): void;
        getTestFiles(features: any, str: string): void;
        isStepsNoun(features: any, str: string): void;
        isBars(features: any, str: string): boolean;
        isMappingNoun(features: any, str: string): void;
        isSeedNoun(features: any, str: string): void;
        isColumnNoun(features: any, str: string): void;
        chartName(features: any, str: string): void;
        getColName(features: any, str: string): void;
        getChatAction(features: any, str: string): void;
        getRelationalOp(features: any, str: string): void;
        setNumberFeature(features: any, value: number): void;
        getNumberValueOrString(features: any, str: string): void;
        chatHistory(str: string): void;
        getParamValue(features: any, chatValue: ChatParamValue): any;
        findAxisMappedToColumn(colName: string): any;
        getAttributeMapping(attrName: string): any;
        runChatApi(chatAction: ChatAction, isQuery: boolean, features: any): boolean;
        setBinCount(attrName: string, count: number): void;
        reportAttrValue(attrName: string): void;
        pickAttrValue(attrName: string): void;
        mapColumn(attrName: string, colName: string): void;
    }
    class ChatContext {
        attrName: string;
        colName: string;
        number: string;
        value: string;
        panelName: string;
    }
    class ChatAction {
        _name: AliasedName;
        _description: string;
        _values: ChatParamValue[];
        _hints: AliasedName[];
        _isProperty: boolean;
        _roleType: string;
        _scoringCallback: any;
        _runner: any;
        _getter: any;
        _getDisabledReason: any;
        constructor(name: string, roleType: string, description: string);
    }
    class AliasedName {
        name: string;
        aliases: string[];
        constructor(name: string, aliases?: string[]);
        enumNames(callback: any): void;
    }
    class ChatProperty extends ChatAction {
        constructor(name: string, roleType: string, description: string);
    }
    class ChatApi extends ChatProperty {
    }
    class KnownValue {
        _name: string;
        _description: string;
        _aliases: string[];
        constructor(name: string, aliases?: string[], description?: string);
    }
    class ChatParamValue {
        _name: AliasedName;
        _description: string;
        _defaultValue: string;
        _isOptional: boolean;
        constructor(name: string, description: string, defaultValue?: string, isOptional?: boolean);
    }
    enum RoleClass {
        knownValue = 0,
        propertyName = 1,
        actionName = 2,
        hintName = 3,
    }
    class Role {
        token: string;
        name: string;
        roleType: string;
        roleClass: RoleClass;
        constructor(token: string, name: string, roleType: string, roleClass: RoleClass);
    }
}
declare module beachParty {
    class gridLayoutClass extends dataChangerClass {
        _parent: HTMLElement;
        _tableElem: HTMLTableElement;
        _rowElem: HTMLTableRowElement;
        _tdElem: HTMLTableDataCellElement;
        _colFill: boolean;
        _cellPadding: string;
        constructor(parent: HTMLElement, colFill: boolean, cellPadding: string);
        getParent(): HTMLElement;
        deleteCurrentRowIfEmpty(): void;
        setRowHeight(height: number, rowId?: string): void;
        getNextHolder(sameCell?: boolean, newRow?: boolean, currentRowHeight?: number, rowId?: string): vp.dom.IWrapperOuter;
        getCurrentTable(): vp.dom.IWrapperOuter;
        getCurrentHolder(): vp.dom.IWrapperOuter;
        getPreviousHolder(): vp.dom.IWrapperOuter;
        getCurrentRow(): vp.dom.IWrapperOuter;
        getCurrentElement(omitEmptyError?: boolean): vp.dom.IWrapperOuter;
        addElemToHolder(elem: HTMLElement): void;
    }
}
declare module beachParty {
    class paletteMgrClass extends dataChangerClass implements IPaletteMgr {
        _app: IAppMin;
        _cachedPaletteArray: NamedPaletteArray;
        constructor(app: IAppMin);
        getPaletteItems(): string[];
        getPaletteFromStepMap(stepMap: {
            [stepNum: string]: string[];
        }, steps: number): string[];
        getPaletteArrayFromStepMap(ps: PaletteSet, steps: number): NamedPalette[];
        getPaletteFromSettings(psName: string, paletteName: string, steps: number, isReversed: boolean, isInverted: boolean): NamedPalette;
        getPaletteArray(name: string, steps: number, isReversed: boolean, isInverted: boolean): NamedPaletteArray;
        invertPalette(palette: NamedPalette): void;
        invertThisColor(cr: string): any;
        buildPaletteDiv(colorAttr: colorAttrClass, palette: NamedPalette, showSteps: boolean): any;
        /** used to build palette list in colorPanel. */
        getColorPaletteEntry(colorAttr: colorAttrClass, index: number): any;
        getColorPalettes(colorAttr: colorAttrClass): NamedPaletteArray;
        colorPaletteIndex(colorAttr: colorAttrClass, index: number): number;
    }
    class NamedPaletteArray {
        paletteSetName: string;
        palettes: NamedPalette[];
        constructor(name: string, palettes: NamedPalette[]);
    }
    class PaletteSet {
        paletteSetName: string;
        writtenBy: string;
        dateWritten: string;
        descrption: string;
        paletteStepMap: {
            [paletteName: string]: {
                [stepNum: string]: string[];
            };
        };
    }
}
declare module beachParty {
    class themeMgrClass extends dataChangerClass {
        _app: appClass;
        _appStyleSheet: vp.dom.styleSheetClass;
        _newTheme: NewThemeData;
        constructor(app: appClass);
        parseLessFile(strLess: string): NewThemeData;
        loadCachedCurrentTheme(): void;
        onThemeChanged(value: string, overwriteAppSettings?: boolean): void;
        startNewStyleSheet(): void;
        getTheme(): NewThemeData;
        getIconPath(panelName: string): string;
        applyCss(css: string): void;
        applyTheme(theme: NewThemeData, overwriteAppSettings?: boolean): void;
        matchPanelIcons(selector: any, panelName: string): void;
        onThemeLoaded(theme: NewThemeData): void;
    }
    class ThemePanel {
        bgColor: string;
        panelBorder: string;
        font: string;
        iconPath: string;
        textColor: string;
        borderColor: string;
        hoverBg: string;
        activeBg: string;
        selectedBorder: string;
    }
    class PaletteData {
        set: string;
        name: string;
        isInverted: boolean;
        isReversed: boolean;
        constructor(set: string, name: string, isInverted?: boolean, isReversed?: boolean);
    }
    class PropMap {
        themeName: string;
        writtenBy: string;
        dateWritten: string;
        description: string;
        iconButtons: string;
        bigButtons: string;
        groupBigButton: boolean;
        chartBackground: string;
        selectedColor: string;
        firstRunTour: string;
        iconButtonsOnBigBar: boolean;
        insightPanelWidth: number;
        linkColor: string;
        iconPath: string;
        showItemStats: boolean;
        showTitle: boolean;
        plotBackground: string;
        selectionRectangleColor: string;
    }
    class NewThemeData {
        propMap: PropMap;
        css: string;
    }
}
declare module beachParty {
    class scriptRecorderClass extends dataChangerClass {
        _sd: ScriptData;
        _cmds: ScriptCmd[];
        _isRecording: boolean;
        constructor(settings: appSettingsMgr);
        isRecording(): boolean;
        startNewSession(): void;
        endSession(): void;
        log(cmd: ScriptCmd): void;
        addLine(str: string, sd: any, propName: string): string;
        cmdToJson(cmdObj: any): string;
        /**
         *  use our own JSON formatting so user can more easily read and edit the resulting file.
         */
        scriptDataToJson(): string;
        save(): void;
    }
    class ScriptData {
        scriptName: string;
        writtenBy: string;
        dateWritten: string;
        description: string;
        repeatCount: number;
        plotResults: boolean;
        cmdDelay: number;
        stopOnError: boolean;
        cmds: ScriptCmd[];
        constructor();
    }
}
declare module beachParty {
    class cmdHistoryClass extends dataChangerClass {
        _stack: string[];
        _index: number;
        _maxLevels: number;
        constructor();
        getCmd(dir: number): any;
        pushCmd(cmd: string): void;
    }
}
declare module beachParty {
    class selectionMgrClass extends dataChangerClass {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        constructor(app: appClass);
    }
}
declare module beachParty {
    class filterMgrClass extends dataChangerClass {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        constructor(app: appClass);
    }
}
declare module beachParty {
    class itemsPanelMgr extends baseJsonControlClass implements IAppControl {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        _fileItemCount: number;
        _transformItemCount: number;
        constructor(app: appClass, buttonId: string);
        applyTransform(): void;
        fileItemCount(value?: number): number;
        transformItemCount(value?: number): number;
    }
}
declare module beachParty {
    class baseResourcePanelMgr extends baseJsonControlClass {
        static hostResources: {};
        _app: appClass;
        _defaultResourceName: string;
        _currentResourceName: string;
        _editItemName: string;
        _contextMenu: popupMenuClass;
        _resourceType: StorageType;
        _knownResourceFolder: string;
        constructor(app: appClass, buttonId?: string, panelName?: string, resourceType?: StorageType, defaultResourceName?: string, knownResourceFolder?: string);
        static addHostResource(fullName: string, value: any): void;
        init(buttonId: string, panelName: string, resourceType: StorageType, defaultResourceName: string, knownResourceFolder: string): void;
        setResourceName(value: string): void;
        getResourceItems(): any[];
        editItemName(value?: string): string;
        getMenuItems(): MenuItemData[];
        onRenameOK(): void;
        showResourceMenu(e: any): popupMenuClass;
        loadResourceFromFile(e: any): void;
        saveResourceToFile(e: any): void;
        deleteResourceFile(e: any): void;
        renameResourceFile(e: any): void;
        rebuildResourceList(): void;
        loadCurrentResourceAsString(): string;
        loadCurrentResource(): any;
    }
    /**
     * This loads a user resource from memory (if it was present in the userResources.js file), or
     * from our localStorage (via localStorageMgr).
     * @param fn
     * @param resType
     * @param resFolder
     * @param fileExt
     */
    function loadUserResourceAsString(fn: string, resType: StorageType, resFolder: string, fileExt?: string): string;
    function loadUserResource(fn: string, resType: StorageType, resFolder: string, fileExt?: string): any;
}
declare module beachParty {
    class tasksPanelMgrClass extends baseJsonControlClass {
        _app: appClass;
        constructor(app: appClass, buttonId: string);
        selectView(chartType: ChartType, layoutType?: LayoutType, mapColor?: boolean): void;
        selectColumnView(): void;
        selectBarView(): void;
        selectDensityView(): void;
        selectViolinView(): void;
        selectScatterView(): void;
        selectScatter3DView(): void;
        selectScatterViewColor(): void;
        selectSquarifyViewColor(): void;
    }
}
declare module beachParty {
    class searchPanelMgr extends baseJsonControlClass {
        _app: appClass;
        _allName: string;
        _searchCol: string;
        _searchValue: string;
        _searchType: string;
        _isIncrementalSearch: boolean;
        constructor(app: appClass, buttonId: string, colName: string, value?: string);
        isIncrementalSearch(value?: boolean): boolean;
        searchType(value?: string): string;
        applySearchQuery(): void;
        searchCol(value?: string): string;
        searchValue(value?: string, incremental?: boolean): string;
    }
}
declare module beachParty {
    class themesPanelMgr extends baseResourcePanelMgr {
        constructor(app: appClass, buttonId: string);
        themeName(value?: string): string;
        setResourceName(value: string): void;
        getResourceItems(): string[];
        static getThemeItems(): string[];
        onLoadTheme(): void;
    }
}
declare module beachParty {
    class browsePanelMgr extends baseJsonControlClass {
        _app: appClass;
        _myRoot: HTMLElement;
        _nodesElem: HTMLElement;
        _searchCol: string;
        _searchValue: string;
        _nextNodeId: number;
        _searchNodes: any[];
        _isIncrementalSearch: boolean;
        _isMultiSearchPanes: boolean;
        _isolateMatches: boolean;
        constructor(app: appClass, buttonId: string, colName: string, value?: string);
        isIncrementalSearch(value?: boolean): boolean;
        isMultiSearchPanes(value?: boolean): boolean;
        isolateMatches(value?: boolean): boolean;
        onMultiSearchChanged(): void;
        addSearchNode(): void;
        applySearchQuery(): void;
        searchCol(value?: string): string;
        searchValue(value?: string): string;
        getJsonPanel(): jsonPanelClass;
        close(): void;
    }
    class SearchNodeData {
        name: string;
        colName: string;
        colType: string;
        min: number;
        max: number;
        valueList: string[];
        textSearchType: TextSearchType;
        textCaseSensitive: boolean;
        constructor(name: string, type: string);
    }
    class SearchQuery {
        name: string;
        created: Date;
        NodeSelector: SearchNodeData[];
    }
}
declare module beachParty {
    function declareProp(thisObj: any, name: string, setterCallback?: any): void;
    class scriptsPanelMgr extends baseResourcePanelMgr {
        _app: appClass;
        _isRecording: boolean;
        _runCount: number;
        _runStatus: string;
        constructor(app: appClass, buttonId: string);
        onRecordStatusChanged(): void;
        runStatus(value?: string): string;
        recordStatus(value?: string): string;
        onStartRecording(): void;
        onStopRecording(): void;
        refreshStartNewSessionProp(): void;
        recordAcrossSessions(value?: boolean): any;
        scriptName(value?: string): string;
        setResourceName(value: string): void;
        getResourceItems(): string[];
        isPanelNavRecorded(value?: boolean): any;
        static getScriptItems(): string[];
        onStartPlayback(): void;
        refreshRunStatus(): void;
        onStopPlayback(): void;
        onPlotResults(): void;
    }
}
declare module beachParty {
    class palettesPanelMgr extends baseResourcePanelMgr {
        constructor(app: appClass, buttonId: string);
        paletteSetName(value?: string): string;
        setResourceName(value: string): void;
        getResourceItems(): string[];
        static getPaletteItems(): string[];
    }
}
declare module beachParty {
    class helpPanelMgrClass extends baseResourcePanelMgr {
        _app: appClass;
        _chartDesc: string;
        _dataDesc: string;
        constructor(app: appClass, buttonId: string);
        dataDescription(value?: string): string;
        chartDescription(value?: string): string;
        buildDataDescription(): void;
        buildChartDescription(): void;
    }
}
declare module beachParty {
    class tourLoaderMgr extends baseResourcePanelMgr {
        constructor(app: appClass, buttonId: string);
        tourName(value?: string): string;
        setResourceName(value: string): void;
        getResourceItems(): string[];
        static getThemeItems(): string[];
        onStartTour(): void;
        static loadKnownTourFile(name: string): string;
    }
}
declare module beachParty {
    class aggPanelMgr extends baseJsonControlClass implements IAppControl {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        _isAggEnabled: boolean;
        _aggType: AggType;
        _aggTarget: string;
        _aggGroup: string;
        _isSampEnabled: boolean;
        _sampType: SampleType;
        _sampleCount: number;
        constructor(app: appClass, buttonId: string);
        addCol(colList: string[], colName: string): void;
        /**
         * gather columns being mapping in current view and include them in the grouping columns list.
         */
        buildGroupingCols(): any[];
        onParamsChanged(): void;
        isAggEnabled(value?: boolean): boolean;
        isSampEnabled(value?: boolean): boolean;
        aggTarget(value?: string): string;
        aggGroup(value?: string): string;
        aggType(value?: string): string;
        sampType(value?: string): string;
        sampleCount(value?: number): number;
    }
}
declare module beachParty {
    class tourPanelMgr extends basePanelClass implements IAppControl, IPanelMgr {
        _tour: TourData;
        _index: number;
        _activeEleme: HTMLElement;
        _useOuterForOutlining: boolean;
        _outerPadding: number;
        constructor(app: appClass, buttonId: string, tour: TourData);
        getJsonPanel(): any;
        tour(value?: TourData): TourData;
        onMouseUp(e: any): void;
        endTour(): void;
        runPostCommands(callback: any): void;
        gotoStep(index: number, stepName: string): void;
        onIndexChanged(): void;
        clearActiveElement(): void;
        setElementActive(index: number): any;
        runCommands(cmds: string, callback: any, index?: number): void;
        loadStep(step: TourStep): void;
        loadStepEx(step: any): void;
        showOurOutline(value: boolean): void;
        positionPanelNextToElem(target: HTMLElement): void;
    }
    class TourStep {
        name: string;
        element: string;
        title: string;
        preCommands: string;
        postCommands: string;
        content: string;
        hidePanelOutline: boolean;
    }
    class TourData {
        tourName: string;
        author: string;
        date: string;
        org: string;
        copyright: string;
        steps: TourStep[];
    }
}
declare module beachParty {
    class tipsPanelMgr extends baseJsonControlClass {
        _app: appClass;
        _tooltipListElem: HTMLElement;
        _tooltipColumns: string[];
        _datatipListElem: HTMLElement;
        _includeNamesInDatatip: boolean;
        _datatipColumns: string[];
        _dataTipTitle: string;
        constructor(app: appClass, buttonId: string);
        tooltipColumns(value?: string[]): string[];
        dataTipTitle(value?: string): string;
        includeNamesInDatatip(value?: boolean): boolean;
        createCheckboxColumnList(panelName: string, parentW: vp.dom.IWrapperOuter): any;
        rebuildCheckboxList(listElem: HTMLElement, panelName: string): any;
        onTooltipCheckboxesChanged(listW: vp.dom.IWrapperOuter): void;
        onDatatipCheckboxesChanged(listW: vp.dom.IWrapperOuter): void;
        includeNamesInTooltip(value?: boolean): any;
        hoverOnMouseMove(value?: boolean): any;
        isTooltipsEnabled(value?: boolean): any;
        createDataTip(): void;
        getJsonPanel(): jsonPanelClass;
    }
}
declare module beachParty {
    class panelMasterClass extends dataChangerClass {
        _app: appClass;
        _panels: {};
        constructor(app: appClass);
        getPanelInfo(name: string): PanelInfo;
        registerPanel(name: string, buttonName: string, buttonAlign: ButtonAlign, isFloating: boolean, panelTarget: Target, isFromLegend: boolean, openCallback: any, closeCallback?: any, dataOwner?: any, fadeInOpts?: any): void;
        /**
         * used to register panels (created outside of panelMgr) with panelMgr so we can use its "getPanel()" to
        get the open instance of the named panel.  PanelMgr will take care of logging the open and close actions once registered.
         * @param panelName
         * @param panelObj
         */
        registerCustomPanel(target: Target, panelObj: jsonPanelClass): void;
        togglePanel(name: string, e: any, btAlign?: ButtonAlign, isFromLegend?: boolean): boolean;
        showPanelNow(panelMgr: IPanelMgr, buttonName: string, btAlign: ButtonAlign, isFromLegend: boolean, fadeInOpts: any): void;
        showPanel(name: string, e?: any, btAlign?: ButtonAlign, isFromLegend?: boolean): IPanelMgr;
        hidePanel(name: string, e?: any): void;
        registerPanelMgr(name: string, buttonName: string, buttonAlign: ButtonAlign, isFloating: boolean, panelTarget: Target, isFromLegned: boolean, createCallback: any, closeCallback?: any, openCallback?: any, fadeInOpts?: number): void;
        /**
         *  Closes the specified xxxPanelMgr object (e.g., clusterPanelMgr).
         * @param name
         */
        closePanelMgr(name: string): void;
        getJsonPanel(name: string): jsonPanelClass;
        getPanelMgr(name: string): IPanelMgr;
        onPanelClose(name: string): void;
        matchButtonTopBottom(ptx: any, toTopSpace: number, toBottomSpace: number, rcButton: ClientRect): void;
        matchButtonLeftRight(ptx: any, toLeftSpace: number, toRightSpace: number, rcButton: ClientRect): void;
        getBestPanelLocation(rcPanel: ClientRect, buttonName: string, btAlign: ButtonAlign): any;
        createPanelMgr(name: string, buttonName: string, btAlign: ButtonAlign, isFloating: boolean, target: Target, isFromLegend: boolean): IPanelMgr;
    }
    /** how panel aligns with button that invoked it. */
    enum ButtonAlign {
        aboveButton = 1,
        belowButton = 2,
        matchTop = 4,
        matchBottom = 8,
        bestTopBot = 16,
        leftOfButton = 32,
        rightOfButton = 64,
        matchLeft = 128,
        matchRight = 256,
        bestLeftRight = 512,
    }
    class PanelInfo {
        name: string;
        createCallback: any;
        openCallback: any;
        closeCallback: any;
        dataOwner: any;
        buttonName: string;
        buttonAlign: ButtonAlign;
        isFloating: boolean;
        isFromLegend: boolean;
        panelTarget: Target;
        fadeInOpts: number;
        jsonPanel: jsonPanelClass;
        panelMgr: IPanelMgr;
        constructor(name: string, openCallback: any, closeCallback: any, dataOwner: any, buttonName: string, buttonAlign: ButtonAlign, isFloating: boolean, isFromLegend: boolean, panelTarget: Target, fadeInOpts?: number);
    }
    class simplePanelMgrClass extends baseJsonControlClass {
        constructor(app: appClass, buttonName: string, dataOwner: any, name: string, isFloating: boolean, isFromLegend: boolean);
        getUiOpenName(buttonName: string, isFromLegend: boolean): string;
        onClose(): void;
    }
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
}
declare module beachParty {
    class viewPanelMgrClass extends baseJsonControlClass {
        _app: appClass;
        _jsonPanel: jsonPanelClass;
        _selectedChartElem: HTMLElement;
        _contentRow: HTMLElement;
        _currentView: string;
        _callback: any;
        constructor(app: appClass, buttons: string, uiName: string, isChartCustom: boolean, callback: any);
        buildChartPicker(): void;
        openCustomTab(): void;
        hideRowByElem(root: HTMLElement, elemName: string): any;
        showRow(rowElem: HTMLElement): void;
        updateControlsToMatchChart(uiName: string, isChartCustom: boolean): void;
        getChartElemByName(name: string): any;
        changeSelectedChart(): void;
        addChart(rowW: vp.dom.singleWrapperClass, title: string, imgSrc: string, tooltip: string, valueText?: string): vp.dom.singleWrapperClass;
        onClick(e: any): void;
        onClose(): void;
    }
}
declare module beachParty {
    class workerMgrClass extends dataChangerClass {
        _workItems: any[];
        _totalWork: number;
        _workDone: number;
        _startTime: number;
        _elapsed: number;
        _progress: number;
        _callback: any;
        _workerScriptName: string;
        _maxWorkers: number;
        _workers: any[];
        constructor(workerScriptName: string, maxWorkers?: number);
        isRunning(): boolean;
        stopWorkers(): void;
        getActiveWorkers(): number;
        startMoreWorkersIfNeeded(): void;
        resetAll(): void;
        queueWork(work: any, workAmt: number): void;
        start(callback: any): void;
        buildWork(): void;
    }
}
declare module beachParty {
    class clusterPanelMgrClass extends baseJsonControlClass {
        _app: appClass;
        _numClusters: number;
        _numRuns: number;
        _outputColumn: string;
        _isClusterOverlay: boolean;
        _isAutoClustering: boolean;
        _mapResults: ClusterResultMapping;
        _columns: string[];
        _workerMgr: workerMgrClass;
        _minDistance: number;
        _minResult: any;
        constructor(app: appClass, buttonId: string, columns: string[], maxWorkers: number);
        getJsonPanel(): jsonPanelClass;
        showScore(value: boolean): void;
        showProgress(value: boolean): void;
        updateProgress(value: number): void;
        updateScore(value: string): void;
        updateStartButton(value: string): void;
        close(): void;
        numRuns(value?: number): number;
        outputColumn(value?: string): string;
        columns(value?: string): string;
        numClusters(value?: number): number;
        isClusterOverlay(value?: boolean): boolean;
        isAutoClustering(value?: boolean): boolean;
        mapResults(value?: string): string;
        addToRecords(records: any[], data: number[]): void;
        onStartButton(): void;
        startClustering(): void;
        startClusteringCore(): void;
        buildSortedKeys(clusters: any[]): any[];
        onClusteringStopped(): void;
    }
}
declare module beachParty {
    class dataPanelMgr extends dataChangerClass {
        _app: appClass;
        _dataEngine: dataEngineClass;
        _chartRouter: IChartRouter;
        _dataPanel: jsonPanelClass;
        _fileOpenUrl: string;
        _fileOpenCs: string;
        _fileOpenSource: any;
        _selectedSampleName: string;
        _selectedFileName: string;
        _sqlTableName: string;
        _openFileTypeLocal: string;
        _openFileTypeWeb: string;
        _fileHasHeader: boolean;
        _dataScrubberName: string;
        _preload: Preload;
        _selectedOpenFile: string;
        constructor(app: appClass, chartRouter: IChartRouter);
        preload(value?: Preload): Preload;
        selectedOpenFile(value?: string): string;
        /** Show FILE OPEN panel. */
        openFileOpenPanel(e: any, isFromLegend: boolean): void;
        getUrlSample(): string;
        getSqlCsSample(): string;
        getSqlTableSample(): string;
        processDroppedTextOrFile(e: any): void;
        selectedSampleName(value?: string): string;
        closeFileOpenPanel(forceClose?: boolean): void;
        close(): void;
        selectedFileName(value?: string): string;
        openFileTypeLocal(value?: string): string;
        openFileTypeWeb(value?: string): string;
        fileOpenURL(value?: string): string;
        fileOpenCs(value?: string): string;
        sqlTableName(value?: string): string;
        fileHasHeader(value?: boolean): boolean;
        toggleDatasetPanel(e: any, isFromLegend: boolean): void;
        setLocalFileType(fn: string): void;
        setFileTypeFromNameWeb(fn: string): void;
        isFirstLineDisabledLocal(): boolean;
        isFirstLineDisabledWeb(): boolean;
        onOpenFileClicked(): void;
        /** used to open Web URL files and SQL files. */
        loadFileFromPanel(url?: string, sqlTableName?: string): void;
        loadFileOpenWeb(): void;
        /** local a local file using our properties (include this._loadedFileOpenText). */
        loadFileOpenLocal(): void;
        loadFileOpenSql(): void;
        getApp(): appClass;
        openLocalFile(fileExts: string): void;
        reloadDataPerScrubbing(editInfos: any, callback: any): void;
        dataScrubberName(value?: string): string;
    }
}
declare module beachParty {
    class appUtils {
        static clipTextForTitle(str: string, maxChars?: number): string;
        static getLastNodeOfUrl(url: string): string;
        static lowerCaseFirstLetter(value: string): string;
        static setButtonSelectedState(themeMgr: themeMgrClass, baseName: string, value: boolean, fnNorm: string, fnSelect: string): void;
        static disableCheckbox(assemblyW: vp.dom.IWrapperOuter, isDisabled: boolean): void;
        static disableEnum(assemblyW: vp.dom.IWrapperOuter, isDisabled: boolean): void;
    }
}
declare module beachParty {
    /**
     * This classes manages the persistable properties of SandDance.  The implementation of these properties follows a strong pattern
     * which is tedious to maintain, given the large amount of SandDance properties. Therefore, some of the more recently defined
     * properties are defined dynamically, to make them easier to add and maintain.  See "buildProperties()" to see how this is done.
     *
     * NOTE: ALL NEW PROPERTIES should be added used using the buildProperties() mechanism.
     *
     * TODO: convert old style properties to use the buildProperties() mechanism.
     */
    class appSettingsMgr extends dataChangerClass {
        _app: appClass;
        _chartRouter: IChartRouter;
        _isSavingSettingsDisabled: boolean;
        _persistChangesDisabledFromUrlParams: boolean;
        _appStyleSheet: vp.dom.styleSheetClass;
        _properties: PropertyInfo[];
        _initialTheme: string;
        private _initialDataParams;
        private _initialChartType;
        _isChartPanelOpen: boolean;
        _isTitleTextVisible: boolean;
        _isItemCountsVisible: boolean;
        _isColPickerSorted: boolean;
        _isColDetailsSorted: boolean;
        _showInProgressUI: boolean;
        _autoSampling: DataSampling;
        _playbackDuration: number;
        _isPlaybackLooping: boolean;
        _rememberLastFile: boolean;
        _rememberLastSession: boolean;
        _rememberLastInsights: boolean;
        _isShowingDrawStats: boolean;
        _isShowingLastCycle: boolean;
        _isShowingEventStats: boolean;
        _isErrorReportingDisabled: boolean;
        _automatedTestName: string;
        _predefinedCustomChart: string;
        _showCountsInColPicker: boolean;
        _showTypesInColPicker: boolean;
        _showSysColsInColPicker: boolean;
        _recordAcrossSessions: boolean;
        _recordNextSession: boolean;
        _isPanelNavRecorded: boolean;
        _isSqlEnabled: boolean;
        _isAggEnabled: boolean;
        _themeName: string;
        _shapesByChartType: any;
        _menuTextSize: number;
        _menuValueSize: number;
        _iconOpacity: number;
        _runTourOnStartUp: boolean;
        _dataCacheParams: DataCacheParams;
        _openBotOnStartUp: boolean;
        _isGridEnabled: boolean;
        _isColumnEnabled: boolean;
        _isScatterEnabled: boolean;
        _isDensityEnabled: boolean;
        _isStacksEnabled: boolean;
        _isSquarifyEnabled: boolean;
        _isLineEnabled: boolean;
        _isScatter3DEnabled: boolean;
        _isRandomEnabled: boolean;
        _isPoissonEnabled: boolean;
        _isSpiralEnabled: boolean;
        _isLinksEnabled: boolean;
        _isRadialEnabled: boolean;
        _isXbandEnabled: boolean;
        _isYbandEnabled: boolean;
        _isBarEnabled: boolean;
        _isViolinEnabled: boolean;
        _isAggColumnEnabled: boolean;
        _isCustomEnabled: boolean;
        _shapeOpacity: number;
        _shapeImage: string;
        _canvasColor: string;
        _chartColor: string;
        _drawingPrimitive: DrawPrimitive;
        _instancingParams: InstancingParams;
        _isContinuousDrawing: boolean;
        _chartFrameData: ChartFrameData;
        _animationData: AnimationData;
        _hoverParams: HoverParams;
        _isTooltipsEnabled: boolean;
        _includeNamesInTooltip: boolean;
        _hoverOnDetailView: boolean;
        _hoverOnMouseMove: boolean;
        _selectionParams: SelectionParams;
        _is3dGridAlwaysOn: boolean;
        _isWheelInertia: boolean;
        _showWheelDuringTransformMode: boolean;
        _isLightingAlwaysOn: boolean;
        _lightingParams: Lighting;
        _defaultBins: number;
        _useNiceNumbers: boolean;
        _mapByColorChannels: boolean;
        constructor(app: appClass, chartRouter: IChartRouter);
        buildProperties(): void;
        stringToArray(str: string): string[];
        /**
         * Overwrite the app settings with the specified theme data.
         */
        overwriteAppSettings(propMap: PropMap): void;
        isLogoHidden(value?: boolean): any;
        appBgColor(value?: string): any;
        isMenuIconVisible(value?: boolean): any;
        isMenuTextVisible(value?: boolean): any;
        isMenuChevronVisible(value?: boolean): any;
        iconWidth(value?: number): any;
        isIconButtonsOnBigBar(value?: boolean): any;
        shapeColor(value?: string): any;
        addPropertyToClass(prop: PropertyInfo): void;
        addNamesToMethods(): void;
        setShapeForChart(chartName: string, layout: string, shapeType: string): void;
        isButtonEnabled(name: string): boolean;
        getEnabledButons(names: string[]): any[];
        clearAllButtons(): void;
        applyButtonProps(names: string[]): void;
        createButtonProps(names: string[]): void;
        /**
         * This is called when one of our dynamically constructed button property getter/setter methods has been called.
         * @param name
         */
        onButtonChanged(name?: string): void;
        declareButtonProp(name: string, setterCallback?: any): void;
        /** apply default values to all persisted app properties. Note that many of these default values are
        overwritten by the default theme. */
        resetAppSettings(): void;
        getDefaultInitFile(): WorkingDataParams;
        saveAppSettings(): void;
        saveSessionToLocalStorage(): void;
        loadSettingUndef(appSettings: AppSettings, name: string): void;
        loadSettingGetter(appSettings: AppSettings, name: string): void;
        loadSettingDirect(appSettings: AppSettings, name: string): void;
        private getAppSettingsObj();
        loadAppSettings(): void;
        loadAppSettingsFromObj(appSettings: AppSettings): void;
        setAllChartsProperty(propName: string, value: any): void;
        onShapeColorChanged(value: string): void;
        shapeImage(value?: string): string;
        chartColor(value?: string): string;
        onChartColorChanged(): void;
        canvasColor(value?: string): string;
        onCanvasColorChanged(): void;
        drawingPrimitive(value?: string): string;
        isContinuousDrawing(value?: boolean): boolean;
        isChartPanelOpen(value?: boolean): boolean;
        showSysColsInColPicker(value?: boolean): boolean;
        showCountsInColPicker(value?: boolean): boolean;
        showTypesInColPicker(value?: boolean): boolean;
        mapByColorChannels(value?: boolean): boolean;
        recordAcrossSessions(value?: boolean): boolean;
        recordNextSession(value?: boolean): boolean;
        isPanelNavRecorded(value?: boolean): boolean;
        isSqlEnabled(value?: boolean): boolean;
        isAggEnabled(value?: boolean): boolean;
        openBotOnStartUp(value?: boolean): boolean;
        themeName(value?: string, overwriteAppSettings?: boolean): string;
        shapesByChartType(value?: any): any;
        markBigBarBuildNeeded(): void;
        markIconBarBuildNeeded(): void;
        runTourOnStartUp(value?: boolean): boolean;
        isGridEnabled(value?: boolean): boolean;
        isColumnEnabled(value?: boolean): boolean;
        isScatterEnabled(value?: boolean): boolean;
        isDensityEnabled(value?: boolean): boolean;
        isStacksEnabled(value?: boolean): boolean;
        isSquarifyEnabled(value?: boolean): boolean;
        isRandomEnabled(value?: boolean): boolean;
        isPoissonEnabled(value?: boolean): boolean;
        isSpiralEnabled(value?: boolean): boolean;
        isLineEnabled(value?: boolean): boolean;
        isLinksEnabled(value?: boolean): boolean;
        isRadialEnabled(value?: boolean): boolean;
        isXbandEnabled(value?: boolean): boolean;
        isYbandEnabled(value?: boolean): boolean;
        isScatter3DEnabled(value?: boolean): boolean;
        isBarEnabled(value?: boolean): boolean;
        isViolinEnabled(value?: boolean): boolean;
        isCustomEnabled(value?: boolean): boolean;
        isAggColumnEnabled(value?: boolean): boolean;
        isInstancingEnabled(value?: boolean): boolean;
        chartFrameOpacity(value?: number): number;
        onChartFrameDataChanged(): void;
        animationData(value?: AnimationData): AnimationData;
        getChartFrameData(): ChartFrameData;
        getHoverParams(): HoverParams;
        getSelectionParams(): SelectionParams;
        getInstancingParams(): InstancingParams;
        isAnimationEnabled(value?: boolean): boolean;
        isStaggeringEnabled(value?: boolean): boolean;
        easeFunction(value?: string): string;
        easeType(value?: string): string;
        animationDuration(value?: number): number;
        maxStaggerTime(value?: number): number;
        onAnimationDataChanged(): void;
        hoverMatch(value?: string): string;
        hoverEffect(value?: string): string;
        hoverColor(value?: string): string;
        hoverSize(value?: number): number;
        onHoverParamsChanged(): void;
        predefinedCustomChart(value?: string): string;
        isTooltipsEnabled(value?: boolean): boolean;
        includeNamesInTooltip(value?: boolean): boolean;
        hoverOnDetailView(value?: boolean): boolean;
        hoverOnMouseMove(value?: boolean): boolean;
        selectedColorEffect(value?: string): string;
        unselectedColorEffect(value?: string): string;
        selectedColor(value?: string): string;
        unselectedColor(value?: string): string;
        selectedColorFactor(value?: number): number;
        unselectedColorFactor(value?: number): number;
        onSelectionParamsChanged(): void;
        onAppBgColorChanged(value: string): void;
        onAppTextSizeChanged(value: number): void;
        resizeNumAdjustersToNewFont(): void;
        onAppTextColorChanged(value: string): void;
        onPanelBgColorChanged(value: string): void;
        onDockedBgColorChanged(value: string): void;
        onSelectedBgColorChanged(value: string): void;
        onHoverBgColorChanged(value: string): void;
        onPanelBorderColorChanged(value: string): void;
        onPanelOpacityChanged(value: number): void;
        onGuideTextSizeChanged(value: number): void;
        onTitleTextSizeChanged(value: number): void;
        onButtonTextColorChanged(value: string): void;
        onGuideTextColorChanged(value: string): void;
        onValueTextColorChanged(value: string): void;
        onPromptTextColorChanged(value: string): void;
        onGuideBorderColorChanged(value: string): void;
        onBarBorderColorChanged(value: string): void;
        onDockedBorderColorChanged(value: string): void;
        onBarBgColorChanged(value: string): void;
        onListBorderColorChanged(value: string): void;
        onAppBorderColorChanged(value: string): void;
        onButtonBorderColorChanged(value: string): void;
        onBigBarOpenColorChanged(value: string): void;
        onNormalFontFamilyChanged(value: string): void;
        onLogoHiddenChanged(value: boolean): void;
        onPromptWeightChanged(value: string): void;
        onValueWeightChanged(value: string): void;
        onSelectedTabWeightChanged(value: string): void;
        onTitlePaneWeightChanged(value: string): void;
        onTipNameWeightChanged(value: string): void;
        onTableHeaderWeightChanged(value: string): void;
        onBigBarNextToLogoChanged(value: boolean): void;
        onIconButtonsOnBigBarChanged(value: boolean): void;
        onIsMenuTextVisibleChanged(value: boolean): void;
        adjustMenuButtonRules(): void;
        onIsMenuIconVisibleChanged(value: boolean): void;
        onIsMenuChevronVisibleChanged(value: boolean): void;
        isTitleTextVisible(value?: boolean): boolean;
        isItemCountsVisible(value?: boolean): boolean;
        onTitlePanelAlignmentChanged(value: string): void;
        menuTextSize(value?: number): number;
        onIconButtonPropertyChanged(): void;
        menuValueSize(value?: number): number;
        onPromptTextSizeChanged(value: number): void;
        onValueTextSizeChanged(value: number): void;
        onButtonIconWidthChanged(value: number): void;
        iconOpacity(value?: number): number;
        isColPickerSorted(value?: boolean): boolean;
        isColDetailsSorted(value?: boolean): boolean;
        rebuildOpenPickers(): void;
        is3dGridAlwaysOn(value?: boolean): boolean;
        isWheelInertia(value?: boolean): boolean;
        showWheelDuringTransformMode(value?: boolean): boolean;
        showInProgressUI(value?: boolean): boolean;
        isLightingAlwaysOn(value?: boolean): boolean;
        ambientLightLevel(value?: number): number;
        cacheLocalFiles(value?: boolean): boolean;
        cacheWebFiles(value?: boolean): boolean;
        onDataCacheChanged(): void;
        useNiceNumbers(value?: boolean): boolean;
        defaultBins(value?: number): number;
        autoSampling(value?: DataSampling): DataSampling;
        isAutoSamplingEnabled(value?: boolean): boolean;
        samplingThreshold(value?: number): number;
        autoSamplingSampleCount(value?: number): number;
        autoSamplingSampleType(value?: string): string;
        playbackDuration(value?: number): number;
        isPlaybackLooping(value?: boolean): boolean;
        rememberLastFile(value?: boolean): boolean;
        rememberLastSession(value?: boolean): boolean;
        rememberLastInsights(value?: boolean): boolean;
        initialChartType(value?: string): any;
        initialDataParams(value?: WorkingDataParams): WorkingDataParams;
        isShowingDrawStats(value?: boolean): boolean;
        isShowingLastCycle(value?: boolean): boolean;
        isShowingEventStats(value?: boolean): boolean;
        isErrorReportingDisabled(value?: boolean): boolean;
        showXGridLines(value?: boolean): boolean;
        showYGridLines(value?: boolean): boolean;
        shapeOpacity(value?: number): number;
        shapeOpacityCompleted(value?: number): void;
        automatedTestName(value?: string): string;
        /** Reset all persisted app settings. */
        resetSettingsAndReloadData(): void;
    }
    class AppSettings {
        versionNum: string;
        enabledIconButtons: string[];
        enabledBigButtons: string[];
        runTourOnStartUp: boolean;
        mapByColorChannels: boolean;
        recordAcrossSessions: boolean;
        recordNextSession: boolean;
        isPanelNavRecorded: boolean;
        isSqlEnabled: boolean;
        isAggEnabled: boolean;
        openBotOnStartUp: boolean;
        themeName: string;
        shapesByChartType: any;
        isGridEnabled: boolean;
        isColumnEnabled: boolean;
        isScatterEnabled: boolean;
        isDensityEnabled: boolean;
        isStacksEnabled: boolean;
        isSquarifyEnabled: boolean;
        isRandomEnabled: boolean;
        isPoissonEnabled: boolean;
        isSpiralEnabled: boolean;
        isLineEnabled: boolean;
        isLinksEnabled: boolean;
        isRadialEnabled: boolean;
        isXbandEnabled: boolean;
        isYbandEnabled: boolean;
        isScatter3DEnabled: boolean;
        isBarEnabled: boolean;
        isViolinEnabled: boolean;
        isAggColumnEnabled: boolean;
        isCustomEnabled: boolean;
        animationData: AnimationData;
        is3dGridAlwaysOn: boolean;
        isWheelInertia: boolean;
        showWheelDuringTransformMode: boolean;
        showInProgressUI: boolean;
        isLightingAlwaysOn: boolean;
        ambientLightLevel: number;
        hoverParams: HoverParams;
        isTooltipsEnabled: boolean;
        includeNamesInTooltip: boolean;
        hoverOnDetailView: boolean;
        hoverOnMouseMove: boolean;
        selectionParams: SelectionParams;
        canvasColor: string;
        chartColor: string;
        drawingPrimitive: string;
        isColPickerSorted: boolean;
        isColDetailsSorted: boolean;
        isContinuousDrawing: boolean;
        isChartPanelOpen: boolean;
        isInstancingEnabled: boolean;
        chartFrameData: ChartFrameData;
        isMenuIconVisible: boolean;
        menuTextSize: number;
        menuValueSize: number;
        iconOpacity: number;
        isTitleTextVisible: boolean;
        isItemCountsVisible: boolean;
        sortColumnsInPicker: boolean;
        showCountsInColPicker: boolean;
        showSysColsInColPicker: boolean;
        showTypesInColPicker: boolean;
        dataCacheParams: DataCacheParams;
        useNiceNumbers: boolean;
        defaultBins: number;
        autoSampling: DataSampling;
        playbackDuration: number;
        isPlaybackLooping: boolean;
        rememberLastFile: boolean;
        rememberLastSession: boolean;
        rememberLastInsights: boolean;
        initialChartType: string;
        initialDataParams: WorkingDataParams;
        isShowingDrawStats: boolean;
        isShowingLastCycle: boolean;
        isShowingEventStats: boolean;
        isErrorReportingDisabled: boolean;
        predefinedCustomChart: string;
        constructor(versionNum: string, properties: PropertyInfo[]);
    }
    class PropertyInfo {
        name: string;
        defaultValueForCtr: string;
        initialValueForReset: any;
        onChangedMethod: any;
        constructor(name: string, defaultValue: string, initValue: any, onChangedMethod: any);
    }
}
declare module beachParty {
    class scriptRunnerClass extends dataChangerClass {
        testResultsKey: string;
        _repeatCount: number;
        _name: string;
        _maxBuildTime: any;
        _minFPS: any;
        _cmdDelay: any;
        _stopOnError: boolean;
        _cmds: any[];
        _plotResults: boolean;
        _collectPerfData: boolean;
        _cmdIndex: number;
        _runCount: number;
        _isRunning: boolean;
        _waitingForCycleNum: any;
        _currentViewName: string;
        _currentCmd: string;
        _cmdId: string;
        _isCompleted: boolean;
        _app: appClass;
        _cmdTimer: any;
        _perfRecords: PerfRecord[];
        _errorCountAtStart: number;
        _timeStarted: number;
        constructor(app: appClass);
        currentCmd(): string;
        runStatus(): string;
        start(scriptData: ScriptData, fn?: string, runCount?: number): void;
        restart(firstPass: boolean): void;
        statusMsg(msg?: string): void;
        private startNextCmd(delay?);
        cancelCmdTimer(): void;
        reportFrameStats(cmdTime: number, buildChartElapsed: number, frameRate: number, frameCount: number, cycleNum: number, cmdId: string): void;
        private error(msg);
        getParam(cmd: any, paramName: string): any;
        runCmd(cmd: any): void;
        isTogglePanel(target: Target): boolean;
        private onEndReached();
        private onStopped(testCompleted?);
        plotPerfResults(): void;
        loadPerfResultsFromLocalStorage(): any;
        savePerfResults(): void;
        cmdToString(cmd: any): string;
        stop(): void;
    }
    class PerfRecord {
        time: number;
        cmdTime: number;
        fps: number;
        buildTime: number;
        frameCount: number;
        cycleNum: number;
        dataName: string;
        recordCount: number;
        view: string;
        cmd: string;
    }
}
declare module beachParty {
    var fnSandDanceLogo: string;
    var fnPinDown: string;
    var fnPinLeft: string;
    var fnDetailsNext: string;
    var fnDetailsPrev: string;
    var fnResizer: string;
    var fnMenuBars: string;
    var fnClose: string;
    var fnChevron: string;
    var fnOpenSlider: string;
    var fnCloseSlider: string;
    var fnOpenPane: string;
    var fnClosePane: string;
    var fnChartPickerBar: string;
    var fnChartPickerCol: string;
    var fnChartPickerDensity: string;
    var fnChartPickerGrid: string;
    var fnChartPickerCustom: string;
    var fnChartPickerSpiral: string;
    var fnChartPickerRandom: string;
    var fnChartPickerPoisson: string;
    var fnChartPickerRadial: string;
    var fnChartPickerScatter3d: string;
    var fnChartPickerScatter: string;
    var fnChartPickerLine: string;
    var fnChartPickerLinks: string;
    var fnChartPickerCluster: string;
    var fnChartPickerSquarify: string;
    var fnChartPickerStacks: string;
    var fnChartPickerViolin: string;
    var fnChartPickerAggColumn: string;
    var fnChartPickerHRug: string;
    var fnChartPickerVRug: string;
    var fnFeedback: string;
    var fnScrubber: string;
    var fnScripts: string;
    var fnCluster: string;
    var fnThemes: string;
    var fnPalettes: string;
    var fnDetails: string;
    var fnSnapshot: string;
    var fnExlude: string;
    var fnIsolate: string;
    var fnNewView: string;
    var fnUndo: string;
    var fnRedo: string;
    var fnReset: string;
    var fnSettings: string;
    var fnAbout: string;
    var fnSearch: string;
    var fnFacetBrowse: string;
    var fnBot: string;
    var fnTours: string;
    var fnTasks: string;
    var fnHelp: string;
    var fnSlicer: string;
    var fnNav: string;
    var fnNavSelected: string;
    var fnInsights: string;
    var fnInsightsSelected: string;
    var fnIconBarDataTip: string;
    var fnDragDataTip: string;
    var fnIconBarPause: string;
    var fnIconBarPlay: string;
    var fnIconBarStop: string;
    var fnIconBarResume: string;
    var fnIconBarAdd: string;
    var fnSliderPlus: string;
    var fnSliderMinus: string;
    var fnSliderCircle: string;
    var fnColPickerNone: string;
    var fnColPickerNumber: string;
    var fnColPickerString: string;
    var fnColPickerDate: string;
    var fnAdjustDialBottom: string;
    var fnAdjustDialTop: string;
    var fnAdjustDialLeft: string;
    var fnAdjustDialRight: string;
    var fnSelectionToggle: string;
    var fnSelectionNormal: string;
    var fnSelectionExcept: string;
    var fnSelectionSubtract: string;
    var fnSelectionUnite: string;
    var fnSelectionIntersect: string;
    var fnSelectionExceptSelected: string;
    var fnSelectionSubtractSelected: string;
    var fnSelectionUniteSelected: string;
    var fnSelectionIntersectSelected: string;
    var fnInsightData: string;
    var fnInsightFilter: string;
    var fnInsightFull: string;
    var fnInsightSelection: string;
    var fnInsightView: string;
    var fnInsightCreate: string;
    var fnInsightNext: string;
    var fnInsightPrevious: string;
    var appIconPath: any;
    function iconPath(themeMgr: themeMgrClass, panelName: string, iconName: string): any;
    function setIconName(themeMgr: themeMgrClass, elem: HTMLElement, iconName: string, panelName?: string, applyNow?: boolean): void;
    function matchIconsToTheme(themeMgr: themeMgrClass, rootElem: HTMLElement, panelName?: string): void;
    function processImgElem(themeMgr: themeMgrClass, panelName: string, index: number, elemW: any): void;
}
declare module beachParty {
    class notesPanelClass extends basePanelClass {
        _notesElem: HTMLElement;
        constructor(app: appClass, title: string, notes: string, bounds: any, rcPlot: any, inPresentMode: boolean);
        onPanelSizeChanged(): void;
    }
}
declare module beachParty {
    class chartPickerClass extends basePanelClass {
        _app: appClass;
        _tableElem: HTMLElement;
        _selectedChartElem: HTMLElement;
        _callback: any;
        _currentChart: string;
        constructor(app: appClass, currentChart: string, callback: any);
        getChartElemByName(name: string): any;
        changeSelectedChart(): void;
        addChart(rowW: vp.dom.singleWrapperClass, title: string, imgSrc: string, tooltip: string, valueText?: string): vp.dom.singleWrapperClass;
        onClick(e: any): void;
        close(): void;
    }
}
declare module beachParty {
    class scrubberDialogClass extends basePanelClass {
        static maxRows: number;
        _app: appClass;
        _listElem: HTMLElement;
        _displayElem: HTMLElement;
        _descElem: HTMLElement;
        _valuesTableElem: HTMLTableElement;
        _typeCombo: pickerClass;
        _origColInfos: ColInfo[];
        _startingColInfos: ColInfo[];
        _editColInfos: editColInfo[];
        _showOnlyVisible: boolean;
        _searchText: any;
        _selectedEditItem: editColInfo;
        _listItemElems: any[];
        _resetValueMapsWhenLoaded: boolean;
        _selectedValueIndex: number;
        _valueRows: HTMLElement[];
        _currentTabContentElem: HTMLElement;
        _currentTabButtonElem: HTMLElement;
        constructor(app: appClass, origColInfos: ColInfo[], colInfos: ColInfo[]);
        buildLeftPanel(leftPanelW: vp.dom.singleWrapperClass): void;
        onTabSelected(tabButton: HTMLElement): void;
        addValueControls(rootW: vp.dom.IWrapperOuter, id: string): void;
        onSelectedValueChanged(): void;
        moveSelectedValue(delta: number): void;
        addPropertyControls(rootW: vp.dom.IWrapperOuter, id: string): void;
        resetColumn(ei: editColInfo): void;
        resetValueMap(vm: ValueMapEntry[]): void;
        addSearchBox(rootW: vp.dom.IWrapperOuter): void;
        doSearch(e: any): void;
        addShowOnlyCheckbox(rootW: vp.dom.IWrapperOuter): void;
        addBottomButtons(rootW: vp.dom.IWrapperOuter): void;
        addOkCancelButtons(rootW: vp.dom.IWrapperOuter): void;
        resetAllColumns(): void;
        showAllColumns(show: boolean): void;
        buildEditColInfos(resetColumns: boolean): void;
        closeDialog(keepChanges: boolean): void;
        buildListBoxItems(): void;
        toggleShowFilter(e: any): void;
        markItemSelected(itemElem: HTMLElement, isSelected: boolean): void;
        /** find the HTML elem (div) that represents the specified ei. */
        getItemElem(ei: editColInfo): any;
        selectItem(editItem: editColInfo): void;
        loadColumnProps(ei: editColInfo): void;
        loadColumnValues(ei: editColInfo, resetSelection?: boolean): void;
        /** "keys" should be in "originalValue" value set. */
        private sortValueMap(valueMap, keys);
        loadColumValuesFromValueMapInSortedKeysOrder(valueMap: ValueMapEntry[], table: any): void;
        onValueRowClick(e: any): void;
        selectValue(index: number): void;
        onValueEdited(e: any): void;
        toggleItem(e: any): void;
        getEditInfos(): editColInfo[];
        updatedAllSortedKeysToNewValues(): void;
        updateColSortedKeysToNewValues(ei: editColInfo): void;
        getValueMapEntry(ei: editColInfo, value: string, matchOrig?: boolean): ValueMapEntry;
    }
    /** these fields represent the column properties and values that can be changed in this dialog. */
    class editColInfo extends ColInfo {
        isVisible: boolean;
        displayName: string;
        origCol: ColInfo;
        valueMap: ValueMapEntry[];
        sortedKeysNeedsOrigValues: boolean;
        constructor(name: string, desc: string, colType: string, sortedKeys: string[], min: number, max: number);
    }
}
declare module beachParty {
    class insightMgrClass extends dataChangerClass {
        static fileExt: string;
        _app: appClass;
        _session: InsightSession;
        _isShowingInsightsPanel: boolean;
        _currentInsight: InsightData;
        _currentInsightIndex: number;
        _currentInsightReason: any;
        _currentPanel: jsonPanelClass;
        _editInsight: InsightData;
        _contextMenu: popupMenuClass;
        _rebuildTimer: any;
        _forceShow: boolean;
        _insightEntryElems: any[];
        _editSessionName: any;
        _sessionName: string;
        _pendingDropText: any;
        _playWithAnimation: boolean;
        _wasPaused: boolean;
        _panelWidth: number;
        _insightWidth: number;
        _insightHeight: number;
        _playbackIndex: number;
        _playbackTimer: any;
        _isPlayingBack: boolean;
        _isPaused: boolean;
        _playbackDuration: number;
        _isLooping: boolean;
        constructor(app: appClass);
        adjustPanelWidth(): void;
        closeMenus(): void;
        createEnumPicker(enumType: any, callback: any): any;
        playbackDuration(value?: number): number;
        isPlaybackLooping(value?: boolean): boolean;
        getCurrentInsightReason(): any;
        currentInsight(value?: InsightData, reason?: string): InsightData;
        setInsightAsCurrent(insight: InsightData, value: boolean): void;
        editSessionName(value?: string): any;
        editInsightName(value?: string): string;
        editInsightNotes(value?: string): string;
        loadAction(value?: string): string;
        notesSource(value?: string): string;
        addNewInsight(insight: InsightData): void;
        showInsightButtonContextMenu(e: any): popupMenuClass;
        onInsightEntryClick(e: any): void;
        markRebuildNeeded(forceShow?: boolean): void;
        showInsightContextMenu(e: any): popupMenuClass;
        openEditInsightPanel(e: any, insight: InsightData): void;
        captureInsightEx(insight: InsightData): void;
        updateInsightFromEditProps(insight: InsightData): void;
        openAddInsightPanel(insight: InsightData, callback: any): void;
        closeEditInsight(): void;
        deleteInsight(insight: InsightData): void;
        loadInsight(insight: any, reason: string): void;
        removeExt(fn: string): string;
        loadInsights(): void;
        loadSessionFromServer(sessionUrl: string, callback?: any): void;
        loadInsightsFromText(text: string, fn: string): void;
        loadInsightsFromZipFile(zip: JSZip, fn: string): void;
        loadQuickTest(): void;
        saveInsights(): void;
        emailInsights(): void;
        publishInsights(): void;
        openSessionNamePanel(name: string, callback: any): void;
        processDroppedText(text: string): void;
        deleteAllInsights(): void;
        startPlayback(useAnimation: boolean): void;
        syncPlaybackWithCurrentInsight(): void;
        isPlaying(): boolean;
        isPaused(): boolean;
        pausePlayback(): void;
        resumePlayback(): void;
        onPlayingChanged(wasPaused?: boolean): void;
        stopPlayback(reachedEnd?: boolean): void;
        loadTimedInsight(index: number): void;
        onInsightLoadCompleted(): void;
        showNextInsight(delta: number, preventTimer?: boolean): void;
        toggleInsightsPanel(): void;
        isPanelOpen(): boolean;
        showInsightBar(value?: boolean): boolean;
        getInsightsMenuItems(): MenuItemData[];
        getInsightEntryMenuItems(): MenuItemData[];
        addInsight(insight: InsightData): void;
        getInsightTooltip(insight: InsightData): string;
        addInsightToBar(insight: InsightData): void;
        buildInsightTitleBar(parentW: vp.dom.IWrapperOuter, insight: InsightData): vp.dom.singleWrapperClass;
        onIconClick(e: any): void;
        createLoadActionMenu(callback: any): popupMenuClass;
        getIconUrl(loadAction: LoadAction): any;
        rebuildInsightBar(): void;
    }
    class InsightSession {
        version: number;
        insights: InsightData[];
        constructor();
    }
}
declare module beachParty {
    /** we are a control created by jsonPanelClass.  we are hosted in a panel. */
    class slicerControlClass extends baseAppControlClass {
        _app: appClass;
        _histogram: HTMLElement;
        _histoHolder: HTMLElement;
        _selectedRowElem: HTMLElement;
        _slider: HTMLElement;
        _colPicker: pickerClass;
        _delimiterPicker: pickerClass;
        _isCategory: boolean;
        _binResult: BinResult;
        _colName: string;
        _buildTimer: any;
        _minValue: any;
        _searchParams: SearchParamsEx;
        _selectedBinIndex: any;
        _holderHeight: number;
        _rowElements: any[];
        _updateRowAfterBuild: boolean;
        _tagDelimiter: TagDelimiter;
        constructor(app: appClass, panel?: jsonPanelClass);
        tagDelimiter(value?: TagDelimiter): TagDelimiter;
        buildTopBar(rootW: vp.dom.IWrapperOuter): void;
        refreshColPickList(): void;
        /** property for setting the selected value in the UI when the control is loaded with data. */
        selectedValue(value?: string): any;
        setSelectedBinIndexFromValue(value: string): void;
        markBuildNeeded(): void;
        getRootElem(): HTMLElement;
        onResize(width: number, height: number): void;
        quickLayout(): void;
        close(): void;
        slicerData(value?: BinResult): BinResult;
        colName(value?: string): string;
        getSearchParams(): SearchParamsEx;
        buildNumericSliders(): void;
        getMaxCount(result: BinResult): number;
        buildHistogram(): void;
        updateSelectedRow(rowElem: any): void;
        selectFromRow(rowElem: any): void;
    }
    function createSlicer(app: appClass, panel?: jsonPanelClass): slicerControlClass;
}
declare module beachParty {
    class detailsPanelMgrClass extends dataChangerClass {
        _app: appClass;
        _root: HTMLElement;
        _jsonPanel: jsonPanelClass;
        _recordText: HTMLElement;
        _listElem: HTMLElement;
        _buttonsElem: HTMLElement;
        _pkVector: string[];
        _recordCount: number;
        _dataFrame: dataFrameClass;
        _currentRecordIndex: number;
        _primaryKey: number;
        _selectedColName: string;
        _selectedValue: string;
        _unsortedColInfos: ColInfo[];
        _colInfos: ColInfo[];
        _rowElemByColName: any;
        _selectedColIndex: any;
        _numSpreader: numSpreaderClass;
        _lastPercent: {};
        _isSizeLocked: boolean;
        _recordLayoutCount: number;
        _isClosing: boolean;
        _rebuildTimer: any;
        constructor(app: appClass, buttonName: string);
        scheduleRebuild(): void;
        rebuildPanel(): void;
        formatValue(colInfo: ColInfo, value: any): string;
        buildOverview(root: HTMLElement): void;
        buildContent(jsonPanel: jsonPanelClass): void;
        private onDataSelectionChanged();
        refeshRecordInfo(refreshColInfo: boolean): void;
        onClose(): void;
        buildNavPanel(parentW: vp.dom.IWrapperOuter): void;
        private getRecordIndex(ssIndex);
        private goto(recordIndex);
        selectedColName(value?: string): string;
        onKeyDown(e: any): void;
        getSelectedIndex(ri: number): number;
        /** this is called (indirectly from app) when app.selectedRecords changes. */
        primaryKeys(value?: any[]): string[];
        colInfos(value?: ColInfo[]): ColInfo[];
        onColInfosChanged(): void;
        selectRowAndSearch(e: any): void;
        selectRowFromParent(elem: any): void;
        getSelectedValue(): string;
        rebuildColTable(): void;
        openNumSpreader(rowParent: any, numSpreadParent: any): void;
        closeNumSpreader(): void;
        rebuildRecordValues(): void;
        /**
         * Lock down this size so panel doesn't resize with each record.
         */
        lockCurrentPanelSize(value: boolean): void;
        selectRowAndBingSearch(e: any): void;
        layoutPanel(maxWidth: number, maxHeight: number): void;
        /**
         * We do this so that the value text gets clipped (as per clipText class) ----
         */
        lockInValueWidth(): void;
        clearRebuldTimer(): void;
        /**
         * This is called when a new details Panel is created.
         * @param jsonPanel
         */
        updateAttrPanel(jsonPanel: jsonPanelClass): void;
    }
}
declare module beachParty {
    /** this class is designed around an initial app state being pushed after the app init process is complete.  This becomes the
     * permanent _stack[0] entry (which is used to "undo" the first user action).
     */
    class undoMgrClass extends dataChangerClass {
        _stack: UndoEntry[];
        _index: number;
        _maxUndoLevels: number;
        constructor();
        getCurrentInsight(): InsightData;
        push(insight: InsightData, tooltip: string): void;
        isUndoAvailable(): boolean;
        getUndoTooltip(): string;
        undo(): UndoEntry;
        isRedoAvailable(): boolean;
        getRedoTooltip(): string;
        redo(): UndoEntry;
    }
    class UndoEntry {
        insight: InsightData;
        tooltip: string;
        constructor(insight: InsightData, tooltip: string);
    }
}
