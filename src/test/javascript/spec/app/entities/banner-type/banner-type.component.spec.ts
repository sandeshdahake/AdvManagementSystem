/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerTypeComponent } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.component';
import { BannerTypeService } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.service';
import { BannerType } from '../../../../../../main/webapp/app/entities/banner-type/banner-type.model';

describe('Component Tests', () => {

    describe('BannerType Management Component', () => {
        let comp: BannerTypeComponent;
        let fixture: ComponentFixture<BannerTypeComponent>;
        let service: BannerTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerTypeComponent],
                providers: [
                    BannerTypeService
                ]
            })
            .overrideTemplate(BannerTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BannerType(123)],
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
