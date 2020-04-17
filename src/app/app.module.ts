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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2LayuiModule.config({baseDir:'./assets/layui/'})
  ],
  declarations: [
    AppComponent,LoginPage,MainPage,TestPage,
    ClientListFrag,
  ],
  providers: [
    ConfigurationService,AuthenticationService,ClientService,StatisticService,UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
