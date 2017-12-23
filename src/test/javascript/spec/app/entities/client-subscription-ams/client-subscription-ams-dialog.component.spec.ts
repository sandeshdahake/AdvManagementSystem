/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { ClientSubscriptionAmsDialogComponent } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams-dialog.component';
import { ClientSubscriptionAmsService } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.service';
import { ClientSubscriptionAms } from '../../../../../../main/webapp/app/entities/client-subscription-ams/client-subscription-ams.model';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams';
import { SubscriptionPlanAmsService } from '../../../../../../main/webapp/app/entities/subscription-plan-ams';

describe('Component Tests', () => {

    describe('ClientSubscriptionAms Management Dialog Component', () => {
        let comp: ClientSubscriptionAmsDialogComponent;
        let fixture: ComponentFixture<ClientSubscriptionAmsDialogComponent>;
        let service: ClientSubscriptionAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [ClientSubscriptionAmsDialogComponent],
                providers: [
                    CityAmsService,
                    ClientAmsService,
                    SubscriptionPlanAmsService,
                    ClientSubscriptionAmsService
                ]
            })
            .overrideTemplate(ClientSubscriptionAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientSubscriptionAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientSubscriptionAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientSubscriptionAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.clientSubscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientSubscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientSubscriptionAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.clientSubscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientSubscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
