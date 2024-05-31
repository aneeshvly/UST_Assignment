/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { ICustomWorld } from '../support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';

Given('Launch the application', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.launchEmployeeSurveyApp();
});

Then('Verify the application launched successfully', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.verifyAppLaunchedSuccessfully();
});

When('Click on the next button', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.clickOnNextButton();
});

Then(
  'Verify the mandatory field validation for the {string}',
  async function (this: ICustomWorld, fieldLabel: string) {
    console.log('fieldLabel :' + fieldLabel + ':');
    await this.pageObject?.obj_FillPersonalDetails.verifyTheMandatoryValidation(fieldLabel.trim());
  },
);

When(
  'Enter the personal details {string}',
  async function (this: ICustomWorld, fieldLabel: string) {
    await this.pageObject?.obj_FillPersonalDetails.enterThePersonalDetails(fieldLabel.trim());
  },
);

When('Verify the page navigation to the questionnaire page', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.verifyThePageNavigationtoQuestionnairePage();
});
When(
  'Verify the page navigation to the additional information page',
  async function (this: ICustomWorld) {
    await this.pageObject?.obj_FillPersonalDetails.verifyThePageNavigationtoAdditionalInformationPage();
  },
);

When('Enter the wrong zipcode {string}', async function (this: ICustomWorld,zipcode:string) {
  await this.pageObject?.obj_FillPersonalDetails.enterTheZipCode(zipcode);
});

When('Verify the validation message is correct or not', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.verifyWrongZipcodeFormatValidationMessage();
});

Then(
  'Verify the validation message for the question {string}',
  async function (this: ICustomWorld, question: string) {
    await this.pageObject?.obj_FillPersonalDetails.verifyTheMandatoryValidationForTheQuestions(question);
  },
);

When(
  'Read the {string} and choose the right {string}',
  async function (this: ICustomWorld, question: string, answer: string) {
    console.log('question :' + question);
    await this.pageObject?.obj_FillPersonalDetails.answerTheQuestionnaire(question, answer);
  },
);

When('Verify the first name and last name of the employee', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.verifyFirstNameAndLastNameOfTheEmployee();
});

When('Click on the submit button', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.clickOnSubmitButtonOfAdditionalInformationPage();
});

When('Verify the URL of the new page', async function (this: ICustomWorld) {
  await this.pageObject?.obj_FillPersonalDetails.verifyPageURLOfEmployerServicesPage();
});