

(function () {
    angular
        .module('mapApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, PropertyService) {

        $scope.mapOptions = {
            withDrawLib: true,
            boundLimitEnabled: true,
            enableMapClick: false,
            centerAndZoom: {
                lng: 121.50691518, lat: 31.22944490,
                zoom: 14
            }
        };
        var vm = this;

        var markericonUrl = "images/bank_mark.png";


        $scope.markers = [];

        $scope.marker = {
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
                }
            },
            point: {
                lng: 121.50691518,
                lat: 31.22944490,
            }
        };

        var tmp = PropertyService.queryPropertyList({});

        PropertyService.queryPropertyList({}).then(function (result) {

            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    var element = result[key];
                    angular.forEach(element, function (item) {
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
                                }
                            },
                            point: { lng: item.point.lng, lat: item.point.lat }, //item.point,
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
                }
            }

            console.log($scope.markers.length);

            // angular.forEach(result, function (arr) {
            //     angular.forEach(arr, function (item) {
            //         $scope.markers.push({
            //             options: {
            //                 offset: {
            //                     width: 0,
            //                     height: -30
            //                 },
            //                 icon: {
            //                     url: markericonUrl,
            //                     size: {
            //                         width: 49,
            //                         height: 60
            //                     }
            //                 },

            //             },
            //             point: point,
            //             info: {
            //                 title: "TestTtile",
            //                 pictures: [
            //                     "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4249259376,129608777&fm=80&w=179&h=119&img.JPEG",
            //                     "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3786477295,4103668027&fm=80&w=179&h=119&img.JPEG",
            //                     "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=887195392,665306983&fm=80&w=179&h=119&img.JPEG"
            //                 ]
            //             }
            //         });
            //     });
            // });
        });

        $scope.colorButtons = [
            { "background-color": "red" },
            { "background-color": "yellow" },
            { "background-color": "blue" },
            { "background-color": "lime" },
            { "background-color": "orange" },
        ];

        $scope.applyCreateBorder = function () {
            if (!!vm.createdOverlay) {
                var pointArray = vm.createdOverlay.getPath();

                console.log(JSON.stringify(pointArray));
            }
        };

        $scope.setBorderColor = function (color) {
            if (!!vm.createdOverlay) {
                vm.createdOverlay.setFillColor(color);
                vm.createdOverlay.setStrokeColor(color);
            }
        }

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

                    $scope.$apply(function () {
                        $scope.endCreate = true;
                        vm.createdOverlay = e.overlay;
                    });
                    //$scope.endCreate = true;
                };
                var styleOptions = {
                    strokeColor: "red",    //边线颜色。
                    fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.6,	   //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
                //实例化鼠标绘制工具

                var initDrawingToolbar = function () {
                    this.drawingManager = new BMapLib.DrawingManager(map, {
                        isOpen: false, //是否开启绘制模式
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
                    this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
                    //添加鼠标绘制工具监听事件，用于获取绘制结果
                    this.drawingManager.addEventListener('overlaycomplete', overlaycomplete);
                    function clearAll() {
                        for (var i = 0; i < overlays.length; i++) {
                            map.removeOverlay(overlays[i]);
                        }
                        overlays.length = 0
                    };
                };

                if (!!BMapLib.DrawingManager) {
                    initDrawingToolbar();
                }
                else {
                    setTimeout(function () {
                        initDrawingToolbar();
                    }, 2000);
                }



            }, 1000);


        };

        $scope.focusBorder = function (borderId) {
            angular.forEach($scope.overlayItems, function (item) {
                if (item.borderId == borderId) {
                    var pointArray = item.options.overlay.getPath();
                    vm.map.setViewport(pointArray);

                    item.options.ctrl.enableEditing();
                } else {
                    item.options.ctrl.disableEditing();
                }
            })
            // var item = $scope.overlayItems[index];
            // var pointArray = item.options.overlay.getPath();
            // vm.map.setViewport(pointArray);

            // item.options.ctrl.enableEditing();

        };

        $scope.mapRightClick = function (e) {
            console.log("right click!");
        };



        // var markericonUrl = "https://raw.githubusercontent.com/leftstick/BaiduMapForAngularJS/master/demo/img/markericon.png";

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
        //         lng: 121.51606,
        //         lat: 31.244604
        //     }

        // }];

        // $scope.markers = [];

        // var points = [{ lng: 121.506613, lat: 31.235593 },
        // { lng: 121.516735, lat: 31.221043 },
        // { lng: 121.50722, lat: 31.204231 },
        // { lng: 121.49725, lat: 31.196958 },
        // { lng: 121.484185, lat: 31.194424 },
        // { lng: 121.47666, lat: 31.196975 },
        // { lng: 121.473341, lat: 31.210569 },
        // { lng: 121.468678, lat: 31.209076 },
        // { lng: 121.46327, lat: 31.22811 },
        // { lng: 121.474168, lat: 31.229578 },
        // { lng: 121.46961, lat: 31.247499 },
        // { lng: 121.476376, lat: 31.245246 },
        // { lng: 121.487302, lat: 31.246038 },
        // { lng: 121.493085, lat: 31.249927 },
        // { lng: 121.501498, lat: 31.248007 },
        // { lng: 121.5001, lat: 31.241321 },
        // { lng: 121.506613, lat: 31.235593 }];

        // angular.forEach(points, function (point) {
        //     $scope.markers.push({
        //         options: {
        //             offset: {
        //                 width: 0,
        //                 height: -30
        //             },
        //             icon: {
        //                 url: markericonUrl,
        //                 size: {
        //                     width: 49,
        //                     height: 60
        //                 }
        //             },

        //         },
        //         point: point,
        //         info: {
        //             title: "TestTtile",
        //             pictures: [
        //                 "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4249259376,129608777&fm=80&w=179&h=119&img.JPEG",
        //                 "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3786477295,4103668027&fm=80&w=179&h=119&img.JPEG",
        //                 "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=887195392,665306983&fm=80&w=179&h=119&img.JPEG"
        //             ]
        //         }
        //     });
        // });

        $scope.showMarkerWindow = function (e, marker, map, item) {
            console.log("showMarkerWindow");
            //             var sContent = `<md-content flex layout-padding>
            //     ${item.info.title}
            //     <p>
            //              <img style='float:right;margin:4px' id='imgDemo' style="height:100px;" src="${item.info.pictures[0]}" alt="Washed Out"/>

            //     </p>
            // </md-content>`;

            var sContent =
                "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
                "<img style='float:right;margin:4px' id='imgDemo' src='http://lbsyun.baidu.com/jsdemo/img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" +
                "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
                "</div>";

            var infoWindow = new BMap.InfoWindow(sContent);
            infoWindow.addEventListener("open", function () {
                item.infoWindowIsOpen = true;


                //infoWindow.redraw();

                console.log("open");
            });

            infoWindow.addEventListener("close", function () {
                item.infoWindowIsOpen = false;
                console.log("close");
            });
            //marker.openInfoWindow(infoWindow, { enableAutoPan: true });
            marker.openInfoWindow(infoWindow);

        };

        $scope.overlayItems = [
            {
                type: 'polygon',
                borderId: "b0001",
                options: {
                    polygonOptions: {
                        fillColor: '#ff0000', fillOpacity: 0.1,
                        strokeWeight: 1, strokeColor: '#ff0000', strokeOpacity: 0.5
                    },
                    points: [
                        { lng: 121.474386, lat: 31.172705 },
                        { lng: 121.475587, lat: 31.16485 },
                        { lng: 121.463416, lat: 31.149473 },
                        { lng: 121.475704, lat: 31.133384 },
                        { lng: 121.476954, lat: 31.126352 },
                        { lng: 121.469718, lat: 31.114912 },
                        { lng: 121.469233, lat: 31.108036 },
                        { lng: 121.461837, lat: 31.106962 },
                        { lng: 121.452108, lat: 31.111241 },
                        { lng: 121.458594, lat: 31.114814 },
                        { lng: 121.457335, lat: 31.121617 },
                        { lng: 121.442063, lat: 31.11985 },
                        { lng: 121.445358, lat: 31.125804 },
                        { lng: 121.442938, lat: 31.135326 },
                        { lng: 121.427989, lat: 31.133368 },
                        { lng: 121.418124, lat: 31.146642 },
                        { lng: 121.409074, lat: 31.168046 },
                        { lng: 121.399996, lat: 31.166016 },
                        { lng: 121.399546, lat: 31.172683 },
                        { lng: 121.403069, lat: 31.175552 },
                        { lng: 121.399022, lat: 31.17852 },
                        { lng: 121.402218, lat: 31.179063 },
                        { lng: 121.400856, lat: 31.183538 },
                        { lng: 121.421347, lat: 31.188252 },
                        { lng: 121.419056, lat: 31.197137 },
                        { lng: 121.42726, lat: 31.197299 },
                        { lng: 121.430227, lat: 31.203557 },
                        { lng: 121.444339, lat: 31.210246 },
                        { lng: 121.441673, lat: 31.217472 },
                        { lng: 121.44597, lat: 31.220755 },
                        { lng: 121.462448, lat: 31.22597 },
                        { lng: 121.467167, lat: 31.219649 },
                        { lng: 121.468678, lat: 31.209076 },
                        { lng: 121.473341, lat: 31.210569 },
                        { lng: 121.47666, lat: 31.196975 },
                        { lng: 121.484185, lat: 31.194424 },
                        { lng: 121.472095, lat: 31.18548 },
                        { lng: 121.474386, lat: 31.172705 }
                    ]
                },
                dataset: {}
            },
            {
                type: 'polygon',
                borderId: "b0002",
                options: {
                    polygonOptions: {
                        fillColor: '#00ff00', fillOpacity: 0.1,
                        strokeWeight: 1, strokeColor: '#00ff00', strokeOpacity: 0.5
                    },
                    points: [
                        { lng: 121.506613, lat: 31.235593 },
                        { lng: 121.516735, lat: 31.221043 },
                        { lng: 121.50722, lat: 31.204231 },
                        { lng: 121.49725, lat: 31.196958 },
                        { lng: 121.484185, lat: 31.194424 },
                        { lng: 121.47666, lat: 31.196975 },
                        { lng: 121.473341, lat: 31.210569 },
                        { lng: 121.468678, lat: 31.209076 },
                        { lng: 121.46327, lat: 31.22811 },
                        { lng: 121.474168, lat: 31.229578 },
                        { lng: 121.46961, lat: 31.247499 },
                        { lng: 121.476376, lat: 31.245246 },
                        { lng: 121.487302, lat: 31.246038 },
                        { lng: 121.493085, lat: 31.249927 },
                        { lng: 121.501498, lat: 31.248007 },
                        { lng: 121.5001, lat: 31.241321 },
                        { lng: 121.506613, lat: 31.235593 }
                    ]
                },
                dataset: {}
            }
        ];
    }

}());
