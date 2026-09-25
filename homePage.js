const { By } = require('selenium-webdriver');
const { BasePage } = require('./basePage');
const { LoginPage } = require('./loginPage');

/**
 * Home Page Object for https://www.automationexercise.com/
 *
 * Responsible for: landing on the home page and navigating to the
 * Login / Signup page via the header nav (rather than deep-linking to
 * /login directly), so the automation reflects real user navigation.
 */
class HomePage extends BasePage {
  constructor(driver, baseUrl) {
    super(driver, baseUrl);
    // Header nav link that leads to the combined Signup / Login page
    this.signupLoginLink = By.css('a[href="/login"]');
    // Elements that indicate a logged-in session, shown in the header nav
    this.logoutLink = By.css('a[href="/logout"]');
  }

  /** Builds the "Logged in as <name>" locator dynamically per expected name. */
  loggedInAsLocator(name) {
    return By.xpath(`//a[contains(text(),'Logged in as') and contains(text(),'${name}')]`);
  }

  static get LOGGED_IN_AS_ANY() {
    return By.xpath("//a[contains(text(),'Logged in as')]");
  }

  /** Launch the website (home page). */
  async load() {
    await this.goto('/');
  }

  /** Click the 'Signup / Login' link in the header nav. */
  async goToLoginPage() {
    await this.click(this.signupLoginLink);
    return new LoginPage(this.driver, this.baseUrl);
  }

  /**
   * Verify successful login by checking for the 'Logged in as <name>'
   * indicator and the Logout link in the header nav.
   * @param {string} [expectedName] - if provided, asserts the name matches exactly
   * @returns {Promise<boolean>}
   */
  async isUserLoggedIn(expectedName) {
    const loggedInLocator = expectedName
      ? this.loggedInAsLocator(expectedName)
      : HomePage.LOGGED_IN_AS_ANY;

    const loggedInVisible = await this.isVisible(loggedInLocator, 10000);
    const logoutVisible = await this.isVisible(this.logoutLink, 2000);

    return loggedInVisible && logoutVisible;
  }
}

module.exports = { HomePage };
