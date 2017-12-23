import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvManagementSystemSharedModule } from '../../shared';
import {
    SubscriptionPlanService,
    SubscriptionPlanPopupService,
    SubscriptionPlanComponent,
    SubscriptionPlanDetailComponent,
    SubscriptionPlanDialogComponent,
    SubscriptionPlanPopupComponent,
    SubscriptionPlanDeletePopupComponent,
    SubscriptionPlanDeleteDialogComponent,
    subscriptionPlanRoute,
    subscriptionPlanPopupRoute,
    SubscriptionPlanResolvePagingParams,
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
        SubscriptionPlanComponent,
        SubscriptionPlanDetailComponent,
        SubscriptionPlanDialogComponent,
        SubscriptionPlanDeleteDialogComponent,
        SubscriptionPlanPopupComponent,
        SubscriptionPlanDeletePopupComponent,
    ],
    entryComponents: [
        SubscriptionPlanComponent,
        SubscriptionPlanDialogComponent,
        SubscriptionPlanPopupComponent,
        SubscriptionPlanDeleteDialogComponent,
        SubscriptionPlanDeletePopupComponent,
    ],
    providers: [
        SubscriptionPlanService,
        SubscriptionPlanPopupService,
        SubscriptionPlanResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemSubscriptionPlanModule {}
