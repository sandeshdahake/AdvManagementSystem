import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPeriod } from './subscription-period.model';
import { SubscriptionPeriodService } from './subscription-period.service';

@Injectable()
export class SubscriptionPeriodPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private subscriptionPeriodService: SubscriptionPeriodService

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
                this.subscriptionPeriodService.find(id).subscribe((subscriptionPeriod) => {
                    this.ngbModalRef = this.subscriptionPeriodModalRef(component, subscriptionPeriod);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subscriptionPeriodModalRef(component, new SubscriptionPeriod());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subscriptionPeriodModalRef(component: Component, subscriptionPeriod: SubscriptionPeriod): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subscriptionPeriod = subscriptionPeriod;
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
