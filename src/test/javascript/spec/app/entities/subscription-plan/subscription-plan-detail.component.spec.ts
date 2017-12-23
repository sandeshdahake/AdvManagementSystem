/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanDetailComponent } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan-detail.component';
import { SubscriptionPlanService } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.model';

describe('Component Tests', () => {

    describe('SubscriptionPlan Management Detail Component', () => {
        let comp: SubscriptionPlanDetailComponent;
        let fixture: ComponentFixture<SubscriptionPlanDetailComponent>;
        let service: SubscriptionPlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanDetailComponent],
                providers: [
                    SubscriptionPlanService
                ]
            })
            .overrideTemplate(SubscriptionPlanDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SubscriptionPlan(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subscriptionPlan).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
