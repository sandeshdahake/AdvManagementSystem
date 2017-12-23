/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientAmsDetailComponent } from '../../../../../../main/webapp/app/entities/client-ams/client-ams-detail.component';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.service';
import { ClientAms } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.model';

describe('Component Tests', () => {

    describe('ClientAms Management Detail Component', () => {
        let comp: ClientAmsDetailComponent;
        let fixture: ComponentFixture<ClientAmsDetailComponent>;
        let service: ClientAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientAmsDetailComponent],
                providers: [
                    ClientAmsService
                ]
            })
            .overrideTemplate(ClientAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClientAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.client).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
