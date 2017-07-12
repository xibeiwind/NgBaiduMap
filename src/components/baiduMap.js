
import * as style from '../style';
import { create, refresh } from '../helper/map';
import _ from 'lodash';

export default {
    bindings: {
        offlineTxt: '<',
        mapOptions: '<',
        withDrawLib:"<",
        loaded: '&',
        click: '&',
        rightclick: "&"
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
            this.mapReady = this.mapScriptService.load(this.withDrawLib)
                .then(() => {
                    return create(this.$element.children()[0], this.mapOptions);
                })
                .then(map => {
                    this.loaded({
                        map
                    });
                    this.$scope.$apply();
                    //eslint-disable-next-line
                    return this.map = map;
                })
                .then(() => {
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
                });
        }

        $onChanges(changes) {
            if (!this.map) {
                return;
            }
            refresh(this.map, changes.mapOptions.currentValue);
        }

        $onDestroy() {
            this.map.removeEventListener('click', this.clickListener);
            this.map.removeEventListener("rightclick", this.rightclickListener);
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
    }
};

function handleMapOperation(map, method, ...args) {
    return new Promise(resolve => {
        map[method](...args);
        resolve();
    });
}

