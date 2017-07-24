import { createPolygon } from "./overlay";
import _ from "lodash";
export default {
    bindings: {
        options: "<",
        initialized: "&",
        click: "&",
        rightclick: "&",
        beginEditing: "&",
        endEditing: "&"

    },
    require: {
        mapCtrl: "^baiduMap"
    },
    controller: class {

        constructor($scope, $attrs) {
            this.$scope = $scope;
            this.$attrs = $attrs;
        }

        $onInit() {


            this.mapCtrl.mapReady
                .then(() => createPolygon(this.options))
                .then(polygon => {
                    this.polygon = polygon;
                    this.mapCtrl.addPolygonCtrl(this);

                    // add event

                    if (!!this.$attrs.initialized) {
                        var ctrl = this;
                        this.initialized({ ctrl });
                    }

                    if (!!this.$attrs.click) {
                        const clickListener = this.clickListener = (e) => {
                            this.click({ e });
                        };
                        this.polygon.addEventListener('click', clickListener);
                    }


                    if (!!this.$attrs.rightclick) {
                        const rightclickListener = this.rightclickListener = (e) => {
                            this.rightclick({ e });
                        };
                        this.polygon.addEventListener('rightclick', rightclickListener);
                    }


                })
        }

        $onChanges(changes) {
            if (changes.points && changes.points.currentValue) {
                //setExtraData( this.overlay, changes.dataset.currentValue);
            }
        }



        $onDestory() {
            this.map.removeEventListener("click", this.clickListener);
            this.mapCtrl.removePolygonCtrl(this);
        }

        getPolygon(){
            return this.polygon;
        }

        startEditing() {
            if (!!this.$attrs.beginEditing) {
                this.beginEditing({ e });
            }
        }

        stopEditing() {
            var points = this.polygon.getPath();
            this.options.points = _.map(points, function (p) { return { lng: p.lng, lat: p.lat } });


            if (!!this.$attrs.endEditing) {
                var options = this.options;
                this.endEditing({ options });
            }
        }

        setStrokeColor(color){
            this.polygon.setStrokeColor(color);
        }
        setFillColor(color){
            this.polygon.setFillColor(color);
        }
    }
}