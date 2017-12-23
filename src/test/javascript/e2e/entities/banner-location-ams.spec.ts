import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BannerLocation e2e test', () => {

    let navBarPage: NavBarPage;
    let bannerLocationDialogPage: BannerLocationDialogPage;
    let bannerLocationComponentsPage: BannerLocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BannerLocations', () => {
        navBarPage.goToEntity('banner-location-ams');
        bannerLocationComponentsPage = new BannerLocationComponentsPage();
        expect(bannerLocationComponentsPage.getTitle()).toMatch(/Banner Locations/);

    });

    it('should load create BannerLocation dialog', () => {
        bannerLocationComponentsPage.clickOnCreateButton();
        bannerLocationDialogPage = new BannerLocationDialogPage();
        expect(bannerLocationDialogPage.getModalTitle()).toMatch(/Create or edit a Banner Location/);
        bannerLocationDialogPage.close();
    });

    it('should create and save BannerLocations', () => {
        bannerLocationComponentsPage.clickOnCreateButton();
        bannerLocationDialogPage.setBannerLocationInput('bannerLocation');
        expect(bannerLocationDialogPage.getBannerLocationInput()).toMatch('bannerLocation');
        bannerLocationDialogPage.save();
        expect(bannerLocationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BannerLocationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-banner-location-ams div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BannerLocationDialogPage {
    modalTitle = element(by.css('h4#myBannerLocationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bannerLocationInput = element(by.css('input#field_bannerLocation'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setBannerLocationInput = function(bannerLocation) {
        this.bannerLocationInput.sendKeys(bannerLocation);
    }

    getBannerLocationInput = function() {
        return this.bannerLocationInput.getAttribute('value');
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
