import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientSubscription } from './client-subscription.model';
import { ClientSubscriptionPopupService } from './client-subscription-popup.service';
import { ClientSubscriptionService } from './client-subscription.service';

@Component({
    selector: 'jhi-client-subscription-delete-dialog',
    templateUrl: './client-subscription-delete-dialog.component.html'
})
export class ClientSubscriptionDeleteDialogComponent {

    clientSubscription: ClientSubscription;

    constructor(
        private clientSubscriptionService: ClientSubscriptionService,
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
    selector: 'jhi-client-subscription-delete-popup',
    template: ''
})
export class ClientSubscriptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientSubscriptionPopupService: ClientSubscriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientSubscriptionPopupService
                .open(ClientSubscriptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
