/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientAmsDialogComponent } from '../../../../../../main/webapp/app/entities/client-ams/client-ams-dialog.component';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.service';
import { ClientAms } from '../../../../../../main/webapp/app/entities/client-ams/client-ams.model';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams';

describe('Component Tests', () => {

    describe('ClientAms Management Dialog Component', () => {
        let comp: ClientAmsDialogComponent;
        let fixture: ComponentFixture<ClientAmsDialogComponent>;
        let service: ClientAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientAmsDialogComponent],
                providers: [
                    CityAmsService,
                    ClientAmsService
                ]
            })
            .overrideTemplate(ClientAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
