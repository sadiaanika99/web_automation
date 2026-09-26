/**
 * Builds and tears down the Selenium Chrome WebDriver.
 * Kept in one place so browser/options setup isn't duplicated across tests.
 */
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver'); // registers the chromedriver binary path
const { config } = require('../config');

async function buildDriver() {
  const options = new chrome.Options();
  options.addArguments('--window-size=1366,900');
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');

  if (config.headless) {
    options.addArguments('--headless=new');
  }

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({ implicit: 0 }); // explicit waits used throughout instead
  return driver;
}

async function quitDriver(driver) {
  if (driver) {
    await driver.quit();
  }
}

module.exports = { buildDriver, quitDriver };
