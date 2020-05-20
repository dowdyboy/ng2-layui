import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";


@Directive({
  selector:'[layui-anim]'
})
export class AnimDirective implements OnChanges {

  @Input('layui-anim') type:string
  @Input('loop') loop:boolean = false

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-anim')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['type']){
      this.render.removeClass(this.ef.nativeElement,`layui-anim-${changes['type'].previousValue}`)
      this.render.addClass(this.ef.nativeElement,`layui-anim-${changes['type'].currentValue}`)
    }
    if(changes['loop']){
      if(this.loop) this.render.addClass(this.ef.nativeElement,'layui-anim-loop')
      else this.render.removeClass(this.ef.nativeElement,'layui-anim-loop')
    }
  }

}
