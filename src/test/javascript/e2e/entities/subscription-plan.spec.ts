import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SubscriptionPlan e2e test', () => {

    let navBarPage: NavBarPage;
    let subscriptionPlanDialogPage: SubscriptionPlanDialogPage;
    let subscriptionPlanComponentsPage: SubscriptionPlanComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubscriptionPlans', () => {
        navBarPage.goToEntity('subscription-plan');
        subscriptionPlanComponentsPage = new SubscriptionPlanComponentsPage();
        expect(subscriptionPlanComponentsPage.getTitle()).toMatch(/Subscription Plans/);

    });

    it('should load create SubscriptionPlan dialog', () => {
        subscriptionPlanComponentsPage.clickOnCreateButton();
        subscriptionPlanDialogPage = new SubscriptionPlanDialogPage();
        expect(subscriptionPlanDialogPage.getModalTitle()).toMatch(/Create or edit a Subscription Plan/);
        subscriptionPlanDialogPage.close();
    });

   /* it('should create and save SubscriptionPlans', () => {
        subscriptionPlanComponentsPage.clickOnCreateButton();
        subscriptionPlanDialogPage.setPlanNameInput('planName');
        expect(subscriptionPlanDialogPage.getPlanNameInput()).toMatch('planName');
        subscriptionPlanDialogPage.setPriceInput('5');
        expect(subscriptionPlanDialogPage.getPriceInput()).toMatch('5');
        subscriptionPlanDialogPage.setMaxSubscriptionInput('5');
        expect(subscriptionPlanDialogPage.getMaxSubscriptionInput()).toMatch('5');
        subscriptionPlanDialogPage.getActivateInput().isSelected().then((selected) => {
            if (selected) {
                subscriptionPlanDialogPage.getActivateInput().click();
                expect(subscriptionPlanDialogPage.getActivateInput().isSelected()).toBeFalsy();
            } else {
                subscriptionPlanDialogPage.getActivateInput().click();
                expect(subscriptionPlanDialogPage.getActivateInput().isSelected()).toBeTruthy();
            }
        });
        subscriptionPlanDialogPage.bannerTypeSelectLastOption();
        subscriptionPlanDialogPage.bannerSizeSelectLastOption();
        subscriptionPlanDialogPage.bannerLocationSelectLastOption();
        subscriptionPlanDialogPage.bannerPageSelectLastOption();
        subscriptionPlanDialogPage.subscriptionPeriodSelectLastOption();
        subscriptionPlanDialogPage.citySelectLastOption();
        subscriptionPlanDialogPage.save();
        expect(subscriptionPlanDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubscriptionPlanComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-subscription-plan div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SubscriptionPlanDialogPage {
    modalTitle = element(by.css('h4#mySubscriptionPlanLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    planNameInput = element(by.css('input#field_planName'));
    priceInput = element(by.css('input#field_price'));
    maxSubscriptionInput = element(by.css('input#field_maxSubscription'));
    activateInput = element(by.css('input#field_activate'));
    bannerTypeSelect = element(by.css('select#field_bannerType'));
    bannerSizeSelect = element(by.css('select#field_bannerSize'));
    bannerLocationSelect = element(by.css('select#field_bannerLocation'));
    bannerPageSelect = element(by.css('select#field_bannerPage'));
    subscriptionPeriodSelect = element(by.css('select#field_subscriptionPeriod'));
    citySelect = element(by.css('select#field_city'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setPlanNameInput = function(planName) {
        this.planNameInput.sendKeys(planName);
    }

    getPlanNameInput = function() {
        return this.planNameInput.getAttribute('value');
    }

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    }

    setMaxSubscriptionInput = function(maxSubscription) {
        this.maxSubscriptionInput.sendKeys(maxSubscription);
    }

    getMaxSubscriptionInput = function() {
        return this.maxSubscriptionInput.getAttribute('value');
    }

    getActivateInput = function() {
        return this.activateInput;
    }
    bannerTypeSelectLastOption = function() {
        this.bannerTypeSelect.all(by.tagName('option')).last().click();
    }

    bannerTypeSelectOption = function(option) {
        this.bannerTypeSelect.sendKeys(option);
    }

    getBannerTypeSelect = function() {
        return this.bannerTypeSelect;
    }

    getBannerTypeSelectedOption = function() {
        return this.bannerTypeSelect.element(by.css('option:checked')).getText();
    }

    bannerSizeSelectLastOption = function() {
        this.bannerSizeSelect.all(by.tagName('option')).last().click();
    }

    bannerSizeSelectOption = function(option) {
        this.bannerSizeSelect.sendKeys(option);
    }

    getBannerSizeSelect = function() {
        return this.bannerSizeSelect;
    }

    getBannerSizeSelectedOption = function() {
        return this.bannerSizeSelect.element(by.css('option:checked')).getText();
    }

    bannerLocationSelectLastOption = function() {
        this.bannerLocationSelect.all(by.tagName('option')).last().click();
    }

    bannerLocationSelectOption = function(option) {
        this.bannerLocationSelect.sendKeys(option);
    }

    getBannerLocationSelect = function() {
        return this.bannerLocationSelect;
    }

    getBannerLocationSelectedOption = function() {
        return this.bannerLocationSelect.element(by.css('option:checked')).getText();
    }

    bannerPageSelectLastOption = function() {
        this.bannerPageSelect.all(by.tagName('option')).last().click();
    }

    bannerPageSelectOption = function(option) {
        this.bannerPageSelect.sendKeys(option);
    }

    getBannerPageSelect = function() {
        return this.bannerPageSelect;
    }

    getBannerPageSelectedOption = function() {
        return this.bannerPageSelect.element(by.css('option:checked')).getText();
    }

    subscriptionPeriodSelectLastOption = function() {
        this.subscriptionPeriodSelect.all(by.tagName('option')).last().click();
    }

    subscriptionPeriodSelectOption = function(option) {
        this.subscriptionPeriodSelect.sendKeys(option);
    }

    getSubscriptionPeriodSelect = function() {
        return this.subscriptionPeriodSelect;
    }

    getSubscriptionPeriodSelectedOption = function() {
        return this.subscriptionPeriodSelect.element(by.css('option:checked')).getText();
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
