import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-logo,div[layui-logo]',
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
export class LogoComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-logo')
  }

}
