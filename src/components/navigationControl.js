export default {
    bindings: {
        options: "<"
    },
    require: {
        mapCtrl: "^baiduMap",

    },
    controller: class {
        constructor($scope) {

        }

        $onInit() {
            this.mapCtrl.mapReady
                .then(() => {
                    const ctrl = this.ctrl = new BMap.NavigationControl(this.options);

                    this.mapCtrl.addControl(this);
                });
        }

        $onDestory() {
            this.mapCtrl.removeControl(this);
        }
    }
}