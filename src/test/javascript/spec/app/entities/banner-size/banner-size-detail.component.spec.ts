/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeDetailComponent } from '../../../../../../main/webapp/app/entities/banner-size/banner-size-detail.component';
import { BannerSizeService } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.service';
import { BannerSize } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.model';

describe('Component Tests', () => {

    describe('BannerSize Management Detail Component', () => {
        let comp: BannerSizeDetailComponent;
        let fixture: ComponentFixture<BannerSizeDetailComponent>;
        let service: BannerSizeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeDetailComponent],
                providers: [
                    BannerSizeService
                ]
            })
            .overrideTemplate(BannerSizeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerSize(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerSize).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
