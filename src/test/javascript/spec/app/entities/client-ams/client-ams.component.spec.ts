/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientAmsComponent } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.component';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.service';
import { ClientAms } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.model';

describe('Component Tests', () => {

    describe('ClientAms Management Component', () => {
        let comp: ClientAmsComponent;
        let fixture: ComponentFixture<ClientAmsComponent>;
        let service: ClientAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientAmsComponent],
                providers: [
                    ClientAmsService
                ]
            })
            .overrideTemplate(ClientAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClientAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
