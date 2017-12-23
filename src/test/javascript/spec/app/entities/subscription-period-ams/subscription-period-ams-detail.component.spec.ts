/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodAmsDetailComponent } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams-detail.component';
import { SubscriptionPeriodAmsService } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.service';
import { SubscriptionPeriodAms } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriodAms Management Detail Component', () => {
        let comp: SubscriptionPeriodAmsDetailComponent;
        let fixture: ComponentFixture<SubscriptionPeriodAmsDetailComponent>;
        let service: SubscriptionPeriodAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodAmsDetailComponent],
                providers: [
                    SubscriptionPeriodAmsService
                ]
            })
            .overrideTemplate(SubscriptionPeriodAmsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodAmsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SubscriptionPeriodAms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subscriptionPeriod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
