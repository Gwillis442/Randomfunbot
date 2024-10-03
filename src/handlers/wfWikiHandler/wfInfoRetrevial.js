//Purpose: Given a specific item or warframe parse offical warframe drop tables and return the information in a readable format

const axios = require('axios');
const cheerio = require('cheerio');

async function getWarframeDropInfo(query) {

    const url = `https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract the content of the table from given query
    const dropInfo = $(`td:contains(${query})`).closest('tr')

    // Extract the header of the table
    const header = dropInfo.prevAll('tr').find('th[colspan="2"]').first().text().trim();


    // Extract the content of the table rows that follow the header
    const content = [];
    dropInfo.each((index, element) => {
        const cells = $(element).find('td');
        if (cells.length === 2) {
            const item = cells.eq(0).text().trim();
            const rarity = cells.eq(1).text().trim();
            content.push({ item, rarity });
        }
    });


    console.log('Header:', location);
    console.log('Content:', content);
    return { header, content };
}

getWarframeDropInfo('Koumei');