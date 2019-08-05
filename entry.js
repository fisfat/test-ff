const npm = require('npm')
const cron = require('node-cron');
const moment = require('moment');
const path = require('path');
require('./env')
const notify = require('./utils').notifyDeparture;

const data = {
    text: "E2E Tests about to run :airplane_departure:"
}

/**
 * Code below indicates initiation
 */

console.log(
    '----------------------------------------------' + '\n' +
    '|         Everything should be set           |' + '\n' +
    '|        when you see this message :)        |' + '\n' +
    '|                                            |' + '\n' +
    '----------------------------------------------' + '\n'
)

cron.schedule('*/10 * * * *', () => {
    console.log('running tests every 6 hours');
    data.footer = "Cypress tests | " + moment().format('MMMM Do YYYY, h:mm:ss a'),
        notify(data);
    npm.load({}, function (er) {
        if (er) { return; }
        npm.commands.run(['cypress-report']);
    });
});