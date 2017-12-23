/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription-delete-dialog.component';
import { ClientSubscriptionService } from '../../../../../../main/webapp/app/entities/client-subscription/client-subscription.service';

describe('Component Tests', () => {

    describe('ClientSubscription Management Delete Component', () => {
        let comp: ClientSubscriptionDeleteDialogComponent;
        let fixture: ComponentFixture<ClientSubscriptionDeleteDialogComponent>;
        let service: ClientSubscriptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionDeleteDialogComponent],
                providers: [
                    ClientSubscriptionService
                ]
            })
            .overrideTemplate(ClientSubscriptionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
