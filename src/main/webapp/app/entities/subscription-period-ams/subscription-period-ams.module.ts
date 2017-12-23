import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    SubscriptionPeriodAmsService,
    SubscriptionPeriodAmsPopupService,
    SubscriptionPeriodAmsComponent,
    SubscriptionPeriodAmsDetailComponent,
    SubscriptionPeriodAmsDialogComponent,
    SubscriptionPeriodAmsPopupComponent,
    SubscriptionPeriodAmsDeletePopupComponent,
    SubscriptionPeriodAmsDeleteDialogComponent,
    subscriptionPeriodRoute,
    subscriptionPeriodPopupRoute,
    SubscriptionPeriodAmsResolvePagingParams,
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
        SubscriptionPeriodAmsComponent,
        SubscriptionPeriodAmsDetailComponent,
        SubscriptionPeriodAmsDialogComponent,
        SubscriptionPeriodAmsDeleteDialogComponent,
        SubscriptionPeriodAmsPopupComponent,
        SubscriptionPeriodAmsDeletePopupComponent,
    ],
    entryComponents: [
        SubscriptionPeriodAmsComponent,
        SubscriptionPeriodAmsDialogComponent,
        SubscriptionPeriodAmsPopupComponent,
        SubscriptionPeriodAmsDeleteDialogComponent,
        SubscriptionPeriodAmsDeletePopupComponent,
    ],
    providers: [
        SubscriptionPeriodAmsService,
        SubscriptionPeriodAmsPopupService,
        SubscriptionPeriodAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemSubscriptionPeriodAmsModule {}
