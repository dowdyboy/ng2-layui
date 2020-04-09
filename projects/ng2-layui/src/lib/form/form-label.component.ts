import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-form-label,label[layui-form-label]',
  template:`
  <ng-content></ng-content>
  `,
  styles:[
    `
    :host{
      display: inline;
    }
    `
  ]
})
export class FormLabelComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-form-label')
  }

}
