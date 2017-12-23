/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerTypeAmsDetailComponent } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams-detail.component';
import { BannerTypeAmsService } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams.service';
import { BannerTypeAms } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams.model';

describe('Component Tests', () => {

    describe('BannerTypeAms Management Detail Component', () => {
        let comp: BannerTypeAmsDetailComponent;
        let fixture: ComponentFixture<BannerTypeAmsDetailComponent>;
        let service: BannerTypeAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerTypeAmsDetailComponent],
                providers: [
                    BannerTypeAmsService
                ]
            })
            .overrideTemplate(BannerTypeAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerTypeAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerTypeAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerTypeAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
