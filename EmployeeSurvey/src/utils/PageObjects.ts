import FillPersonalDetails from '../Pages/1.EES_FillPersonalDetails_Page';
import { Page } from '@playwright/test';
export class PageObject {
  obj_FillPersonalDetails: FillPersonalDetails;

  constructor(page: Page) {
    this.obj_FillPersonalDetails = new FillPersonalDetails(page);
  }
}
