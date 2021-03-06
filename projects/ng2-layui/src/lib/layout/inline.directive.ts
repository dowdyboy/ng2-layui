import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-inline]'
})
export class InlineDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-inline')
  }

}
