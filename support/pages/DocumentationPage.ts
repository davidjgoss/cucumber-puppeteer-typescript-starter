import {AbstractPage} from "./AbstractPage";

export class DocumentationPage extends AbstractPage {
    async hasSection(title: string) {
        const sectionHeadings = await this.page.$$(".content h1");
        for (let heading of sectionHeadings) {
            const textProp = await heading.getProperty("textContent");
            const text = await textProp.jsonValue();
            if (text === title) {
                return true;
            }
        }
        return false;
    }
}
