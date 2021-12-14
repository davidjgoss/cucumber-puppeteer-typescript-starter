module.exports = {
    "default": `--require-module ts-node/register --require "support/**/*.ts" --format @cucumber/pretty-formatter --format rerun:@rerun.txt --format message:dist/cucumber.ndjson --format html:dist/cucumber.html --publish-quiet`
};
