/**
 * Scenario under test:
 *   1. Launch the website.
 *   2. Navigate to the Login page.
 *   3. Enter the registered email address and password.
 *   4. Submit the login form.
 *   5. Verify that the login was successful.
 *
 * Credentials belong to an account that must be manually created via
 * signup at https://www.automationexercise.com/signup BEFORE running
 * this test (per the assignment instructions) and supplied via a local
 * .env file — see .env.example and README.md.
 */
const { expect } = require('chai');
const { config, validateCredentials } = require('../config');
const { buildDriver, quitDriver } = require('../utils/driverFactory');
const { HomePage } = require('../pages/homePage');

describe('AutomationExercise — Login', function () {
  let driver;
  let homePage;

  before(function () {
    validateCredentials(); // fail fast with a clear message if .env isn't set
  });

  beforeEach(async function () {
    driver = await buildDriver();
    homePage = new HomePage(driver, config.baseUrl);
  });

  afterEach(async function () {
    // Capture a screenshot on failure to help debug CI/headless runs
    if (this.currentTest && this.currentTest.state === 'failed' && driver) {
      const fs = require('fs');
      const path = require('path');
      const dir = path.join(__dirname, '..', 'test-results');
      fs.mkdirSync(dir, { recursive: true });
      const image = await driver.takeScreenshot();
      fs.writeFileSync(path.join(dir, `${this.currentTest.title.replace(/\s+/g, '_')}.png`), image, 'base64');
    }
    await quitDriver(driver);
  });

  it('logs in successfully with a registered email and password', async function () {
    // 1. Launch the website
    await homePage.load();
    const url = await driver.getCurrentUrl();
    expect(url).to.include('automationexercise.com');

    // 2. Navigate to the Login page
    const loginPage = await homePage.goToLoginPage();
    expect(await loginPage.isLoaded(), 'Login page did not load as expected').to.be.true;

    // 3 & 4. Enter registered credentials and submit the login form
    await loginPage.login(config.loginEmail, config.loginPassword);

    // 5. Verify that the login was successful
    const hasError = await loginPage.hasErrorMessage();
    expect(
      hasError,
      'Login failed: site reported invalid email/password. Confirm LOGIN_EMAIL / ' +
        'LOGIN_PASSWORD in .env match an account that was manually signed up at /signup.'
    ).to.be.false;

    // Verify against the specific registered name, not just "some name
    // appeared" — a stronger, credential-specific assertion of success.
    const loggedIn = await homePage.isUserLoggedIn(config.loginFirstName);
    expect(
      loggedIn,
      `Expected 'Logged in as ${config.loginFirstName}' and a Logout link in the header ` +
        'nav after a successful login, but that was not found. Double-check LOGIN_FIRST_NAME ' +
        'in .env matches the first name used at signup.'
    ).to.be.true;
  });
});
