import angular from "angular";
import Configurators from './config/main';
import { ngBaiduMap } from '../../src';

import Demo from "./demo/demo.component";
import Toolbar from "./toolbar/toolbar.component";
class demoApp {
    constructor() {
        this.appName = "demoApp";

        this.depends = [ngBaiduMap];
    }



    createApp() {
        this.app = angular.module(this.appName, this.depends);
        this.app.component("demo", Demo);
        this.app.component("toolbar", Toolbar);
    }

    configApp() {
        Configurators.forEach(Configurator => {
            this.app.config(Configurator.config);
        });
    }

    registerService() {

    }

    launch() {
        angular.bootstrap(document, [this.appName]);
    }

    run() {
        this.createApp();
        this.configApp();
        this.registerService();
        this.launch();
    }
}

new demoApp().run();