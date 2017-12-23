import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerPageAms } from './banner-page-ams.model';
import { BannerPageAmsPopupService } from './banner-page-ams-popup.service';
import { BannerPageAmsService } from './banner-page-ams.service';

@Component({
    selector: 'jhi-banner-page-ams-dialog',
    templateUrl: './banner-page-ams-dialog.component.html'
})
export class BannerPageAmsDialogComponent implements OnInit {

    bannerPage: BannerPageAms;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerPageService: BannerPageAmsService,
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
        if (this.bannerPage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bannerPageService.update(this.bannerPage));
        } else {
            this.subscribeToSaveResponse(
                this.bannerPageService.create(this.bannerPage));
        }
    }

    private subscribeToSaveResponse(result: Observable<BannerPageAms>) {
        result.subscribe((res: BannerPageAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerPageAms) {
        this.eventManager.broadcast({ name: 'bannerPageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-page-ams-popup',
    template: ''
})
export class BannerPageAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerPagePopupService: BannerPageAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerPagePopupService
                    .open(BannerPageAmsDialogComponent as Component, params['id']);
            } else {
                this.bannerPagePopupService
                    .open(BannerPageAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
