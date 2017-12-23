import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSizeAms } from './banner-size-ams.model';
import { BannerSizeAmsPopupService } from './banner-size-ams-popup.service';
import { BannerSizeAmsService } from './banner-size-ams.service';

@Component({
    selector: 'jhi-banner-size-ams-dialog',
    templateUrl: './banner-size-ams-dialog.component.html'
})
export class BannerSizeAmsDialogComponent implements OnInit {

    bannerSize: BannerSizeAms;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerSizeService: BannerSizeAmsService,
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
        if (this.bannerSize.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bannerSizeService.update(this.bannerSize));
        } else {
            this.subscribeToSaveResponse(
                this.bannerSizeService.create(this.bannerSize));
        }
    }

    private subscribeToSaveResponse(result: Observable<BannerSizeAms>) {
        result.subscribe((res: BannerSizeAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerSizeAms) {
        this.eventManager.broadcast({ name: 'bannerSizeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-size-ams-popup',
    template: ''
})
export class BannerSizeAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerSizePopupService: BannerSizeAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerSizePopupService
                    .open(BannerSizeAmsDialogComponent as Component, params['id']);
            } else {
                this.bannerSizePopupService
                    .open(BannerSizeAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
