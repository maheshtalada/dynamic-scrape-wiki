import {escape as escapeHTML} from 'lodash';
import serializeJs from 'serialize-javascript';

export const renderHeader = (nonce,scripts, metaData, cssPath, assetsPath) => `<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml"><head><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta http-equiv="x-dns-prefetch-control" content="on" /><meta charset="UTF-8"><link rel="dns-prefetch" href="//images.propshub.com" /><link rel="dns-prefetch" href="//fonts.googleapis.com" /><link rel="dns-prefetch" href="//assets.propshub.com" /><link rel="canonical" href="${metaData.canonicalUrl}"></link><link rel="shortcut icon" href="${assetsPath}/images/favicon.ico" /><link rel="manifest" href="${assetsPath}/manifest.json"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="theme-color" content="#222"><title>${escapeHTML(metaData.title)}</title><meta name="keywords" content="${escapeHTML(metaData.keywords)}"><meta name="description" content="${escapeHTML(metaData.description)}"><meta name="author" content="Propshub, Inc." /><meta property="fb:app_id" content="2113117318901395" /><link rel="stylesheet" nonce="${nonce}" crossorigin href="${cssPath}"> </head><body><div id="react-view">`;

export const renderFooter = (nonce,vendor, common, main, config, initialState) => `</div><script nonce="${nonce}" type="application/javascript"> var frameworkGlobals=${serializeJs({nonce : nonce, origin: config.origin, isServer: false,country: config.country,isClient: false,isDev: false,basePath: '',visitorIP: config.visitorIP,location: config.location,env: config.env,visitorCountry: config.visitorCountry,visitorCountryName: config.visitorCountryName,siteCaptionIndex: config.siteCaptionIndex},{isJSON: true})};window.__CONFIG__=${serializeJs(config,{isJSON: true})}; window.__INITIAL_STATE__=${serializeJs(initialState,{isJSON: true})}; </script> <script type="application/javascript" crossorigin src="${vendor}" nonce="${nonce}"></script> <script type="application/javascript" crossorigin src="${common}" nonce="${nonce}"></script> <script type="application/javascript" crossorigin src="${main}" nonce="${nonce}"></script></body> </html>`;
