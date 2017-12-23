import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BannerLocationAms } from './banner-location-ams.model';
import { BannerLocationAmsPopupService } from './banner-location-ams-popup.service';
import { BannerLocationAmsService } from './banner-location-ams.service';

@Component({
    selector: 'jhi-banner-location-ams-delete-dialog',
    templateUrl: './banner-location-ams-delete-dialog.component.html'
})
export class BannerLocationAmsDeleteDialogComponent {

    bannerLocation: BannerLocationAms;

    constructor(
        private bannerLocationService: BannerLocationAmsService,
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
    selector: 'jhi-banner-location-ams-delete-popup',
    template: ''
})
export class BannerLocationAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bannerLocationPopupService: BannerLocationAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bannerLocationPopupService
                .open(BannerLocationAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
