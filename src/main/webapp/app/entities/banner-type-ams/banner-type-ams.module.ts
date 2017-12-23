import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerTypeAmsService,
    BannerTypeAmsPopupService,
    BannerTypeAmsComponent,
    BannerTypeAmsDetailComponent,
    BannerTypeAmsDialogComponent,
    BannerTypeAmsPopupComponent,
    BannerTypeAmsDeletePopupComponent,
    BannerTypeAmsDeleteDialogComponent,
    bannerTypeRoute,
    bannerTypePopupRoute,
    BannerTypeAmsResolvePagingParams,
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
        BannerTypeAmsComponent,
        BannerTypeAmsDetailComponent,
        BannerTypeAmsDialogComponent,
        BannerTypeAmsDeleteDialogComponent,
        BannerTypeAmsPopupComponent,
        BannerTypeAmsDeletePopupComponent,
    ],
    entryComponents: [
        BannerTypeAmsComponent,
        BannerTypeAmsDialogComponent,
        BannerTypeAmsPopupComponent,
        BannerTypeAmsDeleteDialogComponent,
        BannerTypeAmsDeletePopupComponent,
    ],
    providers: [
        BannerTypeAmsService,
        BannerTypeAmsPopupService,
        BannerTypeAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerTypeAmsModule {}
