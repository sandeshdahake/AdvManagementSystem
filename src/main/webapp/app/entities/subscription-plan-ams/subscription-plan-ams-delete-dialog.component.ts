import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPlanAms } from './subscription-plan-ams.model';
import { SubscriptionPlanAmsPopupService } from './subscription-plan-ams-popup.service';
import { SubscriptionPlanAmsService } from './subscription-plan-ams.service';

@Component({
    selector: 'jhi-subscription-plan-ams-delete-dialog',
    templateUrl: './subscription-plan-ams-delete-dialog.component.html'
})
export class SubscriptionPlanAmsDeleteDialogComponent {

    subscriptionPlan: SubscriptionPlanAms;

    constructor(
        private subscriptionPlanService: SubscriptionPlanAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscriptionPlanService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subscriptionPlanListModification',
                content: 'Deleted an subscriptionPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscription-plan-ams-delete-popup',
    template: ''
})
export class SubscriptionPlanAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPlanPopupService: SubscriptionPlanAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subscriptionPlanPopupService
                .open(SubscriptionPlanAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
