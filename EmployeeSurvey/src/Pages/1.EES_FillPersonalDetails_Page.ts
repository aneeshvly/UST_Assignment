/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from '../support/config';
import { BasePage } from '../utils/BasePage'; 
import { Locator, Page, expect } from '@playwright/test';

export default class FillPersonalDetails extends BasePage {
  personalDetails_TextFields_TxtBox: string;
  page: Page;
  personalDetails_NextButton_Btn: Locator;
  personalDetails_PageHeading_Lbl:Locator;
  personalDetails_MandatoryFieldValidationError_Lbl:string;
  questionnairPage_PageHeading_Lbl: Locator;
  questionnairPage_AnswerButton_Btn: string;
  additionalInformationPage_PageHeading_Lbl: Locator;
  additionalInformationPage_FirstAndLastName_Lbl:Locator;

  additionalInformationPage_Submit_Btn: Locator;
  questionnairPage_MandatoryFieldValidationErrorForQuestionnaire_Lbl: string;
  personalDetails_ZicodeFormatValidationError_Lbl: Locator;
  personalDetails_ZipCode_TxtBox: Locator;
  constructor(page: Page) {
    super(page);
    this.page = page;

    this.personalDetails_NextButton_Btn = this.page1.locator('[id="SurveyControl_SurveySubmit"]');
    this.personalDetails_PageHeading_Lbl = this.page1.locator('//*[contains(text(),"Let’s begin by getting some basic information!")]');
    this.personalDetails_MandatoryFieldValidationError_Lbl='//label[text()="FieldLabel"]/following-sibling::div[text()="Please enter the required field."]';
    this.personalDetails_TextFields_TxtBox ="//*[text()='FieldLabel']/following-sibling::div//input";
    this.personalDetails_ZicodeFormatValidationError_Lbl=this.page1.locator('//div[@data-question-id-text="VoterPostalCode"]/div[text()="Please enter a correct zip code format."]');
    this.personalDetails_ZipCode_TxtBox = this.page1.locator('//div[@data-question-id-text="VoterPostalCode"]/div/input');
    
    this.questionnairPage_PageHeading_Lbl = this.page1.locator('//*[contains(text(),"At this time, please answer Yes or No to the following questions:")]');
    this.questionnairPage_AnswerButton_Btn ='//div/label[text()="Question"]/following-sibling::div/label[(text()="Answer")]';
    
    this.additionalInformationPage_PageHeading_Lbl = this.page1.locator('//*[contains(text(),"Additional Information")]');
    this.additionalInformationPage_FirstAndLastName_Lbl = this.page1.locator('//div/input[contains(@id,"SurveyControl_Question")]');
    this.additionalInformationPage_Submit_Btn=this.page1.locator('[id="SurveyControl_SurveySubmit"]');
    this.questionnairPage_MandatoryFieldValidationErrorForQuestionnaire_Lbl='//label[text()="Question"]/following-sibling::div[text()="Please provide an answer."]';
  }

  async launchEmployeeSurveyApp()
  {
    await this.page1.goto(config.expirianSurveyEnginURL);
  }
  async clickOnNextButton()
  {
    await this.personalDetails_NextButton_Btn.click();
  }
  async verifyAppLaunchedSuccessfully()
  {
    await this.locatorShouldBePresent(this.personalDetails_PageHeading_Lbl);
  }

  async verifyTheMandatoryValidation(fieldLabel: string)
  {
    const sampleLocator = this.page.locator(
      this.personalDetails_MandatoryFieldValidationError_Lbl.replace('FieldLabel', fieldLabel),
    );
    await this.locatorShouldBePresent(sampleLocator);
  }

  async verifyThePageNavigationtoQuestionnairePage()
  {
    await this.locatorShouldBePresent(this.questionnairPage_PageHeading_Lbl);
  }
  async enterThePersonalDetails(fieldLabel: string) {

    const sampleLocator = this.page.locator(
      this.personalDetails_TextFields_TxtBox.replace('FieldLabel', fieldLabel),
    );

    console.log("sampleLocator :"+sampleLocator);

    fieldLabel=fieldLabel.replaceAll(' ', '');

    const basicInfo = await this.personalDetailsYamlData();
    const personalData = await basicInfo.Personal_Information;

    console.log(`${personalData[fieldLabel]}`);

    await this.enterText(sampleLocator, `${personalData[fieldLabel]}`);
 
  }
  async enterTheZipCode(zipCode:string)
  {
    await  this.personalDetails_ZipCode_TxtBox.fill(zipCode);
  }

  async verifyWrongZipcodeFormatValidationMessage()
  {
    await this.locatorShouldBePresent( this.personalDetails_ZicodeFormatValidationError_Lbl);
  }
  async verifyTheMandatoryValidationForTheQuestions(question: string)
  {
    const sampleLocator = this.page.locator(
      this.questionnairPage_MandatoryFieldValidationErrorForQuestionnaire_Lbl.replace('Question', question),
    );
    await this.locatorShouldBePresent(sampleLocator);
  } 

  async answerTheQuestionnaire(question: string, answer: string){
    const sampleLocator = this.page.locator(
      this.questionnairPage_AnswerButton_Btn.replace('Question',question).replace('Answer',answer));
    await sampleLocator.check();
  }
  
  async verifyThePageNavigationtoAdditionalInformationPage()
  {
    await this.locatorShouldBePresent(this.additionalInformationPage_PageHeading_Lbl);
  }
  async verifyFirstNameAndLastNameOfTheEmployee()
  {
 
    const actualFirstNameAndLastName = (await this.additionalInformationPage_FirstAndLastName_Lbl.inputValue());

    const basicInfo = await this.personalDetailsYamlData();
    const personalData = await basicInfo.Personal_Information;
    const expectedFirstNameAndLastName = `${personalData['FirstName']}`+" "+`${personalData['LastName']}`;
    
    console.log("expectedFirstNameAndLastName:"+expectedFirstNameAndLastName);
    console.log("actualFirstNameAndLastName:"+actualFirstNameAndLastName);

    expect(actualFirstNameAndLastName).toEqual(expectedFirstNameAndLastName); 
  }

  async clickOnSubmitButtonOfAdditionalInformationPage()
  {
    await this.additionalInformationPage_Submit_Btn.click();
  }

  async verifyPageURLOfEmployerServicesPage()
  {
 
    const pageURL = this.page1.url();
    console.log("pageURL:"+pageURL);
    console.log("ExpectedURL:"+config.expirianEmployerServicesPageURL);
    expect(pageURL).toContain(config.expirianEmployerServicesPageURL);
  }
}
