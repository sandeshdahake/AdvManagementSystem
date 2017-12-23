import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientSubscriptionAms } from './client-subscription-ams.model';
import { ClientSubscriptionAmsPopupService } from './client-subscription-ams-popup.service';
import { ClientSubscriptionAmsService } from './client-subscription-ams.service';
import { CityAms, CityAmsService } from '../city-ams';
import { ClientAms, ClientAmsService } from '../client-ams';
import { SubscriptionPlanAms, SubscriptionPlanAmsService } from '../subscription-plan-ams';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-client-subscription-ams-dialog',
    templateUrl: './client-subscription-ams-dialog.component.html'
})
export class ClientSubscriptionAmsDialogComponent implements OnInit {

    clientSubscription: ClientSubscriptionAms;
    isSaving: boolean;

    cities: CityAms[];

    clients: ClientAms[];

    subscriptionplans: SubscriptionPlanAms[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientSubscriptionService: ClientSubscriptionAmsService,
        private cityService: CityAmsService,
        private clientService: ClientAmsService,
        private subscriptionPlanService: SubscriptionPlanAmsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: ResponseWrapper) => { this.cities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.subscriptionPlanService.query()
            .subscribe((res: ResponseWrapper) => { this.subscriptionplans = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clientSubscription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientSubscriptionService.update(this.clientSubscription));
        } else {
            this.subscribeToSaveResponse(
                this.clientSubscriptionService.create(this.clientSubscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<ClientSubscriptionAms>) {
        result.subscribe((res: ClientSubscriptionAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientSubscriptionAms) {
        this.eventManager.broadcast({ name: 'clientSubscriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: CityAms) {
        return item.id;
    }

    trackClientById(index: number, item: ClientAms) {
        return item.id;
    }

    trackSubscriptionPlanById(index: number, item: SubscriptionPlanAms) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-client-subscription-ams-popup',
    template: ''
})
export class ClientSubscriptionAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientSubscriptionPopupService: ClientSubscriptionAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientSubscriptionPopupService
                    .open(ClientSubscriptionAmsDialogComponent as Component, params['id']);
            } else {
                this.clientSubscriptionPopupService
                    .open(ClientSubscriptionAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
