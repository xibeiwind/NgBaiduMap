export default {
    type: 'configure',
    config(mapScriptServiceProvider) {
        'ngInject';

        //mapScriptServiceProvider.setKey('gd0GyxGUxSCoAbmdyQBhyhrZ');
        mapScriptServiceProvider.mapScriptInit({
            //ak: "gd0GyxGUxSCoAbmdyQBhyhrZ",
            ak: "3R7GWgMCUmLQ08YtLYeNYGPBC4tKj9gr",
            withDrawLib: false,
            withBoundLimited: false,
            withGeoUtils: true
        })
    }

};