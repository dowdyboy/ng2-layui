import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ng2LayuiModule} from "../../projects/ng2-layui/src/lib/ng2-layui.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2LayuiModule.config({baseDir:'./assets/layui/'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
