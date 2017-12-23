import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    ClientSubscriptionAmsService,
    ClientSubscriptionAmsPopupService,
    ClientSubscriptionAmsComponent,
    ClientSubscriptionAmsDetailComponent,
    ClientSubscriptionAmsDialogComponent,
    ClientSubscriptionAmsPopupComponent,
    ClientSubscriptionAmsDeletePopupComponent,
    ClientSubscriptionAmsDeleteDialogComponent,
    clientSubscriptionRoute,
    clientSubscriptionPopupRoute,
    ClientSubscriptionAmsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...clientSubscriptionRoute,
    ...clientSubscriptionPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientSubscriptionAmsComponent,
        ClientSubscriptionAmsDetailComponent,
        ClientSubscriptionAmsDialogComponent,
        ClientSubscriptionAmsDeleteDialogComponent,
        ClientSubscriptionAmsPopupComponent,
        ClientSubscriptionAmsDeletePopupComponent,
    ],
    entryComponents: [
        ClientSubscriptionAmsComponent,
        ClientSubscriptionAmsDialogComponent,
        ClientSubscriptionAmsPopupComponent,
        ClientSubscriptionAmsDeleteDialogComponent,
        ClientSubscriptionAmsDeletePopupComponent,
    ],
    providers: [
        ClientSubscriptionAmsService,
        ClientSubscriptionAmsPopupService,
        ClientSubscriptionAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemClientSubscriptionAmsModule {}
