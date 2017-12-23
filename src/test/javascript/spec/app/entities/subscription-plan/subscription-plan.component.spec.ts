/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanComponent } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.component';
import { SubscriptionPlanService } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from '../../../../../../main/webapp/app/entities/subscription-plan/subscription-plan.model';

describe('Component Tests', () => {

    describe('SubscriptionPlan Management Component', () => {
        let comp: SubscriptionPlanComponent;
        let fixture: ComponentFixture<SubscriptionPlanComponent>;
        let service: SubscriptionPlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanComponent],
                providers: [
                    SubscriptionPlanService
                ]
            })
            .overrideTemplate(SubscriptionPlanComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SubscriptionPlan(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subscriptionPlans[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
