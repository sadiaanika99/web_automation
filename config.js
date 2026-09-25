/**
 * Central configuration, loaded from environment variables (via a local
 * .env file). Credentials are never hardcoded in source — copy
 * .env.example to .env and fill in the account you manually created,
 * per the assignment instructions.
 */
require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://www.automationexercise.com',
  loginEmail: process.env.LOGIN_EMAIL || '',
  loginPassword: process.env.LOGIN_PASSWORD || '',
  loginFirstName: process.env.LOGIN_FIRST_NAME || '',
  headless: process.env.HEADLESS !== 'false', // headless by default
};

function validateCredentials() {
  if (!config.loginEmail || !config.loginPassword) {
    throw new Error(
      'LOGIN_EMAIL and/or LOGIN_PASSWORD are not set.\n' +
        '1. Manually sign up for an account at ' +
        `${config.baseUrl}/signup\n` +
        '2. Copy .env.example to .env\n' +
        "3. Fill in LOGIN_EMAIL and LOGIN_PASSWORD with that account's credentials"
    );
  }
}

module.exports = { config, validateCredentials };
