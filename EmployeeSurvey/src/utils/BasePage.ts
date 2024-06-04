/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-constant-condition */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import ScenarioContext from '../support/ScenarioContext';
import { config } from '../support/config';
import * as XLSX from 'xlsx';
import { Locator, Page } from '@playwright/test';
import * as yaml from 'yaml';
import crypto from 'crypto';

import assert from 'assert';
import path from 'path';

import * as fs from 'fs';

export abstract class BasePage {
  protected page1: Page;
  protected page: Page;
  protected page2: Page;

  public publicFilePathArray: string[] = [];
  public publicPageNamesArray: any[] = [];
  public dataarray: string[] = [];
  public publicMethodArray: any[] = [];
  public publicParameterArray: any[] = [];
  public publicFinalDataArray: any[] = [];
  public publicStepFileWritingPaths: any;
  public updatedparameterarray: any[] = [];
  public publicUpdatedParameterArray: any[] = [];
  public publicLocatorNameArray: any[] = [];
  public publicverificationmessageArray: any[] = [];
  public publicXpathArray: any[] = [];
  public PublicFinalPageClassData: any[] = [];
  public publicPageFileWritingPaths: any;
  public publicLocatorDeclarationArray: any[] = [];
  public PublicUpdatedLocatorArray: any[] = [];
  public publicPageClassContentsArray: any[] = [];
  public publicElementTypeArray: any[] = [];
  public publicValidationArray: any[] = [];
  public publicContentInsideMethodBasedOnElementType: any[] = [];
  // S3 credentials

  s3accessKeyId = ''; // Access Key;
  s3secretAccessKey = ''; // 'your_secret_access_key';
  s3region = ''; // 'your_bucket_region';
  s3BucketName = '';

  // Define the parameters for the S3 getObject operation

  test!: boolean;
  fileNames: string[];

  context: any;
  context1: any;
  context2: any;
  static fileNames1: any;
  sampleLocator: Locator;
  featurefilespath: any;
  finalarray: any;
  selectYearloc: any;
  rightarrowlocator: any;
  leftarrowlocator: any;
  selectDateValue: any;
  readonly sampleloc: any;
  publicSamplexpathArray: any;

  // private newWindow: any;

  // private context1: any;
  // private context2: any;
  // browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | undefined;

  constructor(page: Page) {
    this.page = page;

    this.page1 = page;
    this.page2 = page;
    this.context1 = ScenarioContext.get('context1');
    this.page1 = ScenarioContext.get('page1');
    this.context2 = ScenarioContext.get('context2');
    this.page2 = ScenarioContext.get('page2');

    // Access the local storage values

    this.fileNames = [];

    this.sampleLocator = this.page.locator('');
    // this.sampleloc = '//text()="samplelocvalue"';
    this.sampleloc = '//div[text()="samplelocvalue"]';
  }

  public async locatorShouldBePresent(locator: Locator) {
    assert.strictEqual(
      await this.isLocatorPresentAfterWait(locator),
      true,
      'The Element Not Found : ',
    );
    return true;
  }
  public async testing() {
    console.log('cggfgfgg');
  }
  public async locatorShouldNotBePresent(locator: Locator) {
    await assert.strictEqual(
      await this.isLocatorPresentAfterWait(locator),
      false,
      'The Element Should Not Be Present',
    );
    return true;
  }

  public async isElementDisappered(page: Page, locator: Locator) {
    await assert.strictEqual(
      await this.waitForElementToBeDisappear(page, locator),
      true,
      'The Element Should Not Be Present',
    );
    return true;
  }
  // Checks if the specified locator representing a hidden element is present within a given timeout.
  /*  
  public async isHiddenLocatorPresent(locator: Locator): Promise<boolean> {
    return this.isLocatorPresentAfterWait(locator, { state: 'hidden', timeout: 5000 });
  }
  */

  private async readYamlFile(filePath: string) {
    const file = fs.readFileSync(filePath, 'utf8');
    const data = await yaml.parse(file);
    return data;
  }

  public async personalDetailsYamlData() {
    const filePath = 'Fixtures/SampleProject.yaml';
    return await this.readYamlFile(filePath);
  }

  public async enterText(locator: Locator, text: string) {
    await locator.fill(text);
  }
  public async getIFrameWithUrl(url: string) {
    return await this.page1.frame({ url: url });
  }

  public async waitForElementToBeDisappear(page: Page, locator: any) {
    await page.waitForSelector(locator, { state: 'hidden' });
  }

  public async waitForElementToBePresent(page: Page, locator: any) {
    await page.waitForSelector(locator, { state: 'visible' });
  }

  public async launchApp(page: Page, URL: string) {
    await page.goto(URL);
    console.log(await this.page1.title());
  }

  private async isLocatorPresentAfterWait(
    locator: Locator,
    // options: PlaywrightWaitForOptions,
  ) {
    try {
      await locator.waitFor();
      return true;
    } catch (error) {
      console.log('Locator :' + locator);
      return false;
    }
  }

  public async verifySortedOrderOfTheList(dateList: Array<string>) {
    const sortedList = dateList.sort();
    console.log('sortedList :' + sortedList);
    return sortedList;
  }

