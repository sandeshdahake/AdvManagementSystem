import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriodAms } from './subscription-period-ams.model';
import { SubscriptionPeriodAmsService } from './subscription-period-ams.service';

@Component({
    selector: 'jhi-subscription-period-ams-detail',
    templateUrl: './subscription-period-ams-detail.component.html'
})
export class SubscriptionPeriodAmsDetailComponent implements OnInit, OnDestroy {

    subscriptionPeriod: SubscriptionPeriodAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subscriptionPeriodService: SubscriptionPeriodAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubscriptionPeriods();
    }

    load(id) {
        this.subscriptionPeriodService.find(id).subscribe((subscriptionPeriod) => {
            this.subscriptionPeriod = subscriptionPeriod;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubscriptionPeriods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subscriptionPeriodListModification',
            (response) => this.load(this.subscriptionPeriod.id)
        );
    }
}
