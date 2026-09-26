
Automates the login scenario on [automationexercise.com](https://www.automationexercise.com/)
using Selenium WebDriver with JavaScript structured as a
Page Object Model (POM) project.

Scenario automated

1. Launching the website.
2. Navigating to the Login page.
3. Entering the registered email address and password.
4. Submitting the login form.
5. Verifying that the login was successful 

Project structure

automation-exercise-login-selenium-js/
├── config.js                
├── utils/
│   └── driverFactory.js       
├── pages/
│   ├── basePage.js             
│   ├── homePage.js            
│   └── loginPage.js             
├── tests/
│   └── login.test.js            
├── package.json
├── .mocharc.json
├── .env.example
└── .gitignore







