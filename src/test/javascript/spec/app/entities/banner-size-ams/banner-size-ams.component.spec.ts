/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeAmsComponent } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.component';
import { BannerSizeAmsService } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.service';
import { BannerSizeAms } from '../../../../../../main/webapp/app/entities/banner-size-ams/banner-size-ams.model';

describe('Component Tests', () => {

    describe('BannerSizeAms Management Component', () => {
        let comp: BannerSizeAmsComponent;
        let fixture: ComponentFixture<BannerSizeAmsComponent>;
        let service: BannerSizeAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeAmsComponent],
                providers: [
                    BannerSizeAmsService
                ]
            })
            .overrideTemplate(BannerSizeAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerSizeAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bannerSizes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
