/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionAmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams-delete-dialog.component';
import { ClientSubscriptionAmsService } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.service';

describe('Component Tests', () => {

    describe('ClientSubscriptionAms Management Delete Component', () => {
        let comp: ClientSubscriptionAmsDeleteDialogComponent;
        let fixture: ComponentFixture<ClientSubscriptionAmsDeleteDialogComponent>;
        let service: ClientSubscriptionAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionAmsDeleteDialogComponent],
                providers: [
                    ClientSubscriptionAmsService
                ]
            })
            .overrideTemplate(ClientSubscriptionAmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionAmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionAmsService);
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
