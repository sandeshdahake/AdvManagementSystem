/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerLocationComponent } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.component';
import { BannerLocationService } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.service';
import { BannerLocation } from '../../../../../../main/webapp/app/entities/banner-location/banner-location.model';

describe('Component Tests', () => {

    describe('BannerLocation Management Component', () => {
        let comp: BannerLocationComponent;
        let fixture: ComponentFixture<BannerLocationComponent>;
        let service: BannerLocationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerLocationComponent],
                providers: [
                    BannerLocationService
                ]
            })
            .overrideTemplate(BannerLocationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerLocationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerLocationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerLocation(123)],
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
