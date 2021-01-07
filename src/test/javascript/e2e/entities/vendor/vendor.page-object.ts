import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VendorUpdatePage from './vendor-update.page-object';

const expect = chai.expect;
export class VendorDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('task0App.vendor.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vendor'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VendorComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vendor-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('vendor');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVendor() {
    await this.createButton.click();
    return new VendorUpdatePage();
  }

  async deleteVendor() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vendorDeleteDialog = new VendorDeleteDialog();
    await waitUntilDisplayed(vendorDeleteDialog.deleteModal);
    expect(await vendorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/task0App.vendor.delete.question/);
    await vendorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vendorDeleteDialog.deleteModal);

    expect(await isVisible(vendorDeleteDialog.deleteModal)).to.be.false;
  }
}
