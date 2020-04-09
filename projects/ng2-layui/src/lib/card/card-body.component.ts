import {Component, ElementRef, Renderer2} from "@angular/core";

@Component({
  selector:'layui-card-body,div[layui-card-body]',
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
export class CardBodyComponent {

  constructor(
    private render:Renderer2,
    private ef:ElementRef
  ){
    this.render.addClass(this.ef.nativeElement,'layui-card-body')
  }

}
