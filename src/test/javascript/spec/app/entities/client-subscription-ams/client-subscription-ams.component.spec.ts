/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionAmsComponent } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.component';
import { ClientSubscriptionAmsService } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.service';
import { ClientSubscriptionAms } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.model';

describe('Component Tests', () => {

    describe('ClientSubscriptionAms Management Component', () => {
        let comp: ClientSubscriptionAmsComponent;
        let fixture: ComponentFixture<ClientSubscriptionAmsComponent>;
        let service: ClientSubscriptionAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionAmsComponent],
                providers: [
                    ClientSubscriptionAmsService
                ]
            })
            .overrideTemplate(ClientSubscriptionAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClientSubscriptionAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientSubscriptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
