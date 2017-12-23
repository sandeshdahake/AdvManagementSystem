/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPlanAmsComponent } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.component';
import { SubscriptionPlanAmsService } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.service';
import { SubscriptionPlanAms } from '../../../../../../main/webapp/app/entities/subscription-plan-ams/subscription-plan-ams.model';

describe('Component Tests', () => {

    describe('SubscriptionPlanAms Management Component', () => {
        let comp: SubscriptionPlanAmsComponent;
        let fixture: ComponentFixture<SubscriptionPlanAmsComponent>;
        let service: SubscriptionPlanAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPlanAmsComponent],
                providers: [
                    SubscriptionPlanAmsService
                ]
            })
            .overrideTemplate(SubscriptionPlanAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPlanAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPlanAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SubscriptionPlanAms(123)],
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
