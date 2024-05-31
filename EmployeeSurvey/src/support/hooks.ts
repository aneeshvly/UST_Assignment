/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICustomWorld } from './custom-world';
import { config } from './config';
import ScenarioContext from './ScenarioContext';
// import FieldConfig from '../utils/FieldConfig';
import { PageObject } from '../utils/PageObjects';
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { WebKitBrowser, firefox, webkit, chromium, BrowserContext, Page } from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

let browser: WebKitBrowser; 
let context1: BrowserContext;
let  page1:Page;

setDefaultTimeout(process.env.PWDEBUG ? -1 : 600 * 1000);
BeforeAll(async function () {

  for (const browsers of config.browsers) { 
    switch (browsers) {
      case 'chromium':
        browser = await firefox.launch({ headless: false});
        break;
      case 'firefox':
        browser = await firefox.launch({ headless: false});
        break;
      case 'webkit':
        browser = await webkit.launch({ headless: false});
        break;
      default:
        browser = await chromium.launch({
          headless: false });
    }
  }

  context1 = await browser.newContext();
  page1 = await context1.newPage();

  await context1.grantPermissions(['camera', 'microphone']);
});

Before({ tags: '@ignore' }, async function () { 
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld) {

  await context1.tracing.start({ screenshots: true, snapshots: true }); 

  this.page1 = page1; 
  ScenarioContext.put('context1', context1); 
  ScenarioContext.put('page1', page1); 

  this.pageObject = new PageObject(this.page1); 

});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  // eslint-disable-next-line no-console

  if (result) {
    if (result.status !== Status.PASSED) {
      const image1 = await this.page1?.screenshot();
      image1 && (await this.attach(image1, 'image/png'));
    }
  } 
});

AfterAll(async function () {
  context1?.close(); 
  page1.close; 
  await browser.close();
});
