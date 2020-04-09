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
  }

}
