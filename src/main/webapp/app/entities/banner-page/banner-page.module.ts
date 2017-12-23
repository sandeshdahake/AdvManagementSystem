import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerPageService,
    BannerPagePopupService,
    BannerPageComponent,
    BannerPageDetailComponent,
    BannerPageDialogComponent,
    BannerPagePopupComponent,
    BannerPageDeletePopupComponent,
    BannerPageDeleteDialogComponent,
    bannerPageRoute,
    bannerPagePopupRoute,
    BannerPageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bannerPageRoute,
    ...bannerPagePopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BannerPageComponent,
        BannerPageDetailComponent,
        BannerPageDialogComponent,
        BannerPageDeleteDialogComponent,
        BannerPagePopupComponent,
        BannerPageDeletePopupComponent,
    ],
    entryComponents: [
        BannerPageComponent,
        BannerPageDialogComponent,
        BannerPagePopupComponent,
        BannerPageDeleteDialogComponent,
        BannerPageDeletePopupComponent,
    ],
    providers: [
        BannerPageService,
        BannerPagePopupService,
        BannerPageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerPageModule {}
