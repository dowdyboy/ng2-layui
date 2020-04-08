import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-btn-container]'
})
export class ButtonContainerDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-btn-container')
  }

}
