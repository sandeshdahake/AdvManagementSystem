import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerPageAmsComponent } from './banner-page-ams.component';
import { BannerPageAmsDetailComponent } from './banner-page-ams-detail.component';
import { BannerPageAmsPopupComponent } from './banner-page-ams-dialog.component';
import { BannerPageAmsDeletePopupComponent } from './banner-page-ams-delete-dialog.component';

@Injectable()
export class BannerPageAmsResolvePagingParams implements Resolve<any> {

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
        path: 'banner-page-ams',
        component: BannerPageAmsComponent,
        resolve: {
            'pagingParams': BannerPageAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-page-ams/:id',
        component: BannerPageAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerPagePopupRoute: Routes = [
    {
        path: 'banner-page-ams-new',
        component: BannerPageAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-page-ams/:id/edit',
        component: BannerPageAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-page-ams/:id/delete',
        component: BannerPageAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerPages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
