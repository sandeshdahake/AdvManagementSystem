import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BannerPage e2e test', () => {

    let navBarPage: NavBarPage;
    let bannerPageDialogPage: BannerPageDialogPage;
    let bannerPageComponentsPage: BannerPageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BannerPages', () => {
        navBarPage.goToEntity('banner-page');
        bannerPageComponentsPage = new BannerPageComponentsPage();
        expect(bannerPageComponentsPage.getTitle()).toMatch(/Banner Pages/);

    });

    it('should load create BannerPage dialog', () => {
        bannerPageComponentsPage.clickOnCreateButton();
        bannerPageDialogPage = new BannerPageDialogPage();
        expect(bannerPageDialogPage.getModalTitle()).toMatch(/Create or edit a Banner Page/);
        bannerPageDialogPage.close();
    });

    it('should create and save BannerPages', () => {
        bannerPageComponentsPage.clickOnCreateButton();
        bannerPageDialogPage.setBannerPageInput('bannerPage');
        expect(bannerPageDialogPage.getBannerPageInput()).toMatch('bannerPage');
        bannerPageDialogPage.save();
        expect(bannerPageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BannerPageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-banner-page div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BannerPageDialogPage {
    modalTitle = element(by.css('h4#myBannerPageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bannerPageInput = element(by.css('input#field_bannerPage'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setBannerPageInput = function(bannerPage) {
        this.bannerPageInput.sendKeys(bannerPage);
    }

    getBannerPageInput = function() {
        return this.bannerPageInput.getAttribute('value');
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
