require('./env')
const fs = require('fs')
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.SEGMENT_WRITE_KEY);
const notify = require('./utils').notifyArrivals;
const calculateDuration = require('./utils').calculateDuration;
const moment = require('moment')

const data = {
    footer: "Cypress tests | " + moment().format('MMMM Do YYYY, h:mm:ss a'),
    text: "E2E Tests finished :airplane_arriving:"
}


function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}
jsonReader('./merged-result.json', (err, test) => {
    if (err) {
        console.log(err)
        return
    }
    const results = [];

    const overall_data = {
        suites: test.stats.suites,
        totalTests: test.stats.tests,
        registeredTests: test.stats.testsRegistered,
        pass: test.stats.passes,
        fail: test.stats.failures,
        passPercentage: test.stats.passPercent,
        skipped: test.stats.skipped,
        duration: calculateDuration(test.stats.duration)
    }

    const testResult = test.results

    console.log('got to index');

    /**
     * Below code would be improved to recurse
     */
    testResult.forEach((result, index) => {
        const describe = result.suites
        describe.forEach((result, index) => {
            const context = result.suites
            context.forEach((result, index) => {
                const test = result.tests
                test.forEach((result, index) => {
                    let finalObj = {}
                    finalObj.title = result.title
                    finalObj.duration = result.duration
                    finalObj.state = result.state
                    finalObj.speed = result.speed
                    finalObj.pass = result.pass
                    finalObj.fail = result.fail
                    finalObj.skipped = result.skipped

                    results.push(finalObj);
                    analytics.track({
                        userId: result.title.toString().replace(/\s/g, ''),
                        event: 'performance: ' + result.title,
                        properties: finalObj
                    });
                })
            })
        })
    });
    notify({ ...data, ...overall_data })
})