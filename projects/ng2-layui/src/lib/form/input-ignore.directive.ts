import {Directive, ElementRef, Renderer2} from "@angular/core";


@Directive({
  selector:'input[layui-input-ignore],select[layui-input-ignore],textarea[layui-input-ignore]'
})
export class InputIgnoreDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-ignore','')
  }

}
