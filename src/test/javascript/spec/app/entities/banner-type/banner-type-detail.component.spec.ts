/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerTypeDetailComponent } from '../../../../../../main/webapp/app/entities/banner-type/banner-type-detail.component';
import { BannerTypeService } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.service';
import { BannerType } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.model';

describe('Component Tests', () => {

    describe('BannerType Management Detail Component', () => {
        let comp: BannerTypeDetailComponent;
        let fixture: ComponentFixture<BannerTypeDetailComponent>;
        let service: BannerTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerTypeDetailComponent],
                providers: [
                    BannerTypeService
                ]
            })
            .overrideTemplate(BannerTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
