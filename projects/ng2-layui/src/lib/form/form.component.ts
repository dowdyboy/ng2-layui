import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'form[layui-form]',
  template:`
    <ng-content></ng-content>
  `
})
export class FormComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-form')
  }

}
