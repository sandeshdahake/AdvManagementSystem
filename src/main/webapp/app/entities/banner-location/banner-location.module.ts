import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    BannerLocationService,
    BannerLocationPopupService,
    BannerLocationComponent,
    BannerLocationDetailComponent,
    BannerLocationDialogComponent,
    BannerLocationPopupComponent,
    BannerLocationDeletePopupComponent,
    BannerLocationDeleteDialogComponent,
    bannerLocationRoute,
    bannerLocationPopupRoute,
    BannerLocationResolvePagingParams,
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
        BannerLocationComponent,
        BannerLocationDetailComponent,
        BannerLocationDialogComponent,
        BannerLocationDeleteDialogComponent,
        BannerLocationPopupComponent,
        BannerLocationDeletePopupComponent,
    ],
    entryComponents: [
        BannerLocationComponent,
        BannerLocationDialogComponent,
        BannerLocationPopupComponent,
        BannerLocationDeleteDialogComponent,
        BannerLocationDeletePopupComponent,
    ],
    providers: [
        BannerLocationService,
        BannerLocationPopupService,
        BannerLocationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemBannerLocationModule {}
