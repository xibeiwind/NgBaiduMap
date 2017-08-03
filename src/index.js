import angular from "angular";

import baiduMap from "./components/baiduMap";
import marker from "./components/marker";
import polygon from "./components/polygon";
import drawtool from "./components/drawtool";
import markerCluster from "./components/markerCluster";
import mapScriptProvider from './provider/mapScript';
import { globalConstants } from './helper/preset';

globalConstants();

const moduleName = "baiduMap";

angular.module(moduleName, [])
    .provider('mapScriptService', mapScriptProvider)
    .component('baiduMap', baiduMap)
    .component("marker", marker)
    .component("polygon", polygon)
    .component("drawtool", drawtool)
    .component("markerCluster", markerCluster);

export const ngBaiduMap = moduleName;