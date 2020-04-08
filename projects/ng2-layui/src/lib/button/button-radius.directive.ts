import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-btn-radius]'
})
export class ButtonRadiusDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-btn-radius')
  }

}
