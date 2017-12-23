import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriod } from './subscription-period.model';
import { SubscriptionPeriodPopupService } from './subscription-period-popup.service';
import { SubscriptionPeriodService } from './subscription-period.service';

@Component({
    selector: 'jhi-subscription-period-delete-dialog',
    templateUrl: './subscription-period-delete-dialog.component.html'
})
export class SubscriptionPeriodDeleteDialogComponent {

    subscriptionPeriod: SubscriptionPeriod;

    constructor(
        private subscriptionPeriodService: SubscriptionPeriodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscriptionPeriodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subscriptionPeriodListModification',
                content: 'Deleted an subscriptionPeriod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscription-period-delete-popup',
    template: ''
})
export class SubscriptionPeriodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPeriodPopupService: SubscriptionPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subscriptionPeriodPopupService
                .open(SubscriptionPeriodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
