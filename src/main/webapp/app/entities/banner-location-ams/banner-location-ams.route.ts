import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerLocationAmsComponent } from './banner-location-ams.component';
import { BannerLocationAmsDetailComponent } from './banner-location-ams-detail.component';
import { BannerLocationAmsPopupComponent } from './banner-location-ams-dialog.component';
import { BannerLocationAmsDeletePopupComponent } from './banner-location-ams-delete-dialog.component';

@Injectable()
export class BannerLocationAmsResolvePagingParams implements Resolve<any> {

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
        path: 'banner-location-ams',
        component: BannerLocationAmsComponent,
        resolve: {
            'pagingParams': BannerLocationAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-location-ams/:id',
        component: BannerLocationAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerLocationPopupRoute: Routes = [
    {
        path: 'banner-location-ams-new',
        component: BannerLocationAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-location-ams/:id/edit',
        component: BannerLocationAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-location-ams/:id/delete',
        component: BannerLocationAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
