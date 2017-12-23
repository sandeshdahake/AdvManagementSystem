import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerPageAmsService,
    BannerPageAmsPopupService,
    BannerPageAmsComponent,
    BannerPageAmsDetailComponent,
    BannerPageAmsDialogComponent,
    BannerPageAmsPopupComponent,
    BannerPageAmsDeletePopupComponent,
    BannerPageAmsDeleteDialogComponent,
    bannerPageRoute,
    bannerPagePopupRoute,
    BannerPageAmsResolvePagingParams,
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
        BannerPageAmsComponent,
        BannerPageAmsDetailComponent,
        BannerPageAmsDialogComponent,
        BannerPageAmsDeleteDialogComponent,
        BannerPageAmsPopupComponent,
        BannerPageAmsDeletePopupComponent,
    ],
    entryComponents: [
        BannerPageAmsComponent,
        BannerPageAmsDialogComponent,
        BannerPageAmsPopupComponent,
        BannerPageAmsDeleteDialogComponent,
        BannerPageAmsDeletePopupComponent,
    ],
    providers: [
        BannerPageAmsService,
        BannerPageAmsPopupService,
        BannerPageAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerPageAmsModule {}
