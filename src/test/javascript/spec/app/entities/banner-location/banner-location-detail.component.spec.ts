/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationDetailComponent } from '../../../../../../main/webapp/app/entities/banner-location/banner-location-detail.component';
import { BannerLocationService } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.service';
import { BannerLocation } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.model';

describe('Component Tests', () => {

    describe('BannerLocation Management Detail Component', () => {
        let comp: BannerLocationDetailComponent;
        let fixture: ComponentFixture<BannerLocationDetailComponent>;
        let service: BannerLocationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationDetailComponent],
                providers: [
                    BannerLocationService
                ]
            })
            .overrideTemplate(BannerLocationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerLocation(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerLocation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
