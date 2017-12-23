/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period-dialog.component';
import { SubscriptionPeriodService } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.service';
import { SubscriptionPeriod } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriod Management Dialog Component', () => {
        let comp: SubscriptionPeriodDialogComponent;
        let fixture: ComponentFixture<SubscriptionPeriodDialogComponent>;
        let service: SubscriptionPeriodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodDialogComponent],
                providers: [
                    SubscriptionPeriodService
                ]
            })
            .overrideTemplate(SubscriptionPeriodDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPeriod(123);
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
                        const entity = new SubscriptionPeriod();
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
