import {World} from "cucumber";
import {BrowserActor} from "./actors/BrowserActor";

export class CustomWorld implements World {
    readonly attach: Function;
    readonly options: any;
    browser: BrowserActor;

    constructor({attach, options}) {
        this.attach = attach;
        this.options = options;
        this.browser = new BrowserActor(this);
    }

    async init() {
        await this.browser.init();
    }

    async destroy() {
        await this.browser.destroy();
    }
}
