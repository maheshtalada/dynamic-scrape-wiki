import express from 'express';
/*import BaseService from '../services/BaseService';
 import buildEndpoint, { getHeaderPayload }  from '../helpers/endpointbuilder';
 import { isUserLoggedIn, getSessionData } from '../helpers/sessionUtils';
 import puppeteer from 'puppeteer';*/
const delay = require('delay');
import config from 'config';
const pool = require('../helpers/dbUtils');
const { Cluster } = require('puppeteer-cluster');

// as we building server files
// adding instance path statically

//https://www.codementor.io/@saurabharch/web-push-notification-full-stack-application-with-node-js-restful-api-nnonfcilg


const application = express.Router();

let io , roomId,  scrapeSource  ;

const arrayToVal = (val) => {
	if(typeof val === 'object') {
		return val.join('||');
	} else {
		return val;
	}
};

const flagVal = (val)=> {
	return val === 'unprocessed' ? 'no' : 'yes'
};

application.use( (err, req, res, next) => {
	next();
});

application.get('/api/v1/companies', async(req,res) => {
	const { processed = 'unprocessed'} = req.query;
	try{
		const client = await pool.query(`select * from entities where CompanyName !='' and processed='${flagVal(processed)}'`);
		console.log(client);
		res.send(client);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

application.get('/api/v1/people', async(req,res) => {
	const { processed = 'unprocessed'} = req.query;
	try{
		const people = await pool.query(`select * from company_people where person_contact_processed='${flagVal(processed)}'`);
		console.log(people);
		res.send(people);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

application.get('/api/v1/people/:id', async(req,res) => {
	const { id } = req.params;
	try {
		const person = await pool.query(`select person_name as name, person_phone as phone, person_email as email, person_roles as roles, person_address as fullAddresses, person_status as status, person_contact_processed as isProcessed from company_people where company_people_id="${id}"`);
		res.send(person);
	} catch (e) {
		res.status(500).send(e);
	}
});

application.get('/api/v1/company/:id', async(req,res) => {
	const { id } = req.params;
	try{
		let client = await pool.query(`select * from entities where EntityID="${id}"`);
		try {
			const logData = await pool.query(`SELECT * FROM scrapeActivityLog t
			 WHERE companyID="${id}" and date_added = (
			 SELECT max(date_added)
			 FROM scrapeActivityLog
			 WHERE companyID="${id}" and t.source = source
			 )`);
			client[0]['scrapeLog'] = logData;
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}

		try {
			const companies = await pool.query(`select name, phone, address as fullAddresses, status from companies where companyId="${id}"`);
			client[0]['companyData'] = companies;
		} catch (e) {
			res.status(500).send(e);
		}

		try {
			const companyPeople = await pool.query(`select person_name as name, person_phone as phone, person_email as email, person_roles as roles, person_address as fullAddresses, person_status as status from company_people where companyID="${id}"`);
			client[0]['companyPeople'] = companyPeople;
		} catch (e) {
			res.status(500).send(e);
		}
		res.send(client[0]);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

application.post('/api/v1/company/:id/people' , async (req, res, next) => {
	const { id } = req.params;
	const dataList = req.body;

	try {
		const delPersonResults = await pool.query(`DELETE FROM company_people WHERE companyId='${id}'`);
		const delCompanyResults = await pool.query(`DELETE FROM companies WHERE companyId='${id}'`);
		if(dataList.company) {
			const data = dataList.company;
			const insertCompanyResult = await pool.query(`INSERT INTO companies (
			companyID, 
			name, 
			phone, 
			status, 
			address) 
		VALUES ('${id}', '${data.name}', '${data.phone}', '${data.status}', '${data.fullAddresses}')`);
		}

		if(dataList.people) {
			const insertValues = dataList.people.map( data => `('${id}', '${data.name}', '${data.email}', '${data.phone}', '${data.status}', '${data.fullAddresses}', '${arrayToVal(data.roles)}')`)
			const insertPeopleResult = await pool.query(`INSERT INTO company_people (
			companyID, 
			person_name, 
			person_email, 
			person_phone, 
			person_status, 
			person_address, 
			person_roles) 
		VALUES ${insertValues.join(', ')}`);
			try {
				const updateResult = await pool.query(`UPDATE entities SET processed='yes' WHERE EntityID='${id}'`)
				res.send(updateResult)
			} catch (e) {
				res.status(500).send(e)
			}

		} else {
			res.send(delPersonResults);
		}

	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

application.get('/api/v1/rungrabber/:id', async(req,res) => {
	const { source, name, state, sid } = req.query;
	const { id } = req.params;
	io = req.app.get('socketio');
	roomId = sid;
	scrapeSource = source;
	try{
		const data = await getCompany({name, state, io, sid });
		const { corporationwiki, google } = data;
		console.log(data);
		if (corporationwiki) {
			pool.query(`INSERT into scrapeActivityLog (companyID, logData, source, date_added) values (${id},'${JSON.stringify(corporationwiki)}', 'corporationwiki', UNIX_TIMESTAMP(CURRENT_TIME()))`)
		}

		if (google) {
			pool.query(`INSERT into scrapeActivityLog (companyID, logData, source, date_added) values (${id},'${JSON.stringify(google)}', 'google', UNIX_TIMESTAMP(CURRENT_TIME()))`)
		}

		res.send(data);
	} catch (e) {
		res.status(500).send({ error : e});
	}
});

async function waitForStdProcess({ msg = '', className = '', data = '' ,source = ''}, timer) {
	const P = ["\\", "|", "/", "-"];
	let x = 0;
	const oneIteration = 250; // milli sec
	const iterationPerSec = 1000 / oneIteration; // oneIteration
	const totalItereationPerTimer = timer * iterationPerSec;
	process.stdout.write(" " +msg);
	//do send message
	io.to(roomId).emit('scrapeLog', { source , log : { msg , className, data}})
	for (let i = 1 ; i <= totalItereationPerTimer ; i++) {
		process.stdout.write("\r" + P[x++]);
		x = x % (P.length);
		await delay((Number(1) * oneIteration));
	}
	process.stdout.write('\r\n');
}


const googleCrawl = async ({ page, data }) => {
	const { url, companyName, state, onSuccess, onError } = data;
	let dataObj;
	try {
		await waitForStdProcess(
			{
				msg : `Search For ${companyName}, ${state.toUpperCase()}`,
				className : "company-name",
				source : 'google'
			},
		1);
		await page.goto(url, {waitUntil: ['load', 'domcontentloaded']});
		//await page.waitFor(3000);
		// Extract the links and titles of the search result page
		//page.on('console', msg => console.log(msg.text()));
		//let dataToSend = [];
		const dataToSend = await page.evaluate(() => {
			const googleEle = document.querySelectorAll('#search .rc');
			return Object.values(googleEle)
				.map(el => {
					const titleLink = el.querySelector('.r > a');
					const desc = el.querySelector('.s .st');
					return {
						 title : titleLink.innerText.replace('\n','').replace(/"/g, '\\"').replace(/(?:\\[rn]|[\r\n])/g," » ").trim(),
						 link : titleLink.href,
						 desc : desc.innerText.replace(/"/g, '\\"').replace(/(?:\\[rn]|[\r\n])/g," ").trim()
					 }
				});
		});
		await waitForStdProcess(
			{
				msg : `Result Found For ${companyName}, ${state.toUpperCase()}`,
				className : "company-name google-log",
				source : 'google',
				data : dataToSend
			},
			1);
		onSuccess(dataToSend)
	} catch (e) {
		onError(e);
	}

 };

// We don't define a task and instead use own functions
const corporation = async ({ page, data }) => {
	const { companyName, state, url, onSuccess, onError } = data;
	let jsonData = [];
	let peopleData = [];
	try {

		await waitForStdProcess(
			{
				msg : `Search For ${companyName}`,
				className : "company-name",
				source : 'corporationwiki'
			},
			1);
		await page.goto(url, {waitUntil: ['load', 'domcontentloaded']});
		//await waitForStdProcess(`Loading ${pageUrl}`, 1);
		//await page.goto(pageUrl, {waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']});
		await page.waitFor("#results-stats");
		const resultsFound = await page.$eval('#results-stats', el => el.innerText);
		if(resultsFound === '0 Results Found') {
			throw 'no companies found'
		}
		await page.waitFor("#entity_type_facets_container input[type=checkbox]");
		await page.click("#entity_type_facets_container input[type=checkbox]");
		await waitForStdProcess({
			msg : 'Enable Filters',
			source : 'corporationwiki'
		}, 3);
		await page.select('#states_facets_container select', state);
		await waitForStdProcess({
			msg : '',
			className : "filters",
			source : 'corporationwiki'
		}, 5);
		const itemsData = await page.$$('.list-group-item');
		await waitForStdProcess(
			{
				msg : `Found ${itemsData.length} Companies`,
				className : "company-length",
				source : 'corporationwiki'
			}, 1);
		let i = 0;
		for (let item of itemsData) {
			let address = await item.$eval('.col-xs-12.col-lg-5', el => el.innerText);
			let company = await item.$eval('.ellipsis', company => ({
				name : company.innerText,
				link : company.getAttribute('href')
			}));
			company['address'] = address.split('\n')[1].trim();
			jsonData.push(company)
			i++;
		}
		await waitForStdProcess({ msg : '', data: jsonData, className : "companies", source : 'corporationwiki'}, 1);
		//await page.waitFor(3000);
		//get full company address from company details page
		i = 0;
		for (let company of jsonData) {

			await waitForStdProcess({ msg : `Fetching People for ${company.name}, ${company.address}`, className : "company-fetching", source : 'corporationwiki'}, 1);
			//await waitForStdProcess(`Loading ${company.link}`, 1);
			await page.goto(company.link, {waitUntil: ['load', 'domcontentloaded']});
			//await page.waitFor(10000)
			// get all people & roles
			jsonData[i]['people'] = await page.evaluate( selector => {
				const rows = document.querySelectorAll(selector);
				return Object.values(rows).map( row => {
					const peopleEle = row.querySelector('td:nth-child(1) > a');
					const labelEle = row.querySelectorAll('.role-label');
					const peopleRoles = Object.values(labelEle).map( ele => ele.innerText);
					return {
						name : (peopleEle.childNodes[2].nodeValue).trim(),
						link : peopleEle.getAttribute('href'),
						roles : peopleRoles
					}
				});
			},'#people > div.card.min-card-height > div > div > table > tbody > tr');

			const peopleLinks = jsonData[i]['people'].map( (person, key) => ({
				id : i,
				personIndex : key,
				link : person.link
			}))
			peopleData = peopleData.concat(peopleLinks)

			let fullAddress = await page.$$eval('.list-group-item span[itemprop="address"]', addresses => {
				return addresses.map( address => address.innerText)
			});
			jsonData[i]['fullAddresses'] = fullAddress;

			try {
				let status = await page.$eval('#header-status .label-success' , el => el && el.innerText);
				jsonData[i]['status'] = status;
			} catch (e) {
				//console.log(e.error)
			}

			try {
				let phone = await page.$eval('#phone .phone-number' , el => el && el.innerText);
				jsonData[i]['phone'] = phone;
			} catch (e) {
				//console.log(e.error)
			}
			await waitForStdProcess({ msg : `Full Address - ${jsonData[i]['fullAddresses']}`, className : "company-address", source : 'corporationwiki'},1);
			await waitForStdProcess({ msg : ``, className : "company-people", data : jsonData[i]['people'], source : 'corporationwiki'},3);
			i++;
		}

		//get person full address
		i=0;
		await waitForStdProcess({ msg : `Fetch People addresses`, className : "company-people-details-title", source : 'corporationwiki'}, 1);
		for (let people of peopleData) {
			//await waitForStdProcess(`Loading ${people.link}`, 1);
			await page.goto(people.link);

			let fullAddress = await page.$$eval('.list-group-item span[itemprop="address"]', addresses => {
				return addresses.map( address => address.innerText)
			});


			let indexPerson = jsonData[people.id]['people'][people.personIndex];

			try {
				let status = await page.$eval('#header-status .label-success' , el => el && el.innerText);
				indexPerson['status'] = status;
			} catch (e) {
				//console.log(e.error)
			}

			try {
				let phone = await page.$eval('#phone .phone-number' , el => el && el.innerText);
				indexPerson['phone'] = phone;
			} catch (e) {
				//console.log(e.error)
			}

			indexPerson['id'] = ++i;

			indexPerson['fullAddresses'] = fullAddress;
			jsonData[people.id]['people'][people.personIndex] = indexPerson;
			await waitForStdProcess({ msg : '', className : "company-people-data", data :indexPerson,source : 'corporationwiki' },3);
			//i++;
		}
		onSuccess(jsonData);
	} catch (e) {
		onError(e);
	}

};

async function getCompany( { name, state }) {
	//const browser = await puppeteer.launch({headless: true});

	const cluster = await Cluster.launch({
		concurrency: Cluster.CONCURRENCY_BROWSER,
		maxConcurrency: 2,
		timeout : 100 * 1000,
		/*puppeteerOptions : {
			headless : false
		}*/
	});
	let google, corporationwiki;

	// Event handler to be called in case of problems
	cluster.on('taskerror', async(err, data) => {
		console.log(`Error crawling ${data}: ${err.message}`);
		await cluster.idle();
		await cluster.close();
	});

	try {
		// corporation wiki
		const corporationWikiPageUrl = encodeURI(`https://www.corporationwiki.com/search/results?term=${name}`);
		cluster.queue({
			url : corporationWikiPageUrl,
			companyName : name,
			state,
			onSuccess : async(data)=> {
				corporationwiki = data;
				//done sending
				await waitForStdProcess(
					{
						msg : 'done',
						className : "company-name",
						source : 'corporationwiki',
						data
					},
					1);
			},
			onError : (error)=> {
				console.log('error', error)
			}
		}, corporation);

		const googleUrl = `https://www.google.com/search?q=${name},${state}`;
		cluster.queue({
			url : googleUrl,
			companyName : name,
			state,
			onSuccess : async (data)=> {
				google = data;
				await waitForStdProcess(
					{
						msg : 'done',
						className : "company-name",
						source : 'google',
						data
					},
					1);

				// done sending
			},
			onError : (error)=> {
				console.log('error', error)
			}
		}, googleCrawl);

		await cluster.idle();
		await cluster.close();
		return Promise.resolve({corporationwiki,google})
	} catch (e) {
		await cluster.idle();
		await cluster.close();
		return Promise.reject(e)
	}
}

export default application


