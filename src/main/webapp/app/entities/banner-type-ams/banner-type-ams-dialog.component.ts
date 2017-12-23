import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerTypeAms } from './banner-type-ams.model';
import { BannerTypeAmsPopupService } from './banner-type-ams-popup.service';
import { BannerTypeAmsService } from './banner-type-ams.service';

@Component({
    selector: 'jhi-banner-type-ams-dialog',
    templateUrl: './banner-type-ams-dialog.component.html'
})
export class BannerTypeAmsDialogComponent implements OnInit {

    bannerType: BannerTypeAms;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerTypeService: BannerTypeAmsService,
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
        if (this.bannerType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bannerTypeService.update(this.bannerType));
        } else {
            this.subscribeToSaveResponse(
                this.bannerTypeService.create(this.bannerType));
        }
    }

    private subscribeToSaveResponse(result: Observable<BannerTypeAms>) {
        result.subscribe((res: BannerTypeAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerTypeAms) {
        this.eventManager.broadcast({ name: 'bannerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-type-ams-popup',
    template: ''
})
export class BannerTypeAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerTypePopupService: BannerTypeAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerTypePopupService
                    .open(BannerTypeAmsDialogComponent as Component, params['id']);
            } else {
                this.bannerTypePopupService
                    .open(BannerTypeAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
