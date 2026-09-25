const { until } = require('selenium-webdriver');

/**
 * Base Page Object.
 *
 * All page objects extend this class so common Selenium interactions
 * (navigation, explicit waits, text checks) live in one place instead of
 * being duplicated across every page object.
 */
class BasePage {
  /**
   * @param {import('selenium-webdriver').WebDriver} driver
   * @param {string} baseUrl
   */
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async goto(path = '/') {
    await this.driver.get(`${this.baseUrl}${path}`);
  }

  async click(locator, timeout = 10000) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
  }

  async type(locator, text, timeout = 10000) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(el), timeout);
    await el.clear();
    await el.sendKeys(text);
  }

  /**
   * @returns {Promise<boolean>} true if the element becomes visible within timeout
   */
  async isVisible(locator, timeout = 5000) {
    try {
      const el = await this.driver.wait(until.elementLocated(locator), timeout);
      await this.driver.wait(until.elementIsVisible(el), timeout);
      return true;
    } catch {
      return false;
    }
  }

  async getText(locator, timeout = 5000) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    return el.getText();
  }
}

module.exports = { BasePage };
