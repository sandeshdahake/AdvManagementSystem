/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeAmsDetailComponent } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams-detail.component';
import { BannerSizeAmsService } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.service';
import { BannerSizeAms } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.model';

describe('Component Tests', () => {

    describe('BannerSizeAms Management Detail Component', () => {
        let comp: BannerSizeAmsDetailComponent;
        let fixture: ComponentFixture<BannerSizeAmsDetailComponent>;
        let service: BannerSizeAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeAmsDetailComponent],
                providers: [
                    BannerSizeAmsService
                ]
            })
            .overrideTemplate(BannerSizeAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerSizeAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerSize).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
