import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSize } from './banner-size.model';
import { BannerSizeService } from './banner-size.service';

@Component({
    selector: 'jhi-banner-size-detail',
    templateUrl: './banner-size-detail.component.html'
})
export class BannerSizeDetailComponent implements OnInit, OnDestroy {

    bannerSize: BannerSize;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerSizeService: BannerSizeService,
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
