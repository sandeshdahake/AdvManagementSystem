/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanAmsDetailComponent } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams-detail.component';
import { SubscriptionPlanAmsService } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.service';
import { SubscriptionPlanAms } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.model';

describe('Component Tests', () => {

    describe('SubscriptionPlanAms Management Detail Component', () => {
        let comp: SubscriptionPlanAmsDetailComponent;
        let fixture: ComponentFixture<SubscriptionPlanAmsDetailComponent>;
        let service: SubscriptionPlanAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanAmsDetailComponent],
                providers: [
                    SubscriptionPlanAmsService
                ]
            })
            .overrideTemplate(SubscriptionPlanAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SubscriptionPlanAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subscriptionPlan).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
