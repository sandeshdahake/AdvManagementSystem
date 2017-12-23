/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageComponent } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.component';
import { BannerPageService } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.service';
import { BannerPage } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.model';

describe('Component Tests', () => {

    describe('BannerPage Management Component', () => {
        let comp: BannerPageComponent;
        let fixture: ComponentFixture<BannerPageComponent>;
        let service: BannerPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageComponent],
                providers: [
                    BannerPageService
                ]
            })
            .overrideTemplate(BannerPageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerPage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bannerPages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
