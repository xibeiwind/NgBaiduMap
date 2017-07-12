import angular from "angular";

import baiduMap from "./components/baiduMap";
import marker from "./components/marker";
import polygonOverlay from "./components/polygonOverlay";
import mapScriptProvider from './provider/mapScript';

import { globalConstants } from './helper/preset';

globalConstants();

const moduleName = "baiduMap";

angular.module(moduleName, [])
    .provider('mapScriptService', mapScriptProvider)
    .component('baiduMap', baiduMap)
    .component("marker", marker)
    .component("polygonOverlay", polygonOverlay);

export const ngBaiduMap = moduleName;