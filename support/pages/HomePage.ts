import {AbstractPage} from "./AbstractPage";

export class HomePage extends AbstractPage {
    async toggleNavigation() {
        await (await this.navToggle).click();
    }

    async toggleDocsMenu() {
        await (await this.docsToggle).click();
    }

    async navigateTo(path: string) {
        const anchor = await this.page.waitForSelector(`a[href='${path}']`, {visible: true});
        await anchor.click();
        await this.page.waitForNavigation();
    }

    private get navToggle() {
        return this.page.$(".nav-main-toggle");
    }

    private get docsToggle() {
        return this.page.$(".nav-item:nth-child(2) > a");
    }
}
