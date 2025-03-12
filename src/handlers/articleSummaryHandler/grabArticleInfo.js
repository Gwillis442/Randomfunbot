const puppeteer = require('puppeteer');

const cssSelectors = [
    'article',
    'main',
    'content',
    'div.main',
    'div.content',
    'div.article',
    'div.article-content',
    'div.post-content',
    'div.entry-content',
    'div.article-body',
    'text',

];

async function grabArticleInfo(url) {
    let browser;

    try {

        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage'
            ]
        });

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        try {
        const text = await page.evaluate(() => document.body.innerText);
        return text;
        }catch(err){
        console.log('No content found under specified selectors');
        return null;
        }

    } catch(err) {
        console.log(err);
        return null;
    } finally {
        if (browser){
            await browser.close();
        }
    }

}

module.exports = { grabArticleInfo };