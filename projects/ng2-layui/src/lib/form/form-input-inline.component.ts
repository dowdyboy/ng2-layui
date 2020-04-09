import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-form-input-inline,div[layui-form-input-inline]',
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
export class FormInputInlineComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-input-inline')
  }

}
