import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-layout,div[layui-layout]',
  template:`
  <ng-content></ng-content>
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class LayoutComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-layout')
    this.render.addClass(this.ef.nativeElement,'layui-layout-admin')
  }

}
