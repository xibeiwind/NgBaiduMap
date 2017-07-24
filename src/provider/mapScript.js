import { nullCheck } from '../helper/validate';
import Promise from 'promise-polyfill';

export default function () {

    let ak = null;


    // let MAP_DRAW_URL = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.js';
    // let MAP_DRAW_STYLE_URL = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.css';
    // let MAP_SEARCHINFO_URL = 'http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.js';
    // let MAP_SEARCHINFO_STYLE_URL = 'http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow.css';
    let MAP_AREARESTRICTION_URL = 'http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction.js';
    let MAP_GEO_UTILS_URL = 'http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils.js';


    this.mapScriptInit = function (mapOptions) {

        ak = mapOptions.ak;

        let MAP_URL = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit`;

        //MAP_URL = mapOptions
        // appendScriptTag(MAP_URL).then(() => {
        //     if (!!mapOptions.withDrawLib) {
        //         appendAditionalScriptTag(MAP_DRAW_URL);
        //         appendAditionalStylesheetTag(MAP_DRAW_STYLE_URL);

        //         appendAditionalScriptTag(MAP_SEARCHINFO_URL);
        //         appendAditionalStylesheetTag(MAP_SEARCHINFO_STYLE_URL);
        //     }
        //     if (!!mapOptions.withBoundLimited) {
        //         appendAditionalScriptTag(MAP_AREARESTRICTION_URL);
        //     }
        //     if (!!mapOptions.withGeoUtils) {
        //         appendAditionalScriptTag(MAP_GEO_UTILS_URL);
        //     }
        // });

        appendScriptTag(MAP_URL).then(() => {
            appendAditionalScriptTag(MAP_AREARESTRICTION_URL);
            if (!!mapOptions.withGeoUtils) {
                appendAditionalScriptTag(MAP_GEO_UTILS_URL);
            }
        });
    };

    this.$get = function ($rootScope) {
        var displayMap = () => {
            return Array.prototype
                .slice
                .call(document.querySelectorAll('baidu-map'))
                .forEach(function (node) {
                    node.querySelector('.baidu-map-offline') && node.removeChild(node.querySelector('.baidu-map-offline'));
                    node.querySelector('.baidu-map-instance').style.display = 'block';
                });
        };
        return {
            load: () => {
                nullCheck(ak, 'ak shold be set before use.');
                const loadBaiduMapPromise = $rootScope.loadBaiduMapPromise;
                if (loadBaiduMapPromise) {
                    return loadBaiduMapPromise.then(displayMap);
                }
                return $rootScope.loadBaiduMapPromise = new Promise((resolve, reject) => {
                    window.baidumapinit = resolve;

                    //appendScriptTag(MAP_URL);

                }).then(displayMap);
            }
        };
    };

}

function appendScriptTag(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;

        script.onerror = () => {
            document.body.removeChild(script);
            setTimeout(() => {
                appendScriptTag(url);
            }, 3000);
        };

        document.body.appendChild(script);
    });
}

function appendAditionalScriptTag(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onerror = () => {
        document.body.removeChild(script);
        setTimeout(() => {
            appendAditionalScriptTag(url);
        }, 200);
    };

    document.body.appendChild(script);
}

function appendAditionalStylesheetTag(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    link.onerror = () => {
        document.body.removeChild(link);

        setTimeout(() => {
            appendAditionalStylesheetTag(url);
        }, 200);

        document.body.appendChild(link);
    };
}
