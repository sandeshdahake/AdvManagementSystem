import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriod } from './subscription-period.model';
import { SubscriptionPeriodService } from './subscription-period.service';

@Component({
    selector: 'jhi-subscription-period-detail',
    templateUrl: './subscription-period-detail.component.html'
})
export class SubscriptionPeriodDetailComponent implements OnInit, OnDestroy {

    subscriptionPeriod: SubscriptionPeriod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subscriptionPeriodService: SubscriptionPeriodService,
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
