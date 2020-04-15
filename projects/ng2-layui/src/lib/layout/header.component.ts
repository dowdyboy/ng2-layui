import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-header,div[layui-header]',
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
export class HeaderComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-header')
  }

}
