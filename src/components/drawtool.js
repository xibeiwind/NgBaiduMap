
import loader from '../provider/mapDrawScript';
export default {

    bindings: {
        options: '<',
        markercomplete: "&",
        polygoncomplete: "&",
        circlecomplete: "&",
        polylinecomplete: "&",
        rectanglecomplete: "&",
        initialized: "&"
    },
    require: {
        mapCtrl: '^baiduMap'
    },
    controller: class {
        constructor($attrs, $scope) {
            this.$attrs = $attrs;
            this.$scope = $scope;
            //console.log("drawtool");
        }

        $onInit() {
            this.mapCtrl
                .mapReady
                .then(() => {
                    loader()
                        .then(() => {



                            var drawingManager = this.drawingManager = new BMapLib.DrawingManager(this.mapCtrl.getMap(), {
                                isOpen: false, //是否开启绘制模式
                                enableDrawingTool: true, //是否显示工具栏
                                drawingToolOptions: {
                                    anchor: window.BMAP_ANCHOR_TOP_RIGHT, //位置
                                    offset: new BMap.Size(5, 5) //偏离值
                                },
                                circleOptions: this.options.styleOptions, //圆的样式
                                polylineOptions: this.options.styleOptions, //线的样式
                                polygonOptions: this.options.styleOptions, //多边形的样式
                                rectangleOptions: this.options.styleOptions //矩形的样式
                            });

                            let setButtonVisibility = function (btnCSS, visible) {
                                let element = angular.element(document.getElementsByClassName(btnCSS));

                                element.css("display", visible ? "block" : "none");
                            }


                            setButtonVisibility("BMapLib_marker", this.options.markerBtnVisible);
                            setButtonVisibility("BMapLib_circle", this.options.circleBtnVisible);
                            setButtonVisibility("BMapLib_polyline", this.options.polylineBtnVisible);
                            setButtonVisibility("BMapLib_polygon", this.options.polygonBtnVisible);
                            setButtonVisibility("BMapLib_rectangle", this.options.rectangleBtnVisible);


                            // drawingManager.addEventListener('overlaycomplete', () => {
                            //     console.log('draw complete');
                            // });

                            if (!!this.$attrs.initialized) {
                                let ctrl = this;
                                this.initialized({ ctrl });
                            }

                            if (!!this.$attrs.markercomplete) {
                                const markercompleteListener = this.markercompleteListener = (marker) => {
                                    this.markercomplete({ marker });
                                }
                                this.drawingManager.addEventListener('markercomplete', markercompleteListener);
                            }

                            if (!!this.$attrs.polygoncomplete) {
                                const polygoncompleteListener = this.polygoncompleteListener = (polygon) => {
                                    this.polygoncomplete({ polygon });
                                };
                                this.drawingManager.addEventListener('polygoncomplete', polygoncompleteListener);
                            }

                            if (!!this.$attrs.circlecomplete) {
                                const circlecompleteListener = this.circlecompleteListener = (circle) => {
                                    this.circlecomplete({ circle });
                                }
                                this.drawingManager.addEventListener("circlecomplete", circlecompleteListener);
                            }


                            if (!!this.$attrs.polylinecomplete) {
                                const polylinecompleteListener = this.polylinecompleteListener = (polyline) => {
                                    this.polylinecomplete({ polyline });
                                }
                                this.drawingManager.addEventListener('polylinecomplete', polylinecompleteListener);
                            }

                            if (!!this.$attrs.rectanglecomplete) {
                                const rectanglecompleteListener = this.rectanglecompleteListener = (rectangle) => {
                                    this.rectanglecomplete({ rectangle });
                                }
                                this.drawingManager.addEventListener('rectanglecomplete', rectanglecompleteListener);
                            }




                        });


                });
        }
        $onDestory() {
            this.mapCtrl.removeControl(this);
        }

        open() {
            this.drawingManager.open();

        }
        close() {
            this.drawingManager.close();
        }

        show() {
            //BMapLib_Drawing
            let element = angular.element(document.getElementsByClassName("BMapLib_Drawing"));
            //element.removeClass("hideDrawToolbar");
            element.css("display", "block");
        }

        hide() {
            let element = angular.element(document.getElementsByClassName("BMapLib_Drawing"));
            //element.addClass("hideDrawToolbar");
            element.css("display", "none");
        }

        setCalculateEnabled(enabled) {
            if (enabled) {
                this.drawingManager.enableCalculate();
            }
            else {
                this.drawingManager.disableCalculate();
            }
        }
    }
};
