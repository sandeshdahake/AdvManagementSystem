/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageAmsComponent } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.component';
import { BannerPageAmsService } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.service';
import { BannerPageAms } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.model';

describe('Component Tests', () => {

    describe('BannerPageAms Management Component', () => {
        let comp: BannerPageAmsComponent;
        let fixture: ComponentFixture<BannerPageAmsComponent>;
        let service: BannerPageAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageAmsComponent],
                providers: [
                    BannerPageAmsService
                ]
            })
            .overrideTemplate(BannerPageAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerPageAms(123)],
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
