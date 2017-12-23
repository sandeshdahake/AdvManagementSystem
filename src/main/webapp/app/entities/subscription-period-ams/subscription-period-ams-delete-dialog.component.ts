import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriodAms } from './subscription-period-ams.model';
import { SubscriptionPeriodAmsPopupService } from './subscription-period-ams-popup.service';
import { SubscriptionPeriodAmsService } from './subscription-period-ams.service';

@Component({
    selector: 'jhi-subscription-period-ams-delete-dialog',
    templateUrl: './subscription-period-ams-delete-dialog.component.html'
})
export class SubscriptionPeriodAmsDeleteDialogComponent {

    subscriptionPeriod: SubscriptionPeriodAms;

    constructor(
        private subscriptionPeriodService: SubscriptionPeriodAmsService,
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
    selector: 'jhi-subscription-period-ams-delete-popup',
    template: ''
})
export class SubscriptionPeriodAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPeriodPopupService: SubscriptionPeriodAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subscriptionPeriodPopupService
                .open(SubscriptionPeriodAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
