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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    Ng2LayuiModule.config({baseDir:'./assets/layui/'})
  ],
  declarations: [
    AppComponent,LoginPage,MainPage
  ],
  providers: [
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
