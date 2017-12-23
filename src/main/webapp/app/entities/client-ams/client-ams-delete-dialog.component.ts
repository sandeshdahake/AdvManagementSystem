import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientAms } from './client-ams.model';
import { ClientAmsPopupService } from './client-ams-popup.service';
import { ClientAmsService } from './client-ams.service';

@Component({
    selector: 'jhi-client-ams-delete-dialog',
    templateUrl: './client-ams-delete-dialog.component.html'
})
export class ClientAmsDeleteDialogComponent {

    client: ClientAms;

    constructor(
        private clientService: ClientAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientListModification',
                content: 'Deleted an client'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-ams-delete-popup',
    template: ''
})
export class ClientAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientPopupService: ClientAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientPopupService
                .open(ClientAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
