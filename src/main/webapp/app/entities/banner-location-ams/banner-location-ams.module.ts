import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerLocationAmsService,
    BannerLocationAmsPopupService,
    BannerLocationAmsComponent,
    BannerLocationAmsDetailComponent,
    BannerLocationAmsDialogComponent,
    BannerLocationAmsPopupComponent,
    BannerLocationAmsDeletePopupComponent,
    BannerLocationAmsDeleteDialogComponent,
    bannerLocationRoute,
    bannerLocationPopupRoute,
    BannerLocationAmsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bannerLocationRoute,
    ...bannerLocationPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BannerLocationAmsComponent,
        BannerLocationAmsDetailComponent,
        BannerLocationAmsDialogComponent,
        BannerLocationAmsDeleteDialogComponent,
        BannerLocationAmsPopupComponent,
        BannerLocationAmsDeletePopupComponent,
    ],
    entryComponents: [
        BannerLocationAmsComponent,
        BannerLocationAmsDialogComponent,
        BannerLocationAmsPopupComponent,
        BannerLocationAmsDeleteDialogComponent,
        BannerLocationAmsDeletePopupComponent,
    ],
    providers: [
        BannerLocationAmsService,
        BannerLocationAmsPopupService,
        BannerLocationAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerLocationAmsModule {}
