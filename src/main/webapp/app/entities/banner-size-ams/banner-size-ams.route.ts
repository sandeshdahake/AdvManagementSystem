import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerSizeAmsComponent } from './banner-size-ams.component';
import { BannerSizeAmsDetailComponent } from './banner-size-ams-detail.component';
import { BannerSizeAmsPopupComponent } from './banner-size-ams-dialog.component';
import { BannerSizeAmsDeletePopupComponent } from './banner-size-ams-delete-dialog.component';

@Injectable()
export class BannerSizeAmsResolvePagingParams implements Resolve<any> {

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

export const bannerSizeRoute: Routes = [
    {
        path: 'banner-size-ams',
        component: BannerSizeAmsComponent,
        resolve: {
            'pagingParams': BannerSizeAmsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-size-ams/:id',
        component: BannerSizeAmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerSizePopupRoute: Routes = [
    {
        path: 'banner-size-ams-new',
        component: BannerSizeAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-size-ams/:id/edit',
        component: BannerSizeAmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-size-ams/:id/delete',
        component: BannerSizeAmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
