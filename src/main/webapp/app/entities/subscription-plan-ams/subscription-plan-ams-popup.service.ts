import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPlanAms } from './subscription-plan-ams.model';
import { SubscriptionPlanAmsService } from './subscription-plan-ams.service';

@Injectable()
export class SubscriptionPlanAmsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private subscriptionPlanService: SubscriptionPlanAmsService

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
                this.subscriptionPlanService.find(id).subscribe((subscriptionPlan) => {
                    this.ngbModalRef = this.subscriptionPlanModalRef(component, subscriptionPlan);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subscriptionPlanModalRef(component, new SubscriptionPlanAms());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subscriptionPlanModalRef(component: Component, subscriptionPlan: SubscriptionPlanAms): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subscriptionPlan = subscriptionPlan;
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
