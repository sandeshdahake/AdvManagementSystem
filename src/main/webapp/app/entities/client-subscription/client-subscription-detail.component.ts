import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ClientSubscription } from './client-subscription.model';
import { ClientSubscriptionService } from './client-subscription.service';

@Component({
    selector: 'jhi-client-subscription-detail',
    templateUrl: './client-subscription-detail.component.html'
})
export class ClientSubscriptionDetailComponent implements OnInit, OnDestroy {

    clientSubscription: ClientSubscription;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientSubscriptionService: ClientSubscriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientSubscriptions();
    }

    load(id) {
        this.clientSubscriptionService.find(id).subscribe((clientSubscription) => {
            this.clientSubscription = clientSubscription;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientSubscriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientSubscriptionListModification',
            (response) => this.load(this.clientSubscription.id)
        );
    }
}
