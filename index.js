const puppeteer = require('puppeteer');
const delay = require('delay');
//const PuppeteerUtils = require('src/puppeteerUtils');

/*
 corporation wiki pages
 landing : https://www.corporationwiki.com/

 errors
 try {
 await page.waitForSelector('.foo');
 } catch (e) {
 if (e instanceof puppeteer.errors.TimeoutError) {
 // Do something if this is a timeout.
 }
 }
 */
/*

 var twirlTimer = (function() {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  return setInterval(function() {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
    }, 250);
 })();*/



async function waitForStdProcess(msg, timer) {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    const oneIteration = 250; // milli sec
    const iterationPerSec = 1000 / oneIteration; // oneIteration
    const totalItereationPerTimer = timer * iterationPerSec;
    process.stdout.write(" " +msg);
    for (let i = 1 ; i <= totalItereationPerTimer ; i++) {
        process.stdout.write("\r" + P[x++]);
        x = x % (P.length);
        await delay((Number(1) * oneIteration));
    }
    process.stdout.write('\r\n');
}


async function getCompany() {
    const browser = await puppeteer.launch({headless: false});
    let data = [];
    let peopleData = [];
    try {
        const page = await browser.newPage();
        const pageUrl = 'https://www.google.com/search?ei=xTZnXrCmNcSpmge1rqL4DA&q=Riverwood+Properties%2C+LLC%2C+GA&oq=Riverwood+Properties%2C+LLC%2C+GA&gs_l=psy-ab.3..0i22i30.6957186.6957186..6958438...0.8..0.98.98.1......0....2j1..gws-wiz.......0i71.-b1nrQ9DkSc&ved=0ahUKEwjwnJPcpo_oAhXElOYKHTWXCM8Q4dUDCAs&uact=5';
        await page.goto(pageUrl, {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});
		await delay((Number(100) * 1000));
    } catch (e) {
        //console.error(e)
    } finally {
        //await waitForStdProcess(`${JSON.stringify(data[i],null,'\t')}`,3);
       // console.log(`${JSON.stringify(data,null,'\t')}`);
        await browser.close();
    }
}

getCompany();
