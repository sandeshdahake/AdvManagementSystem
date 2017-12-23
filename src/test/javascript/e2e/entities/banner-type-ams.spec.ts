import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BannerType e2e test', () => {

    let navBarPage: NavBarPage;
    let bannerTypeDialogPage: BannerTypeDialogPage;
    let bannerTypeComponentsPage: BannerTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BannerTypes', () => {
        navBarPage.goToEntity('banner-type-ams');
        bannerTypeComponentsPage = new BannerTypeComponentsPage();
        expect(bannerTypeComponentsPage.getTitle()).toMatch(/Banner Types/);

    });

    it('should load create BannerType dialog', () => {
        bannerTypeComponentsPage.clickOnCreateButton();
        bannerTypeDialogPage = new BannerTypeDialogPage();
        expect(bannerTypeDialogPage.getModalTitle()).toMatch(/Create or edit a Banner Type/);
        bannerTypeDialogPage.close();
    });

    it('should create and save BannerTypes', () => {
        bannerTypeComponentsPage.clickOnCreateButton();
        bannerTypeDialogPage.setBannerTypeInput('bannerType');
        expect(bannerTypeDialogPage.getBannerTypeInput()).toMatch('bannerType');
        bannerTypeDialogPage.save();
        expect(bannerTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BannerTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-banner-type-ams div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BannerTypeDialogPage {
    modalTitle = element(by.css('h4#myBannerTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bannerTypeInput = element(by.css('input#field_bannerType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setBannerTypeInput = function(bannerType) {
        this.bannerTypeInput.sendKeys(bannerType);
    }

    getBannerTypeInput = function() {
        return this.bannerTypeInput.getAttribute('value');
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
