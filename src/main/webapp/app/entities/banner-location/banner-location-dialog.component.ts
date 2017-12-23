import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerLocation } from './banner-location.model';
import { BannerLocationPopupService } from './banner-location-popup.service';
import { BannerLocationService } from './banner-location.service';

@Component({
    selector: 'jhi-banner-location-dialog',
    templateUrl: './banner-location-dialog.component.html'
})
export class BannerLocationDialogComponent implements OnInit {

    bannerLocation: BannerLocation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerLocationService: BannerLocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bannerLocation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bannerLocationService.update(this.bannerLocation));
        } else {
            this.subscribeToSaveResponse(
                this.bannerLocationService.create(this.bannerLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<BannerLocation>) {
        result.subscribe((res: BannerLocation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerLocation) {
        this.eventManager.broadcast({ name: 'bannerLocationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-location-popup',
    template: ''
})
export class BannerLocationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerLocationPopupService: BannerLocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerLocationPopupService
                    .open(BannerLocationDialogComponent as Component, params['id']);
            } else {
                this.bannerLocationPopupService
                    .open(BannerLocationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
