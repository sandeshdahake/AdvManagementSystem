import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Client e2e test', () => {

    let navBarPage: NavBarPage;
    let clientDialogPage: ClientDialogPage;
    let clientComponentsPage: ClientComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clients', () => {
        navBarPage.goToEntity('client');
        clientComponentsPage = new ClientComponentsPage();
        expect(clientComponentsPage.getTitle()).toMatch(/Clients/);

    });

    it('should load create Client dialog', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage = new ClientDialogPage();
        expect(clientDialogPage.getModalTitle()).toMatch(/Create or edit a Client/);
        clientDialogPage.close();
    });

   /* it('should create and save Clients', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage.setClientNameInput('clientName');
        expect(clientDialogPage.getClientNameInput()).toMatch('clientName');
        clientDialogPage.setClientAddressInput('clientAddress');
        expect(clientDialogPage.getClientAddressInput()).toMatch('clientAddress');
        // clientDialogPage.citySelectLastOption();
        clientDialogPage.save();
        expect(clientDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClientComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-client div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ClientDialogPage {
    modalTitle = element(by.css('h4#myClientLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    clientNameInput = element(by.css('input#field_clientName'));
    clientAddressInput = element(by.css('textarea#field_clientAddress'));
    citySelect = element(by.css('select#field_city'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setClientNameInput = function(clientName) {
        this.clientNameInput.sendKeys(clientName);
    }

    getClientNameInput = function() {
        return this.clientNameInput.getAttribute('value');
    }

    setClientAddressInput = function(clientAddress) {
        this.clientAddressInput.sendKeys(clientAddress);
    }

    getClientAddressInput = function() {
        return this.clientAddressInput.getAttribute('value');
    }

    citySelectLastOption = function() {
        this.citySelect.all(by.tagName('option')).last().click();
    }

    citySelectOption = function(option) {
        this.citySelect.sendKeys(option);
    }

    getCitySelect = function() {
        return this.citySelect;
    }

    getCitySelectedOption = function() {
        return this.citySelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
