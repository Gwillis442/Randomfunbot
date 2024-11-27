
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

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
    'div.article-body'
];

async function grabArticleInfo(url) {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get(url);

        for (let i = 0; i < cssSelectors.length; i++) {
            try {
                await driver.wait(until.elementLocated(By.css(cssSelectors[i])), 3000);
                const articleElement = await driver.findElement(By.css(cssSelectors[i]));
                const articleContent = await articleElement.getText();

                if (articleContent.length && articleContent.trim().length > 0) {
                    return articleContent.trim();
                }
            } catch (err) {
                // Ignore error and try next selector
            }
        }

        console.log('No content found under specified selectors');
        return null;

    } catch (err) {
        console.log(err);
        return null;
    } finally {
        await driver.quit();
    }
}

module.exports = { grabArticleInfo };