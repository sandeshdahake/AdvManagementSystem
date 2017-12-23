import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientSubscriptionAms } from './client-subscription-ams.model';
import { ClientSubscriptionAmsPopupService } from './client-subscription-ams-popup.service';
import { ClientSubscriptionAmsService } from './client-subscription-ams.service';

@Component({
    selector: 'jhi-client-subscription-ams-delete-dialog',
    templateUrl: './client-subscription-ams-delete-dialog.component.html'
})
export class ClientSubscriptionAmsDeleteDialogComponent {

    clientSubscription: ClientSubscriptionAms;

    constructor(
        private clientSubscriptionService: ClientSubscriptionAmsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientSubscriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientSubscriptionListModification',
                content: 'Deleted an clientSubscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-subscription-ams-delete-popup',
    template: ''
})
export class ClientSubscriptionAmsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientSubscriptionPopupService: ClientSubscriptionAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientSubscriptionPopupService
                .open(ClientSubscriptionAmsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
