/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeComponent } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.component';
import { BannerSizeService } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.service';
import { BannerSize } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.model';

describe('Component Tests', () => {

    describe('BannerSize Management Component', () => {
        let comp: BannerSizeComponent;
        let fixture: ComponentFixture<BannerSizeComponent>;
        let service: BannerSizeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeComponent],
                providers: [
                    BannerSizeService
                ]
            })
            .overrideTemplate(BannerSizeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerSize(123)],
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
