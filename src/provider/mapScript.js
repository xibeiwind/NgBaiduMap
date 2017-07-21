import { nullCheck } from '../helper/validate';
import Promise from 'promise-polyfill';

export default function () {
    let ak = null,
        MAP_URL;
    let MAP_DRAW_URL = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.js";
    let MAP_DRAW_STYLE_URL = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.css";
    let MAP_SEARCHINFO_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.js`;
    let MAP_SEARCHINFO_STYLE_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.css`;
    //http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.css

    let MAP_AREARESTRICTION_URL = "http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction.js";

    let MAP_GEO_UTILS_URL = "http://api.map.baidu.com/library/GeoUtils/1.2/docs/symbols/src/BMapLib_GeoUtils.js.html";
    this.setKey = function (val) {
        ak = val;
        MAP_URL = //`http://api.map.baidu.com/api?v=2.0&ak=${ak}`; 
            `//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit&s=${location.protocol === 'https:' ? 1 : 0}`;
        //`http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit`;
    };

    this.loadScripts = function (withDrawLib, boundLimitEnabled, withGeoUtils) {

        appendScriptTag(MAP_URL);

        setTimeout(function () {
            if (!!withDrawLib) {
                appendAditionalScriptTag(MAP_DRAW_URL);
                appendAditionalScriptTag(MAP_SEARCHINFO_URL);

                appendStylesheetTag(MAP_DRAW_STYLE_URL);
                appendStylesheetTag(MAP_SEARCHINFO_STYLE_URL);
            }

            if (!!boundLimitEnabled) {
                appendAditionalScriptTag(MAP_AREARESTRICTION_URL);
            }
            if (!!withGeoUtils) {
                appendAditionalScriptTag(MAP_GEO_UTILS_URL);
            }
        }, 1000);
    };

    // this.loadAdditionalScripts = function (scriptOptions) {
    //     if (!!scriptOptions.withDrawLib) {
    //         appendScriptTag(MAP_DRAW_URL);
    //         appendScriptTag(MAP_SEARCHINFO_URL);

    //         appendStylesheetTag(MAP_DRAW_STYLE_URL);
    //         appendStylesheetTag(MAP_SEARCHINFO_STYLE_URL);
    //     }

    //     if (!!scriptOptions.boundLimitEnabled) {
    //         appendScriptTag(MAP_AREARESTRICTION_URL);
    //     }
    // };

    this.$get = function ($rootScope) {
        'ngInject';

        return {
            load: function () {

                nullCheck(ak, 'ak should be set before use. Read: https://leftstick.github.io/BaiduMapForAngularJS/#!/quickstart');

                var displayMap = function () {
                    // if (!!withDrawLib) {
                    //     appendScriptTag(MAP_DRAW_URL);
                    //     appendScriptTag(MAP_SEARCHINFO_URL);

                    //     appendStylesheetTag(MAP_DRAW_STYLE_URL);
                    //     appendStylesheetTag(MAP_SEARCHINFO_STYLE_URL);
                    // }

                    // if (!!boundLimitEnabled) {
                    //     appendScriptTag(MAP_AREARESTRICTION_URL);
                    // }

                    return Array.prototype
                        .slice
                        .call(document.querySelectorAll('baidu-map'))
                        .forEach(function (node) {
                            node.querySelector('.baidu-map-offline') && node.removeChild(node.querySelector('.baidu-map-offline'));
                            node.querySelector('.baidu-map-instance').style.display = 'block';
                        });
                };

                const loadBaiduMapPromise = $rootScope.loadBaiduMapPromise;
                if (loadBaiduMapPromise) {
                    return loadBaiduMapPromise.then(displayMap);
                }

                //eslint-disable-next-line
                return $rootScope.loadBaiduMapPromise = new Promise((resolve, reject) => {
                    window.baidumapinit = resolve;
                    //appendScriptTag(MAP_URL);

                }).then(displayMap);
            }
        };
    };
}

function appendScriptTag(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = function () {
        console.log("baidumap loaded!");
    };
    script.onerror = function () {

        Array.prototype
            .slice
            .call(document.querySelectorAll('baidu-map .baidu-map-offline'))
            .forEach(function (node) {
                node.style.display = 'block';
            });
        document.body.removeChild(script);

        setTimeout(() => {
            appendScriptTag(url);
        }, 30000);
    };
    document.body.appendChild(script);
}

function appendAditionalScriptTag(url) {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = function () {
        document.body.removeChild(script);

        setTimeout(() => {
            appendAditionalScriptTag(url);
        }, 30000);
    };
    document.body.appendChild(script);
}

function appendStylesheetTag(url) {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = url;
    link.onerror = function () {

        // Array.prototype
        //     .slice
        //     .call(document.querySelectorAll('baidu-map .baidu-map-offline'))
        //     .forEach(function (node) {
        //         node.style.display = 'block';
        //     });
        document.body.removeChild(link);

        setTimeout(() => {
            appendStylesheetTag(url);
        }, 30000);
    };
    document.body.appendChild(link);
}

// function displayMap() {
//     return Array.prototype
//         .slice
//         .call(document.querySelectorAll('baidu-map'))
//         .forEach(function (node) {
//             node.querySelector('.baidu-map-offline') && node.removeChild(node.querySelector('.baidu-map-offline'));
//             node.querySelector('.baidu-map-instance').style.display = 'block';
//         });
// }
