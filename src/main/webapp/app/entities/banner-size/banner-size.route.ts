import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BannerSizeComponent } from './banner-size.component';
import { BannerSizeDetailComponent } from './banner-size-detail.component';
import { BannerSizePopupComponent } from './banner-size-dialog.component';
import { BannerSizeDeletePopupComponent } from './banner-size-delete-dialog.component';

@Injectable()
export class BannerSizeResolvePagingParams implements Resolve<any> {

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
        path: 'banner-size',
        component: BannerSizeComponent,
        resolve: {
            'pagingParams': BannerSizeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banner-size/:id',
        component: BannerSizeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bannerSizePopupRoute: Routes = [
    {
        path: 'banner-size-new',
        component: BannerSizePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-size/:id/edit',
        component: BannerSizePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banner-size/:id/delete',
        component: BannerSizeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BannerSizes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
