import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SubscriptionPeriodComponent } from './subscription-period.component';
import { SubscriptionPeriodDetailComponent } from './subscription-period-detail.component';
import { SubscriptionPeriodPopupComponent } from './subscription-period-dialog.component';
import { SubscriptionPeriodDeletePopupComponent } from './subscription-period-delete-dialog.component';

@Injectable()
export class SubscriptionPeriodResolvePagingParams implements Resolve<any> {

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

export const subscriptionPeriodRoute: Routes = [
    {
        path: 'subscription-period',
        component: SubscriptionPeriodComponent,
        resolve: {
            'pagingParams': SubscriptionPeriodResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subscription-period/:id',
        component: SubscriptionPeriodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscriptionPeriodPopupRoute: Routes = [
    {
        path: 'subscription-period-new',
        component: SubscriptionPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-period/:id/edit',
        component: SubscriptionPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-period/:id/delete',
        component: SubscriptionPeriodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
