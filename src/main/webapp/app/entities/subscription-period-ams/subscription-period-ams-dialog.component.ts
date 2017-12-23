import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubscriptionPeriodAms } from './subscription-period-ams.model';
import { SubscriptionPeriodAmsPopupService } from './subscription-period-ams-popup.service';
import { SubscriptionPeriodAmsService } from './subscription-period-ams.service';

@Component({
    selector: 'jhi-subscription-period-ams-dialog',
    templateUrl: './subscription-period-ams-dialog.component.html'
})
export class SubscriptionPeriodAmsDialogComponent implements OnInit {

    subscriptionPeriod: SubscriptionPeriodAms;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private subscriptionPeriodService: SubscriptionPeriodAmsService,
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

    private subscribeToSaveResponse(result: Observable<SubscriptionPeriodAms>) {
        result.subscribe((res: SubscriptionPeriodAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubscriptionPeriodAms) {
        this.eventManager.broadcast({ name: 'subscriptionPeriodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-subscription-period-ams-popup',
    template: ''
})
export class SubscriptionPeriodAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPeriodPopupService: SubscriptionPeriodAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionPeriodPopupService
                    .open(SubscriptionPeriodAmsDialogComponent as Component, params['id']);
            } else {
                this.subscriptionPeriodPopupService
                    .open(SubscriptionPeriodAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