  public async fileUpload(locator: Locator, filePath: string) {
    const fileChooserPromise = this.page1.waitForEvent('filechooser');
    await locator.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  public async launchApplication() {
    await this.page2.goto('https://practicetestautomation.com/practice-test-login/');
  }
  //Method used for uploading a file
  /*
  public async uploadFile() {
    // await locator.click();
    console.log(' Coming to this method');
    await this.page1.locator('input[name="upfile"]').click();

    // await this.page.keyboard.press('Enter');
    // this.waitForSecond(5);
    // await this.page.locator('input[name="upfile"]').setInputFiles('D:/ToDelete/SampleText.txt');
    // await this.page.getByRole('button', { name: 'Press' }).click();

    // await this.page.getByText('Sample file upload for testing').isVisible();
  }
*/
  public async waitForSecond(waittime: number) {
    const startTime: number = new Date().getTime();
    let printTime = startTime + 1000;
    while (new Date().getTime() <= startTime + waittime * 1000) {
      if (new Date().getTime() >= printTime) {
        // console.log("printTime : " + printTime);
        printTime = new Date().getTime() + 1000;
      }
    }
  }

  data = 'This is some text that will be written to the file.';

  public async writefile(Filepath: string, fileContent: string) {
    console.log('Current working directory: ', process.cwd());

    fs.writeFile(Filepath, fileContent, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File written successfully!');
        console.log('fileContent' + fileContent);
      }
    });
  }

  public async readMethodsFromExcel() {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);

    // const worksheet = workbook.Sheets[sheetNameToRead];
    for (let n = 0; n < sheetname.length; n++) {
      const XLSX = require('xlsx'); // Import the XLSX library

      // Load the Excel workbook
      const workbook = XLSX.readFile('Testdata.xlsx'); // Replace with your file path

      // Specify the sheet name
      // const sheetName = 'contact'; // Replace with your sheet name

      // Get the sheet data as JSON
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);

      // Find the row length of the first column (Column A)
      const rowLengthOfFirstColumn = sheetData.length;

      // Display the row length of the first column
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);

      const worksheet = workbook.Sheets[sheetname[n]];
      const methodsArray = [];
      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`A${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
        }
        methodsArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------methodsArray------------------------\n"+methodsArray+"------------------------------------------------");

      this.publicMethodArray.push(methodsArray);
    }
    // console.log("addtotalarray="+this.publicMethodArray);
    return this.publicMethodArray;
  }

  public async setfinaldata1() {
    // const values = this.publicXpathArray;
    console.log('-----values: ' + this.publicXpathArray);

    for (let k = 0; k < this.publicXpathArray.length; k++) {
      const locatorarraynew: string[] = [];
      for (let i = 0; i <= this.publicXpathArray[k].length; i++) {
        let locator = '';

        if (
          this.publicLocatorNameArray[k][i] !== ' ' &&
          this.publicLocatorNameArray[k][i] !== undefined &&
          this.publicLocatorNameArray[k][i] !== '' &&
          this.publicLocatorNameArray[k][i] !== null
        ) {
          locator =
            '\tthis.' +
            this.publicLocatorNameArray[k][i] +
            " = this.page1.locator('" +
            this.publicXpathArray[k][i] +
            "');\n\n";
        }
        locatorarraynew.push(locator);
        console.log('locatorarraynew' + locatorarraynew);
      }
      this.PublicUpdatedLocatorArray.push(locatorarraynew);
    }
    console.log('Updated locator array ' + this.PublicUpdatedLocatorArray[0]);
    return this.PublicUpdatedLocatorArray;
  }
  public async setfinaldata() {
    const sheetname = this.publicElementTypeArray;
    console.log('------------------------' + sheetname[0]);
    for (let k = 0; k < this.publicElementTypeArray.length; k++) {
      const locatorarraynew: string[] = [];
      for (let i = 0; i <= this.publicElementTypeArray[k].length; i++) {
        let locator = '';
        if (this.publicElementTypeArray[k][i] == 'radiobutton') {
          console.log('publicParameterArray' + this.publicParameterArray[k][i]);
          const updatedlocator = this.publicXpathArray[k][i]
            .replace('fieldname', '${fieldname}')
            .replace('value', '未既');
          // const updatedlocator=this.publicXpathArray[k][i].replace('fieldname', "未既婚").replace('value', "未既");
          console.log('updatedlocator' + updatedlocator);
          locator =
            'this.' +
            this.publicLocatorNameArray[k][i] +
            " = this.page1.locator('" +
            updatedlocator +
            "');\n\n";
        } else {
          console.log('no');
          locator =
            'this.' +
            this.publicLocatorNameArray[k][i] +
            " = this.page1.locator('" +
            this.publicXpathArray[k][i] +
            "');\n\n";
        }

        locatorarraynew.push(locator);
        console.log('locatorarraynew' + locatorarraynew);
      }
      this.PublicUpdatedLocatorArray.push(locatorarraynew);
    }
    console.log('Updated locator array ' + this.PublicUpdatedLocatorArray);
    return this.PublicUpdatedLocatorArray;
  }
  public async readElementTypeArrayFromExcel(): Promise<any[]> {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const elementTypeArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`C${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          // Method= "null";
        }
        elementTypeArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      // return methodsArray;
      this.publicElementTypeArray.push(elementTypeArray);
    }
    console.log('publicElementTypeArray   ' + this.publicElementTypeArray);
    return this.publicElementTypeArray;
    // const worksheet = workbook.Sheets[sheetname[1]];
  }
  public async readVerificationMessageFromExcel(): Promise<any[]> {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const verificationmessageArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`F${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          // Method= "null";
        }
        verificationmessageArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      // return methodsArray;
      this.publicverificationmessageArray.push(verificationmessageArray);
    }
    console.log('publicverificationmessageArray   ' + this.publicverificationmessageArray);
    return this.publicverificationmessageArray;
    // const worksheet = workbook.Sheets[sheetname[1]];
  }
  public async readValidationArrayFromExcel() {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const ValidationArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`F${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          // Method= "null";
        }
        ValidationArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      // return methodsArray;
      this.publicValidationArray.push(ValidationArray);
    }
    console.log('publicValidationArray   ' + this.publicValidationArray);
    return this.publicValidationArray;
    // const worksheet = workbook.Sheets[sheetname[1]];
  }

  public async readSampleXpathArrayFromExcel() {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const SamplexpathArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`G${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          // Method= "null";
        }
        SamplexpathArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      // return methodsArray;
      this.publicSamplexpathArray.push(SamplexpathArray);
    }
    console.log('publicSamplexpathArray   ' + this.publicSamplexpathArray);
    return this.publicSamplexpathArray;
    // const worksheet = workbook.Sheets[sheetname[1]];
  }
  public async readParametersFromExcel() {
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const paramtersArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 2; index++) {
        let Method = worksheet[`B${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
        }
        paramtersArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      this.publicParameterArray.push(paramtersArray);
    }
    // console.log("publicParameterArray   "+this.publicParameterArray);
    return this.publicParameterArray;
  }

  public async readElementTypeFromExcel() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const ElementTypeArray: string[] = [];
    for (let index = 2; index < 9; index++) {
      let Parameters: string = worksheet[`C${index}`]?.v;
      if (Parameters === null || Parameters === undefined) {
        Parameters = ' '; // Replace with a space
      }
      // console.log("Parameters   "+Parameters);

      ElementTypeArray.push(Parameters);
    }
    return ElementTypeArray;
  }
  public async readLocatorNameFromExcel(): Promise<any> {
    const sheetname = this.publicPageNamesArray;
    console.log('sheet name------------------------' + sheetname);

    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const locatorNameArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`D${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          //  Method= "Null";
        }
        locatorNameArray.push(Method);
      }

      this.publicLocatorNameArray.push(locatorNameArray);
      console.log('publicLocatorNameArray' + this.publicLocatorNameArray);
    }
    console.log(
      '---------locatorNameArray------------------------\n' +
        this.publicLocatorNameArray +
        '------------------------------------------------',
    );
    return this.publicLocatorNameArray;
  }
  public readLocatorDeclarationArray() {
    for (let i = 0; i < this.publicLocatorNameArray.length; i++) {
      const locatordeclarationarray: string[] = [];

      for (let j = 0; j < this.publicLocatorNameArray[i].length; j++) {
        let locator = '';

        if (
          this.publicLocatorNameArray[i][j] &&
          this.publicLocatorNameArray[i][j] !== ' ' &&
          this.publicLocatorNameArray[i][j] !== undefined
        ) {
          locator = '\treadonly ' + this.publicLocatorNameArray[i][j] + ': Locator;\n';
        } else {
          locator = ' ';
          // locator = 'Null';
        }

        locatordeclarationarray.push(locator);
      }

      this.publicLocatorDeclarationArray.push(locatordeclarationarray);
    }
    // console.log("locator===="+locatordeclarationarray);
    console.log('publicLocator array' + this.publicLocatorDeclarationArray[0]);
    return this.publicLocatorDeclarationArray;
  }
  // public async readXpathFromExcel(): Promise<any[]> {
  //   const sheetNames = this.publicPageNamesArray;

  //   // Log the sheet names for reference
  //   console.log('Sheet Names:', sheetNames);

  //   for (let n = 0; n < sheetNames.length; n++) {
  //     const workbook = XLSX.readFile('Testdata.xlsx');
  //     const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[n]]);
  //     const rowLengthOfFirstColumn = sheetData.length;

  //     // Log the row length of the first column (Column A) for debugging
  //     console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);

  //     const worksheet = workbook.Sheets[sheetNames[n]];
  //     const xpathArray = [];

  //     for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
  //       let Method = worksheet[`E${index}`]?.v;

  //       if (Method === null || Method === undefined) {
  //         Method = ' ';
  //         // Alternatively, you can use Method = 'Null' if needed
  //       }

  //       xpathArray.push(Method);
  //     }

  //     // Append the xpathArray to the publicXpathArray
  //     this.publicXpathArray.push(xpathArray);

  //     // Log the publicXpathArray for debugging
  //     console.log('publicXpathArray:', this.publicXpathArray);
  //   }

  //   // Log the first element of publicXpathArray for reference
  //   console.log('First element of publicXpathArray:', this.publicXpathArray[0]);

  //   // Return the populated publicXpathArray
  //   return this.publicXpathArray;
  // }

  public async readXpathFromExcel(): Promise<any[]> {
    const sheetname = this.publicPageNamesArray;
    console.log('sheet name------------------------' + sheetname);

    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const xpathArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`E${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          //  Method= "Null";
        }
        xpathArray.push(Method);
      }

      this.publicXpathArray.push(xpathArray);
      console.log('publicXpathArray' + this.publicXpathArray);
    }
    console.log('---------publicXpathArray mayoori-\n' + this.publicXpathArray[0]);
    return this.publicXpathArray;
  }
  public async pageClassFileWritingPath() {
    const tsFilePaths = this.publicFilePathArray.map((filePath) =>
      filePath.replace(/\.feature$/, '-Page.ts'),
    );

    // console.log('updated file paths==============='+tsFilePaths);

    this.publicPageFileWritingPaths = tsFilePaths.map((filePath) =>
      filePath.replace(/features/g, 'Pages'),
    );

    console.log('page class writing paths===============' + this.publicPageFileWritingPaths);
    return this.publicPageFileWritingPaths;
  }
  // public async Samplemultipleverificationcopy() {
  //   // let test = await this.readXpathFromExcel();
  //   console.log('test0' + this.publicXpathArray);

  //   for (let g = 0; g < this.publicXpathArray.length; g++) {
  //     // const updatedparameterarray: any[] = []; // Initialize this array for each iteration
  //     console.log('find public xpath array' + this.publicXpathArray[g].length);
  //     for (let o = 0; o < this.publicXpathArray[g].length; o++) {
  //       console.log('this.publicXpathArray mayuz=== ' + this.publicXpathArray);
  //     }
  //   }
  // }
  public async contentsInsideMethod(): Promise<any[]> {
    // const result: any[] = [];
    console.log('public xpath array inside content1' + this.publicXpathArray);
    console.log('publicverificationmessageArray' + this.publicverificationmessageArray);
    for (let i = 0; i < this.publicElementTypeArray.length; i++) {
      const newStringArray: any[] = [];

      for (let j = 0; j < this.publicElementTypeArray[i].length; j++) {
        let step: any = '';

        if (this.publicElementTypeArray[i][j] === 'Text') {
          step = `await this.${this.publicLocatorNameArray[i][j]}.fill(${this.publicParameterArray[i][j]})`;
        } else if (this.publicElementTypeArray[i][j] === 'Button') {
          step = `await this.${this.publicLocatorNameArray[i][j]}.click()`;
        } else if (this.publicElementTypeArray[i][j] === 'url') {
          // step = ` await this.page1.goto(${this.publicElementTypeArray[i][j]});`;

          step = ` await this.page${i + 1}.goto(config.baseUrl);
          await this.page1.setViewportSize({ width: 1536, height: 864 });`;
        } else if (this.publicElementTypeArray[i][j] === 'Select') {
          step = `await this.chooseDateValue(datevalue);
        this.waitForSecond(3);`;
        } else if (this.publicElementTypeArray[i][j] === 'verification') {
          step = `await this.locatorShouldBePresent(this.${this.publicLocatorNameArray[i][j]});`;
        } else if (this.publicElementTypeArray[i][j] === 'Listselect') {
          step = `const loc2=await this.sampleListParameterloc.replace("sampleListParametervalue",sampleListParametervalue);
      console.log("loc-------"+loc2)
      
      await this.page1.locator(loc2).click();`;
        } else if (this.publicElementTypeArray[i][j] === 'Calender') {
          step = `await this.chooseCalender(startdate);`;
        } else if (this.publicElementTypeArray[i][j] === 'radiobutton') {
          console.log('this.publicElementTypeArray[i][j]' + this.publicElementTypeArray[i][j]);
          // step = `await this.${this.publicLocatorNameArray[i][j]}.click()`;
          step = `const radiobuttonLocator =await this.radiobuttonXpathLocator.replace('fieldname', fieldname).replace('value', value);
          this.sampleRadioButtonLocator = this.page1.locator(radiobuttonLocator);
          console.log("updatedLocator", this.sampleRadioButtonLocator);
          await this.sampleRadioButtonLocator.click();`;
        } else if (this.publicElementTypeArray[i][j] === 'Messageverfication') {
          const data = await this.publicverificationmessageArray[i][j];
          console.log('xpathmayuz' + this.publicXpathArray[i][j]);
          const loc = await this.publicXpathArray[i][j].replace('samplelocvalue', data);
          console.log('newlocator', loc);
          console.log('data', data);
          step = `this.sampleLocator = this.page1.locator('${loc}');
              await this.locatorShouldBePresent(this.sampleLocator);`;
        } else if (
          this.publicElementTypeArray[i][j] === ' ' ||
          this.publicElementTypeArray[i][j] === null ||
          this.publicElementTypeArray[i][j] === undefined
        ) {
          step = '  '; // Space
        }

        newStringArray.push(step);
      }

      this.publicContentInsideMethodBasedOnElementType.push(newStringArray);
    }

    console.log(
      '*****************  steparray=======',
      this.publicContentInsideMethodBasedOnElementType[0],
    );
    return this.publicContentInsideMethodBasedOnElementType;
  }

  public async readElementTypeFromExcel1() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const worksheet = workbook.Sheets[sheetname[n]];
      const methodsArray = [];

      for (let index = 2; index <= 6; index++) {
        let Method = worksheet[`C${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          //  Method= "Null";
        }
        methodsArray.push(Method);
      }
    }
  }
  public async samplemethod() {
    let folderPath = '/src/features/SampleFeature';
    const projectPath = process.cwd().replace(/\\/g, '/');
    folderPath = projectPath + folderPath;
    const files = fs.readdirSync(folderPath);
    for (let i = 0; i < files.length; i++) {
      const filePath = `${folderPath}/${files[i]}`;
      const stats = fs.statSync(filePath);

      // Check if the file is a regular file
      if (stats.isFile()) {
        console.log('File Paths ' + filePath + ' \n');
        this.publicFilePathArray.push(filePath);
      }
    }
    let featureContent: any;
    let pageName: any;
    let featureRegex: any;
    let featureMatch: any;
    for (let i = 0; i < this.publicFilePathArray.length; i++) {
      featureContent = await fs.promises.readFile(this.publicFilePathArray[i], 'utf-8');
      featureRegex = /Feature:\s*(\S+)/;
      featureMatch = featureContent.match(featureRegex);
      if (featureMatch && featureMatch[1]) {
        pageName = featureMatch[1];
        this.publicPageNamesArray.push(pageName);
      } else {
        console.log('No match found for "Feature:" keyword.');
        // return '';
      }
    }
    const sheetname = this.publicPageNamesArray;
    console.log('------------------------' + sheetname);
    for (let n = 0; n < sheetname.length; n++) {
      const workbook = XLSX.readFile('Testdata.xlsx');
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname[n]]);
      const rowLengthOfFirstColumn = sheetData.length;
      console.log('Row length of the first column (Column A):', rowLengthOfFirstColumn);
      const worksheet = workbook.Sheets[sheetname[n]];
      const verificationmessageArray = [];

      for (let index = 2; index <= rowLengthOfFirstColumn + 1; index++) {
        let Method = worksheet[`F${index}`]?.v;
        if (Method === null || Method === undefined) {
          Method = ' ';
          // Method= "null";
        }
        verificationmessageArray.push(Method);
      }
      // console.log("-----------"+sheetname[n]+"---------Parameterarray------------------------\n"+paramtersArray+"------------------------------------------------");
      // return methodsArray;
      this.publicverificationmessageArray.push(verificationmessageArray);
    }
    console.log('publicverificationmessageArray   ' + this.publicverificationmessageArray);
    return this.publicverificationmessageArray;

    // let data = await this.publicverificationmessageArray;
    // console.log('data sample method' + data);
    // console.log('xpathmayuz' + this.publicXpathArray[i][j]);
    // const loc = await this.publicXpathArray[i][j].replace('samplelocvalue', data);
    // console.log('newlocator', loc);
    // console.log('data', data);
    // step = `this.sampleLocator = this.page1.locator('${loc}');
    //           await this.locatorShouldBePresent(this.sampleLocator);`;
  }
  public async pageClassContents(): Promise<any> {
    let method = '';
    console.log('step inside method' + this.publicContentInsideMethodBasedOnElementType[1]);

    for (let k = 0; k < this.publicMethodArray.length; k++) {
      const publicMethodsForArray: string[] = [];

      for (let i = 0; i < this.publicMethodArray[k].length; i++) {
        if (this.publicElementTypeArray[k][i] !== ' ' || undefined || '' || null) {
          method =
            'public async ' +
            this.publicMethodArray[k][i] +
            '(' +
            this.publicUpdatedParameterArray[k][i] +
            ') {\n' +
            '  ' +
            this.publicContentInsideMethodBasedOnElementType[k][i] +
            '; ' +
            '\n}\n\n';
        } else if (this.publicElementTypeArray[k][i] === ' ' || undefined || '' || null) {
          method = 'public async ' + this.publicMethodArray[k][i] + '(' + ') {\n\n}\n\n';
          console.log('else method: ' + method);
        }
        publicMethodsForArray.push(method);
      }

      this.publicPageClassContentsArray.push(publicMethodsForArray);
    }

    console.log('publicPageClassContentsArray ===', this.publicPageClassContentsArray[0]);
    return this.publicPageClassContentsArray;
  }

  public async pageClassData() {
    for (let k = 0; k < this.publicFilePathArray.length; k++) {
      let method = '';
      let combinedData: any;
      const end = '}';
      const Commonsteps = `
import { BasePage } from '../../utils/BasePage';
import { Locator, Page } from '@playwright/test';
import { config } from '../../support/config';
export default class ${this.publicPageNamesArray[k]} extends BasePage {
  page: Page;
  sampleRadioButtonLocator?: Locator;
  radiobuttonXpathLocator: string;
  readonly sampleListParameterloc: string;
  // readonly sampleloc: string;
  readonly rightarrowlocator:Locator;
  readonly leftarrowlocator:Locator;
  readonly selectYearloc:String;
  readonly selectDateValue:String;
${this.publicLocatorDeclarationArray[k].join('')}
   
  constructor(page: Page) {
    super(page);
    this.page = page;

    this.radiobuttonXpathLocator = '//*[(text()="fieldname")]/following::span[text()="value"]';
    this.sampleListParameterloc = '//li[text()="sampleListParametervalue"]';
    // this.sampleloc='//text()="samplelocvalue"';
    this.selectYearloc='//button[text()="year"]';
    this.selectDateValue='//button[text()="datevalue"]';

    this.rightarrowlocator = this.page1.locator('//button[@aria-label="Next month"]');
    this.leftarrowlocator = this.page1.locator('//button[@aria-label="Previous month"]');
${this.PublicUpdatedLocatorArray[k].join('')}
  
}
`;

      console.log('publicPageClassContentsArray' + this.publicPageClassContentsArray[1]);
      method = this.publicPageClassContentsArray[k].join('');
      combinedData = Commonsteps + method + end;

      this.PublicFinalPageClassData.push(combinedData);
    }
  }

  public async pageWritingFilePath() {
    // const sourceFilePath=await this.getAllFilePaths('/src/features/SampleFeature');
    const tsFilePaths = this.publicFilePathArray.map((filePath) =>
      filePath.replace(/\.feature$/, '-Steps.ts'),
    );

    // console.log('updated file paths==============='+tsFilePaths);

    this.publicStepFileWritingPaths = tsFilePaths.map((filePath) =>
      filePath.replace(/features/g, 'steps-defenitions'),
    );

    console.log('updated file paths===============' + this.publicStepFileWritingPaths);
    return this.publicStepFileWritingPaths;

    // let data=`gfgfgg`;
    // for(let i=0; i<tsFilePaths.length; i++)
    // {
    //   await this.writefile(tsFilePaths1[i],data);

    // }
  }
  public async stepWritingFilePath() {
    const sourceFilePath = await this.getAllFilePaths('/src/features/SampleFeature');
    const tsFilePaths = sourceFilePath.map((filePath) =>
      filePath.replace(/\.feature$/, '-Steps.ts'),
    );

    // console.log('updated file paths==============='+tsFilePaths);

    const tsFilePaths1 = tsFilePaths.map((filePath) =>
      filePath.replace(/features/g, 'steps-defenitions'),
    );

    console.log('updated file paths===============' + tsFilePaths1);
    return tsFilePaths1;

    // let data=`gfgfgg`;
    // for(let i=0; i<tsFilePaths.length; i++)
    // {
    //   await this.writefile(tsFilePaths1[i],data);

    // }
  }
  public async SampleMessageVerification(samplemsg: string) {
    console.log('publicXpathArrayinside' + this.publicXpathArray);
    const loc3 = await this.sampleloc.replace('samplelocvalue', samplemsg);
    console.log('loc3-------' + loc3);
    await this.locatorShouldBePresent(loc3);
    await this.waitForSecond(4);
  }
  public async ElementArray() {
    const element: string[] = await this.readElementTypeFromExcel();
    const step = '';
    for (let i = 0; i < element.length; i++) {
      console.log(
        '------------------------element------------------------\n' +
          element[i] +
          '------------------------------------------------',
      );

      if (element[i] === 'Text') {
        const step = 'await this.meetingName1.fill(meetingName)';

        console.log(
          '------------------------step------------------------\n' +
            step +
            '------------------------------------------------',
        );
      }
      return step;
    }

    // If none of the 'Text' conditions were met, return null (outside the loop)
    return null;
  }

  public async readFromExcelForPagename() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const pagenameArray: string[] = [];
    for (let index = 2; index < 9; index++) {
      const Parameters: string = worksheet[`C${index}`]?.v;
      // if (Parameters === null || Parameters === undefined)
      // {
      //  Parameters= ' '; // Replace with a space
      // }
      // console.log("Parameters   "+Parameters);

      pagenameArray.push(Parameters);
    }
    // console.log("paramterArray   "+paramterArray);
    console.log(
      '------------------------paramterArray------------------------\n' +
        pagenameArray +
        '------------------------------------------------',
    );
    return pagenameArray;
  }

  public async readLocatorNameArray() {
    console.log('length: ' + this.publicXpathArray.length);
    console.log('xpath array: ' + this.publicXpathArray);
    for (let k = 0; k < this.publicXpathArray.length; k++) {
      const locatorarraynew: string[] = [];
      for (let i = 0; i <= this.publicXpathArray[k].length; i++) {
        let locator = '';

        if (
          this.publicLocatorNameArray[k][i] !== ' ' &&
          this.publicLocatorNameArray[k][i] !== undefined &&
          this.publicLocatorNameArray[k][i] !== '' &&
          this.publicLocatorNameArray[k][i] !== null
        ) {
          locator =
            '\t\tthis.' +
            this.publicLocatorNameArray[k][i] +
            " = this.page1.locator('" +
            this.publicXpathArray[k][i] +
            "');\n";
        }
        // else if(this.publicLocatorNameArray[k][i]==null||undefined||''||' ')
        // {
        //     locator ='  ';
        //     //  locator ="null";
        //     // locatorarraynew.push(locator);
        // }
        // else
        // {
        //   locator=' ';
        // }
        locatorarraynew.push(locator);
        console.log('locatorarraynew' + locatorarraynew);
      }
      this.PublicUpdatedLocatorArray.push(locatorarraynew);
    }
    console.log('Updated locator array ' + this.PublicUpdatedLocatorArray[0]);
    return this.PublicUpdatedLocatorArray;
  }
  public async setlocator() {
    //let values=this.readElementTypeArrayFromExcel();
    const names = this.publicElementTypeArray;
    console.log('this.publicElementTypeArray', names);
    for (let k = 0; k < this.publicXpathArray.length; k++) {
      //  let locatorarraynew:string[]=[];
      for (let i = 0; i <= this.publicXpathArray[k].length; i++) {}
    }
  }

  public async ReadfromExcelForparameters1() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('data' + data);
    const transposedArray: any[][] = [];

    for (let index = 2; index < 4; index++) {
      const Parameters: any = worksheet[`B${index}`]?.v;
      // console.log("Parameters: " + Parameters);
      // const rowData: any[] = data[index - 1]; // Get row data from the data array using the index
      transposedArray.push(Parameters);
    }

    console.log('Transposed Array:');
    transposedArray.forEach((row, index) => {
      console.log(`Row ${index + 2}:`, row);
      // console.log("row,index",index,row) // Print each row using row number (starting from 2)
    });
    console.log(transposedArray);
    return transposedArray;

    //  let paramterArray=[];
    // let paramterArray:string[]=[];

    // for(let index=2;index<4;index++)
    // {

    //   // const Parameters:string=worksheet[`B${index}`]?.v;
    //   const Parameters=worksheet[`B${index}`]?.v;
    //   console.log("Parameters   "+Parameters);
    //   await this.splitMultipleParameters(Parameters);

    //   // paramterArray.push(Parameters);

    // }
    // console.log("paramterArray   "+paramterArray);
    // return paramterArray;
  }

  public async splitMultipleParameters(data: string) {
    let splitArray: any[] = [];

    let paramdata = '';
    const sample = ' :string,';

    // for (let k = 0; k < data.length; k++)
    // {
    //   // console.log("split array inside parameter method: ",+splitArray);
    splitArray = data.split(',');
    console.log('splitArray' + splitArray);
    for (let l = 0; l < splitArray.length; l++) {
      if (splitArray[l] !== '' || undefined || ' ' || null) {
        paramdata = paramdata + splitArray[l] + sample;
      } else if (splitArray[l] === '' || splitArray[l] === undefined || splitArray[l] === ' ') {
        //  paramdata= "null";
        paramdata = ' ';
      }
    }

    //  paramdata=splitArray+sample;

    // console.log("paramdata   "+paramdata);
    // paramdata=paramdata.substring(0,paramdata.length-1);
    // }
    // }
    console.log('split array inside parameter method: ' + paramdata);

    // return { paramterArray, methodsArray };
    paramdata = paramdata.substring(0, paramdata.length - 1);
    return paramdata;
  }

  public async splitMultipleParameterscopy(data: string) {
    let splitArray: any[] = [];

    let paramdata = '';
    const sample = ' :string,';

    splitArray = data.split(',');
    console.log('splitArray' + splitArray);
    for (let l = 0; l < splitArray.length; l++) {
      if (splitArray[l] === '' || splitArray[l] === undefined || splitArray[l] === ' ') {
        //  paramdata= "null";
        paramdata = ' ';
      } else {
        paramdata = paramdata + splitArray[l] + sample;
      }
    }

    console.log('split array inside parameter method: ' + paramdata);
    paramdata = paramdata.substring(0, paramdata.length - 1);
    return paramdata;
  }

  public async readPageNameFromFeatureFile() {
    let featureContent: any;
    let pageName: any;
    let featureRegex: any;
    let featureMatch: any;
    for (let i = 0; i < this.publicFilePathArray.length; i++) {
      featureContent = await fs.promises.readFile(this.publicFilePathArray[i], 'utf-8');
      featureRegex = /Feature:\s*(\S+)/;
      featureMatch = featureContent.match(featureRegex);
      if (featureMatch && featureMatch[1]) {
        pageName = featureMatch[1];
        this.publicPageNamesArray.push(pageName);
      } else {
        console.log('No match found for "Feature:" keyword.');
        // return '';
      }
    }
    console.log('featurearray         ' + this.publicPageNamesArray);
    return this.publicPageNamesArray;
  }

  public async readUpdatedParameterData() {
    let varnewone: any;
    // let updatedFeatureArray:any=await this.arraylength();
    console.log('public parameter array mayuz == ' + this.publicParameterArray);
    console.log('public xpath array mayuz2 == ' + this.publicXpathArray);
    // console.log("public parameter array length == " + this.publicParameterArray.length);

    // console.log("public parameter array 1"+this.publicParameterArray[0]);
    for (let g = 0; g < this.publicParameterArray.length; g++) {
      const updatedparameterarray: any[] = []; // Initialize this array for each iteration
      console.log('find public parameter array' + this.publicParameterArray[g].length);
      for (let o = 0; o < this.publicParameterArray[g].length; o++) {
        console.log('this.publicParameterArray === ' + this.publicParameterArray);

        // Assuming splitMultipleParameters is an asynchronous function
        varnewone = await this.splitMultipleParameterscopy(this.publicParameterArray[g][o]);
        console.log('varnewone ' + varnewone);
        if (varnewone == null || undefined || '') {
          // varnewone ='  ';
          varnewone = 'null';
          // updatedparameterarray.push(varnewone);
        }

        updatedparameterarray.push(varnewone);
      }

      this.publicUpdatedParameterArray.push(updatedparameterarray);
    }

    // console.log("updatedparameterarray " + this.updatedparameterarray);
    // console.log("final array1 " + this.publicUpdatedParameterArray[0][0]);
    // console.log("final array2 " + this.publicUpdatedParameterArray[0]);

    return this.publicUpdatedParameterArray; // Return the array containing the processed data
  }
  public async readUpdatedData() {
    let varnewone: any;
    // let updatedFeatureArray:any=await this.arraylength();
    console.log('public parameter array == ' + this.publicParameterArray);
    console.log('public parameter array length == ' + this.publicParameterArray.length);

    for (let g = 0; g < this.publicFilePathArray.length; g++) {
      const updatedparameterarray: any[] = []; // Initialize this array for each iteration
      for (let o = 0; o <= 4; o++) {
        console.log('this.publicParameterArray === ' + this.publicParameterArray);

        // Assuming splitMultipleParameters is an asynchronous function
        varnewone = await this.splitMultipleParameters(this.publicParameterArray[g][o]);
        console.log('varnewone ' + varnewone);
        if (varnewone == null || undefined || '') {
          // varnewone ='  ';
          varnewone = 'null';
          updatedparameterarray.push(varnewone);
        }

        updatedparameterarray.push(varnewone);
      }

      this.publicUpdatedParameterArray.push(updatedparameterarray);
    }

    // console.log("updatedparameterarray " + this.updatedparameterarray);
    console.log('new array ===== ' + this.publicUpdatedParameterArray);

    return this.publicUpdatedParameterArray; // Return the array containing the processed data
  }

  public async readUpdatedData1() {
    let varnewone: any;
    const newarray: any[] = [];
    console.log('public paramter array==' + this.publicParameterArray);
    console.log('public paramter array length==' + this.publicParameterArray.length);
    for (let g = 0; g < this.publicFilePathArray.length; g++) {
      for (let o = 0; o <= 3; o++) {
        console.log('this.publicParameterArray====' + this.publicParameterArray);
        // if(this.publicParameterArray[g][o]!==null||this.publicParameterArray[g][o]!==undefined||this.publicParameterArray[g][o]!==' '){
        varnewone = await this.splitMultipleParameters(this.publicParameterArray[g][o]);
        console.log('varnewone             ' + varnewone);

        //  }
        //  else
        //  {
        //   varnewone=" ";

        //  }
        this.updatedparameterarray.push(varnewone);
      }

      // }this.updatedparameterarray.push(varnewone);
    }
    newarray.push(this.updatedparameterarray);
    console.log('updatedparameterarray ' + this.updatedparameterarray);
    console.log('new array=======' + newarray[0]);
    return this.updatedparameterarray;
  }
  public async arraylength(): Promise<any> {
    const newarray: any[] = [];

    for (let k = 0; k < this.publicFilePathArray.length; k++) {
      const featureContent = await fs.promises.readFile(this.publicFilePathArray[k], 'utf-8');
      const linesArray = featureContent.split('\n');
      const keywords = ['Given', 'And', 'Then', 'When'];
      const Step_trimmedArray: string[] = [];
      const matches = linesArray.filter(
        (line) =>
          line.trim().startsWith('Given') ||
          line.trim().startsWith('And') ||
          line.trim().startsWith('Then') ||
          line.trim().startsWith('When'),
      );

      for (let j = 0; j < matches.length; j++) {
        let line = matches[j].trim();

        for (const keyword of keywords) {
          if (line.startsWith(keyword)) {
            line = line.replace(keyword, '');
            break;
          }
        }

        const Updatedline = await this.replaceWithString(line.trim());
        Step_trimmedArray.push(Updatedline);
      }
      newarray.push(Step_trimmedArray);
      return newarray;
    }
    console.log('Step_trimmed array========' + newarray[1]);
  }
  public async readDataFromFeatureFiles() {
    // console.log("datas=======================" + this.publicFilePathArray);
    const encounteredLines = new Set();
    for (let k = 0; k < this.publicFilePathArray.length; k++) {
      const featureContent = await fs.promises.readFile(this.publicFilePathArray[k], 'utf-8');
      const linesArray = featureContent.split('\n');
      const keywords = ['Given', 'And', 'Then', 'When'];
      const Step_trimmedArray: string[] = [];
      const matches = linesArray.filter(
        (line) =>
          line.trim().startsWith('Given') ||
          line.trim().startsWith('And') ||
          line.trim().startsWith('Then') ||
          line.trim().startsWith('When'),
      );
      // const updatedparameterarray: string[] = [];

      for (let j = 0; j < matches.length; j++) {
        let line = matches[j].trim();

        for (const keyword of keywords) {
          if (line.startsWith(keyword)) {
            line = line.replace(keyword, '');
            break;
          }
        }

        const Updatedline = await this.replaceWithString(line.trim());
        // Step_trimmedArray.push(Updatedline);
        if (!encounteredLines.has(Updatedline)) {
          Step_trimmedArray.push(Updatedline);
          encounteredLines.add(Updatedline); // Add the line to the set
        }
        // console.log("public pramter array========"+this.publicParameterArray);
      }
      console.log('final featute lines' + Step_trimmedArray);

      const dataarray: any[] = []; // Initialize dataarray inside the loop

      for (let i = 0; i < Step_trimmedArray.length; i++) {
        let data1: any;
        if (
          this.publicParameterArray[k][i] === ' ' ||
          this.publicParameterArray[k][i] === null ||
          this.publicParameterArray[k][i] === undefined
        ) {
          data1 = 'this: ICustomWorld';
          this.publicParameterArray[k][i] === '   ';
          // updatedparameterarray[i]==='   ';
          this.publicUpdatedParameterArray[k][i] === ' ';
        } else {
          data1 = 'this: ICustomWorld ,';
        }

        const data =
          "When('" +
          Step_trimmedArray[i] +
          "', async function (" +
          data1 +
          '' +
          this.publicUpdatedParameterArray[k][i] +
          ') {\n' +
          '  await this.pageObject?.' +
          this.publicPageNamesArray[k].toLowerCase() +
          '.' +
          this.publicMethodArray[k][i] +
          '(' +
          this.publicParameterArray[k][i] +
          ');\n});' +
          '\n\n';
        this.waitForSecond(3);
        // console.log("data=="+data)
        // data1 = data.replace(/^,/, '');
        // console.log("data1==="+data1);
        // data1=data.substring(0,data.length-1);
        dataarray.push(data); // Push data into the dataarray
        // console.log("dataarray"+dataarray);
      }
      this.publicFinalDataArray.push(dataarray); // Push the dataarray into finalarray
    }
    console.log('finalarray=====' + this.publicFinalDataArray[0]);
    return this.publicFinalDataArray; // Return the finalarray containing multiple dataarrays
  }

  // public async writestepfile() {
  //   console.log('data array    ' + this.publicFinalDataArray);
  //   this.writefile(
  //     'src/steps-defenitions/IP-stepDefenitionFileWritingFile.ts',
  //     '' + this.publicFinalDataArray + '',
  //   );
  // }
  public async writeStepFile() {
    const constantimports = `import { ICustomWorld } from '../../support/custom-world';
import {When } from '@cucumber/cucumber';\n\n`;
    let data: any;
    for (let i = 0; i < this.publicStepFileWritingPaths.length; i++) {
      data = constantimports + this.publicFinalDataArray[i].join('');
      // this.writefile(this.publicStepFileWritingPaths[i],"" + this.publicFinalDataArray[i].join(''));
      this.writefile(this.publicStepFileWritingPaths[i], data);
    }
  }

  public async writePageClassFiles() {
    //   let constantimports=`import { ICustomWorld } from '../../support/custom-world';
    // import {When } from '@cucumber/cucumber';\n\n\n`;
    // let data:any;
    for (let i = 0; i < this.publicPageFileWritingPaths.length; i++) {
      // data=constantimports+this.publicFinalDataArray[i].join('');
      // data=this.PublicFinalPageClassData[i].join('');

      // this.writefile(this.publicStepFileWritingPaths[i],"" + this.publicFinalDataArray[i].join(''));
      this.writefile(this.publicPageFileWritingPaths[i], '' + this.PublicFinalPageClassData[i]);
    }
  }

  public async copyFileMethod(sourceFilePath: string, destinationFilePath: string): Promise<void> {
    try {
      // Read the content of the source feature file
      const featureContent = await fs.promises.readFile(sourceFilePath, 'utf-8');

      // Write the content to the destination feature file
      await fs.promises.writeFile(destinationFilePath, featureContent, 'utf-8');

      console.log(
        `Feature file copied from "${sourceFilePath}" to "${destinationFilePath}" successfully!`,
      );
    } catch (error) {
      console.error('Error copying feature file:', error);
    }
    // const sourceFilePath = 'src/steps-defenitions/IP_Meeting_Chatting-Steps.ts'; // Replace with the path to your source feature file
    //     const destinationFilePath = 'src/steps-defenitions/IP-stepDefenitionFileWritingFile.ts'; // Replace with the path to the destination feature file

    //     await this.copyFeatureFile(sourceFilePath, destinationFilePath);
  }

  public async getAllFilePaths(folderPath: string): Promise<string[]> {
    const projectPath = process.cwd().replace(/\\/g, '/');
    // eslint-disable-next-line prettier/prettier
    console.log('projectPath :=========' + projectPath);

    folderPath = projectPath + folderPath;

    // const filePaths: string[] = [];

    // Read all files in the folder
    const files = fs.readdirSync(folderPath);

    // Iterate over each file and retrieve the file path
    for (let i = 0; i < files.length; i++) {
      const filePath = `${folderPath}/${files[i]}`;
      const stats = fs.statSync(filePath);

      // Check if the file is a regular file
      if (stats.isFile()) {
        console.log('File Paths ' + filePath + ' \n');
        this.publicFilePathArray.push(filePath);
      }
    }
    console.log('File Paths======= ' + this.publicFilePathArray);
    return this.publicFilePathArray;
  }
  public async getRemainingSentence(linesArray: string[], startIndex: number) {
    let remainingSentence = '';
    for (let i = startIndex + 1; i < linesArray.length; i++) {
      const line = linesArray[i].trim();
      if (line.startsWith('Given') || line.startsWith('Then')) {
        break;
      }
      remainingSentence += line + '\n';
    }
    return remainingSentence.trim();
  }

  public async fileReading(filePath: string) {
    const featureData = fs.readFileSync(filePath);
    console.log(featureData);
  }
  public async fileReading1() {
    const featureData = fs.readFileSync('Testdata.xlsx');
    console.log(featureData);
  }

  //   public async stepDefenitionWriting(step:string,parameters:string,pageparam:string,methodName:string,path:string)
  //   {
  //     const data = "When('"+step+"', async function (this: ICustomWorld"+parameters+") {"+
  //   "await this.pageObject?."+pageparam+"."+methodName+"("+parameters+");"+
  // "});";
  // console.log("data     ="+data)

  // this.writefile(path, data);
  //   }
  public async StepDefinitionFileWriting(stepList: any, path: string) {
    let data = '';
    for (let i = 0; i < stepList.length; i++) {
      data =
        data +
        "When('" +
        stepList[i] +
        "',async function (this: ICustomWorld) {" +
        'await this.pageObject?.meetingjoiningbyallmembers' +
        'methodsArray+parameters' +
        '});\n\n';
    }

    console.log('data     =' + data);
    // await this.replaceWithPlaceholder(data);
    console.log(path);

    this.writefile(path, data);
    // await fs.promises.appendFile(path, data, 'utf-8');
  }

  public async StepDefinitionFileWriting1(
    stepList: any,
    methodsArray: string[],
    paramdata: string[],
    param: string[],
  ) {
    console.log('methodsArray inside StepDefinitionFileWriting1 function  ' + methodsArray);
    console.log(
      '------------------paramdata inside StepDefinitionFileWriting1 function----------------\n' +
        paramdata,
    );

    let data = '';

    const constantimports = `import { ICustomWorld } from '../../support/custom-world';
import {When } from '@cucumber/cucumber';\n\n\n`;
    let data1: any;
    for (let i = 0; i < stepList.length; i++) {
      if (param[i] === ' ' || param[i] === null || param[i] === undefined) {
        data1 = 'this: ICustomWorld';
      } else {
        data1 = 'this: ICustomWorld ,';
      }
      // data =data+ "When('"+stepList[i]+"',async function (this: ICustomWorld,"+paramdata+") {"+"await this.pageObject?.meetingjoiningbyallmembers"+"."+methodsArray+"()});";"+)\n\n\n";
      // data =data+ "When('"+stepList[i]+"',async function (this: ICustomWorld,"+paramdata+") {"+"await this.pageObject?.meetingjoiningbyallmembers"+"."+methodsArray+"("+param+")});";"+)\n\n\n";
      // data = data + "When('" + stepList[i] + "', async function (this: ICustomWorld ," + paramdata[i] + ") {" + "await this.pageObject?.meetingjoiningbyallmembers" + "." + methodsArray[i] + "(" + param[i] + ");" + "\n\n";
      data =
        data +
        "When('" +
        stepList[i] +
        "', async function (" +
        data1 +
        '' +
        paramdata[i] +
        ') \n{' +
        '   await this.pageObject?.FileWritingPage' +
        '.' +
        methodsArray[i] +
        '(' +
        param[i] +
        ');\n\n});' +
        '\n\n';
      this.waitForSecond(3);
    }

    console.log('data     =' + data);
    // await this.replaceWithPlaceholder(data);
    // console.log(path)

    const actualdata = constantimports + data;
    const pathnew = await this.stepWritingFilePath();
    console.log('actualdata ============' + actualdata);
    const actualdataarray: string[] = [];
    actualdataarray.push(actualdata);
    // return actualdataarray;
    for (let i = 0; i < pathnew.length; i++) {
      this.writefile(pathnew[i], actualdata);
    }
  }
  public async replaceWithString(input: any): Promise<string> {
    // Regular expression to find words inside double quotes
    const regex = /"([^"]+)"/g;

    // Replace each match with "{string}"
    const replacedInput = input.replace(regex, '{string}');
    // console.log("replacedInput ="+replacedInput);
    //   const replacedText = this.replaceWithPlaceholder(input);
    // console.log("replacedText"+replacedText);

    return replacedInput;
  }

  public async ReadfromExcel() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    // const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const worksheet = workbook.Sheets[config.sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('data' + data);
    const methodsArray = [];

    for (let index = 2; index < 7; index++) {
      const Method = worksheet[`A${index}`]?.v;
      // const Parameters=worksheet[`B${index}`]?.v;
      // console.log({Method:Method,Parameters:Parameters})
      methodsArray.push(Method);
    }
    return methodsArray;
  }
  public async ReadfromExcel3() {
    const workbook = XLSX.readFile('Testdata.xlsx');
    const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('data' + data);
  }

  public async ReadfromExcel2(filePath: string, sheetname: string) {
    const workbook = XLSX.readFile(filePath);
    // const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const worksheet = workbook.Sheets[sheetname];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('data' + data);
  }

  public async pageClassWriting() {
    const path = 'src/Pages/ZoomAppSample.ts';
    const data =
      '/* eslint-disable no-console */\n\n' +
      "import FieldConfig from '../utils/FieldConfig';" +
      "import { BasePage } from '../utils/BasePage';" +
      "import { Locator, Page } from '@playwright/test';" +
      'export default class Loginpage extends BasePage {' +
      'readonly LoginUserName: Locator;' +
      'fieldconfig!: FieldConfig;' +
      'constructor(page: Page, fieldconfig: FieldConfig) {' +
      'super(page);' +
      'this.fieldconfig = fieldconfig;' +
      'this.LoginUserName = page.locator("[data-test=username]");}' +
      '\n\n' +
      'public async EnterUserName(UserName: string) {' +
      'console.log("EnterUserName");' +
      'await this.enterText(this.LoginUserName, UserName);' +
      '}}';

    this.writefile(path, data);
  }

  // get page based on the user name
  public async getUserPage(username: string) {
    return (this.page = ScenarioContext.get(username));
  }

  // get browser context based on the user name
  public async getBrowserContext(username: string) {
    return (this.context = ScenarioContext.get(username + '-context'));
  }
  // Encrypt credentials

  public async encryptCredentials(credentials: string, secretKey: string): Promise<string> {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    const encrypted = cipher.update(credentials, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  }

  // Function to decrypt credentials
  public async decryptCredentials(
    encryptedCredentials: string,
    secretKey: string,
  ): Promise<string> {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    const decrypted = decipher.update(encryptedCredentials, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
  }

  public async setMessageSendTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    ScenarioContext.put('messageSentTime', `${hours}:${minutes}`);
  }

  public async getMessageSendTime() {
    return ScenarioContext.get('messageSentTime');
  }

  public async chooseCalender(startdate: any) {
    ///***********finding year ********************
    let year: any;
    let targetMonth: any;
    console.log('selectStartdate', startdate);
    const match = startdate.match(/\d{4}/);
    if (match) {
      year = match[0];
      console.log('Year:', year);
    } else {
      console.log('Year not found.');
    }

    const loc = await this.selectYearloc.replace('year', year);
    console.log('loc-------' + loc);

    await this.page1.locator(loc).click();

    ///***********finding date ********************

    const matched = startdate.match(/(\d+)\s*月/);
    if (matched && matched[1]) {
      targetMonth = parseInt(matched[1]);
      console.log('date:', targetMonth);
    }
    // let currentMonth = 9;
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

    console.log('Current month:', currentMonth);

    while (currentMonth !== targetMonth) {
      if (currentMonth < targetMonth) {
        // Click right arrow to move forward in the months
        await this.rightarrowlocator.click();
        currentMonth++;
      } else {
        // Click left arrow to move backward in the months
        await this.leftarrowlocator.click();
        currentMonth--;
      }
    }
  }

  public async chooseDateValue(datevalue: any) {
    this.waitForSecond(4);
    console.log('datevalue: ' + datevalue);

    const loc2 = await this.selectDateValue.replace('datevalue', datevalue);
    console.log('loc-------' + loc2);

    await this.page1.locator(loc2).click();
  }
  public async VerifyMessage(value: any) {
    await this.locatorShouldBePresent(value);
  }
  public async updatePageObject() {
    const pagesFolderPath = 'src/Pages/SampleFeature/';
    const pageFiles = fs.readdirSync(pagesFolderPath);
    console.log('pageFiles-------' + pageFiles);

    const pageNames = this.publicPageNamesArray;
    console.log('pagenames==========' + pageNames);

    const pageObjectPath = 'src/utils/PageObjects.ts';
    const pageObjectContent = fs.readFileSync(pageObjectPath, 'utf-8');
    console.log('pageObjectContent==========' + pageObjectContent);
    let newImportStatement = '';
    let updatedPageObjectContent: any;
    let pageObjectInstance = '';
    let newObjectLine = '';
    let updatedInstance: any;
    let final: any;
    for (let i = 0; i < pageNames.length; i++) {
      // console.log("pageNames[i]"+pageNames[i])

      for (const fileName of pageFiles) {
        if (fileName.endsWith('.ts')) {
          const filePath = path.join(pagesFolderPath, fileName);
          const pageContent = fs.readFileSync(filePath, 'utf-8');
          console.log('pageContent' + pageContent);
          if (pageContent.includes(pageNames[i])) {
            const pageObjectName = fileName.replace('.ts', '');
            console.log('pageObjectName' + pageObjectName);
            const pageObjectContent = fs.readFileSync(pageObjectPath, 'utf-8');
            console.log('pageObjectContent' + pageObjectContent);
            if (!pageObjectContent.includes(pageObjectName)) {
              const exportIndex = pageObjectContent.lastIndexOf('export');
              newImportStatement = `import ${pageNames[i]} from '../Pages/SampleFeature/${pageObjectName}';\n\n`;
              updatedPageObjectContent =
                pageObjectContent.slice(0, exportIndex - 1) +
                newImportStatement +
                '\n' +
                pageObjectContent.slice(exportIndex);
              fs.writeFileSync(pageObjectPath, updatedPageObjectContent);

              const pageObjectContent1 = fs.readFileSync(pageObjectPath, 'utf-8');
              const thisIndex = pageObjectContent1.lastIndexOf(';');
              //  pageObjectInstance =`this.${pageNames[i].toLowerCase()} = new ${pageNames[i]}(page, fieldConfig);\n`;
              pageObjectInstance = `this.${pageNames[i].toLowerCase()} = new ${
                pageNames[i]
              }(page);\n`;
              updatedInstance =
                pageObjectContent1.slice(0, thisIndex + 2) +
                '\n' +
                '\t' +
                pageObjectInstance +
                '\n' +
                pageObjectContent1.slice(thisIndex + 2);
              fs.writeFileSync(pageObjectPath, updatedInstance);

              const pageObjectContent2 = fs.readFileSync(pageObjectPath, 'utf-8');
              const constructorIndex = pageObjectContent2.indexOf('constructor');
              newObjectLine = `${pageNames[i].toLowerCase()}: ${pageNames[i]};\n`;
              final =
                pageObjectContent2.slice(0, constructorIndex - 1) +
                '\t' +
                newObjectLine +
                '\n' +
                pageObjectContent2.slice(constructorIndex);
              fs.writeFileSync(pageObjectPath, final);
            }
          }
        }
      }
    }
  }
}
