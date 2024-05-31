import { devices, LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  headless: true,
};

export const config = {
  browsers: ['chromium'],
  //  browsers: ['chromium', 'firefox', 'webkit'],
  browserOptions,

  expirianSurveyEnginURL: ' https://surveyrc.taxcreditco.com/automation-challenge',
  expirianEmployerServicesPageURL: 'https://www.experian.com/employer-services',

  serverOs: 'Windows',
  sheetName: '',
  mobileView: false,

  compilerOptions: {
    outDir: 'dist',
  },

  IMG_THRESHOLD: { threshold: 0.4 },
  // BASE_API_URL: 'https://catfact.ninja/',
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    trace: 'on',
    contextOptions: {
      recordVideo: {
        dir: '../screenshots',
      },
    },
    headless: false,
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};
