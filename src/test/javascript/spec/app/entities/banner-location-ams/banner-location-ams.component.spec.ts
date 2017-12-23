/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationAmsComponent } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.component';
import { BannerLocationAmsService } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.service';
import { BannerLocationAms } from '../../../../../../main/webapp/app/entities/banner-location-ams/banner-location-ams.model';

describe('Component Tests', () => {

    describe('BannerLocationAms Management Component', () => {
        let comp: BannerLocationAmsComponent;
        let fixture: ComponentFixture<BannerLocationAmsComponent>;
        let service: BannerLocationAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationAmsComponent],
                providers: [
                    BannerLocationAmsService
                ]
            })
            .overrideTemplate(BannerLocationAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerLocationAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bannerLocations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
