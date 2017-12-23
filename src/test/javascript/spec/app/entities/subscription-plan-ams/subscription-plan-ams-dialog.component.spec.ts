/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanAmsDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams-dialog.component';
import { SubscriptionPlanAmsService } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.service';
import { SubscriptionPlanAms } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.model';
import { BannerTypeAmsService } from '../../../../../../main/webapp/app/entities/banner-type-ams';
import { BannerSizeAmsService } from '../../../../../../main/webapp/app/entities/banner-size-ams';
import { BannerLocationAmsService } from '../../../../../../main/webapp/app/entities/banner-location-ams';
import { BannerPageAmsService } from '../../../../../../main/webapp/app/entities/banner-page-ams';
import { SubscriptionPeriodAmsService } from '../../../../../../main/webapp/app/entities/subscription-period-ams';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams';

describe('Component Tests', () => {

    describe('SubscriptionPlanAms Management Dialog Component', () => {
        let comp: SubscriptionPlanAmsDialogComponent;
        let fixture: ComponentFixture<SubscriptionPlanAmsDialogComponent>;
        let service: SubscriptionPlanAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanAmsDialogComponent],
                providers: [
                    BannerTypeAmsService,
                    BannerSizeAmsService,
                    BannerLocationAmsService,
                    BannerPageAmsService,
                    SubscriptionPeriodAmsService,
                    CityAmsService,
                    SubscriptionPlanAmsService
                ]
            })
            .overrideTemplate(SubscriptionPlanAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPlanAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.subscriptionPlan = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionPlanListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPlanAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.subscriptionPlan = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionPlanListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
