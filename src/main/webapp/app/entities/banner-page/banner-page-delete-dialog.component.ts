import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerPage } from './banner-page.model';
import { BannerPagePopupService } from './banner-page-popup.service';
import { BannerPageService } from './banner-page.service';

@Component({
    selector: 'jhi-banner-page-delete-dialog',
    templateUrl: './banner-page-delete-dialog.component.html'
})
export class BannerPageDeleteDialogComponent {

    bannerPage: BannerPage;

    constructor(
        private bannerPageService: BannerPageService,
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
    selector: 'jhi-banner-page-delete-popup',
    template: ''
})
export class BannerPageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerPagePopupService: BannerPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerPagePopupService
                .open(BannerPageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
