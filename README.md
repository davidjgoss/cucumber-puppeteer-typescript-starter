# cucumber-puppeteer-typescript-starter

> Project starter for using puppeteer with cucumber-js, written in TypeScript

## Opinionated

Sorry.

A brief list of the things about this starter you might (not) like:

- Written in TypeScript with async/await
- Using puppeteer for browser automation
- Using chai for assertions
- Using ESLint to hurt your feelings
- Gherkin in first person, present tense form
- Multi-tiered project structure (below)

## Project Structure

There are four tiers. This is all very deliberate, and designed to make your project scale gracefully; stay with me.

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

Not much of substance should really happen in here; it's really a middleman between the step functions and the instrumentation. It contains the stuff Cucumber initialises it with, plus each actor (see below).

Remember, you get a fresh instance of this per scenario attempt run by Cucumber.

### Actors

Find them here:

```
support/actors/*.ts
```

An "actor" is something that knows how to instrument an interface with your software. You might also call it a "delegate". In this starter, we just have one actor: `BrowserActor`, which knows how to instrument the UI via puppeteer. It has a getter for each page object (see below).

As your project grows, you might want to add more actors to do different stuff, such as:

- `ApiActor` - to call APIs
- `DomainActor` - to query a database

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

## Why puppeteer?

If you're not familiar, [puppeteer](https://pptr.dev/) is a tool for automating Chromium. It's [maintained](https://github.com/puppeteer/puppeteer) by the team at Google, and works by using the [DevTools protocol](https://chromedevtools.github.io/devtools-protocol/). A couple of things drew me to it, and keep me using it:

- **Reliability** - puppeteer downloads and uses a build of Chromium that it is specifically targeted to work with - this makes it reliable, and means never getting to work in the morning to find all the acceptance tests failing because of a browser update.
- **Speed** - puppeteer works directly over the DevTools protocol rather than a black box-style driver, so it's _fast_.

The obvious downside is that it just works for Chromium. This is already changing though, with projects afoot to support [Firefox](https://github.com/puppeteer/puppeteer/tree/master/experimental/puppeteer-firefox) and even [IE](https://github.com/TechQuery/Puppeteer-IE). Over time, I see the browser automation going the same way as [browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions), where browsers settle on a standard that allows a (mostly) write-once ecosystem.

I don't want to beat up on WebDriver - a huge amount has been achieved with it across the industry - but tools like puppeteer seem like the way forward to me.

(There's tons [more you can do](https://github.com/transitive-bullshit/awesome-puppeteer) with puppeteer as well.)

## Why TypeScript?

This starter designed for projects you know will eventually become pretty large. And I would recommend [TypeScript](https://www.typescriptlang.org/) for _any_ medium-to-large sized JavaScript project because of all the safety and efficiency it brings.

## Todo

- Hooks
- Formatters
- Attachments
- World Parameters
- Profiles
