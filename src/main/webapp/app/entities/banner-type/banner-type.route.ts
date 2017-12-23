import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerTypeComponent } from './banner-type.component';
import { BannerTypeDetailComponent } from './banner-type-detail.component';
import { BannerTypePopupComponent } from './banner-type-dialog.component';
import { BannerTypeDeletePopupComponent } from './banner-type-delete-dialog.component';

@Injectable()
export class BannerTypeResolvePagingParams implements Resolve<any> {

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
        path: 'banner-type',
        component: BannerTypeComponent,
        resolve: {
            'pagingParams': BannerTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-type/:id',
        component: BannerTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerTypePopupRoute: Routes = [
    {
        path: 'banner-type-new',
        component: BannerTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-type/:id/edit',
        component: BannerTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-type/:id/delete',
        component: BannerTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
