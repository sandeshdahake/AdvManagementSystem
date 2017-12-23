import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubscriptionPlan } from './subscription-plan.model';
import { SubscriptionPlanPopupService } from './subscription-plan-popup.service';
import { SubscriptionPlanService } from './subscription-plan.service';
import { BannerType, BannerTypeService } from '../banner-type';
import { BannerSize, BannerSizeService } from '../banner-size';
import { BannerLocation, BannerLocationService } from '../banner-location';
import { BannerPage, BannerPageService } from '../banner-page';
import { SubscriptionPeriod, SubscriptionPeriodService } from '../subscription-period';
import { City, CityService } from '../city';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subscription-plan-dialog',
    templateUrl: './subscription-plan-dialog.component.html'
})
export class SubscriptionPlanDialogComponent implements OnInit {

    subscriptionPlan: SubscriptionPlan;
    isSaving: boolean;

    bannertypes: BannerType[];

    bannersizes: BannerSize[];

    bannerlocations: BannerLocation[];

    bannerpages: BannerPage[];

    subscriptionperiods: SubscriptionPeriod[];

    cities: City[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subscriptionPlanService: SubscriptionPlanService,
        private bannerTypeService: BannerTypeService,
        private bannerSizeService: BannerSizeService,
        private bannerLocationService: BannerLocationService,
        private bannerPageService: BannerPageService,
        private subscriptionPeriodService: SubscriptionPeriodService,
        private cityService: CityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bannerTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.bannertypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bannerSizeService.query()
            .subscribe((res: ResponseWrapper) => { this.bannersizes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bannerLocationService.query()
            .subscribe((res: ResponseWrapper) => { this.bannerlocations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bannerPageService.query()
            .subscribe((res: ResponseWrapper) => { this.bannerpages = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.subscriptionPeriodService.query()
            .subscribe((res: ResponseWrapper) => { this.subscriptionperiods = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.cityService.query()
            .subscribe((res: ResponseWrapper) => { this.cities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subscriptionPlan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subscriptionPlanService.update(this.subscriptionPlan));
        } else {
            this.subscribeToSaveResponse(
                this.subscriptionPlanService.create(this.subscriptionPlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<SubscriptionPlan>) {
        result.subscribe((res: SubscriptionPlan) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubscriptionPlan) {
        this.eventManager.broadcast({ name: 'subscriptionPlanListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBannerTypeById(index: number, item: BannerType) {
        return item.id;
    }

    trackBannerSizeById(index: number, item: BannerSize) {
        return item.id;
    }

    trackBannerLocationById(index: number, item: BannerLocation) {
        return item.id;
    }

    trackBannerPageById(index: number, item: BannerPage) {
        return item.id;
    }

    trackSubscriptionPeriodById(index: number, item: SubscriptionPeriod) {
        return item.id;
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-subscription-plan-popup',
    template: ''
})
export class SubscriptionPlanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPlanPopupService: SubscriptionPlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionPlanPopupService
                    .open(SubscriptionPlanDialogComponent as Component, params['id']);
            } else {
                this.subscriptionPlanPopupService
                    .open(SubscriptionPlanDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
