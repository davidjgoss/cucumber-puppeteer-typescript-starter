module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['support/**/*.ts'],
        format: [
            '@cucumber/pretty-formatter',
            'rerun:@rerun.txt',
            'message:dist/cucumber.ndjson',
            'html:dist/cucumber.html'
        ],
        publishQuiet: true
    }
};
