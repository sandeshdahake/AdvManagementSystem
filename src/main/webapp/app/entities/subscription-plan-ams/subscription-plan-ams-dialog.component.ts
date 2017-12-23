import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubscriptionPlanAms } from './subscription-plan-ams.model';
import { SubscriptionPlanAmsPopupService } from './subscription-plan-ams-popup.service';
import { SubscriptionPlanAmsService } from './subscription-plan-ams.service';
import { BannerTypeAms, BannerTypeAmsService } from '../banner-type-ams';
import { BannerSizeAms, BannerSizeAmsService } from '../banner-size-ams';
import { BannerLocationAms, BannerLocationAmsService } from '../banner-location-ams';
import { BannerPageAms, BannerPageAmsService } from '../banner-page-ams';
import { SubscriptionPeriodAms, SubscriptionPeriodAmsService } from '../subscription-period-ams';
import { CityAms, CityAmsService } from '../city-ams';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subscription-plan-ams-dialog',
    templateUrl: './subscription-plan-ams-dialog.component.html'
})
export class SubscriptionPlanAmsDialogComponent implements OnInit {

    subscriptionPlan: SubscriptionPlanAms;
    isSaving: boolean;

    bannertypes: BannerTypeAms[];

    bannersizes: BannerSizeAms[];

    bannerlocations: BannerLocationAms[];

    bannerpages: BannerPageAms[];

    subscriptionperiods: SubscriptionPeriodAms[];

    cities: CityAms[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subscriptionPlanService: SubscriptionPlanAmsService,
        private bannerTypeService: BannerTypeAmsService,
        private bannerSizeService: BannerSizeAmsService,
        private bannerLocationService: BannerLocationAmsService,
        private bannerPageService: BannerPageAmsService,
        private subscriptionPeriodService: SubscriptionPeriodAmsService,
        private cityService: CityAmsService,
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

    private subscribeToSaveResponse(result: Observable<SubscriptionPlanAms>) {
        result.subscribe((res: SubscriptionPlanAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubscriptionPlanAms) {
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

    trackBannerTypeById(index: number, item: BannerTypeAms) {
        return item.id;
    }

    trackBannerSizeById(index: number, item: BannerSizeAms) {
        return item.id;
    }

    trackBannerLocationById(index: number, item: BannerLocationAms) {
        return item.id;
    }

    trackBannerPageById(index: number, item: BannerPageAms) {
        return item.id;
    }

    trackSubscriptionPeriodById(index: number, item: SubscriptionPeriodAms) {
        return item.id;
    }

    trackCityById(index: number, item: CityAms) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-subscription-plan-ams-popup',
    template: ''
})
export class SubscriptionPlanAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionPlanPopupService: SubscriptionPlanAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionPlanPopupService
                    .open(SubscriptionPlanAmsDialogComponent as Component, params['id']);
            } else {
                this.subscriptionPlanPopupService
                    .open(SubscriptionPlanAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
