import {Component, ElementRef, Input, Renderer2} from "@angular/core";


@Component({
  selector:'layui-tab-item,div[layui-tab-item]',
  template:`
    <ng-content></ng-content>
  `
})
export class TabItemComponent {

  @Input('title') title:string

  constructor(private ef:ElementRef,private render:Renderer2){
    this.render.addClass(this.ef.nativeElement,'layui-tab-item')
  }

  show(){
    this.render.addClass(this.ef.nativeElement,'layui-show')
  }

}
