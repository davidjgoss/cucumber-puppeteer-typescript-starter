const common = `--require-module ts-node/register --require "support/**/*.ts" --format progress-bar --format message:dist/cucumber.ndjson --format html:dist/cucumber.html`;

module.exports = {
    "default": common
};
