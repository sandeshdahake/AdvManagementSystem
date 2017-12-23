/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodAmsDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams-dialog.component';
import { SubscriptionPeriodAmsService } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.service';
import { SubscriptionPeriodAms } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriodAms Management Dialog Component', () => {
        let comp: SubscriptionPeriodAmsDialogComponent;
        let fixture: ComponentFixture<SubscriptionPeriodAmsDialogComponent>;
        let service: SubscriptionPeriodAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodAmsDialogComponent],
                providers: [
                    SubscriptionPeriodAmsService
                ]
            })
            .overrideTemplate(SubscriptionPeriodAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPeriodAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.subscriptionPeriod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionPeriodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPeriodAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.subscriptionPeriod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionPeriodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
