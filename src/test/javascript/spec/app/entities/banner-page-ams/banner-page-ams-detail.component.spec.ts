/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageAmsDetailComponent } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams-detail.component';
import { BannerPageAmsService } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.service';
import { BannerPageAms } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.model';

describe('Component Tests', () => {

    describe('BannerPageAms Management Detail Component', () => {
        let comp: BannerPageAmsDetailComponent;
        let fixture: ComponentFixture<BannerPageAmsDetailComponent>;
        let service: BannerPageAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageAmsDetailComponent],
                providers: [
                    BannerPageAmsService
                ]
            })
            .overrideTemplate(BannerPageAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerPageAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerPage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
