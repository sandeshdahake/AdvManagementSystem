import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BannerSize e2e test', () => {

    let navBarPage: NavBarPage;
    let bannerSizeDialogPage: BannerSizeDialogPage;
    let bannerSizeComponentsPage: BannerSizeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BannerSizes', () => {
        navBarPage.goToEntity('banner-size');
        bannerSizeComponentsPage = new BannerSizeComponentsPage();
        expect(bannerSizeComponentsPage.getTitle()).toMatch(/Banner Sizes/);

    });

    it('should load create BannerSize dialog', () => {
        bannerSizeComponentsPage.clickOnCreateButton();
        bannerSizeDialogPage = new BannerSizeDialogPage();
        expect(bannerSizeDialogPage.getModalTitle()).toMatch(/Create or edit a Banner Size/);
        bannerSizeDialogPage.close();
    });

    it('should create and save BannerSizes', () => {
        bannerSizeComponentsPage.clickOnCreateButton();
        bannerSizeDialogPage.setBannerSizeInput('bannerSize');
        expect(bannerSizeDialogPage.getBannerSizeInput()).toMatch('bannerSize');
        bannerSizeDialogPage.getActivateInput().isSelected().then((selected) => {
            if (selected) {
                bannerSizeDialogPage.getActivateInput().click();
                expect(bannerSizeDialogPage.getActivateInput().isSelected()).toBeFalsy();
            } else {
                bannerSizeDialogPage.getActivateInput().click();
                expect(bannerSizeDialogPage.getActivateInput().isSelected()).toBeTruthy();
            }
        });
        bannerSizeDialogPage.save();
        expect(bannerSizeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BannerSizeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-banner-size div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BannerSizeDialogPage {
    modalTitle = element(by.css('h4#myBannerSizeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bannerSizeInput = element(by.css('input#field_bannerSize'));
    activateInput = element(by.css('input#field_activate'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setBannerSizeInput = function(bannerSize) {
        this.bannerSizeInput.sendKeys(bannerSize);
    }

    getBannerSizeInput = function() {
        return this.bannerSizeInput.getAttribute('value');
    }

    getActivateInput = function() {
        return this.activateInput;
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
