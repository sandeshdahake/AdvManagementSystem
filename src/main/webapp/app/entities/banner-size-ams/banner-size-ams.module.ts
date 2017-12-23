import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerSizeAmsService,
    BannerSizeAmsPopupService,
    BannerSizeAmsComponent,
    BannerSizeAmsDetailComponent,
    BannerSizeAmsDialogComponent,
    BannerSizeAmsPopupComponent,
    BannerSizeAmsDeletePopupComponent,
    BannerSizeAmsDeleteDialogComponent,
    bannerSizeRoute,
    bannerSizePopupRoute,
    BannerSizeAmsResolvePagingParams,
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
        BannerSizeAmsComponent,
        BannerSizeAmsDetailComponent,
        BannerSizeAmsDialogComponent,
        BannerSizeAmsDeleteDialogComponent,
        BannerSizeAmsPopupComponent,
        BannerSizeAmsDeletePopupComponent,
    ],
    entryComponents: [
        BannerSizeAmsComponent,
        BannerSizeAmsDialogComponent,
        BannerSizeAmsPopupComponent,
        BannerSizeAmsDeleteDialogComponent,
        BannerSizeAmsDeletePopupComponent,
    ],
    providers: [
        BannerSizeAmsService,
        BannerSizeAmsPopupService,
        BannerSizeAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerSizeAmsModule {}
