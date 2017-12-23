import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerPage } from './banner-page.model';
import { BannerPagePopupService } from './banner-page-popup.service';
import { BannerPageService } from './banner-page.service';

@Component({
    selector: 'jhi-banner-page-dialog',
    templateUrl: './banner-page-dialog.component.html'
})
export class BannerPageDialogComponent implements OnInit {

    bannerPage: BannerPage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerPageService: BannerPageService,
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

    private subscribeToSaveResponse(result: Observable<BannerPage>) {
        result.subscribe((res: BannerPage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerPage) {
        this.eventManager.broadcast({ name: 'bannerPageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-page-popup',
    template: ''
})
export class BannerPagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerPagePopupService: BannerPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerPagePopupService
                    .open(BannerPageDialogComponent as Component, params['id']);
            } else {
                this.bannerPagePopupService
                    .open(BannerPageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
