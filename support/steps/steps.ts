import {Given, When, Then} from "cucumber";
import {CustomWorld} from "../CustomWorld";
import { expect } from "chai";

Given("I am on the Cucumber website",  async function(this: CustomWorld) {
    await this.browser.navigate();
});

When("I go to the Gherkin Reference", async function(this: CustomWorld) {
    const page = await this.browser.homePage;
    await page.toggleNavigation();
    await page.toggleDocsMenu();
    await page.navigateTo("/docs/gherkin/");
    await page.navigateTo("/docs/gherkin/reference/");
});

Then("I can read about {string}", async function(this: CustomWorld, title: string) {
    const page = await this.browser.documentationPage;
    const result = await page.hasSection(title);
    expect(result).to.be.true;
});
