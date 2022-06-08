const rp = require("request-promise");
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const cheerio = require("cheerio");
const potusParse = require("./potusParse");

// Requesting the url to get HTML
rp(url).then(function (html) {
    // Loading the HTML using Cheerio
    const $ = cheerio.load(html);

    // Empty WikiURLS
    const wikiUrls = [];

    // Getting the length of total Presidents
    const totalLength = $('td > b > a').length;
    
    // Looping through all presidents to Get their URLs
    for (let i = 0; i < totalLength; i++) {
        wikiUrls.push($('td > b > a')[i].attribs.href);
    }

    // Promise All
    return Promise.all(
        // Looping through each WikiURL
        wikiUrls.map(function (url) {
            // Getting the Name, and DOB of president
            return potusParse('https://en.wikipedia.org' + url);
        })
    );
}).then(function(presidents) {
    // Logging all presidents detail in console
    console.log(presidents);
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });