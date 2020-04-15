import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-body,div[layui-body]',
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
export class BodyComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-body')
  }

}
