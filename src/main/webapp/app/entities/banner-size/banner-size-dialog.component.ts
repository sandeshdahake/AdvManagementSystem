import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSize } from './banner-size.model';
import { BannerSizePopupService } from './banner-size-popup.service';
import { BannerSizeService } from './banner-size.service';

@Component({
    selector: 'jhi-banner-size-dialog',
    templateUrl: './banner-size-dialog.component.html'
})
export class BannerSizeDialogComponent implements OnInit {

    bannerSize: BannerSize;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerSizeService: BannerSizeService,
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

    private subscribeToSaveResponse(result: Observable<BannerSize>) {
        result.subscribe((res: BannerSize) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerSize) {
        this.eventManager.broadcast({ name: 'bannerSizeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-size-popup',
    template: ''
})
export class BannerSizePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerSizePopupService: BannerSizePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerSizePopupService
                    .open(BannerSizeDialogComponent as Component, params['id']);
            } else {
                this.bannerSizePopupService
                    .open(BannerSizeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
