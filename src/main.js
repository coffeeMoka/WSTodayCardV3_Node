const schedule = require('node-schedule');
const fetch = require('node-fetch');
require('dotenv').config();
const GetSendData = require('./scheduleTask');

const checkTime = process.env.TIME;
const URL = process.env.ENDPOINT;

schedule.scheduleJob(checkTime, async () => {
    const sendJson = await GetSendData();
    
    await fetch(URL, {
        method: 'POST',
        body: sendJson,
        headers: { "Content-Type": "application/json; charset=utf-8" }
    })
})