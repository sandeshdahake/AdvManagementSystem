/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { SubscriptionPeriodComponent } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.component';
import { SubscriptionPeriodService } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.service';
import { SubscriptionPeriod } from '../../../../../../main/webapp/app/entities/subscription-period/subscription-period.model';

describe('Component Tests', () => {

    describe('SubscriptionPeriod Management Component', () => {
        let comp: SubscriptionPeriodComponent;
        let fixture: ComponentFixture<SubscriptionPeriodComponent>;
        let service: SubscriptionPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [SubscriptionPeriodComponent],
                providers: [
                    SubscriptionPeriodService
                ]
            })
            .overrideTemplate(SubscriptionPeriodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionPeriodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SubscriptionPeriod(123)],
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
