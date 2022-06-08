const rp = require('request-promise');
const cheerio = require("cheerio");

// Async potusParse function to get name and birthday of President
const potusParse = async function(url){
    try {
        // Getting HTML of the page
        const html = await rp(url);

        // Loading the HTML for cheerio
        const $ = cheerio.load(html);

        // Returning the name and birthday
        return {
            name: $('.firstHeading').text(),
            birthday: $('.bday').text(),
        };
    } catch (err) {
        console.log(err);
     }
}

module.exports = potusParse;