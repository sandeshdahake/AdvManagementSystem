import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerLocationComponent } from './banner-location.component';
import { BannerLocationDetailComponent } from './banner-location-detail.component';
import { BannerLocationPopupComponent } from './banner-location-dialog.component';
import { BannerLocationDeletePopupComponent } from './banner-location-delete-dialog.component';

@Injectable()
export class BannerLocationResolvePagingParams implements Resolve<any> {

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

export const bannerLocationRoute: Routes = [
    {
        path: 'banner-location',
        component: BannerLocationComponent,
        resolve: {
            'pagingParams': BannerLocationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-location/:id',
        component: BannerLocationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerLocationPopupRoute: Routes = [
    {
        path: 'banner-location-new',
        component: BannerLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-location/:id/edit',
        component: BannerLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-location/:id/delete',
        component: BannerLocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
