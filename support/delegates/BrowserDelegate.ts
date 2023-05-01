import {Browser, launch, Page} from 'puppeteer';
import {CustomWorld} from '../CustomWorld';

export class BrowserDelegate {
    browser: Browser;
    page: Page;

    constructor(private world: CustomWorld) {
    }

    async init(): Promise<void> {
        this.browser = await launch({
            headless: false
        });
        this.page = (await this.browser.pages())[0];
    }

    async destroy(): Promise<void> {
        await this.browser.close();
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://todomvc.com/examples/react/#/');
        await this.page.waitForTimeout(1000);
    }
}
