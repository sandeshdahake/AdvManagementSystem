import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('City e2e test', () => {

    let navBarPage: NavBarPage;
    let cityDialogPage: CityDialogPage;
    let cityComponentsPage: CityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cities', () => {
        navBarPage.goToEntity('city');
        cityComponentsPage = new CityComponentsPage();
        expect(cityComponentsPage.getTitle()).toMatch(/Cities/);

    });

    it('should load create City dialog', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage = new CityDialogPage();
        expect(cityDialogPage.getModalTitle()).toMatch(/Create or edit a City/);
        cityDialogPage.close();
    });

    it('should create and save Cities', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage.setCityNameInput('cityName');
        expect(cityDialogPage.getCityNameInput()).toMatch('cityName');
        cityDialogPage.getActivateInput().isSelected().then((selected) => {
            if (selected) {
                cityDialogPage.getActivateInput().click();
                expect(cityDialogPage.getActivateInput().isSelected()).toBeFalsy();
            } else {
                cityDialogPage.getActivateInput().click();
                expect(cityDialogPage.getActivateInput().isSelected()).toBeTruthy();
            }
        });
        cityDialogPage.save();
        expect(cityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-city div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CityDialogPage {
    modalTitle = element(by.css('h4#myCityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cityNameInput = element(by.css('input#field_cityName'));
    activateInput = element(by.css('input#field_activate'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCityNameInput = function(cityName) {
        this.cityNameInput.sendKeys(cityName);
    }

    getCityNameInput = function() {
        return this.cityNameInput.getAttribute('value');
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
