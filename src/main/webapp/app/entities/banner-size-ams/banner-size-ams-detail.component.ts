import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSizeAms } from './banner-size-ams.model';
import { BannerSizeAmsService } from './banner-size-ams.service';

@Component({
    selector: 'jhi-banner-size-ams-detail',
    templateUrl: './banner-size-ams-detail.component.html'
})
export class BannerSizeAmsDetailComponent implements OnInit, OnDestroy {

    bannerSize: BannerSizeAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerSizeService: BannerSizeAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBannerSizes();
    }

    load(id) {
        this.bannerSizeService.find(id).subscribe((bannerSize) => {
            this.bannerSize = bannerSize;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBannerSizes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bannerSizeListModification',
            (response) => this.load(this.bannerSize.id)
        );
    }
}
