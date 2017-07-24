import template from './demo.tpl.html';
import markericonUrl from 'img/markericon.png';


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
    constructor() {
        this.opts = {
            enableMapClick: false,
            centerAndZoom: {
                ...NEW_SHANGHAI_INTERNATIONAL_TOWER,
                zoom: 16
            }
        };


        console.log(JSON.stringify(this.opts));
        this.dwartoolOptions = {

        };

        this.markerCtrls = [];

        this.polygonCtrls = [];

        this.markers = [];

        this.markers.push({
            point: { "lng": 121.500208, "lat": 31.233821 },
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


    }


    mapLoaded(ctrl) {
        ctrl.map.enableScrollWheelZoom();
        console.log('MapLoaded');
    }

    mapClick(e) {
        console.log(`mapClick(${JSON.stringify(e.point)})`);
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
}

component.controller = ComponentNameController;

export default component;
