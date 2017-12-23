/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionAmsDetailComponent } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams-detail.component';
import { ClientSubscriptionAmsService } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.service';
import { ClientSubscriptionAms } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.model';

describe('Component Tests', () => {

    describe('ClientSubscriptionAms Management Detail Component', () => {
        let comp: ClientSubscriptionAmsDetailComponent;
        let fixture: ComponentFixture<ClientSubscriptionAmsDetailComponent>;
        let service: ClientSubscriptionAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionAmsDetailComponent],
                providers: [
                    ClientSubscriptionAmsService
                ]
            })
            .overrideTemplate(ClientSubscriptionAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClientSubscriptionAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clientSubscription).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
