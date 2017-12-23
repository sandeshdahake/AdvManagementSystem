/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationAmsDetailComponent } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams-detail.component';
import { BannerLocationAmsService } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.service';
import { BannerLocationAms } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.model';

describe('Component Tests', () => {

    describe('BannerLocationAms Management Detail Component', () => {
        let comp: BannerLocationAmsDetailComponent;
        let fixture: ComponentFixture<BannerLocationAmsDetailComponent>;
        let service: BannerLocationAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationAmsDetailComponent],
                providers: [
                    BannerLocationAmsService
                ]
            })
            .overrideTemplate(BannerLocationAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerLocationAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerLocation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
