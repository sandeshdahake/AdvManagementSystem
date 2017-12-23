/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientAmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/client-ams/client-ams-delete-dialog.component';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.service';

describe('Component Tests', () => {

    describe('ClientAms Management Delete Component', () => {
        let comp: ClientAmsDeleteDialogComponent;
        let fixture: ComponentFixture<ClientAmsDeleteDialogComponent>;
        let service: ClientAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientAmsDeleteDialogComponent],
                providers: [
                    ClientAmsService
                ]
            })
            .overrideTemplate(ClientAmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAmsService);
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
