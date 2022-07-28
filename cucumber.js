module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['support/**/*.ts'],
        format: [
            '@cucumber/pretty-formatter',
            'rerun:@rerun.txt',
            'message:dist/cucumber.ndjson',
            'json:dist/cucumber.json',
            'html:dist/cucumber.html'
        ],
        publishQuiet: true
    }
};
