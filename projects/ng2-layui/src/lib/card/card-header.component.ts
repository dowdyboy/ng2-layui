import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-card-header',
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
export class CardHeaderComponent {

  constructor(
    private render:Renderer2,
    private ef:ElementRef
  ){
    this.render.addClass(this.ef.nativeElement,'layui-card-header')
  }

}
