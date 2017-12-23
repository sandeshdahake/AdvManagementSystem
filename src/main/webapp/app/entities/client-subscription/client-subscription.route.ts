import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClientSubscriptionComponent } from './client-subscription.component';
import { ClientSubscriptionDetailComponent } from './client-subscription-detail.component';
import { ClientSubscriptionPopupComponent } from './client-subscription-dialog.component';
import { ClientSubscriptionDeletePopupComponent } from './client-subscription-delete-dialog.component';

@Injectable()
export class ClientSubscriptionResolvePagingParams implements Resolve<any> {

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

export const clientSubscriptionRoute: Routes = [
    {
        path: 'client-subscription',
        component: ClientSubscriptionComponent,
        resolve: {
            'pagingParams': ClientSubscriptionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-subscription/:id',
        component: ClientSubscriptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientSubscriptionPopupRoute: Routes = [
    {
        path: 'client-subscription-new',
        component: ClientSubscriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-subscription/:id/edit',
        component: ClientSubscriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-subscription/:id/delete',
        component: ClientSubscriptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
