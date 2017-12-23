import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerPageAms } from './banner-page-ams.model';
import { BannerPageAmsService } from './banner-page-ams.service';

@Component({
    selector: 'jhi-banner-page-ams-detail',
    templateUrl: './banner-page-ams-detail.component.html'
})
export class BannerPageAmsDetailComponent implements OnInit, OnDestroy {

    bannerPage: BannerPageAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerPageService: BannerPageAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBannerPages();
    }

    load(id) {
        this.bannerPageService.find(id).subscribe((bannerPage) => {
            this.bannerPage = bannerPage;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBannerPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bannerPageListModification',
            (response) => this.load(this.bannerPage.id)
        );
    }
}
