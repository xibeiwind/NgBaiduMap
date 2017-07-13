import { overlayTypeCheck } from '../helper/validate';

import { createPolygonBorderOverlay } from './border';

export default {
    bindings: {
        options: "<"
    },
    require: {
        mapCtrl: "^baiduMap"
    },
    template: "",
    controller: class {
        constructor() { }
        $onInit() {
            this.realType = "polygon";
            this.mapCtrl
                .mapReady
                .then(() => createPolygonBorderOverlay(this.options))
                .then(overlay => {
                    this.overlay = overlay;
                    this.options.overlay = overlay;
                    this.options.ctrl = this;
                    this.mapCtrl.addOverlayCtrl(this);
                    console.log("Polygon Overlay Ready")
                    return overlay;
                });
        }

        enableEditing(){
            this.overlay.enableEditing();
            this.overlay.draw();
        }

        disableEditing(){
            this.overlay.disableEditing();
            this.overlay.draw();
        }

    

        $onChanges(changes) {
            if (!!this.overlay && !!changes.isVisible) {
                if (changes.isVisible.currentValue) {
                    this.overlay.show();
                }
                else {
                    this.overlay.hide();
                }
            }
        }
        $onDestory() {
            this.mapCtrl.removeOverlayCtrl(this);
        }
    }
};

