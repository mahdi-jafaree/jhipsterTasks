import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VendorComponentsPage from './vendor.page-object';
import VendorUpdatePage from './vendor-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Vendor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vendorComponentsPage: VendorComponentsPage;
  let vendorUpdatePage: VendorUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    vendorComponentsPage = new VendorComponentsPage();
    vendorComponentsPage = await vendorComponentsPage.goToPage(navBarPage);
  });

  it('should load Vendors', async () => {
    expect(await vendorComponentsPage.title.getText()).to.match(/Vendors/);
    expect(await vendorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Vendors', async () => {
    const beforeRecordsCount = (await isVisible(vendorComponentsPage.noRecords)) ? 0 : await getRecordsCount(vendorComponentsPage.table);
    vendorUpdatePage = await vendorComponentsPage.goToCreateVendor();
    await vendorUpdatePage.enterData();

    expect(await vendorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vendorComponentsPage.table);
    await waitUntilCount(vendorComponentsPage.records, beforeRecordsCount + 1);
    expect(await vendorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vendorComponentsPage.deleteVendor();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vendorComponentsPage.records, beforeRecordsCount);
      expect(await vendorComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vendorComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
