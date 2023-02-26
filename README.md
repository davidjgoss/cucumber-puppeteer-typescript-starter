# cucumber-puppeteer-typescript-starter

> Project starter for using puppeteer with cucumber-js, written in TypeScript

This project starter is designed to get you up and running with [cucumber-js](https://github.com/cucumber/cucumber-js) for browser automation, with a modern stack and well-structured project.

## Opinionated

Sorry.

A brief list of the things about this starter you might (not) like:

- Written in TypeScript with async/await
- Uses puppeteer for browser automation
- Uses chai for assertions
- Uses ESLint to hurt your feelings
- Prefers [cucumber-expressions](https://cucumber.io/docs/cucumber/cucumber-expressions/) over RegExp
- Gherkin in first person, present tense form
- Multi-tiered support code structure (below)

## Main Structure

The main structure of the support code (for actually implementing your steps) has four tiers: **Steps**, **World**, **Delegates** and **Pages**. This is all very deliberate, and designed to make your project scale gracefully; stay with me.

### Steps

Find them here:

```
support/steps/**/*.ts
```

The function for each step is thin and has no real logic. It just usees the World to do/get stuff, and then uses chai to make assertions. To enforce this, step functions are limited to a complexity of 1 (i.e. no logical forks), and 6 lines of code.

As you grow your project, split out as many files for steps as you need. More than 10 in a file should tell you it's time to reorganise.

### World

Find it here:

```
support/CustomWorld.ts
```

This is your custom [World](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md) class. Not much of substance should happen directly in here; it's really an intermediary between the step functions and the instrumentation. It contains the stuff Cucumber initialises it with, plus each delegate (see below).

Remember, you get a fresh instance of your World per scenario attempt run by Cucumber.

### Delegates

Find them here:

```
support/delegates/*.ts
```

A "delegate" is something that knows how to instrument an interface with your software. In this starter, we just have one delegate: `BrowserDelegate`, which knows how to instrument the UI via puppeteer. It has a getter for each page object (see below).

As your project grows, you might want to add more delegates to do different stuff, such as:

- `ApiDelegate` - to call APIs
- `DomainDelegate` - to query a database

### Pages

Find them here:

```
support/pages/**/*.ts
```

You may have heard of the [page object](https://martinfowler.com/bliki/PageObject.html) model. This uses that.

Each page object:

- Is given the puppeteer `browser` and `page` objects to work with
- Has well-named public methods for doing/getting stuff
- Has private getters for known elements on the page (these getters will yield a fresh `ElementHandle` every time; this is no accident, as you would run into a lot of stale references otherwise, due to the way many frameworks render the DOM after changes)

As your project grows:

- Add a page object for each page you need to work with
- Add "components" for things that appear across pages
- Don't be afraid to use inheritance and polymorphism

## Other Stuff

Outside of the main support code for steps, there are some other aspects of a Cucumber project that are mapped out here, ready for you to expand when you need to.

## World Parameters

Find them here:

```
support/CustomParameters.ts
```

This is a TypeScript interface for your [world parameters](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#world-parameters); you can add properties to it as you support more configurability in your project. 

The same file also exports a `defaults` object. As you'd expect, this is used as the default set of world parameters, and then any that you provide at runtime via the CLI or profiles will be mixed in via a deep merge.

## Hooks

Find them here:

```
support/hooks/*.ts
```

To start with, we have `Before` and `After` hooks that respectively set up and tear down puppeteer. If you need to add more hooks, do that here.

## Formatters

This starter uses three formatters:
- The `@cucumber/pretty-formatter`, piped to stdout (separate dependency)
- The `message` formatter, saved to `dist/cucumber.ndjson` - this is the standard cucumber-messages output that can be used as-is or consumed by other tools
- The `junit` formatter, saved to `dist/TEST-cucumber.xml` - this produces a JUnit XML report which is supported by many CI tools
- The `html` formatter, saved to `dist/cucumber.html` - this produces a nice HTML report for the test run

## Profiles

Find it here:

```
cucumber.json
```

You can add and flesh out your [profiles](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#profiles) here when you're ready.

## Why puppeteer?

If you're not familiar, [puppeteer](https://pptr.dev/) is a tool for automating Chromium. It's [maintained](https://github.com/puppeteer/puppeteer) by the team at Google, and works by using the [DevTools protocol](https://chromedevtools.github.io/devtools-protocol/). A couple of things drew me to it, and keep me using it:

- **Reliability** - puppeteer downloads and uses a build of Chromium that it is specifically targeted to work with - this makes it reliable, and means never getting to work in the morning to find all the acceptance tests failing because of a browser update.
- **Speed** - puppeteer works directly over the DevTools protocol, so it's _fast_.

The obvious downside is that it just works for Chromium. This is already changing though, with projects afoot to support [Firefox](https://github.com/puppeteer/puppeteer/tree/master/experimental/puppeteer-firefox) and even [IE](https://github.com/TechQuery/Puppeteer-IE). Over time, I see the browser automation going the same way as [browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions), where browsers settle on a standard that allows a (mostly) write-once ecosystem.

(There's tons [more you can do](https://github.com/transitive-bullshit/awesome-puppeteer) with puppeteer as well.)

## Why TypeScript?

This starter is designed for projects you know will eventually become pretty large. And I would recommend [TypeScript](https://www.typescriptlang.org/) for _any_ medium-to-large sized JavaScript project because of all the safety and efficiency it brings.

This starter makes use of Cucumber's `require-module` option to have TypeScript code compiled on the fly when you run, so you don't need to compile to JavaScript as a pre-step to running your tests.
