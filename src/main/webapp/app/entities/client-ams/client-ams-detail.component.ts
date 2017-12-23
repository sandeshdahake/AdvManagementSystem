import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ClientAms } from './client-ams.model';
import { ClientAmsService } from './client-ams.service';

@Component({
    selector: 'jhi-client-ams-detail',
    templateUrl: './client-ams-detail.component.html'
})
export class ClientAmsDetailComponent implements OnInit, OnDestroy {

    client: ClientAms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private clientService: ClientAmsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClients();
    }

    load(id) {
        this.clientService.find(id).subscribe((client) => {
            this.client = client;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientListModification',
            (response) => this.load(this.client.id)
        );
    }
}
