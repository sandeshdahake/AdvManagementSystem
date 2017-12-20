import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AdvManagementSystemSharedModule, UserRouteAccessService } from './shared';
import { AdvManagementSystemAppRoutingModule} from './app-routing.module';
import { AdvManagementSystemHomeModule } from './home/home.module';
import { AdvManagementSystemAdminModule } from './admin/admin.module';
import { AdvManagementSystemAccountModule } from './account/account.module';
import { AdvManagementSystemEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        AdvManagementSystemAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        AdvManagementSystemSharedModule,
        AdvManagementSystemHomeModule,
        AdvManagementSystemAdminModule,
        AdvManagementSystemAccountModule,
        AdvManagementSystemEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class AdvManagementSystemAppModule {}
