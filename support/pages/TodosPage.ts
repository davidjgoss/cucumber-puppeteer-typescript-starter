import {Browser, ElementHandle, Page} from 'puppeteer';
import {BrowserDelegate} from '../delegates/BrowserDelegate';

export class TodosPage {
    constructor(private delegate: BrowserDelegate) {
    }

    async isInputFocused(): Promise<boolean> {
        return await this.delegate.page.evaluate(() => {
            return document.activeElement === document.querySelector('input.new-todo');
        });
    }

    async countItems(): Promise<number> {
        const handles = await this.delegate.page.$$('.todo-list > li');
        return handles.length;
    }
}
