import { nullCheck } from '../helper/validate';
import { transformIcon, transformSize, transformPoint } from '../helper/transformer';

export default {
    bindings: {
        point: '<',
        options: '<',
        click: '&',
        rightclick: '&'
    },
    require: {
        mapCtrl: '^baiduMap'
    },
    template: '',
    controller: class {
        /* @ngInject */
        constructor($scope, $attrs) {
            this.$scope = $scope;
            this.$attrs = $attrs;
        }

        $onInit() {
            //console.log("marker init")
            nullCheck(this.point, 'point is required for <marker>');

            this.mapCtrl
                .mapReady
                .then(() => {
                    const point = transformPoint(this.point, '<marker> point');
                    const opts = transformOptions(this.options);
                    const marker = this.marker = new BMap.Marker(point, opts);
                    this
                        .mapCtrl
                        .addOverlay(marker);
                    return marker;
                })
                .then(marker => {
                    if (!!this.$attrs.click) {
                        this.clickHandler = (e) => {
                            this.click({
                                e,
                                marker,
                                map: this.mapCtrl.getMap()
                            });
                            this.$scope.$apply();
                        };
                        marker.addEventListener('click', this.clickHandler);
                    }

                    if (!!this.$attrs.rightclick) {
                        this.rightClickHandler = (e) => {
                            this.rightclick({
                                e,
                                marker,
                                map: this.mapCtrl.getMap()
                            });
                            this.$scope.$apply();
                        };
                        marker.addEventListener('rightclick', this.rightClickHandler);
                    }
                });
        }

        $onDestroy() {
            this.marker.removeEventListener('click', this.clickHandler);
            this.marker.removeEventListener('rightclick', this.rightClickHandler);
            this.mapCtrl.removeOverlay(this.marker);
        }
    }
};

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
