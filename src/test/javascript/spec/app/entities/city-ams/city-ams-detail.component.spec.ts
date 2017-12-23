/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { CityAmsDetailComponent } from '../../../../../../main/webapp/app/entities/city-ams/city-ams-detail.component';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.service';
import { CityAms } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.model';

describe('Component Tests', () => {

    describe('CityAms Management Detail Component', () => {
        let comp: CityAmsDetailComponent;
        let fixture: ComponentFixture<CityAmsDetailComponent>;
        let service: CityAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [CityAmsDetailComponent],
                providers: [
                    CityAmsService
                ]
            })
            .overrideTemplate(CityAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CityAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.city).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
