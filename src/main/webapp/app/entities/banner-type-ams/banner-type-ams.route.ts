import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerTypeAmsComponent } from './banner-type-ams.component';
import { BannerTypeAmsDetailComponent } from './banner-type-ams-detail.component';
import { BannerTypeAmsPopupComponent } from './banner-type-ams-dialog.component';
import { BannerTypeAmsDeletePopupComponent } from './banner-type-ams-delete-dialog.component';

@Injectable()
export class BannerTypeAmsResolvePagingParams implements Resolve<any> {

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

export const bannerTypeRoute: Routes = [
    {
        path: 'banner-type-ams',
        component: BannerTypeAmsComponent,
        resolve: {
            'pagingParams': BannerTypeAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-type-ams/:id',
        component: BannerTypeAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerTypePopupRoute: Routes = [
    {
        path: 'banner-type-ams-new',
        component: BannerTypeAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-type-ams/:id/edit',
        component: BannerTypeAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-type-ams/:id/delete',
        component: BannerTypeAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
