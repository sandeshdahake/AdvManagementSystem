import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriod } from './subscription-period.model';
import { SubscriptionPeriodPopupService } from './subscription-period-popup.service';
import { SubscriptionPeriodService } from './subscription-period.service';

@Component({
    selector: 'jhi-subscription-period-dialog',
    templateUrl: './subscription-period-dialog.component.html'
})
export class SubscriptionPeriodDialogComponent implements OnInit {

    subscriptionPeriod: SubscriptionPeriod;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private subscriptionPeriodService: SubscriptionPeriodService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subscriptionPeriod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subscriptionPeriodService.update(this.subscriptionPeriod));
        } else {
            this.subscribeToSaveResponse(
                this.subscriptionPeriodService.create(this.subscriptionPeriod));
        }
    }

    private subscribeToSaveResponse(result: Observable<SubscriptionPeriod>) {
        result.subscribe((res: SubscriptionPeriod) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubscriptionPeriod) {
        this.eventManager.broadcast({ name: 'subscriptionPeriodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-subscription-period-popup',
    template: ''
})
export class SubscriptionPeriodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPeriodPopupService: SubscriptionPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionPeriodPopupService
                    .open(SubscriptionPeriodDialogComponent as Component, params['id']);
            } else {
                this.subscriptionPeriodPopupService
                    .open(SubscriptionPeriodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
