import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerPageComponent } from './banner-page.component';
import { BannerPageDetailComponent } from './banner-page-detail.component';
import { BannerPagePopupComponent } from './banner-page-dialog.component';
import { BannerPageDeletePopupComponent } from './banner-page-delete-dialog.component';

@Injectable()
export class BannerPageResolvePagingParams implements Resolve<any> {

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

export const bannerPageRoute: Routes = [
    {
        path: 'banner-page',
        component: BannerPageComponent,
        resolve: {
            'pagingParams': BannerPageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-page/:id',
        component: BannerPageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerPagePopupRoute: Routes = [
    {
        path: 'banner-page-new',
        component: BannerPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-page/:id/edit',
        component: BannerPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-page/:id/delete',
        component: BannerPageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
