
import loader from "../provider/markerClusterScript";

import { nullCheck } from '../helper/validate';
import { transformIcon, transformSize, transformPoint } from '../helper/transformer';
import _ from 'lodash';


export default
    {
        bindings: {
            options: "<",
            styles: "<",
            //items: "<",
            initialized: "&",
            click: "&",
            rightclick: "&"
        },
        require: {
            mapCtrl: '^baiduMap'
        },
        controller: class {
            constructor($scope, $attrs) {
                this.$scope = $scope;
                this.$attrs = $attrs;
                this.items = this.items || [];
            }

            $onInit() {
                this.mapCtrl.mapReady
                    .then(() => {
                        loader()
                            .then(() => {


                                // var markers = this.markers = _.map(this.items, (item) => {

                                //     const point = transformPoint(item.point, '<marker> point');
                                //     const opts = transformOptions(item.options);
                                //     const marker = new BMap.Marker(point, opts);


                                //     if (!!this.$attrs.click) {
                                //         const clickListener = this.clickListener = (e) => {
                                //             e.domEvent.stopPropagation();
                                //             this.click({ e, marker, map: this.mapCtrl.getMap(), data: item });
                                //         };
                                //         marker.addEventListener('click', clickListener);
                                //     }

                                //     if (!!this.$attrs.rightclick) {
                                //         const rightclickListener = this.rightclickListener = (e) => {
                                //             e.domEvent.stopPropagation();
                                //             this.rightclick({ e, map: this.mapCtrl.getMap(), data: item });
                                //         };
                                //         marker.addEventListener('rightclick', rightclickListener);
                                //     }

                                //     return marker;
                                // });

                                var markers = [];

                                angular.forEach(this.items, (item) => {
                                    try {
                                        const point = transformPoint(item.point, '<marker> point');
                                        const opts = transformOptions(item.options);
                                        const marker = new BMap.Marker(point, opts);


                                        if (!!this.$attrs.click) {
                                            const clickListener = this.clickListener = (e) => {
                                                e.domEvent.stopPropagation();
                                                this.click({ e, marker, map: this.mapCtrl.getMap(), data: item });
                                            };
                                            marker.addEventListener('click', clickListener);
                                        }

                                        if (!!this.$attrs.rightclick) {
                                            const rightclickListener = this.rightclickListener = (e) => {
                                                e.domEvent.stopPropagation();
                                                this.rightclick({ e, map: this.mapCtrl.getMap(), data: item });
                                            };
                                            marker.addEventListener('rightclick', rightclickListener);
                                        }
                                        markers.push(marker);
                                    } catch (error) {

                                    }
                                });

                                this.markers = markers;

                                var markerClusterer = this.markerClusterer =
                                    new BMapLib.MarkerClusterer(this.mapCtrl.getMap(), {
                                        markers: markers,
                                        girdSize: this.options.girdSize,
                                        maxZoom: this.options.maxZoom,
                                        minClusterSize: this.options.minClusterSize
                                    });

                                if (!!this.styles) {
                                    this.markerClusterer.setStyles(this.styles);
                                }

                                this.mapCtrl.addMarkerClusterCtrl(this);

                                return markerClusterer;
                            }).then((markerClusterer) => {
                                if (!!this.$attrs.initialized) {

                                    let ctrl = this;
                                    this.initialized({ ctrl });
                                }
                            });
                    });
            }

            $onChange(changes) {
                if (!!this.markerClusterer == false) {
                    return;
                }

                this.markerClusterer.setStyles(changes.styles.currentValue);

            }

            $onDestory() {
                angular.forEach(this.markers, function (marker) {
                    marker.removeEventListener("click", this.clickListener);
                    marker.removeEventListener("rightclick", this.rightclickListener);
                });

                this.mapCtrl.removeMarkerClusterCtrl(this);
            }

            addMarkers(markerItems) {
                this.items = this.items.concat(markerItems);
                // var markers = _.map(markerItems, (item) => {

                //     const point = transformPoint(item.point, '<marker> point');
                //     const opts = transformOptions(item.options);
                //     const marker = new BMap.Marker(point, opts);


                //     if (!!this.$attrs.click) {
                //         const clickListener = this.clickListener = (e) => {
                //             e.domEvent.stopPropagation();
                //             this.click({ e, marker, map: this.mapCtrl.getMap(), data: item });
                //         };
                //         marker.addEventListener('click', clickListener);
                //     }

                //     if (!!this.$attrs.rightclick) {
                //         const rightclickListener = this.rightclickListener = (e) => {
                //             e.domEvent.stopPropagation();
                //             this.rightclick({ e, map: this.mapCtrl.getMap(), data: item });
                //         };
                //         marker.addEventListener('rightclick', rightclickListener);
                //     }

                //     return marker;
                // });

                var markers = [];
                angular.forEach(markerItems, (item) => {
                    try {

                        const point = transformPoint(item.point, '<marker> point');
                        const opts = transformOptions(item.options);
                        const marker = new BMap.Marker(point, opts);

                        marker.itemData = item;


                        if (!!this.$attrs.click) {
                            const clickListener = this.clickListener = (e) => {
                                e.domEvent.stopPropagation();
                                this.click({ e, marker, map: this.mapCtrl.getMap(), data: marker.itemData });
                            };
                            marker.addEventListener('click', clickListener);
                        }

                        if (!!this.$attrs.rightclick) {
                            const rightclickListener = this.rightclickListener = (e) => {
                                e.domEvent.stopPropagation();
                                this.rightclick({ e, map: this.mapCtrl.getMap(), data: item });
                            };
                            marker.addEventListener('rightclick', rightclickListener);
                        }

                        markers.push(marker);

                    } catch (error) {

                    }
                });

                this.markers = this.markers.concat(markers);

                this.markerClusterer.addMarkers(markers);
            }

            show() {
                angular.forEach(this.markers, function (marker) {
                    marker.show();
                });
                //this.markerClusterer.show();

            }

            hide() {
                angular.forEach(this.markers, function (marker) {
                    marker.hide();
                });

                //this.markerClusterer.hide();
            }

            getMarkers() {
                return this.markers;
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