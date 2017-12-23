import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerTypeService,
    BannerTypePopupService,
    BannerTypeComponent,
    BannerTypeDetailComponent,
    BannerTypeDialogComponent,
    BannerTypePopupComponent,
    BannerTypeDeletePopupComponent,
    BannerTypeDeleteDialogComponent,
    bannerTypeRoute,
    bannerTypePopupRoute,
    BannerTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bannerTypeRoute,
    ...bannerTypePopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BannerTypeComponent,
        BannerTypeDetailComponent,
        BannerTypeDialogComponent,
        BannerTypeDeleteDialogComponent,
        BannerTypePopupComponent,
        BannerTypeDeletePopupComponent,
    ],
    entryComponents: [
        BannerTypeComponent,
        BannerTypeDialogComponent,
        BannerTypePopupComponent,
        BannerTypeDeleteDialogComponent,
        BannerTypeDeletePopupComponent,
    ],
    providers: [
        BannerTypeService,
        BannerTypePopupService,
        BannerTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerTypeModule {}
