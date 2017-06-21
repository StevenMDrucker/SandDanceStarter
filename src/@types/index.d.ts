interface NodeRequire {
    <T>(path: string): T;
}

interface NodeModule {
    hot: any;
}

declare var module: NodeModule;
declare var require: NodeRequire;
declare var __DEV__: boolean;


declare module "react-vega-lite" {
    var reactVegaLite: any;
    export function createClassFromLiteSpec(name:any,desc:any): any;
    export  default reactVegaLite;
}
