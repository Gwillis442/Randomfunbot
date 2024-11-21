
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

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

        await driver.wait(until.elementLocated(By.css('article')), 10000);

        const articleElement = await driver.findElement(By.css('article'));
        const articleContent = await articleElement.getText();

        return articleContent.trim();
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        await driver.quit();
    }
}

module.exports = { grabArticleInfo };