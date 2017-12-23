import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerTypeAms } from './banner-type-ams.model';
import { BannerTypeAmsPopupService } from './banner-type-ams-popup.service';
import { BannerTypeAmsService } from './banner-type-ams.service';

@Component({
    selector: 'jhi-banner-type-ams-delete-dialog',
    templateUrl: './banner-type-ams-delete-dialog.component.html'
})
export class BannerTypeAmsDeleteDialogComponent {

    bannerType: BannerTypeAms;

    constructor(
        private bannerTypeService: BannerTypeAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bannerTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bannerTypeListModification',
                content: 'Deleted an bannerType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banner-type-ams-delete-popup',
    template: ''
})
export class BannerTypeAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerTypePopupService: BannerTypeAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerTypePopupService
                .open(BannerTypeAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
