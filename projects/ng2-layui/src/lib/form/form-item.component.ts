import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-form-item,div[layui-form-item]',
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
export class FormItemComponent {

  constructor(
    public ef:ElementRef,
    public render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-form-item')
  }

}
