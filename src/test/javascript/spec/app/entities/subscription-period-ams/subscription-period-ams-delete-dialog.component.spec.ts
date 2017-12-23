/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodAmsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams-delete-dialog.component';
import { SubscriptionPeriodAmsService } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.service';

describe('Component Tests', () => {

    describe('SubscriptionPeriodAms Management Delete Component', () => {
        let comp: SubscriptionPeriodAmsDeleteDialogComponent;
        let fixture: ComponentFixture<SubscriptionPeriodAmsDeleteDialogComponent>;
        let service: SubscriptionPeriodAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodAmsDeleteDialogComponent],
                providers: [
                    SubscriptionPeriodAmsService
                ]
            })
            .overrideTemplate(SubscriptionPeriodAmsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodAmsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodAmsService);
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
