

const MARKER_CLUSTER_URL = "http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer.js";
const TEXT_ICON_OVERLAY_URL = "http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay.js";

export default function () {
    const loadMarkerClusterLibPromise = window.loadMarkerClusterLibPromise;
    if (!!loadMarkerClusterLibPromise) {
        return loadMarkerClusterLibPromise;
    }

    return window.loadMarkerClusterLibPromise = appendMarkerClusterLibStriptTag();
}

function appendMarkerClusterLibStriptTag() {
    return appendScriptTag(MARKER_CLUSTER_URL).then(function (result) {
        return appendScriptTag(TEXT_ICON_OVERLAY_URL);
    });

}

function appendScriptTag(url) {
    return new Promise((resolve, reject) => {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onerror = function () {
            document.body.removeChild(script);

            setTimeout(() =>
                appendScriptTag(url)
                , 30000);
        };
        script.onload = resolve;
        document.body.appendChild(script);
        console.log(url);
    });
}