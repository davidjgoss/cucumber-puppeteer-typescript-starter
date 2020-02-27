import {AbstractPage} from './AbstractPage';
import {ElementHandle} from 'puppeteer';

export class HomePage extends AbstractPage {
    async toggleNavigation(): Promise<void> {
        await (await this.navToggle).click();
    }

    async toggleDocsMenu(): Promise<void> {
        await (await this.docsToggle).click();
    }

    async navigateTo(path: string): Promise<void> {
        const anchor = await this.page.waitForSelector(`a[href='${path}']`, {visible: true});
        await anchor.click();
        await this.page.waitForNavigation();
    }

    private get navToggle(): Promise<ElementHandle> {
        return this.page.$('.nav-main-toggle');
    }

    private get docsToggle(): Promise<ElementHandle> {
        return this.page.$('.nav-item:nth-child(2) > a');
    }
}
