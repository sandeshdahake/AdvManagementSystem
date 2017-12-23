/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodAmsComponent } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.component';
import { SubscriptionPeriodAmsService } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.service';
import { SubscriptionPeriodAms } from '../../../../../../main/webapp/app/entities/subscription-period-ams/subscription-period-ams.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriodAms Management Component', () => {
        let comp: SubscriptionPeriodAmsComponent;
        let fixture: ComponentFixture<SubscriptionPeriodAmsComponent>;
        let service: SubscriptionPeriodAmsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodAmsComponent],
                providers: [
                    SubscriptionPeriodAmsService
                ]
            })
            .overrideTemplate(SubscriptionPeriodAmsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodAmsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodAmsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SubscriptionPeriodAms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subscriptionPeriods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
