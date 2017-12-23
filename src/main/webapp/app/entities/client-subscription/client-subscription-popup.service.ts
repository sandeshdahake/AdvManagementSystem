import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientSubscription } from './client-subscription.model';
import { ClientSubscriptionService } from './client-subscription.service';

@Injectable()
export class ClientSubscriptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clientSubscriptionService: ClientSubscriptionService

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
                    if (clientSubscription.startDate) {
                        clientSubscription.startDate = {
                            year: clientSubscription.startDate.getFullYear(),
                            month: clientSubscription.startDate.getMonth() + 1,
                            day: clientSubscription.startDate.getDate()
                        };
                    }
                    if (clientSubscription.endDate) {
                        clientSubscription.endDate = {
                            year: clientSubscription.endDate.getFullYear(),
                            month: clientSubscription.endDate.getMonth() + 1,
                            day: clientSubscription.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.clientSubscriptionModalRef(component, clientSubscription);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clientSubscriptionModalRef(component, new ClientSubscription());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clientSubscriptionModalRef(component: Component, clientSubscription: ClientSubscription): NgbModalRef {
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
