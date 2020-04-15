import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-layout-left]'
})
export class LayoutLeftDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-layout-left')
  }

}
