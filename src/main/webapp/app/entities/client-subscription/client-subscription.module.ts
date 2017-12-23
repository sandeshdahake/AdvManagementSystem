import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    ClientSubscriptionService,
    ClientSubscriptionPopupService,
    ClientSubscriptionComponent,
    ClientSubscriptionDetailComponent,
    ClientSubscriptionDialogComponent,
    ClientSubscriptionPopupComponent,
    ClientSubscriptionDeletePopupComponent,
    ClientSubscriptionDeleteDialogComponent,
    clientSubscriptionRoute,
    clientSubscriptionPopupRoute,
    ClientSubscriptionResolvePagingParams,
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
        ClientSubscriptionComponent,
        ClientSubscriptionDetailComponent,
        ClientSubscriptionDialogComponent,
        ClientSubscriptionDeleteDialogComponent,
        ClientSubscriptionPopupComponent,
        ClientSubscriptionDeletePopupComponent,
    ],
    entryComponents: [
        ClientSubscriptionComponent,
        ClientSubscriptionDialogComponent,
        ClientSubscriptionPopupComponent,
        ClientSubscriptionDeleteDialogComponent,
        ClientSubscriptionDeletePopupComponent,
    ],
    providers: [
        ClientSubscriptionService,
        ClientSubscriptionPopupService,
        ClientSubscriptionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemClientSubscriptionModule {}
