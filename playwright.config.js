

// @ts-check
//
 const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './testrewards',

  timeout: 100 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ['list'],
    ['monocart-reporter', {
      name: 'Santa Browser Automation Report',
      outputFile: './monocart-report/index.html',
      open: true
    }]
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  }

});  

// // @ts-check
// const config = {
//   testDir: './testrewards',
//   timeout: 100 * 1000,

//   expect: {
//     timeout: 5000,
//   },

//   reporter: 'html',

//   use: {
//     browserName: 'chromium',
//     headless: true,  

  
//   },
// };       








// module.exports = config;
