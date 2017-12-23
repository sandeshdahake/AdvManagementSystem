import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CityAmsComponent } from './city-ams.component';
import { CityAmsDetailComponent } from './city-ams-detail.component';
import { CityAmsPopupComponent } from './city-ams-dialog.component';
import { CityAmsDeletePopupComponent } from './city-ams-delete-dialog.component';

@Injectable()
export class CityAmsResolvePagingParams implements Resolve<any> {

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

export const cityRoute: Routes = [
    {
        path: 'city-ams',
        component: CityAmsComponent,
        resolve: {
            'pagingParams': CityAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'city-ams/:id',
        component: CityAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityPopupRoute: Routes = [
    {
        path: 'city-ams-new',
        component: CityAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-ams/:id/edit',
        component: CityAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-ams/:id/delete',
        component: CityAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
