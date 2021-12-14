import {Browser, ElementHandle, Page} from 'puppeteer';
import {BrowserDelegate} from '../delegates/BrowserDelegate';
import {find} from 'lodash';

export class TodosPage {
    constructor(private delegate: BrowserDelegate) {
    }

    async getInputValue(): Promise<string> {
        return await this.delegate.page.evaluate(() => {
            return document.querySelector<HTMLInputElement>('input.new-todo').value;
        });
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

    async editItem(todo: string, newText: string) {
        const item = await this.findItem(todo);
        await item.click({clickCount: 2});
        const input = await item.$('input');
        for (let i = 0; i < todo.length; i++) {
            await this.delegate.page.keyboard.press('Backspace');
        }
        await input.type(newText);
        await this.delegate.page.keyboard.press('Enter');
    }

    async findItem(todo: string): Promise<ElementHandle> {
        const items = await this.delegate.page.$$('ul.todo-list li');
        for (const item of items) {
            const text = await item.evaluate(el => el.textContent);
            if (text === todo) {
                return item;
            }
        }
        throw new Error(`Couldn't find an item matching "${todo}"`);
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
