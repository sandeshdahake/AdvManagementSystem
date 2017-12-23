import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerType } from './banner-type.model';
import { BannerTypePopupService } from './banner-type-popup.service';
import { BannerTypeService } from './banner-type.service';

@Component({
    selector: 'jhi-banner-type-delete-dialog',
    templateUrl: './banner-type-delete-dialog.component.html'
})
export class BannerTypeDeleteDialogComponent {

    bannerType: BannerType;

    constructor(
        private bannerTypeService: BannerTypeService,
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
    selector: 'jhi-banner-type-delete-popup',
    template: ''
})
export class BannerTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerTypePopupService: BannerTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerTypePopupService
                .open(BannerTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
