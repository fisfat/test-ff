const npm = require('npm')
const cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
    console.log('running a task every 6 hours');
    npm.load({}, function (er) {
        if (er) { return; }
        npm.commands.run(['test-track']);
    });
});