import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-footer,div[layui-footer]',
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
export class FooterComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-footer')
  }

}
