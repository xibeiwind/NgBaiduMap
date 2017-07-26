
import loader from '../provider/mapDrawScript';
export default {

    bindings: {
        options: '<',
        polygoncomplete: "&",
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

                            // drawingManager.addEventListener('overlaycomplete', () => {
                            //     console.log('draw complete');
                            // });

                            if (!!this.$attrs.initialized) {
                                let ctrl = this;
                                this.initialized({ ctrl });
                            }

                            if (!!this.$attrs.polygoncomplete) {
                                const polygoncompleteListener = this.polygoncompleteListener = (polygon) => {
                                    this.polygoncomplete({ polygon });
                                };
                                this.drawingManager.addEventListener('polygoncomplete', polygoncompleteListener);
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
    }
};
