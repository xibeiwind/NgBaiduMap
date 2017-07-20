
import * as style from '../style';
import { create, refresh } from '../helper/map';
import _ from 'lodash';
import Promise from 'promise-polyfill';


export default {
    bindings: {
        offlineTxt: '<',
        mapOptions: '<',
        loaded: '&',
        click: '&',
        rightclick: "&",
        zoomstart: "&",
        zoomend: "&",
        resize: "&"
    },
    transclude: true,
    template: `
        <div ng-style="$ctrl.style.map" class="baidu-map-instance"></div>
        <div ng-style="$ctrl.style.offline" class="baidu-map-offline">
            <label ng-style="$ctrl.style.offlineLabel">{{ $ctrl.offlineTxt || 'NO_NETWORK' }}</label>
        </div>
        <div ng-transclude style="display: none"></div>
    `,
    controller: class {
        /* @ngInject */
        constructor($scope, $element, $attrs, mapScriptService) {
            this.$scope = $scope;
            this.$element = $element;
            this.$attrs = $attrs;
            this.style = style;
            this.mapScriptService = mapScriptService;

            this.overlayCtrls = [];

            //this.overlaies = [];
        }

        $onInit() {
            this.mapReady = this.mapScriptService.load(this.mapOptions.withDrawLib, this.mapOptions.boundLimitEnabled)
                .then(() => {
                    return create(this.$element.children()[0], this.mapOptions);
                })
                .then(map => {
                    map.enableAutoResize();

                    this.loaded({
                        map
                    });
                    this.$scope.$apply();
                    //eslint-disable-next-line
                    return this.map = map;
                })
                .then(() => {
                    if (!!this.map) {

                        if (!!this.$attrs.click) {

                            const clickListener = this.clickListener = (e) => {
                                this.click({
                                    e
                                });
                            };
                            this.map.addEventListener('click', clickListener);
                        }
                        if (!!this.$attrs.rightclick) {
                            const rightclickListener = this.rightclickListener = (e) => {
                                this.rightclick({ e });
                            }
                            this.map.addEventListener("rightclick", rightclickListener);
                        }

                        if (!!this.$attrs.zoomstart) {
                            const zoomstartListener = this.zoomstartListener = (type, target) => {
                                this.zoomstart(type, target);
                            };
                            this.map.addEventListener("zoomstart", this.zoomstartListener);
                        }
                        if (!!this.$attrs.zoomend) {
                            const zoomendListener = this.zoomendListener = (type, target) => {
                                this.zoomend(type, target);
                            };
                            this.map.addEventListener("zoomend", this.zoomendListener);
                        }
                        if (!!this.$attrs.resize) {
                            const resizeListener = this.resizeListener = (type, target, size) => {
                                tis.resize({ type, target, size });
                            };

                            this.map.addEventListener("resize", this.resizeListener);
                        }
                    }
                });
        }

        $onChanges(changes) {
            if (!this.map) {
                return;
            }
            refresh(this.map, changes.mapOptions.currentValue);
        }

        $onDestroy() {
            if (!!this.map) {

                this.map.removeEventListener('click', this.clickListener);
                this.map.removeEventListener("rightclick", this.rightclickListener);
            }
        }

        addOverlay(overlay) {
            //this.overlaies.push(overlay);
            return handleMapOperation(this.map, 'addOverlay', overlay);
        }

        removeOverlay(overlay) {

            //_.remove(this.overlaies, function(item) { return item === overlay; });
            return handleMapOperation(this.map, 'removeOverlay', overlay);
        }

        addControl(control) {
            return handleMapOperation(this.map, 'addControl', control);
        }

        removeControl(control) {
            return handleMapOperation(this.map, 'removeControl', control);
        }

        getMap() {
            return this.map;
        }

        addOverlayCtrl(overlayCtrl) {
            this.overlayCtrls.push(overlayCtrl);
            this.addOverlay(overlayCtrl.overlay);
        }

        removeOverlayCtrl(overlayCtrl) {
            this.removeOverlay(overlayCtrl.overlay);
            var index = this.overlayCtrls.findIndex(function (val, index, arr) {
                return val === overlayCtrl;
            });
            if (index >= 0) {
                this.overlayCtrls.splice(index, 1);
            }
            //this.overlayCtrls.remove
        }

        setBund(p1, p2) {
            var b = new BMap.Bounds(p1, p2);
            BMapLib.AreaRestriction.setBounds(this.map, b);

        }
        clearBound() {
            BMapLib.AreaRestriction.clearBounds();
        }
    }
};

function handleMapOperation(map, method, ...args) {
    return new Promise(resolve => {
        map[method](...args);
        resolve();
    });
}

