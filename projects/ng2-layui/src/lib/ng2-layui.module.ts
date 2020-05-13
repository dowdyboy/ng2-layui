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
import {ColorDirective} from "./color/color.directive";
import {ColorBgDirective} from "./color/color-bg.directive";
import {CardComponent} from "./card/card.component";
import {CardHeaderComponent} from "./card/card-header.component";
import {CardBodyComponent} from "./card/card-body.component";
import {ButtonDirective} from "./button/button.directive";
import {ButtonFluidDirective} from "./button/button-fluid.directive";
import {ButtonRadiusDirective} from "./button/button-radius.directive";
import {ButtonGroupDirective} from "./button/button-group.directive";
import {ButtonContainerDirective} from "./button/button-container.directive";
import {FormComponent} from "./form/form.component";
import {FormItemComponent} from "./form/form-item.component";
import {FormLabelComponent} from "./form/form-label.component";
import {FormInputBlockComponent} from "./form/form-input-block.component";
import {InputComponent} from "./form/input.component";
import {FormInputInlineComponent} from "./form/form-input-inline.component";
import {FormTextComponent} from "./form/form-text.component";
import {InputIgnoreDirective} from "./form/input-ignore.directive";
import {InlineDirective} from "./layout/inline.directive";
import {FormSubmitDirective} from "./form/form-submit.directive";
import {LayoutComponent} from "./layout/layout.component";
import {HeaderComponent} from "./layout/header.component";
import {SideComponent} from "./layout/side.component";
import {BodyComponent} from "./layout/body.component";
import {FooterComponent} from "./layout/footer.component";
import {LogoComponent} from "./layout/logo.component";
import {NavComponent} from "./nav/nav.component";
import {LayoutLeftDirective} from "./layout/layout-left.directive";
import {LayoutRightDirective} from "./layout/layout-right.directive";
import {BreadcrumbComponent} from "./nav/breadcrumb.component";
import {TableComponent} from "./table/table.component";
import {PagerComponent} from "./pager/pager.component";
import {DateTimePickerDirective} from "./datetime/date-time-picker.directive";
import {TableDirective} from "./table/table.directive";

declare var layui;

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,InlineDirective,
    LayoutComponent,HeaderComponent,SideComponent,BodyComponent,FooterComponent,LogoComponent,LayoutLeftDirective,LayoutRightDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent,TabComponent,TabItemComponent,ColorDirective,ColorBgDirective,CardComponent,CardHeaderComponent,CardBodyComponent,
    ButtonDirective,ButtonFluidDirective,ButtonRadiusDirective,ButtonGroupDirective,ButtonContainerDirective,
    FormComponent,FormItemComponent,FormLabelComponent,FormInputBlockComponent,InputComponent,FormInputInlineComponent,
    FormTextComponent,InputIgnoreDirective,FormSubmitDirective,DateTimePickerDirective,
    NavComponent,BreadcrumbComponent,
    TableComponent,TableDirective,PagerComponent,
  ],
  exports: [
    ContainerDirective,RowDirective,ColXsDirective,ColSmDirective,ColMdDirective,ColLgDirective,FluidDirective,ColSpaceDirective,
    ColXsOffsetDirective,ColSmOffsetDirective,ColMdOffsetDirective,ColLgOffsetDirective,InlineDirective,
    LayoutComponent,HeaderComponent,SideComponent,BodyComponent,FooterComponent,LogoComponent,LayoutLeftDirective,LayoutRightDirective,
    ShowBlockDirective,ShowInlineDirective,ShowInlineBlockDirective,HideDirective,
    IconComponent,TabComponent,TabItemComponent,ColorDirective,ColorBgDirective,CardComponent,CardHeaderComponent,CardBodyComponent,
    ButtonDirective,ButtonFluidDirective,ButtonRadiusDirective,ButtonGroupDirective,ButtonContainerDirective,
    FormComponent,FormItemComponent,FormLabelComponent,FormInputBlockComponent,InputComponent,FormInputInlineComponent,
    FormTextComponent,InputIgnoreDirective,FormSubmitDirective,DateTimePickerDirective,
    NavComponent,BreadcrumbComponent,
    TableComponent,TableDirective,PagerComponent,
  ]
})
export class Ng2LayuiModule {

  static baseDir = './assets/layui/'

  static config(conf:{baseDir?:string}){
    Ng2LayuiModule.baseDir = conf.baseDir
    layui.config({
      dir:Ng2LayuiModule.baseDir
    })
  }

  constructor(){

  }

}
