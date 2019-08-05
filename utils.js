require('./env')
const Slack = require('slack-node')
slack = new Slack();
slack.setWebhook(process.env.WEBHOOK_URI);

const notifyDeparture = ({ text, title, url, channel, footer }) => {
    slack.webhook({
        channel,
        text,
        attachments: [
            {
                color: "#eee",
                // title,
                // title_link: url,
                fields: [
                    {
                        title: "Test Source",
                        value: process.env.NODE_ENV == "production" ? "Remote" : 'Local',
                        short: true
                    }
                ],
                footer,
            }
        ]
    }, function (err, response) {
        // console.log(response);
    });
}


const notifyArrivals = (data) => {
    slack.webhook({
        channel: data.channel,
        text: data.text,
        attachments: [
            {
                color: "#303b63",
                // title,
                // title_link: url,
                fields: [
                    {
                        title: "Test Source",
                        value: process.env.NODE_ENV == "production" ? "Remote" : 'Local',
                        // value: "Local test",
                        short: true
                    },
                    {
                        title: "Total test suites",
                        value: data.suites,
                        short: true
                    },
                    {
                        title: "Total tests",
                        value: data.totalTests,
                        short: true
                    },
                    {
                        title: "Registered Tests",
                        value: data.registeredTests,
                        short: true
                    },
                    {
                        title: "Passed tests",
                        value: data.pass,
                        short: true
                    },
                    {
                        title: "Failed tests",
                        value: data.fail,
                        short: true
                    },
                    {
                        title: "Pass percentage",
                        value: data.passPercentage,
                        short: true
                    },
                    {
                        title: "Skipped tests",
                        value: data.skipped,
                        short: true
                    },
                    {
                        title: "Overall test duration",
                        value: data.duration,
                        short: true
                    },
                    {
                        title: "Next departure",
                        value: "In 6 hours",
                        short: true
                    },
                ],
                footer: data.footer,
            }
        ]
    }, function (err, response) {
        // console.log(response);
    });
}

const calculateDuration = (miliSeconds) => {
    var minutes = Math.floor(miliSeconds / 60000);
    var seconds = ((miliSeconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports = { notifyDeparture, notifyArrivals, calculateDuration }