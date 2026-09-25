const { By } = require('selenium-webdriver');
const { BasePage } = require('./basePage');

/**
 * Login Page Object for https://www.automationexercise.com/login
 *
 * Selectors use the site's documented data-qa attributes (the same ones
 * referenced in AutomationExercise's own published test case list), which
 * are more stable than CSS class names for this site.
 */
class LoginPage extends BasePage {
  constructor(driver, baseUrl) {
    super(driver, baseUrl);
    this.loginHeading = By.xpath("//h2[text()='Login to your account']");
    this.emailInput = By.css('input[data-qa="login-email"]');
    this.passwordInput = By.css('input[data-qa="login-password"]');
    this.loginButton = By.css('button[data-qa="login-button"]');
    // Shown when credentials are invalid
    this.errorMessage = By.xpath("//p[text()='Your email or password is incorrect!']");
  }

  /** Verify navigation to the Login page succeeded. */
  async isLoaded() {
    return this.isVisible(this.loginHeading, 10000);
  }

  async enterEmail(email) {
    await this.type(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.type(this.passwordInput, password);
  }

  async submitLogin() {
    await this.click(this.loginButton);
  }

  /** Convenience method: fill both fields and submit in one call. */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submitLogin();
  }

  async hasErrorMessage() {
    return this.isVisible(this.errorMessage, 3000);
  }
}

module.exports = { LoginPage };
