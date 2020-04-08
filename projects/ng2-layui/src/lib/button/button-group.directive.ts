import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-btn-group]'
})
export class ButtonGroupDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-btn-group')
  }

}
