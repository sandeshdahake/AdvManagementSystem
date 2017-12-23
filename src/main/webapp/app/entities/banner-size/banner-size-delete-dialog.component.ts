import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerSize } from './banner-size.model';
import { BannerSizePopupService } from './banner-size-popup.service';
import { BannerSizeService } from './banner-size.service';

@Component({
    selector: 'jhi-banner-size-delete-dialog',
    templateUrl: './banner-size-delete-dialog.component.html'
})
export class BannerSizeDeleteDialogComponent {

    bannerSize: BannerSize;

    constructor(
        private bannerSizeService: BannerSizeService,
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
    selector: 'jhi-banner-size-delete-popup',
    template: ''
})
export class BannerSizeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerSizePopupService: BannerSizePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerSizePopupService
                .open(BannerSizeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
