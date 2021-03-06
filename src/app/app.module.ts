import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ng2LayuiModule} from "../../projects/ng2-layui/src/lib/ng2-layui.module";
import {ConfigurationService} from "./services/configuration.service";
import {LoginPage} from "./pages/login/login.page";
import {MainPage} from "./pages/main/main.page";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TestPage} from "./pages/test/test.page";
import {AuthenticationService} from "./services/authentication.service";
import {ClientService} from "./services/client.service";
import {StatisticService} from "./services/statistic.service";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {ClientListFrag} from "./fragments/client/client-list.frag";
import {ClientAddFrag} from "./fragments/client/client-add.frag";
import {ClientModifyFrag} from "./fragments/client/client-modify.frag";
import {UserListFrag} from "./fragments/user/user-list.frag";
import {UserAddFrag} from "./fragments/user/user-add.frag";
import {UserModifyFrag} from "./fragments/user/user-modify.frag";
import {StatisticFrag} from "./fragments/statistic/statistic.frag";
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {NgxEchartsModule} from "ngx-echarts";
import {httpInterceptorProviders} from "./services/http-interceptor";
import {RouteService} from "./services/route.service";
import {AbcEntryListFrag} from "./fragments/route/abc-entry/abc-entry-list.frag";
import {AbcEntryAddFrag} from "./fragments/route/abc-entry/abc-entry-add.frag";
import {AbcEntryModifyFrag} from "./fragments/route/abc-entry/abc-entry-modify.frag";
import {AbcEntryRouteFormComponent} from "./components/abc-entry-route-form/abc-entry-route-form.component";

//"node_modules/echarts/map/china.js"
import 'echarts/map/js/china'
// import 'echarts/map/js/province/xizang'
// import 'echarts/extension/bmap/bmap'
// import 'echarts/extension/bmap/BMapCoordSys'
// import 'echarts/extension/bmap/BMapView'
// import 'echarts/extension/bmap/BMapModel'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxEchartsModule,
    Ng2LayuiModule
  ],
  declarations: [
    AppComponent,LoginPage,MainPage,TestPage,
    ClientListFrag,ClientAddFrag,ClientModifyFrag,UserListFrag,UserAddFrag,UserModifyFrag,StatisticFrag,
    AbcEntryListFrag,AbcEntryAddFrag,AbcEntryModifyFrag,
    ClientFormComponent,UserFormComponent,AbcEntryRouteFormComponent,
  ],
  providers: [
    ConfigurationService,AuthenticationService,ClientService,StatisticService,UserService,RouteService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){
  }

}
