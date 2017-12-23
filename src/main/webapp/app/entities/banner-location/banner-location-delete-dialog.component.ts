import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerLocation } from './banner-location.model';
import { BannerLocationPopupService } from './banner-location-popup.service';
import { BannerLocationService } from './banner-location.service';

@Component({
    selector: 'jhi-banner-location-delete-dialog',
    templateUrl: './banner-location-delete-dialog.component.html'
})
export class BannerLocationDeleteDialogComponent {

    bannerLocation: BannerLocation;

    constructor(
        private bannerLocationService: BannerLocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bannerLocationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bannerLocationListModification',
                content: 'Deleted an bannerLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banner-location-delete-popup',
    template: ''
})
export class BannerLocationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerLocationPopupService: BannerLocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerLocationPopupService
                .open(BannerLocationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
