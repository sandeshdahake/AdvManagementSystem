import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerTypeAms } from './banner-type-ams.model';
import { BannerTypeAmsService } from './banner-type-ams.service';

@Component({
    selector: 'jhi-banner-type-ams-detail',
    templateUrl: './banner-type-ams-detail.component.html'
})
export class BannerTypeAmsDetailComponent implements OnInit, OnDestroy {

    bannerType: BannerTypeAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerTypeService: BannerTypeAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBannerTypes();
    }

    load(id) {
        this.bannerTypeService.find(id).subscribe((bannerType) => {
            this.bannerType = bannerType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBannerTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bannerTypeListModification',
            (response) => this.load(this.bannerType.id)
        );
    }
}
