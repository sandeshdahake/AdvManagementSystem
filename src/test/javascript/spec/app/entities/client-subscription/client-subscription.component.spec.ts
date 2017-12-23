/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionComponent } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.component';
import { ClientSubscriptionService } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.service';
import { ClientSubscription } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.model';

describe('Component Tests', () => {

    describe('ClientSubscription Management Component', () => {
        let comp: ClientSubscriptionComponent;
        let fixture: ComponentFixture<ClientSubscriptionComponent>;
        let service: ClientSubscriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionComponent],
                providers: [
                    ClientSubscriptionService
                ]
            })
            .overrideTemplate(ClientSubscriptionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClientSubscription(123)],
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
