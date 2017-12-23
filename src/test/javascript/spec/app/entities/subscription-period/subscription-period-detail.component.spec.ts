/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodDetailComponent } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period-detail.component';
import { SubscriptionPeriodService } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.service';
import { SubscriptionPeriod } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriod Management Detail Component', () => {
        let comp: SubscriptionPeriodDetailComponent;
        let fixture: ComponentFixture<SubscriptionPeriodDetailComponent>;
        let service: SubscriptionPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodDetailComponent],
                providers: [
                    SubscriptionPeriodService
                ]
            })
            .overrideTemplate(SubscriptionPeriodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SubscriptionPeriod(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subscriptionPeriod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
