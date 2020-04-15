import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";
import {LayuiColor} from "./layui-color";


@Directive({
  selector:'[layui-color]'
})
export class ColorDirective extends LayuiColor implements OnChanges{

  @Input('layui-color') color:string

  constructor(private ef:ElementRef,private render:Renderer2){
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render.setStyle(this.ef.nativeElement,'color',this.getColorValue(this.color))

  }

}
