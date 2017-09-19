export default {
    bindings: {
        options: "<"
    },
    require: {
        mapCtrl: "^baiduMap",

    },
    controller: class {
        constructor($scope) {
            console.log("scaleControl");
            this.$scope = $scope;
        }

        $onInit() {
            this.mapCtrl.mapReady
                .then(() => {
                    const ctrl = this.ctrl = new BMap.ScaleControl(this.options);

                    this.mapCtrl.addControl(this);
                });
        }

        $onDestory() {
            this.mapCtrl.removeControl(this);
        }
    }
}