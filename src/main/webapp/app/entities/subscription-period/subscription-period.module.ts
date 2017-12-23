import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    SubscriptionPeriodService,
    SubscriptionPeriodPopupService,
    SubscriptionPeriodComponent,
    SubscriptionPeriodDetailComponent,
    SubscriptionPeriodDialogComponent,
    SubscriptionPeriodPopupComponent,
    SubscriptionPeriodDeletePopupComponent,
    SubscriptionPeriodDeleteDialogComponent,
    subscriptionPeriodRoute,
    subscriptionPeriodPopupRoute,
    SubscriptionPeriodResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...subscriptionPeriodRoute,
    ...subscriptionPeriodPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubscriptionPeriodComponent,
        SubscriptionPeriodDetailComponent,
        SubscriptionPeriodDialogComponent,
        SubscriptionPeriodDeleteDialogComponent,
        SubscriptionPeriodPopupComponent,
        SubscriptionPeriodDeletePopupComponent,
    ],
    entryComponents: [
        SubscriptionPeriodComponent,
        SubscriptionPeriodDialogComponent,
        SubscriptionPeriodPopupComponent,
        SubscriptionPeriodDeleteDialogComponent,
        SubscriptionPeriodDeletePopupComponent,
    ],
    providers: [
        SubscriptionPeriodService,
        SubscriptionPeriodPopupService,
        SubscriptionPeriodResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemSubscriptionPeriodModule {}
