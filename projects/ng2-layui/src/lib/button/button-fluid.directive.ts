import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";


@Directive({
  selector:'[layui-btn-fluid]'
})
export class ButtonFluidDirective implements OnChanges {

  @Input('theme') theme:string = null
  @Input('size') size:string = null

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-btn')
    this.render.addClass(this.ef.nativeElement,'layui-btn-fluid')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['theme']){
      if(changes['theme'].currentValue != null && changes['theme'].currentValue != ''){
        if(changes['theme'].previousValue != null && changes['theme'].previousValue != ''){
          this.render.removeClass(this.ef.nativeElement,`layui-btn-${changes['theme'].previousValue}`)
        }
        this.render.addClass(this.ef.nativeElement,`layui-btn-${changes['theme'].currentValue}`)
      }
    }
    if(changes['size']){
      if(changes['size'].currentValue != null && changes['size'].currentValue != ''){
        if(changes['size'].previousValue != null && changes['size'].previousValue != ''){
          this.render.removeClass(this.ef.nativeElement,`layui-btn-${changes['size'].previousValue}`)
        }
        this.render.addClass(this.ef.nativeElement,`layui-btn-${changes['size'].currentValue}`)
      }
    }
  }

}
