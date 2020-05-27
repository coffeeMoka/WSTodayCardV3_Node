const puppeteer = require('puppeteer');
require('dotenv').config();
async function GetSendData() {
    const URL = process.env.WS;
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
    });
    const page = await browser.newPage();
    await page.goto(URL);
    const titleList = await page.$$eval("h3 > a", list => list.map(el => el.innerHTML));
    const list = await page.$$("img.aligncenter");
    let imageList = [];
    for (let i = 0; i < list.length; i++) {
        let imageUrl = await (await list[i].getProperty("src")).jsonValue();
        imageList.push(imageUrl);
    }
    await browser.close();
    const obj = {
        "title": titleList,
        "image": imageList
    };
    return new Promise((resolve) => {
        resolve(JSON.stringify(obj));
    })
}
module.exports = GetSendData;