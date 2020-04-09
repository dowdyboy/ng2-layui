import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-form-input-block,div[layui-form-input-block]',
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
export class FormInputBlockComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-input-block')
  }

}
