import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClientAmsComponent } from './client-ams.component';
import { ClientAmsDetailComponent } from './client-ams-detail.component';
import { ClientAmsPopupComponent } from './client-ams-dialog.component';
import { ClientAmsDeletePopupComponent } from './client-ams-delete-dialog.component';

@Injectable()
export class ClientAmsResolvePagingParams implements Resolve<any> {

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

export const clientRoute: Routes = [
    {
        path: 'client-ams',
        component: ClientAmsComponent,
        resolve: {
            'pagingParams': ClientAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-ams/:id',
        component: ClientAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientPopupRoute: Routes = [
    {
        path: 'client-ams-new',
        component: ClientAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-ams/:id/edit',
        component: ClientAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-ams/:id/delete',
        component: ClientAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
