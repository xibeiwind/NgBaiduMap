import { nullCheck } from '../helper/validate';
import { transformIcon, transformSize, transformPoint } from '../helper/transformer';

export default
    {
        bindings: {
            point: '<',
            options: '<',
            initialized: "&",
            click: '&',
            rightclick: '&'
        },
        require: {
            mapCtrl: '^baiduMap'
        },
        controller: class {
            constructor($scope, $attrs) {
                this.$scope = $scope;
                this.$attrs = $attrs;
            }

            $onInit() {

                this.mapCtrl.mapReady
                    .then(() => {
                        const point = transformPoint(this.point, '<marker> point');
                        const opts = transformOptions(this.options);
                        const marker = this.marker = new BMap.Marker(point, opts);
                        //this.marker = marker;
                        console.log(point);

                        this.mapCtrl.addMarkerCtrl(this);

                        return marker;
                    }).then(marker => {
                        if (!!this.$attrs.initialized) {
                            let ctrl = this;
                            this.initialized({ ctrl });
                        }
                        if (!!this.$attrs.click) {
                            const clickListener = this.clickListener = (e) => {
                                this.click({ e, marker, map: this.mapCtrl.getMap(), ctrl: this });
                            };
                            this.marker.addEventListener('click', clickListener);
                        }
                        if (!!this.$attrs.rightclick) {
                            const rightclickListener = this.rightclickListener = (e) => {
                                this.rightclick({ e, marker, map: this.mapCtrl.getMap(), ctrl: this });
                            };
                            this.marker.addEventListener('rightclick', rightclickListener);
                        }
                    });

            }
            $onDestory() {
                this.marker.removeEventListener("click", this.clickListener);
                this.marker.removeEventListener("rightclick", this.rightclickListener);
                this.mapCtrl.removeParker(this);
            }

            setPoint(point) {

                this.point = point;
                this.marker.setPosition(transformPoint(point));

            }
        }
    }

function transformOptions(options) {
    const opts = JSON.parse(JSON.stringify(options || {}));
    if (opts.offset) {
        opts.offset = transformSize(opts.offset, '<marker> options.offset');
    }
    if (opts.icon) {
        opts.icon = transformIcon(opts.icon, '<marker> options.icon');
    }
    if (opts.shadow) {
        opts.shadow = transformIcon(opts.shadow, '<marker> options.shadow');
    }
    return opts;
}