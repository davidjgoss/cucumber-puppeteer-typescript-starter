import {Given, When, Then, DataTable} from '@cucumber/cucumber';
import {CustomWorld} from '../CustomWorld';
import { expect } from 'chai';
import {TodosPage} from '../pages/TodosPage';

Given('an empty todo list', async function(this: CustomWorld) {
    await this.browser.navigate();
});

Given('a todo list with items:', async function(this: CustomWorld, todos: DataTable) {
    await this.browser.navigate();
    const todosPage = new TodosPage(this.browser);
    for (const todo of todos.raw().map(row => row[0])) {
        await todosPage.addItem(todo);
    }
});

When('I add the todo {string}', async function (this: CustomWorld, todo: string) {
    const todosPage = new TodosPage(this.browser);
    await todosPage.addItem(todo);
});

Then('no todos are listed', async function (this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    const count = await todosPage.countItems();
    expect(count).to.eq(0);
});

Then('unnecessary controls are hidden', async function (this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    expect(await todosPage.hasMain()).to.be.false;
    expect(await todosPage.hasFooter()).to.be.false;
});

Then('the todos are:', async function (this: CustomWorld, todos: DataTable) {
    const todosPage = new TodosPage(this.browser);
    const items = await todosPage.listItems();
    expect(items).to.deep.eq(todos.raw().map(row => row[0]));
});

Then('the todo input is empty', async function(this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    const value = await todosPage.getInputValue();
    expect(value).to.eq('');
});

Then('my cursor is ready to create a todo', async function (this: CustomWorld) {
    const todosPage = new TodosPage(this.browser);
    const result = await todosPage.isInputFocused();
    expect(result).to.be.true;
});

When('I edit the todo {string} to {string}', async function (this: CustomWorld, todo: string, newText: string) {
    const todosPage = new TodosPage(this.browser);
    await todosPage.editItem(todo, newText);
});
