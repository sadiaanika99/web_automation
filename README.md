# AutomationExercise — Login Automation (JavaScript + Selenium WebDriver)

Automates the login scenario on [automationexercise.com](https://www.automationexercise.com/)
using **Selenium WebDriver (JavaScript)** with **Mocha + Chai**, structured as a
**Page Object Model (POM)** project.

## Scenario automated

1. Launch the website.
2. Navigate to the Login page.
3. Enter the registered email address and password.
4. Submit the login form.
5. Verify that the login was successful (`Logged in as <name>` + Logout link appear in the header).

## Project structure

```
automation-exercise-login-selenium-js/
├── config.js                 # Loads BASE_URL / credentials / HEADLESS from .env
├── utils/
│   └── driverFactory.js       # Builds/quits the Chrome WebDriver instance
├── pages/
│   ├── basePage.js             # Shared Selenium helpers (explicit waits, click, type)
│   ├── homePage.js              # Home page object (launch + nav to login)
│   └── loginPage.js             # Login page object (fill + submit + error check)
├── tests/
│   └── login.test.js            # The login test itself (Mocha + Chai)
├── package.json
├── .mocharc.json
├── .env.example
└── .gitignore
```

## Prerequisites — manual account signup

**Before running this automation**, manually create an account on the site:

1. Go to https://www.automationexercise.com/signup
2. Complete the signup form and account creation flow.
3. Note the exact email, password, and first name you used.

This automation logs in with an already-registered account; it does not
create the account for you (per the assignment's instructions).

This project's `.env` is pre-filled for the account:
- Name: Anika Sadia
- Email: anikaafsa99@gmail.com

> Since this password was shared in a chat conversation, it's good practice
> to change it on automationexercise.com once you're done submitting this
> assignment.

## Setup

```bash
# 1. Clone this repo
git clone <your-repo-url>
cd automation-exercise-login-selenium-js

# 2. Install dependencies (this also installs the matching chromedriver binary)
npm install

# 3. Configure credentials (already done in the provided .env — verify it,
#    or start fresh with your own account):
cp .env.example .env
# then edit .env and fill in the account you signed up manually
```

You'll need **Google Chrome** installed locally — `chromedriver` (installed via
npm) drives it directly; no separate driver download/PATH setup needed.

## Running the tests

```bash
# Headless (default)
npm test

# Headed, so you can watch the browser run
npm run test:headed
```

On failure, a screenshot is saved to `test-results/` to help debug what the
page looked like at the point of failure (useful especially for headless/CI runs).

## Design notes

- **Page Object Model**: `HomePage` and `LoginPage` encapsulate locators and
  actions, so the test itself reads like the scenario steps, and locators
  only need to change in one place if the site's markup changes.
- **Locators**: login form fields use the site's documented `data-qa`
  attributes (`data-qa="login-email"`, `data-qa="login-password"`,
  `data-qa="login-button"`), which are more stable than CSS classes.
- **Explicit waits only**: `driver.manage().setTimeouts({ implicit: 0 })`
  disables Selenium's implicit wait, and `BasePage` uses `driver.wait(...)`
  with explicit conditions (`elementLocated`, `elementIsVisible`) instead —
  mixing implicit and explicit waits in Selenium is a common source of
  flaky, hard-to-debug tests, so this project deliberately avoids it.
- **Navigation via UI, not deep-link**: the test clicks the header's
  "Signup / Login" link rather than navigating straight to `/login`, so it
  reflects a real user's path through the site, per the task steps.
- **Verification of success**: login success is verified by checking for
  the specific `Logged in as <first name>` indicator (matched against
  `LOGIN_FIRST_NAME` in `.env`) and a `Logout` link in the header — a
  credential-specific check, not just "some name appeared," and not just
  the absence of an error (a false negative — silently staying on the
  login page — should also fail the test).
- **No hardcoded credentials**: credentials are read from a local `.env`
  file (git-ignored) via `dotenv`, so real login details never end up in
  source control.

## Possible extensions (not required by the task)

- Add a signup automation as a separate, opt-in test (with cleanup/account
  deletion) rather than mixing it into the login test.
- Add negative-path tests (wrong password, unregistered email) using the
  same `LoginPage.hasErrorMessage()` helper.
- Wire into CI (GitHub Actions) with a headless Chrome runner to run on
  every push.
