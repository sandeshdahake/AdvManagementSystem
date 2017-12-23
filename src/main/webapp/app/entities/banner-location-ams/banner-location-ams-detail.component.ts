import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BannerLocationAms } from './banner-location-ams.model';
import { BannerLocationAmsService } from './banner-location-ams.service';

@Component({
    selector: 'jhi-banner-location-ams-detail',
    templateUrl: './banner-location-ams-detail.component.html'
})
export class BannerLocationAmsDetailComponent implements OnInit, OnDestroy {

    bannerLocation: BannerLocationAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bannerLocationService: BannerLocationAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBannerLocations();
    }

    load(id) {
        this.bannerLocationService.find(id).subscribe((bannerLocation) => {
            this.bannerLocation = bannerLocation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBannerLocations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bannerLocationListModification',
            (response) => this.load(this.bannerLocation.id)
        );
    }
}
