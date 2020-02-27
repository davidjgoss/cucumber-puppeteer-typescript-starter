import {Browser, Page} from 'puppeteer';

export abstract class AbstractPage {
    constructor(protected browser: Browser, protected page: Page) {
    }
}
