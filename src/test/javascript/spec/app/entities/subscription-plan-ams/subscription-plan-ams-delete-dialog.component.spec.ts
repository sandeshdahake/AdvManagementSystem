/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanAmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams-delete-dialog.component';
import { SubscriptionPlanAmsService } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.service';

describe('Component Tests', () => {

    describe('SubscriptionPlanAms Management Delete Component', () => {
        let comp: SubscriptionPlanAmsDeleteDialogComponent;
        let fixture: ComponentFixture<SubscriptionPlanAmsDeleteDialogComponent>;
        let service: SubscriptionPlanAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanAmsDeleteDialogComponent],
                providers: [
                    SubscriptionPlanAmsService
                ]
            })
            .overrideTemplate(SubscriptionPlanAmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanAmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanAmsService);
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
