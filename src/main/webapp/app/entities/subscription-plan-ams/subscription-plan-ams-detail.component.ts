import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPlanAms } from './subscription-plan-ams.model';
import { SubscriptionPlanAmsService } from './subscription-plan-ams.service';

@Component({
    selector: 'jhi-subscription-plan-ams-detail',
    templateUrl: './subscription-plan-ams-detail.component.html'
})
export class SubscriptionPlanAmsDetailComponent implements OnInit, OnDestroy {

    subscriptionPlan: SubscriptionPlanAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subscriptionPlanService: SubscriptionPlanAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubscriptionPlans();
    }

    load(id) {
        this.subscriptionPlanService.find(id).subscribe((subscriptionPlan) => {
            this.subscriptionPlan = subscriptionPlan;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubscriptionPlans() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subscriptionPlanListModification',
            (response) => this.load(this.subscriptionPlan.id)
        );
    }
}
