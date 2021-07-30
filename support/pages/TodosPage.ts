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

    async listItems(): Promise<string[]> {
        const handles = await this.delegate.page.$$('.todo-list > li');
        const items = [];
        for (const handle of handles) {
            const label = await handle.$('label');
            const text = await label.evaluate(elem => elem.textContent);
            items.push(text);
        }
        return items;
    }

    async addItem(todo: string) {
        const input = await this.input;
        await input.type(todo);
        await input.press('Enter');
    }

    async hasMain() {
        const mainElem = await this.delegate.page.$('#main');
        return !!mainElem;
    }

    async hasFooter() {
        const footerElem = await this.delegate.page.$('#footer');
        return !!footerElem;
    }

    private get input(): Promise<ElementHandle> {
        return this.delegate.page.$('input.new-todo');
    }
}
