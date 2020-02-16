import {launch, Browser, Page} from "puppeteer";
import {CustomWorld} from "../CustomWorld";
import {DocumentationPage} from "../pages/DocumentationPage";
import {HomePage} from "../pages/HomePage";

export class BrowserActor {
    private browser: Browser;
    private page: Page;

    constructor(private world: CustomWorld) {
    }

    async init() {
        this.browser = await launch({
            headless: false
        });
        this.page = (await this.browser.pages())[0];
    }

    async destroy() {
        await this.browser.close();
    }

    async navigate() {
        await this.page.goto('https://cucumber.io');
    }

    get homePage() {
        return new HomePage(this.browser, this.page);
    }

    get documentationPage() {
        return new DocumentationPage(this.browser, this.page);
    }
}
