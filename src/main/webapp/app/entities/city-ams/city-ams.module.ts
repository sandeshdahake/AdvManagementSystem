import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    CityAmsService,
    CityAmsPopupService,
    CityAmsComponent,
    CityAmsDetailComponent,
    CityAmsDialogComponent,
    CityAmsPopupComponent,
    CityAmsDeletePopupComponent,
    CityAmsDeleteDialogComponent,
    cityRoute,
    cityPopupRoute,
    CityAmsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cityRoute,
    ...cityPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CityAmsComponent,
        CityAmsDetailComponent,
        CityAmsDialogComponent,
        CityAmsDeleteDialogComponent,
        CityAmsPopupComponent,
        CityAmsDeletePopupComponent,
    ],
    entryComponents: [
        CityAmsComponent,
        CityAmsDialogComponent,
        CityAmsPopupComponent,
        CityAmsDeleteDialogComponent,
        CityAmsDeletePopupComponent,
    ],
    providers: [
        CityAmsService,
        CityAmsPopupService,
        CityAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemCityAmsModule {}
