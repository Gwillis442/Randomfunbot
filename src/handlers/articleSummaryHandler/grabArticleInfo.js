const axios = require('axios');
const cheerio = require('cheerio');

async function grabArticleInfo(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const articleContent = $('article').text().trim();
        
        return articleContent;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { grabArticleInfo };