import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CityAms } from './city-ams.model';
import { CityAmsPopupService } from './city-ams-popup.service';
import { CityAmsService } from './city-ams.service';
import { ClientAms, ClientAmsService } from '../client-ams';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-city-ams-dialog',
    templateUrl: './city-ams-dialog.component.html'
})
export class CityAmsDialogComponent implements OnInit {

    city: CityAms;
    isSaving: boolean;

    clients: ClientAms[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cityService: CityAmsService,
        private clientService: ClientAmsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<CityAms>) {
        result.subscribe((res: CityAms) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CityAms) {
        this.eventManager.broadcast({ name: 'cityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: ClientAms) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-city-ams-popup',
    template: ''
})
export class CityAmsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityAmsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cityPopupService
                    .open(CityAmsDialogComponent as Component, params['id']);
            } else {
                this.cityPopupService
                    .open(CityAmsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
