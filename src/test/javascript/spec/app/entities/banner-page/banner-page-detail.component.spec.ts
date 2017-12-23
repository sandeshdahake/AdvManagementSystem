/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageDetailComponent } from '../../../../../../main/webapp/app/entities/banner-page/banner-page-detail.component';
import { BannerPageService } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.service';
import { BannerPage } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.model';

describe('Component Tests', () => {

    describe('BannerPage Management Detail Component', () => {
        let comp: BannerPageDetailComponent;
        let fixture: ComponentFixture<BannerPageDetailComponent>;
        let service: BannerPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageDetailComponent],
                providers: [
                    BannerPageService
                ]
            })
            .overrideTemplate(BannerPageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BannerPage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bannerPage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
