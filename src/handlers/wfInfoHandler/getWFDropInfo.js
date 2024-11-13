const axios = require('axios');
const cheerio = require('cheerio');

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

async function getWarframeDropInfo(query) {
    const url = `https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html`;
    try {
        const capitalizedQuery = capitalizeWords(query);
        const response = await axios.get(url);
        const data = response.data;
        const $ = cheerio.load(data);

        let dropLocation = null;
        let dropRototion = null;
        let dropInfo = [];

        $('tr').each((index, element) => {
            const th = $(element).find('th[colspan="2"]');
            const td = $(element).find('td');

            if (th.length > 0) {
                if (!dropLocation) {
                    dropLocation = th.text().trim();
                } else {
                    dropRototion = th.text().trim();
                }
            } else if (td.length === 2) {
                const item = td.eq(0).text().trim();
                const dropRate = td.eq(1).text().trim();

                if (item.toLowerCase().includes(capitalizedQuery.toLowerCase())) {
                    dropInfo.push({ item, dropRate, dropLocation, dropRototion });
                }
            }
        });

        return { dropLocation, dropRototion, dropInfo };
    } catch (err) {
        console.log(err);
        return { header: "Error", dropInfo: "Error" };
    }
}

module.exports = { getWarframeDropInfo };