import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerLocationAms } from './banner-location-ams.model';
import { BannerLocationAmsPopupService } from './banner-location-ams-popup.service';
import { BannerLocationAmsService } from './banner-location-ams.service';

@Component({
    selector: 'jhi-banner-location-ams-dialog',
    templateUrl: './banner-location-ams-dialog.component.html'
})
export class BannerLocationAmsDialogComponent implements OnInit {

    bannerLocation: BannerLocationAms;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerLocationService: BannerLocationAmsService,
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

    private subscribeToSaveResponse(result: Observable<BannerLocationAms>) {
        result.subscribe((res: BannerLocationAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerLocationAms) {
        this.eventManager.broadcast({ name: 'bannerLocationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-location-ams-popup',
    template: ''
})
export class BannerLocationAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerLocationPopupService: BannerLocationAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerLocationPopupService
                    .open(BannerLocationAmsDialogComponent as Component, params['id']);
            } else {
                this.bannerLocationPopupService
                    .open(BannerLocationAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
