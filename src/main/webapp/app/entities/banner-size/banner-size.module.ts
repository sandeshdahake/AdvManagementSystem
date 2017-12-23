import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerSizeService,
    BannerSizePopupService,
    BannerSizeComponent,
    BannerSizeDetailComponent,
    BannerSizeDialogComponent,
    BannerSizePopupComponent,
    BannerSizeDeletePopupComponent,
    BannerSizeDeleteDialogComponent,
    bannerSizeRoute,
    bannerSizePopupRoute,
    BannerSizeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bannerSizeRoute,
    ...bannerSizePopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BannerSizeComponent,
        BannerSizeDetailComponent,
        BannerSizeDialogComponent,
        BannerSizeDeleteDialogComponent,
        BannerSizePopupComponent,
        BannerSizeDeletePopupComponent,
    ],
    entryComponents: [
        BannerSizeComponent,
        BannerSizeDialogComponent,
        BannerSizePopupComponent,
        BannerSizeDeleteDialogComponent,
        BannerSizeDeletePopupComponent,
    ],
    providers: [
        BannerSizeService,
        BannerSizePopupService,
        BannerSizeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerSizeModule {}
