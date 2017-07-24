export default {
    type: 'configure',
    config(mapScriptServiceProvider) {
        'ngInject';

        //mapScriptServiceProvider.setKey('gd0GyxGUxSCoAbmdyQBhyhrZ');
        mapScriptServiceProvider.mapScriptInit({
            ak: "gd0GyxGUxSCoAbmdyQBhyhrZ",
            withDrawLib: false,
            withBoundLimited: false,
            withGeoUtils: true
        })
    }

};