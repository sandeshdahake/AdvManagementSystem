import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    ClientAmsService,
    ClientAmsPopupService,
    ClientAmsComponent,
    ClientAmsDetailComponent,
    ClientAmsDialogComponent,
    ClientAmsPopupComponent,
    ClientAmsDeletePopupComponent,
    ClientAmsDeleteDialogComponent,
    clientRoute,
    clientPopupRoute,
    ClientAmsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...clientRoute,
    ...clientPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientAmsComponent,
        ClientAmsDetailComponent,
        ClientAmsDialogComponent,
        ClientAmsDeleteDialogComponent,
        ClientAmsPopupComponent,
        ClientAmsDeletePopupComponent,
    ],
    entryComponents: [
        ClientAmsComponent,
        ClientAmsDialogComponent,
        ClientAmsPopupComponent,
        ClientAmsDeleteDialogComponent,
        ClientAmsDeletePopupComponent,
    ],
    providers: [
        ClientAmsService,
        ClientAmsPopupService,
        ClientAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemClientAmsModule {}
