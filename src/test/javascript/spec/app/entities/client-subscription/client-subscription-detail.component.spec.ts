/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionDetailComponent } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription-detail.component';
import { ClientSubscriptionService } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.service';
import { ClientSubscription } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.model';

describe('Component Tests', () => {

    describe('ClientSubscription Management Detail Component', () => {
        let comp: ClientSubscriptionDetailComponent;
        let fixture: ComponentFixture<ClientSubscriptionDetailComponent>;
        let service: ClientSubscriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionDetailComponent],
                providers: [
                    ClientSubscriptionService
                ]
            })
            .overrideTemplate(ClientSubscriptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClientSubscription(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clientSubscription).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
