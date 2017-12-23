import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CityAms } from './city-ams.model';
import { CityAmsPopupService } from './city-ams-popup.service';
import { CityAmsService } from './city-ams.service';

@Component({
    selector: 'jhi-city-ams-delete-dialog',
    templateUrl: './city-ams-delete-dialog.component.html'
})
export class CityAmsDeleteDialogComponent {

    city: CityAms;

    constructor(
        private cityService: CityAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cityListModification',
                content: 'Deleted an city'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-city-ams-delete-popup',
    template: ''
})
export class CityAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cityPopupService
                .open(CityAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
