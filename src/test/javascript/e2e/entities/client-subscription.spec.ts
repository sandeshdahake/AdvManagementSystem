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
        navBarPage.goToEntity('client-subscription');
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
        clientSubscriptionDialogPage.setStartDateInput('2000-12-31');
        expect(clientSubscriptionDialogPage.getStartDateInput()).toMatch('2000-12-31');
        clientSubscriptionDialogPage.setEndDateInput('2000-12-31');
        expect(clientSubscriptionDialogPage.getEndDateInput()).toMatch('2000-12-31');
        clientSubscriptionDialogPage.setResourceUrlInput('resourceUrl');
        expect(clientSubscriptionDialogPage.getResourceUrlInput()).toMatch('resourceUrl');
        clientSubscriptionDialogPage.setRedirectUrlInput('redirectUrl');
        expect(clientSubscriptionDialogPage.getRedirectUrlInput()).toMatch('redirectUrl');
        clientSubscriptionDialogPage.setPriorityPriceInput('5');
        expect(clientSubscriptionDialogPage.getPriorityPriceInput()).toMatch('5');
        clientSubscriptionDialogPage.setDiscountInput('5');
        expect(clientSubscriptionDialogPage.getDiscountInput()).toMatch('5');
        clientSubscriptionDialogPage.setTotalPriceInput('5');
        expect(clientSubscriptionDialogPage.getTotalPriceInput()).toMatch('5');
        clientSubscriptionDialogPage.getActiveSubscriptionInput().isSelected().then((selected) => {
            if (selected) {
                clientSubscriptionDialogPage.getActiveSubscriptionInput().click();
                expect(clientSubscriptionDialogPage.getActiveSubscriptionInput().isSelected()).toBeFalsy();
            } else {
                clientSubscriptionDialogPage.getActiveSubscriptionInput().click();
                expect(clientSubscriptionDialogPage.getActiveSubscriptionInput().isSelected()).toBeTruthy();
            }
        });
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
    title = element.all(by.css('jhi-client-subscription div h2 span')).first();

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
    resourceUrlInput = element(by.css('input#field_resourceUrl'));
    redirectUrlInput = element(by.css('input#field_redirectUrl'));
    priorityPriceInput = element(by.css('input#field_priorityPrice'));
    discountInput = element(by.css('input#field_discount'));
    totalPriceInput = element(by.css('input#field_totalPrice'));
    activeSubscriptionInput = element(by.css('input#field_activeSubscription'));
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

    setResourceUrlInput = function(resourceUrl) {
        this.resourceUrlInput.sendKeys(resourceUrl);
    }

    getResourceUrlInput = function() {
        return this.resourceUrlInput.getAttribute('value');
    }

    setRedirectUrlInput = function(redirectUrl) {
        this.redirectUrlInput.sendKeys(redirectUrl);
    }

    getRedirectUrlInput = function() {
        return this.redirectUrlInput.getAttribute('value');
    }

    setPriorityPriceInput = function(priorityPrice) {
        this.priorityPriceInput.sendKeys(priorityPrice);
    }

    getPriorityPriceInput = function() {
        return this.priorityPriceInput.getAttribute('value');
    }

    setDiscountInput = function(discount) {
        this.discountInput.sendKeys(discount);
    }

    getDiscountInput = function() {
        return this.discountInput.getAttribute('value');
    }

    setTotalPriceInput = function(totalPrice) {
        this.totalPriceInput.sendKeys(totalPrice);
    }

    getTotalPriceInput = function() {
        return this.totalPriceInput.getAttribute('value');
    }

    getActiveSubscriptionInput = function() {
        return this.activeSubscriptionInput;
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
