/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerTypeAmsComponent } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams.component';
import { BannerTypeAmsService } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams.service';
import { BannerTypeAms } from '../../../../../../main/webapp/app/entities/banner-type-ams/banner-type-ams.model';

describe('Component Tests', () => {

    describe('BannerTypeAms Management Component', () => {
        let comp: BannerTypeAmsComponent;
        let fixture: ComponentFixture<BannerTypeAmsComponent>;
        let service: BannerTypeAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerTypeAmsComponent],
                providers: [
                    BannerTypeAmsService
                ]
            })
            .overrideTemplate(BannerTypeAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerTypeAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerTypeAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerTypeAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bannerTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
