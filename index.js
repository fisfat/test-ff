const flat = require('core-js');
const fs = require('fs')
const Analytics = require('analytics-node');
const analytics = new Analytics('VP25ZuQYwtn0n9ofkq5cDrdFOdF6pwkn');


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

    const testResult = test.results

    console.log(testResult.flat(2));


    // testResult.forEach((result, index) => {
    //     const describe = result.suites
    //     describe.forEach((result, index) => {
    //         const context = result.suites
    //         context.forEach((result, index) => {
    //             const test = result.tests
    //             test.forEach((result, index) => {
    //                 let finalObj = {}
    //                 finalObj.title = result.title
    //                 finalObj.duration = result.duration
    //                 finalObj.state = result.state
    //                 finalObj.speed = result.speed
    //                 finalObj.pass = result.pass
    //                 finalObj.fail = result.fail
    //                 finalObj.skipped = result.skipped

    //                 results.push(finalObj);
    //                 analytics.track({
    //                     userId: result.title.toString().replace(/\s/g, ''),
    //                     event: 'performance: ' + result.title,
    //                     properties: finalObj
    //                 });
    //             })
    //         })
    //     })
    // });
    // console.table(results);
})