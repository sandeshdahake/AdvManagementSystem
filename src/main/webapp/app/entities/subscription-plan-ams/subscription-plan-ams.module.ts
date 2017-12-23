import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    SubscriptionPlanAmsService,
    SubscriptionPlanAmsPopupService,
    SubscriptionPlanAmsComponent,
    SubscriptionPlanAmsDetailComponent,
    SubscriptionPlanAmsDialogComponent,
    SubscriptionPlanAmsPopupComponent,
    SubscriptionPlanAmsDeletePopupComponent,
    SubscriptionPlanAmsDeleteDialogComponent,
    subscriptionPlanRoute,
    subscriptionPlanPopupRoute,
    SubscriptionPlanAmsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...subscriptionPlanRoute,
    ...subscriptionPlanPopupRoute,
];

@NgModule({
    imports: [
        AdvManagementSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubscriptionPlanAmsComponent,
        SubscriptionPlanAmsDetailComponent,
        SubscriptionPlanAmsDialogComponent,
        SubscriptionPlanAmsDeleteDialogComponent,
        SubscriptionPlanAmsPopupComponent,
        SubscriptionPlanAmsDeletePopupComponent,
    ],
    entryComponents: [
        SubscriptionPlanAmsComponent,
        SubscriptionPlanAmsDialogComponent,
        SubscriptionPlanAmsPopupComponent,
        SubscriptionPlanAmsDeleteDialogComponent,
        SubscriptionPlanAmsDeletePopupComponent,
    ],
    providers: [
        SubscriptionPlanAmsService,
        SubscriptionPlanAmsPopupService,
        SubscriptionPlanAmsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemSubscriptionPlanAmsModule {}
