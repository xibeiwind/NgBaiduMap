
import * as style from '../style';
import { create, refresh } from '../helper/map';
import _ from 'lodash';
import Promise from 'promise-polyfill';

export default {
    bindings: {
        offlineText: '<',
        mapOptions: '<',
        loaded: '&',
        click: '&',
        rightclick: '&',
        zoomstart: '&',
        zoomend: '&',
        resize: '&',
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

        constructor($scope, $element, $attrs, mapScriptService) {
            this.$scope = $scope;
            this.$element = $element;
            this.$attrs = $attrs;
            this.mapScriptService = mapScriptService;

            this.polygonCtrls = [];
            this.markerCtrls = [];

            this.markerClusterCtrls = [];
            this.mapCtrls = [];
        }

        $onInit() {
            this.mapReady = this.mapScriptService.load()
                .then(() => {
                    return create(this.$element.children()[0], this.mapOptions);
                })
                .then(map => {
                    map.enableAutoResize();

                    this.map = map;
                    var ctrl = this;

                    console.log("maploaded");
                    this.loaded({ ctrl });

                    this.$scope.$apply();
                })
                .then(() => {
                    if (this.map) {
                        if (this.$attrs.click) {
                            const clickListener = this.clickListener = (e) => {
                                e.domEvent.stopPropagation();
                                this.click({ e });
                            };

                            this.map.addEventListener('click', this.clickListener);
                        }

                        if (this.$attrs.rightclick) {
                            const rightclickListener = this.rightclickListener = (e) => {
                                e.domEvent.stopPropagation();
                                this.rightclick({ e });
                            };
                            this.map.addEventListener('rightclick', rightclickListener);
                        }

                        if (this.$attrs.resize) {
                            const resizeListener = this.resizeListener = (e) => {
                                //this.map.redraw();
                                angular.forEach(this.polygonCtrls, function (ctrl) {
                                    ctrl.polygon.draw();
                                });
                                this.resize({ e });
                            };
                            this.map.addEventListener('resize', resizeListener);
                        }

                        if (!!this.$attrs.zoomstart) {
                            const zoomstartListener = this.zoomstartListener = (type) => {
                                this.zoomstart({ type });
                            };
                            this.map.addEventListener('zoomstart', zoomstartListener);
                        }
                        if (!!this.$attrs.zoomend) {
                            const zoomendListener = this.zoomendListener = (type) => {
                                this.zoomend({ type });
                            };
                            this.map.addEventListener('zoomend', zoomendListener);
                        }

                    }
                });
        }
        $onChange(changes) {
            if (!!this.map == false) {

                return;
            }
            refresh(this.map, changes.mapOptions.currentValue);
        }

        $onDestory() {
            if (this.map) {
                this.map.removeEventListener('click', this.clickListener);
                this.map.removeEventListener('rightclick', this.rightclickListener);
                this.map.removeEventListener("resize", this.resizeListener);
                this.map.removeEventListener("zoomstart", this.zoomstartListener);
                this.map.removeEventListener("zoomend", this.zoomendListener);
            }
        }

        refreshMap() {
            refresh(this.map, this.mapOptions);
        }

        getMap() {
            return this.map;
        }

        addOverlay(overlay) {
            //this.overlaies.push(overlay);
            return handleMapOperation(this.map, 'addOverlay', overlay);
        }

        removeOverlay(overlay) {

            //_.remove(this.overlaies, function(item) { return item === overlay; });
            return handleMapOperation(this.map, 'removeOverlay', overlay);
        }
        addPolygonCtrl(ctrl) {

            this.polygonCtrls.push(ctrl);
            return this.addOverlay(ctrl.polygon);

        }

        removePolygonCtrl(ctrl) {
            this.removeOverlay(ctrl.polygon);
            var index = this.polygonCtrls.findIndex((val, index, arr) => { return val === ctrl; });
            if (index >= 0) {
                this.polygonCtrls.splice(index, 1);
            }
        }

        addMarkerCtrl(ctrl) {
            this.markerCtrls.push(ctrl);
            return this.addOverlay(ctrl.marker);
        }

        removeMarkerCtrl(ctrl) {
            this.removeOverlay(ctrl.marker);
            var index = this.markerCtrls.findIndex((val, index, arr) => { return val === ctrl; });
            if (index >= 0) {
                this.markerCtrls.splice(index, 1);
            }
            console.log("remove Marker");
        }

        addMarkerClusterCtrl(ctrl) {
            this.markerClusterCtrls.push(ctrl);
            //return this.addOverlay();
        }

        removeMarkerClusterCtrl(ctrl) {

            this.removeOverlay(ctrl.markerClusterer);
            var index = this.markerClusterCtrls.findIndex((val, index, arr) => { return val === ctrl; });
            if (index >= 0) {
                this.markerClusterCtrls.splice(index, 1);
            }
            console.log("remove MarkerCluster");
        }


        setBound(p1, p2) {
            var bound = new BMap.Bounds(transformPoint(p1), transformPoint(p2));
            BMapLib.AreaRestriction.setBounds(this.map, bound);
        }

        clearBound() {
            BMapLib.AreaRestriction.clearBounds();
        }

        addControl(ctrl){

            this.mapCtrls.push(ctrl);

            this.map.addControl(ctrl.ctrl);
        }

        removeControl(ctrl){
            var index = this.mapCtrls.findIndex((val, index, arr)=>{return val === ctrl;});
            if (index>=0) {
                this.mapCtrls.splice(index,1);
            }

            this.map.removeControl(ctrl.ctrl);
        }

        clearControls(){

            this.mapCtrls.forEach((item)=>{
                this.map.removeControl(item.ctrl);
            });
            tis.mapCtrls.clear();
        }

    },
};

function handleMapOperation(map, method, ...args) {
    return new Promise(resolve => {
        map[method](...args);
        resolve();
    });
}