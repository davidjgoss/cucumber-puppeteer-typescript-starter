import {launch, Browser, Page} from 'puppeteer';
import {CustomWorld} from '../CustomWorld';
import {DocumentationPage} from '../pages/DocumentationPage';
import {HomePage} from '../pages/HomePage';

export class BrowserDelegate {
    private browser: Browser;
    private page: Page;

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
        await this.page.goto('https://cucumber.io');
    }

    get homePage(): HomePage {
        return new HomePage(this.browser, this.page);
    }

    get documentationPage(): DocumentationPage {
        return new DocumentationPage(this.browser, this.page);
    }
}
