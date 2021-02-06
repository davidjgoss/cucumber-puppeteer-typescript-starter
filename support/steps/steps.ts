import {Given, When, Then} from '@cucumber/cucumber';
import {CustomWorld} from '../CustomWorld';
import { expect } from 'chai';
import {TodosPage} from '../pages/TodosPage';

Given('an empty todo list', async function(this: CustomWorld) {
    await this.browser.navigate();
});

Then('no todos are listed', async function (this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    const count = await todosPage.countItems();
    expect(count).to.eq(0);
});

Then('my cursor is ready to create a todo', async function (this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    const result = await todosPage.isInputFocused();
    expect(result).to.be.true;
});