import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SubscriptionPeriod e2e test', () => {

    let navBarPage: NavBarPage;
    let subscriptionPeriodDialogPage: SubscriptionPeriodDialogPage;
    let subscriptionPeriodComponentsPage: SubscriptionPeriodComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubscriptionPeriods', () => {
        navBarPage.goToEntity('subscription-period-ams');
        subscriptionPeriodComponentsPage = new SubscriptionPeriodComponentsPage();
        expect(subscriptionPeriodComponentsPage.getTitle()).toMatch(/Subscription Periods/);

    });

    it('should load create SubscriptionPeriod dialog', () => {
        subscriptionPeriodComponentsPage.clickOnCreateButton();
        subscriptionPeriodDialogPage = new SubscriptionPeriodDialogPage();
        expect(subscriptionPeriodDialogPage.getModalTitle()).toMatch(/Create or edit a Subscription Period/);
        subscriptionPeriodDialogPage.close();
    });

    it('should create and save SubscriptionPeriods', () => {
        subscriptionPeriodComponentsPage.clickOnCreateButton();
        subscriptionPeriodDialogPage.setPeriodLabelInput('periodLabel');
        expect(subscriptionPeriodDialogPage.getPeriodLabelInput()).toMatch('periodLabel');
        subscriptionPeriodDialogPage.setSubscriptionDaysInput('5');
        expect(subscriptionPeriodDialogPage.getSubscriptionDaysInput()).toMatch('5');
        subscriptionPeriodDialogPage.save();
        expect(subscriptionPeriodDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubscriptionPeriodComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-subscription-period-ams div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SubscriptionPeriodDialogPage {
    modalTitle = element(by.css('h4#mySubscriptionPeriodLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    periodLabelInput = element(by.css('input#field_periodLabel'));
    subscriptionDaysInput = element(by.css('input#field_subscriptionDays'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setPeriodLabelInput = function(periodLabel) {
        this.periodLabelInput.sendKeys(periodLabel);
    }

    getPeriodLabelInput = function() {
        return this.periodLabelInput.getAttribute('value');
    }

    setSubscriptionDaysInput = function(subscriptionDays) {
        this.subscriptionDaysInput.sendKeys(subscriptionDays);
    }

    getSubscriptionDaysInput = function() {
        return this.subscriptionDaysInput.getAttribute('value');
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
