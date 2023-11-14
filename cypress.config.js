const { defineConfig } = require("cypress");

module.exports = defineConfig({
 
 
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    responsetimeout :50000,


    baseurl:'https://nsqudd9pmf.execute-api.us-east-2.amazonaws.com/staging/',


  reporterOptions: {

    charts: true,

    reportPageTitle: 'Penzack',

  embeddedScreenshots: true, 

 inlineAssets: true, //Adds the asserts inline

  },
  experimentalMemoryManagement:true,

  
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
