import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-form-text,div[layui-form-text]',
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
export class FormTextComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-form-mid')
    this.render.addClass(this.ef.nativeElement,'layui-word-aux')
  }

}
