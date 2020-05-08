const schedule = require('node-schedule');
const fetch = require('node-fetch');
const GetSendData = require('./scheduleTask');

const checkTime = "13 15 * * *";
const URL = "https://script.google.com/macros/s/エンドポイント";

schedule.scheduleJob(checkTime, async () => {
    const sendJson = await GetSendData();
    console.log(sendJson);
    
    await fetch(URL, {
        method: 'POST',
        body: sendJson,
        headers: { "Content-Type": "application/json; charset=utf-8" }
    })
})