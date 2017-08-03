import template from './demo.tpl.html';
import markericonUrl from 'img/markericon.png';

import markerClusterIconUrl from 'img/juhe.png';

import './demo.scss';

//{"lng":121.500208,"lat":31.233821}
const NEW_SHANGHAI_INTERNATIONAL_TOWER = {
    longitude: 121.500208,
    latitude: 31.233821
};

const component = {
    template,
    bindings: {}
};

class ComponentNameController {
    constructor($scope) {
        this.$scope = $scope;
        this.opts = {
            enableMapClick: false,
            centerAndZoom: {
                ...NEW_SHANGHAI_INTERNATIONAL_TOWER,
                zoom: 16
            }
        };


        console.log(JSON.stringify(this.opts));
        this.dwartoolOptions = {
            markerBtnVisible: false,
            circleBtnVisible: true,
            polylineBtnVisible: true,
            polygonBtnVisible: false,
            rectangleBtnVisible: false
        };

        this.markerCtrls = [];

        this.polygonCtrls = [];

        this.markers = [];

        for (var i = 0; i < 2000; i++) {
            this.markers.push({
                point: { "lng": 118.500208 + Math.random() * 2, "lat": 31.233821 + Math.random() * 2 },
                options: {
                    offset: {
                        width: 0,
                        height: -15
                    },
                    icon: {
                        url: markericonUrl,
                        size: {
                            width: 49,
                            height: 60
                        }
                    },
                    title: "TEST"
                }
            });
        }



        this.polygonList = [{
            options: {
                points: [{ lng: 121.506613, lat: 31.235593 }, { lng: 121.516735, lat: 31.221043 }, { lng: 121.50722, lat: 31.204231 }, { lng: 121.49725, lat: 31.196958 }, { lng: 121.484185, lat: 31.194424 }, { lng: 121.47666, lat: 31.196975 }, { lng: 121.473341, lat: 31.210569 }, { lng: 121.468678, lat: 31.209076 }, { lng: 121.46327, lat: 31.22811 }, { lng: 121.474168, lat: 31.229578 }, { lng: 121.46961, lat: 31.247499 }, { lng: 121.476376, lat: 31.245246 }, { lng: 121.487302, lat: 31.246038 }, { lng: 121.493085, lat: 31.249927 }, { lng: 121.501498, lat: 31.248007 }, { lng: 121.5001, lat: 31.241321 }, { lng: 121.506613, lat: 31.235593 }],
                polygonOptions: {
                    strokeColor: '#ff0000',
                    fillColor: '#ff0000',
                    strokeWeight: 2,
                    strokeOpacity: 0.5,
                    fillOpacity: 0.2,
                    enableMassClear: false,
                    enableClicking: true
                }
            }
        }];


        this.markerClusterOptions = {
            girdSize: 1000,
            maxZoom: 14,
            minClusterSize: 8
        };



    }


    mapLoaded(ctrl) {
        ctrl.map.enableAutoResize();

        ctrl.map.enableScrollWheelZoom();
        ctrl.map.enableContinuousZoom();

        console.log('MapLoaded');
        this.mapCtrl = ctrl;

        this.markerClusterStyles = [
            {
                url: markerClusterIconUrl,
                size: new BMap.Size(84, 84),
                opt_anchor: [16, 0],
                textColor: 'white',
                opt_textSize: 8
            }
        ]
    }

    mapClick(e) {
        console.log(`mapClick(${JSON.stringify(e.point)})`);

        var radius = 100;

        // if (!!this.circle) {
        //     this.circle.setRadius(radius);
        //     this.circle.setCenter(e.point);
        //     // this.mapCtrl.map.removeOverlay(this.circle);
        //     // this.circle = null;
        // }
        // else {
        //     this.circle = new BMap.Circle(e.point, radius, {
        //         enableClicking: false,
        //         enableEditing: true
        //     });
        //     console.log("new circle");

        //     this.mapCtrl.map.addOverlay(this.circle);
        // }

        var circle = new BMap.Circle(e.point, radius
            //,
            //{ enableClicking: false, enableEditing: true }
        );
        this.mapCtrl.map.addOverlay(this.circle);
    }

    removeCircle() {
        this.mapCtrl.map.removeOverlay(this.circle);
        this.circle = null;
    }


    markerInitialized(ctrl) {
        console.log('markerInitialized');
        this.markerCtrls.push(ctrl);
    }
    markerClick(e) {
        console.log(`markerClick(${JSON.stringify(e.point)})`);
    }

    polygonInitialized(ctrl) {
        console.log('polygonInitialized');
        this.polygonCtrls.push(ctrl);
    }
    polygonClick(e) {
        console.log(`polygonClick(${JSON.stringify(e.point)})`);

        var marker = this.markerCtrls[0];
        if (marker) {
            marker.setPoint(e.point);
        }

    }
    polygonRightClick(e) {
        console.log(`polygonRightClick(${JSON.stringify(e.point)})`);
    }

    polygonComplete(polygon) {
        var path = polygon.getPath();

        console.log(JSON.stringify(path));

        var marker = this.markerCtrls[0];
        if (marker) {
            //marker.setPoint(e.point);
            polygon.addEventListener("click", (e) => {
                marker.setPoint(e.point);
            });

        }

    }

    drawtoolInitialized(ctrl) {
        console.log("drawtoolInitialized");
        this.drawtoolCtrl = ctrl;
        ctrl.close();
    }

    addRandomMarker() {
        var lng = NEW_SHANGHAI_INTERNATIONAL_TOWER.longitude + Math.random() * 0.1;
        var lat = NEW_SHANGHAI_INTERNATIONAL_TOWER.latitude + Math.random() * 0.1;

        this.markers.push({
            point: { "lng": lng, "lat": lat },
            options: {
                offset: {
                    width: 0,
                    height: -15
                },
                icon: {
                    url: markericonUrl,
                    size: {
                        width: 49,
                        height: 60
                    }
                },
                title: "TEST"
            }
        });
    }

    removeMarker() {
        this.markers.splice(0, 1);
        console.log(this.markers.length);
        console.log(this.markerCtrls.length);
    }

    showDrawtool() {
        this.drawtoolCtrl.show();
    }

    hideDrawtool() {
        this.drawtoolCtrl.hide();
    }

    calculateEnableChanged() {
        this.drawtoolCtrl.setCalculateEnabled(this.calculEnabled);
    }
    circlecomplete(circle) {
        console.log("circlecomplete");
        //console.log(arguments.callee.name);

        circle.setRadius(500);
        // add context button
    }

    markerClusterInitialized(ctrl) {
        this.markerClusterCtrl = ctrl;

        console.log("markerClusterInitialized");
    }

    markerClusterClick(e, marker, map, data) {
        console.log(JSON.stringify(e.point));
    }

    markerClusterRightClick(e, marker, map, data) {
        console.log(JSON.stringify(e.point));
    }

}

component.controller = ComponentNameController;

export default component;
