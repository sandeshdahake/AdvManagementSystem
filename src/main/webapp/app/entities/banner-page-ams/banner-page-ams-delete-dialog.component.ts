import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerPageAms } from './banner-page-ams.model';
import { BannerPageAmsPopupService } from './banner-page-ams-popup.service';
import { BannerPageAmsService } from './banner-page-ams.service';

@Component({
    selector: 'jhi-banner-page-ams-delete-dialog',
    templateUrl: './banner-page-ams-delete-dialog.component.html'
})
export class BannerPageAmsDeleteDialogComponent {

    bannerPage: BannerPageAms;

    constructor(
        private bannerPageService: BannerPageAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bannerPageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bannerPageListModification',
                content: 'Deleted an bannerPage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banner-page-ams-delete-popup',
    template: ''
})
export class BannerPageAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerPagePopupService: BannerPageAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerPagePopupService
                .open(BannerPageAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
