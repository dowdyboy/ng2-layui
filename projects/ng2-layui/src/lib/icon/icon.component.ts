import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";


@Component({
  selector:'layui-icon,i[layui-icon]',
  template:``,
  styles:[
    `
    :host{
      display: inline;
    }
    `
  ]
})
export class IconComponent implements OnChanges{

  @Input('type') type:string
  @Input('rotate') rotate:boolean = false

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-icon')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['type']){
      this.render.removeClass(this.ef.nativeElement,`layui-icon-${changes['type'].previousValue}`)
      this.render.addClass(this.ef.nativeElement,`layui-icon-${changes['type'].currentValue}`)
    }
    if(changes['rotate']){
      if(changes['rotate'].currentValue){
        this.render.addClass(this.ef.nativeElement,'layui-anim')
        this.render.addClass(this.ef.nativeElement,'layui-anim-rotate')
        this.render.addClass(this.ef.nativeElement,'layui-anim-loop')
      }else{
        this.render.removeClass(this.ef.nativeElement,'layui-anim')
        this.render.removeClass(this.ef.nativeElement,'layui-anim-rotate')
        this.render.removeClass(this.ef.nativeElement,'layui-anim-loop')
      }
    }
  }

}
