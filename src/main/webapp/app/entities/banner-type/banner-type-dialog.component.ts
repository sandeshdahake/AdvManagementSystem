import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerType } from './banner-type.model';
import { BannerTypePopupService } from './banner-type-popup.service';
import { BannerTypeService } from './banner-type.service';

@Component({
    selector: 'jhi-banner-type-dialog',
    templateUrl: './banner-type-dialog.component.html'
})
export class BannerTypeDialogComponent implements OnInit {

    bannerType: BannerType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bannerTypeService: BannerTypeService,
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

    private subscribeToSaveResponse(result: Observable<BannerType>) {
        result.subscribe((res: BannerType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BannerType) {
        this.eventManager.broadcast({ name: 'bannerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-banner-type-popup',
    template: ''
})
export class BannerTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerTypePopupService: BannerTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bannerTypePopupService
                    .open(BannerTypeDialogComponent as Component, params['id']);
            } else {
                this.bannerTypePopupService
                    .open(BannerTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
