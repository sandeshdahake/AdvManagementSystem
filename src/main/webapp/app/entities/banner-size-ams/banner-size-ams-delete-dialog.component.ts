import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSizeAms } from './banner-size-ams.model';
import { BannerSizeAmsPopupService } from './banner-size-ams-popup.service';
import { BannerSizeAmsService } from './banner-size-ams.service';

@Component({
    selector: 'jhi-banner-size-ams-delete-dialog',
    templateUrl: './banner-size-ams-delete-dialog.component.html'
})
export class BannerSizeAmsDeleteDialogComponent {

    bannerSize: BannerSizeAms;

    constructor(
        private bannerSizeService: BannerSizeAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bannerSizeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bannerSizeListModification',
                content: 'Deleted an bannerSize'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banner-size-ams-delete-popup',
    template: ''
})
export class BannerSizeAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerSizePopupService: BannerSizeAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerSizePopupService
                .open(BannerSizeAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
