import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SubscriptionPeriodAmsComponent } from './subscription-period-ams.component';
import { SubscriptionPeriodAmsDetailComponent } from './subscription-period-ams-detail.component';
import { SubscriptionPeriodAmsPopupComponent } from './subscription-period-ams-dialog.component';
import { SubscriptionPeriodAmsDeletePopupComponent } from './subscription-period-ams-delete-dialog.component';

@Injectable()
export class SubscriptionPeriodAmsResolvePagingParams implements Resolve<any> {

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
        path: 'subscription-period-ams',
        component: SubscriptionPeriodAmsComponent,
        resolve: {
            'pagingParams': SubscriptionPeriodAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subscription-period-ams/:id',
        component: SubscriptionPeriodAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscriptionPeriodPopupRoute: Routes = [
    {
        path: 'subscription-period-ams-new',
        component: SubscriptionPeriodAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-period-ams/:id/edit',
        component: SubscriptionPeriodAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subscription-period-ams/:id/delete',
        component: SubscriptionPeriodAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubscriptionPeriods'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
