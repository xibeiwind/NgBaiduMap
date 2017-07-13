(function () {

    angular
        .module('mapApp', [
            'ngAnimate',
            "ngAria",
            'ngMaterial',

            window.ngBaiduMap
        ]).config(['mapScriptServiceProvider', function (provider) {
            provider.setKey('3R7GWgMCUmLQ08YtLYeNYGPBC4tKj9gr');
            provider.loadScripts(true, true);
        }]);

}());