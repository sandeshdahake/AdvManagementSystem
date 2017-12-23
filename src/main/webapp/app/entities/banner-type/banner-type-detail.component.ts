import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerType } from './banner-type.model';
import { BannerTypeService } from './banner-type.service';

@Component({
    selector: 'jhi-banner-type-detail',
    templateUrl: './banner-type-detail.component.html'
})
export class BannerTypeDetailComponent implements OnInit, OnDestroy {

    bannerType: BannerType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerTypeService: BannerTypeService,
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
