import { NgModule } from '@angular/core';
import {ContainerDirective} from "./layout/container.directive";
import {RowDirective} from "./layout/row.directive";
import {
  ColLgDirective, ColLgOffsetDirective,
  ColMdDirective, ColMdOffsetDirective,
  ColSmDirective, ColSmOffsetDirective,
  ColSpaceDirective,
  ColXsDirective, ColXsOffsetDirective
} from "./layout/col.directive";
import {IconComponent} from "./icon/icon.component";
import {FluidDirective} from "./layout/fluid.directive";
import {
  HideDirective,
  ShowBlockDirective,
  ShowInlineBlockDirective,
  ShowInlineDirective
} from "./layout/show-hide.directive";
import {TabComponent} from "./tab/tab.component";
import {TabItemComponent} from "./tab/tab-item.component";
import {CommonModule} from "@angular/common";

declare var layui;

@NgModule({
  declarations: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent,TabComponent,TabItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent,TabComponent,TabItemComponent
  ]
})
export class Ng2LayuiModule {

  static baseDir = './'

  static config(conf:{baseDir?:string}){
    Ng2LayuiModule.baseDir = !!conf.baseDir?conf.baseDir:Ng2LayuiModule.baseDir
    return Ng2LayuiModule
  }

  constructor(){
    layui.config({
      dir:Ng2LayuiModule.baseDir
    })
  }

}
