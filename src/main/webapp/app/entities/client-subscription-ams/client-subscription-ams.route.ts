import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClientSubscriptionAmsComponent } from './client-subscription-ams.component';
import { ClientSubscriptionAmsDetailComponent } from './client-subscription-ams-detail.component';
import { ClientSubscriptionAmsPopupComponent } from './client-subscription-ams-dialog.component';
import { ClientSubscriptionAmsDeletePopupComponent } from './client-subscription-ams-delete-dialog.component';

@Injectable()
export class ClientSubscriptionAmsResolvePagingParams implements Resolve<any> {

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
        path: 'client-subscription-ams',
        component: ClientSubscriptionAmsComponent,
        resolve: {
            'pagingParams': ClientSubscriptionAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-subscription-ams/:id',
        component: ClientSubscriptionAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientSubscriptionPopupRoute: Routes = [
    {
        path: 'client-subscription-ams-new',
        component: ClientSubscriptionAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-subscription-ams/:id/edit',
        component: ClientSubscriptionAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-subscription-ams/:id/delete',
        component: ClientSubscriptionAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
