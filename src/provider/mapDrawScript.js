// <!--加载鼠标绘制工具-->
// <script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
// <link rel="stylesheet" href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css" />
// <!--加载检索信息窗口-->
// <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js"></script>
// <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.css" />

const DRAW_LIB_URL = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';
const DRAW_LIB_STYLE_URL = `http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css`;
const SEARCH_LIB_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js`;
const SEARCH_LIB_STYLE_URL = `http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.css`;

export default function () {
    const loadDrawLibPromise = window.loadDrawLibPromise;
    if (!!loadDrawLibPromise) {
        return loadDrawLibPromise;
    }
    return window.loadDrawLibPromise = appendDrawingLibScriptTag();
}

function appendDrawingLibScriptTag() {


    return appendScriptTag(DRAW_LIB_URL).then(() => {
        appendStylesheetTag(DRAW_LIB_STYLE_URL);

        return appendScriptTag(SEARCH_LIB_URL).then(() => {
            return appendStylesheetTag(SEARCH_LIB_STYLE_URL);
        });
    });

}

function appendScriptTag(url) {
    return new Promise((resolve, reject) => {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onerror = function () {
            document.body.removeChild(script);

            setTimeout(() => {
                appendScriptTag(url);
            }, 30000);
        };
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

function appendStylesheetTag(url) {
    return new Promise((resolve, reject) => {

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onerror = function () {
            document.body.removeChild(link);

            setTimeout(() => {
                appendStylesheetTag(url);
            }, 30000);
        };
        link.onload = resolve;
        document.body.appendChild(link);
    });
}