import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SubscriptionPlanAmsComponent } from './subscription-plan-ams.component';
import { SubscriptionPlanAmsDetailComponent } from './subscription-plan-ams-detail.component';
import { SubscriptionPlanAmsPopupComponent } from './subscription-plan-ams-dialog.component';
import { SubscriptionPlanAmsDeletePopupComponent } from './subscription-plan-ams-delete-dialog.component';

@Injectable()
export class SubscriptionPlanAmsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const subscriptionPlanRoute: Routes = [
    {
        path: 'subscription-plan-ams',
        component: SubscriptionPlanAmsComponent,
        resolve: {
            'pagingParams': SubscriptionPlanAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPlans'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subscription-plan-ams/:id',
        component: SubscriptionPlanAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscriptionPlanPopupRoute: Routes = [
    {
        path: 'subscription-plan-ams-new',
        component: SubscriptionPlanAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-plan-ams/:id/edit',
        component: SubscriptionPlanAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-plan-ams/:id/delete',
        component: SubscriptionPlanAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
