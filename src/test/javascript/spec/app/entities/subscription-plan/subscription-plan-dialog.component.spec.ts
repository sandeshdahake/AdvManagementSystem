/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan-dialog.component';
import { SubscriptionPlanService } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.model';
import { BannerTypeService } from '../../../../../../main/webapp/app/entities/banner-type';
import { BannerSizeService } from '../../../../../../main/webapp/app/entities/banner-size';
import { BannerLocationService } from '../../../../../../main/webapp/app/entities/banner-location';
import { BannerPageService } from '../../../../../../main/webapp/app/entities/banner-page';
import { SubscriptionPeriodService } from '../../../../../../main/webapp/app/entities/subscription-period';
import { CityService } from '../../../../../../main/webapp/app/entities/city';

describe('Component Tests', () => {

    describe('SubscriptionPlan Management Dialog Component', () => {
        let comp: SubscriptionPlanDialogComponent;
        let fixture: ComponentFixture<SubscriptionPlanDialogComponent>;
        let service: SubscriptionPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanDialogComponent],
                providers: [
                    BannerTypeService,
                    BannerSizeService,
                    BannerLocationService,
                    BannerPageService,
                    SubscriptionPeriodService,
                    CityService,
                    SubscriptionPlanService
                ]
            })
            .overrideTemplate(SubscriptionPlanDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionPlan(123);
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
                        const entity = new SubscriptionPlan();
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
