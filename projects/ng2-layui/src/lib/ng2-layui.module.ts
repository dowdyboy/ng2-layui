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

declare var layui;

@NgModule({
  declarations: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent
  ],
  imports: [],
  exports: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent
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
