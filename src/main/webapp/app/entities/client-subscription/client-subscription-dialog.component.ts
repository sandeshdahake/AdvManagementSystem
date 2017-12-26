import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientSubscription } from './client-subscription.model';
import { ClientSubscriptionPopupService } from './client-subscription-popup.service';
import { ClientSubscriptionService } from './client-subscription.service';
import { City, CityService } from '../city';
import { Client, ClientService } from '../client';
import { SubscriptionPlan, SubscriptionPlanService } from '../subscription-plan';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-client-subscription-dialog',
    templateUrl: './client-subscription-dialog.component.html'
})
export class ClientSubscriptionDialogComponent implements OnInit {

    clientSubscription: ClientSubscription;
    isSaving: boolean;

    cities: City[];

    clients: Client[];
    selectPlan:SubscriptionPlan;
    subscriptionplans: SubscriptionPlan[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientSubscriptionService: ClientSubscriptionService,
        private cityService: CityService,
        private clientService: ClientService,
        private subscriptionPlanService: SubscriptionPlanService,
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
        this.clientSubscription.priorityPrice =0;
        this.clientSubscription.discount =0;
        this.selectPlan = null;
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

    private subscribeToSaveResponse(result: Observable<ClientSubscription>) {
        result.subscribe((res: ClientSubscription) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientSubscription) {
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

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackSubscriptionPlanById(index: number, item: SubscriptionPlan) {
        return item.id;
    }
    calculatePrice(){
        this.clientSubscription.totalPrice = this.selectPlan.price + this.clientSubscription.priorityPrice - this.clientSubscription.discount;
    }
    onPlanSelect(){
        this.subscriptionPlanService.find(this.clientSubscription.subscriptionPlanId).subscribe((selectPlan ) => {
            this.selectPlan = selectPlan;
            this.calculatePrice()
        });

    }
}

@Component({
    selector: 'jhi-client-subscription-popup',
    template: ''
})
export class ClientSubscriptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientSubscriptionPopupService: ClientSubscriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientSubscriptionPopupService
                    .open(ClientSubscriptionDialogComponent as Component, params['id']);
            } else {
                this.clientSubscriptionPopupService
                    .open(ClientSubscriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
