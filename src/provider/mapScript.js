import { nullCheck } from '../helper/validate';

export default function () {
    let ak = null,
        MAP_URL;
    let MAP_DRAW_URL = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.js";
    let MAP_DRAW_STYLE_URL = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.css";
    let MAP_SEARCHINFO_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.js`;
    let MAP_SEARCHINFO_STYLE_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.css`;
    //http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.css

    let MAP_AREARESTRICTION_URL = "http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction.js";
    this.setKey = function (val) {
        ak = val;
        MAP_URL = //`http://api.map.baidu.com/api?v=2.0&ak=${ak}`; 
            `//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit&s=${location.protocol === 'https:' ? 1 : 0}`;
    };

    this.loadScripts = function (withDrawLib, boundLimitEnabled) {

        appendScriptTag(MAP_URL);

        setTimeout(function () {
            if (!!withDrawLib) {
                appendScriptTag(MAP_DRAW_URL);
                appendScriptTag(MAP_SEARCHINFO_URL);

                appendStylesheetTag(MAP_DRAW_STYLE_URL);
                appendStylesheetTag(MAP_SEARCHINFO_STYLE_URL);
            }

            if (!!boundLimitEnabled) {
                appendScriptTag(MAP_AREARESTRICTION_URL);
            }
        }, 1000);


    };

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
