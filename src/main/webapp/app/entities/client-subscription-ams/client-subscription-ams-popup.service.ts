import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ClientSubscriptionAms } from './client-subscription-ams.model';
import { ClientSubscriptionAmsService } from './client-subscription-ams.service';

@Injectable()
export class ClientSubscriptionAmsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private clientSubscriptionService: ClientSubscriptionAmsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.clientSubscriptionService.find(id).subscribe((clientSubscription) => {
                    clientSubscription.startDate = this.datePipe
                        .transform(clientSubscription.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    clientSubscription.endDate = this.datePipe
                        .transform(clientSubscription.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.clientSubscriptionModalRef(component, clientSubscription);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clientSubscriptionModalRef(component, new ClientSubscriptionAms());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clientSubscriptionModalRef(component: Component, clientSubscription: ClientSubscriptionAms): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clientSubscription = clientSubscription;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
