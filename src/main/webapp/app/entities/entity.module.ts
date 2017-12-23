import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdvManagementSystemClientModule } from './client/client.module';
import { AdvManagementSystemCityModule } from './city/city.module';
import { AdvManagementSystemBannerTypeModule } from './banner-type/banner-type.module';
import { AdvManagementSystemBannerSizeModule } from './banner-size/banner-size.module';
import { AdvManagementSystemBannerPageModule } from './banner-page/banner-page.module';
import { AdvManagementSystemBannerLocationModule } from './banner-location/banner-location.module';
import { AdvManagementSystemSubscriptionPeriodModule } from './subscription-period/subscription-period.module';
import { AdvManagementSystemSubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { AdvManagementSystemClientSubscriptionModule } from './client-subscription/client-subscription.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AdvManagementSystemClientModule,
        AdvManagementSystemCityModule,
        AdvManagementSystemBannerTypeModule,
        AdvManagementSystemBannerSizeModule,
        AdvManagementSystemBannerPageModule,
        AdvManagementSystemBannerLocationModule,
        AdvManagementSystemSubscriptionPeriodModule,
        AdvManagementSystemSubscriptionPlanModule,
        AdvManagementSystemClientSubscriptionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvManagementSystemEntityModule {}
