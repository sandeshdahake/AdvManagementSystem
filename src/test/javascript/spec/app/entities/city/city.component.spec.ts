/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { CityComponent } from '../../../../../../main/webapp/app/entities/city/city.component';
import { CityService } from '../../../../../../main/webapp/app/entities/city/city.service';
import { City } from '../../../../../../main/webapp/app/entities/city/city.model';

describe('Component Tests', () => {

    describe('City Management Component', () => {
        let comp: CityComponent;
        let fixture: ComponentFixture<CityComponent>;
        let service: CityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [CityComponent],
                providers: [
                    CityService
                ]
            })
            .overrideTemplate(CityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new City(123)],
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
