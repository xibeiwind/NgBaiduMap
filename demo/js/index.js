(function () {

    angular
        .module('mapApp', [
            'ngAnimate',
            "ngAria",
            'ngMaterial',

            window.ngBaiduMap
        ]).config(['mapScriptServiceProvider', function (provider) {
            provider.setKey('3R7GWgMCUmLQ08YtLYeNYGPBC4tKj9gr');
        }]);

}());

(function () {
    angular
        .module('mapApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope) {

        $scope.mapOptions = {
            enableMapClick: false,
            centerAndZoom: {
                longitude: 121.442938, latitude: 31.135326,
                zoom: 14
            }
        };
        var vm = this;

        $scope.mapLoaded = function (map) {
            vm.map = map;
            // add map tools

            setTimeout(function () {


                var overlays = [];
                var overlaycomplete = function (e) {
                    overlays.push(e.overlay);
                    e.overlay.enableEditing();

                    var tmp = map.getOverlays();
                    console.log(map.getOverlays().length);
                };
                var styleOptions = {
                    strokeColor: "red",    //边线颜色。
                    fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
                //实例化鼠标绘制工具
                var drawingManager = new BMapLib.DrawingManager(map, {
                    isOpen: true, //是否开启绘制模式
                    enableDrawingTool: true, //是否显示工具栏

                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                        offset: new BMap.Size(5, 5), //偏离值
                    },
                    drawingModes: [BMAP_DRAWING_POLYGON],
                    circleOptions: styleOptions, //圆的样式
                    polylineOptions: styleOptions, //线的样式
                    polygonOptions: styleOptions, //多边形的样式
                    rectangleOptions: styleOptions //矩形的样式
                });
                drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
                //添加鼠标绘制工具监听事件，用于获取绘制结果
                drawingManager.addEventListener('overlaycomplete', overlaycomplete);
                function clearAll() {
                    for (var i = 0; i < overlays.length; i++) {
                        map.removeOverlay(overlays[i]);
                    }
                    overlays.length = 0
                };


            }, 1000);


        };

        $scope.focusBorder = function (index) {
            var item = $scope.overlayItems[index];
            var pointArray = item.options.overlay.getPath();
            vm.map.setViewport(pointArray); 

            item.options.ctrl.enableEditing();

        };

        $scope.mapRightClick = function (e) {
            console.log("right click!");
        }

        var markericonUrl = "https://raw.githubusercontent.com/leftstick/BaiduMapForAngularJS/master/demo/img/markericon.png";

        // $scope.markers = [{
        //     options: {
        //         offset: {
        //             width: 0,
        //             height: -30
        //         },
        //         icon: {
        //             url: markericonUrl,
        //             size: {
        //                 width: 49,
        //                 height: 60
        //             }
        //         },

        //     },

        //     point: {
        //         longitude: 121.51606,
        //         latitude: 31.244604
        //     }

        // }];

        $scope.markers = [];

        var points = [{ longitude: 121.506613, latitude: 31.235593 },
        { longitude: 121.516735, latitude: 31.221043 },
        { longitude: 121.50722, latitude: 31.204231 },
        { longitude: 121.49725, latitude: 31.196958 },
        { longitude: 121.484185, latitude: 31.194424 },
        { longitude: 121.47666, latitude: 31.196975 },
        { longitude: 121.473341, latitude: 31.210569 },
        { longitude: 121.468678, latitude: 31.209076 },
        { longitude: 121.46327, latitude: 31.22811 },
        { longitude: 121.474168, latitude: 31.229578 },
        { longitude: 121.46961, latitude: 31.247499 },
        { longitude: 121.476376, latitude: 31.245246 },
        { longitude: 121.487302, latitude: 31.246038 },
        { longitude: 121.493085, latitude: 31.249927 },
        { longitude: 121.501498, latitude: 31.248007 },
        { longitude: 121.5001, latitude: 31.241321 },
        { longitude: 121.506613, latitude: 31.235593 }];

        angular.forEach(points, function (point) {
            $scope.markers.push({
                options: {
                    offset: {
                        width: 0,
                        height: -30
                    },
                    icon: {
                        url: markericonUrl,
                        size: {
                            width: 49,
                            height: 60
                        }
                    },

                },
                point: point,
                info: {
                    title: "TestTtile",
                    pictures: [
                        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4249259376,129608777&fm=80&w=179&h=119&img.JPEG",
                        "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3786477295,4103668027&fm=80&w=179&h=119&img.JPEG",
                        "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=887195392,665306983&fm=80&w=179&h=119&img.JPEG"
                    ]
                }
            });
        });

        $scope.showMarkerWindow = function (e, marker, map, item) {
            console.log("showMarkerWindow");
            var sContent =
                "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
                "<img style='float:right;margin:4px' id='imgDemo' src='https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=887195392,665306983&fm=80&w=179&h=119&img.JPEG' width='139' height='104' title='天安门'/>" +
                "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
                " ";
            sContent = `<div md-card class="marker_info">
    <md-card-header>
        <md-card-title>${item.info.title}</md-card-title>
        <md-card-subtitle>Subtitle</md-card-subtitle>
    </md-card-header>
   
    <md-card-content>
         <img src="${item.info.pictures[0]}" class="md-card-image" alt="Washed Out"/>
    </md-card-content>
    <md-card-actions align="end">
        <button md-button (click)="onAction1">Action1</button>
        
    </md-card-actions>
    <md-card-footer>
        Footer
    </md-card-footer>
</div>`;

            sContent = `<md-content flex layout-padding>
    ${item.info.title}
    <p>
             <img style='float:right;margin:4px' id='imgDemo' src="${item.info.pictures[0]}" class="md-card-image" alt="Washed Out"/>

    </p>
</md-content>`;


            // map.openInfoWindow(new BMap.InfoWindow("TEST", {
            //     title: item.info.title,
            //     offset: item.options.offset
            // }), marker.point);

            var infoWindow = new BMap.InfoWindow(sContent);
            infoWindow.addEventListener("open", function () {
                item.infoWindowIsOpen = true;
                console.log("open");
            });

            infoWindow.addEventListener("close", function () {
                item.infoWindowIsOpen = false;
                console.log("close");
            });
            marker.openInfoWindow(infoWindow, { enableAutoPan: true });

            document.getElementById('imgDemo').onload = function () {
                infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            }
        };

        $scope.overlayItems = [
            {
                type: 'polygon',
                options: {
                    polygonOptions: {
                        fillColor: '#ff0000', fillOpacity: 0.1,
                        strokeWeight: 1, strokeColor: '#ff0000', strokeOpacity: 0.5
                    },
                    points: [
                        { longitude: 121.474386, latitude: 31.172705 },
                        { longitude: 121.475587, latitude: 31.16485 },
                        { longitude: 121.463416, latitude: 31.149473 },
                        { longitude: 121.475704, latitude: 31.133384 },
                        { longitude: 121.476954, latitude: 31.126352 },
                        { longitude: 121.469718, latitude: 31.114912 },
                        { longitude: 121.469233, latitude: 31.108036 },
                        { longitude: 121.461837, latitude: 31.106962 },
                        { longitude: 121.452108, latitude: 31.111241 },
                        { longitude: 121.458594, latitude: 31.114814 },
                        { longitude: 121.457335, latitude: 31.121617 },
                        { longitude: 121.442063, latitude: 31.11985 },
                        { longitude: 121.445358, latitude: 31.125804 },
                        { longitude: 121.442938, latitude: 31.135326 },
                        { longitude: 121.427989, latitude: 31.133368 },
                        { longitude: 121.418124, latitude: 31.146642 },
                        { longitude: 121.409074, latitude: 31.168046 },
                        { longitude: 121.399996, latitude: 31.166016 },
                        { longitude: 121.399546, latitude: 31.172683 },
                        { longitude: 121.403069, latitude: 31.175552 },
                        { longitude: 121.399022, latitude: 31.17852 },
                        { longitude: 121.402218, latitude: 31.179063 },
                        { longitude: 121.400856, latitude: 31.183538 },
                        { longitude: 121.421347, latitude: 31.188252 },
                        { longitude: 121.419056, latitude: 31.197137 },
                        { longitude: 121.42726, latitude: 31.197299 },
                        { longitude: 121.430227, latitude: 31.203557 },
                        { longitude: 121.444339, latitude: 31.210246 },
                        { longitude: 121.441673, latitude: 31.217472 },
                        { longitude: 121.44597, latitude: 31.220755 },
                        { longitude: 121.462448, latitude: 31.22597 },
                        { longitude: 121.467167, latitude: 31.219649 },
                        { longitude: 121.468678, latitude: 31.209076 },
                        { longitude: 121.473341, latitude: 31.210569 },
                        { longitude: 121.47666, latitude: 31.196975 },
                        { longitude: 121.484185, latitude: 31.194424 },
                        { longitude: 121.472095, latitude: 31.18548 },
                        { longitude: 121.474386, latitude: 31.172705 }
                    ]
                },
                dataset: {}
            },
            {
                type: 'polygon',
                options: {
                    polygonOptions: {
                        fillColor: '#00ff00', fillOpacity: 0.1,
                        strokeWeight: 1, strokeColor: '#00ff00', strokeOpacity: 0.5
                    },
                    points: [
                        { longitude: 121.506613, latitude: 31.235593 },
                        { longitude: 121.516735, latitude: 31.221043 },
                        { longitude: 121.50722, latitude: 31.204231 },
                        { longitude: 121.49725, latitude: 31.196958 },
                        { longitude: 121.484185, latitude: 31.194424 },
                        { longitude: 121.47666, latitude: 31.196975 },
                        { longitude: 121.473341, latitude: 31.210569 },
                        { longitude: 121.468678, latitude: 31.209076 },
                        { longitude: 121.46327, latitude: 31.22811 },
                        { longitude: 121.474168, latitude: 31.229578 },
                        { longitude: 121.46961, latitude: 31.247499 },
                        { longitude: 121.476376, latitude: 31.245246 },
                        { longitude: 121.487302, latitude: 31.246038 },
                        { longitude: 121.493085, latitude: 31.249927 },
                        { longitude: 121.501498, latitude: 31.248007 },
                        { longitude: 121.5001, latitude: 31.241321 },
                        { longitude: 121.506613, latitude: 31.235593 }
                    ]
                },
                dataset: {}
            }
        ];
    }

}());
