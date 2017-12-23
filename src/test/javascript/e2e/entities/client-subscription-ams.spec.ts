import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ClientSubscription e2e test', () => {

    let navBarPage: NavBarPage;
    let clientSubscriptionDialogPage: ClientSubscriptionDialogPage;
    let clientSubscriptionComponentsPage: ClientSubscriptionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ClientSubscriptions', () => {
        navBarPage.goToEntity('client-subscription-ams');
        clientSubscriptionComponentsPage = new ClientSubscriptionComponentsPage();
        expect(clientSubscriptionComponentsPage.getTitle()).toMatch(/Client Subscriptions/);

    });

    it('should load create ClientSubscription dialog', () => {
        clientSubscriptionComponentsPage.clickOnCreateButton();
        clientSubscriptionDialogPage = new ClientSubscriptionDialogPage();
        expect(clientSubscriptionDialogPage.getModalTitle()).toMatch(/Create or edit a Client Subscription/);
        clientSubscriptionDialogPage.close();
    });

   /* it('should create and save ClientSubscriptions', () => {
        clientSubscriptionComponentsPage.clickOnCreateButton();
        clientSubscriptionDialogPage.setStartDateInput(12310020012301);
        expect(clientSubscriptionDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        clientSubscriptionDialogPage.setEndDateInput(12310020012301);
        expect(clientSubscriptionDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        clientSubscriptionDialogPage.setLinkInput('link');
        expect(clientSubscriptionDialogPage.getLinkInput()).toMatch('link');
        clientSubscriptionDialogPage.setPriceInput('5');
        expect(clientSubscriptionDialogPage.getPriceInput()).toMatch('5');
        clientSubscriptionDialogPage.citySelectLastOption();
        clientSubscriptionDialogPage.clientSelectLastOption();
        clientSubscriptionDialogPage.subscriptionPlanSelectLastOption();
        clientSubscriptionDialogPage.save();
        expect(clientSubscriptionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClientSubscriptionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-client-subscription-ams div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ClientSubscriptionDialogPage {
    modalTitle = element(by.css('h4#myClientSubscriptionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    linkInput = element(by.css('input#field_link'));
    priceInput = element(by.css('input#field_price'));
    citySelect = element(by.css('select#field_city'));
    clientSelect = element(by.css('select#field_client'));
    subscriptionPlanSelect = element(by.css('select#field_subscriptionPlan'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    }

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    }

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    }

    setLinkInput = function(link) {
        this.linkInput.sendKeys(link);
    }

    getLinkInput = function() {
        return this.linkInput.getAttribute('value');
    }

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
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

    clientSelectLastOption = function() {
        this.clientSelect.all(by.tagName('option')).last().click();
    }

    clientSelectOption = function(option) {
        this.clientSelect.sendKeys(option);
    }

    getClientSelect = function() {
        return this.clientSelect;
    }

    getClientSelectedOption = function() {
        return this.clientSelect.element(by.css('option:checked')).getText();
    }

    subscriptionPlanSelectLastOption = function() {
        this.subscriptionPlanSelect.all(by.tagName('option')).last().click();
    }

    subscriptionPlanSelectOption = function(option) {
        this.subscriptionPlanSelect.sendKeys(option);
    }

    getSubscriptionPlanSelect = function() {
        return this.subscriptionPlanSelect;
    }

    getSubscriptionPlanSelectedOption = function() {
        return this.subscriptionPlanSelect.element(by.css('option:checked')).getText();
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
