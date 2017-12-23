/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { CityAmsComponent } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.component';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.service';
import { CityAms } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.model';

describe('Component Tests', () => {

    describe('CityAms Management Component', () => {
        let comp: CityAmsComponent;
        let fixture: ComponentFixture<CityAmsComponent>;
        let service: CityAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [CityAmsComponent],
                providers: [
                    CityAmsService
                ]
            })
            .overrideTemplate(CityAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CityAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
