import {World, IWorldOptions} from '@cucumber/cucumber';
import {BrowserDelegate} from './delegates/BrowserDelegate';
import {CustomParameters, defaults} from './CustomParameters';
import {merge} from 'lodash';

export class CustomWorld extends World {
    readonly parameters: CustomParameters;
    readonly browser: BrowserDelegate;

    constructor(options: IWorldOptions) {
        super(options);
        this.parameters = CustomWorld.mixinParameters(options.parameters);
        this.browser = new BrowserDelegate(this);
    }

    async init(): Promise<void> {
        await this.browser.init();
    }

    async destroy(): Promise<void> {
        await this.browser.destroy();
    }

    private static mixinParameters(userDefined: CustomParameters): CustomParameters {
        return merge({}, defaults, userDefined);
    }
}
