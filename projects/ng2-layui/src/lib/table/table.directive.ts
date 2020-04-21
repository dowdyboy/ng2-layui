import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";


@Directive({
  selector:'[layui-table]'
})
export class TableDirective implements OnChanges {

  @Input('stripe') stripe:boolean = false
  @Input('skin') skin:string = null
  @Input('size') size:string = null

  private layFilter:string = `LF-TABLE-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-table')
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    if(this.stripe){
      this.render.setAttribute(this.ef.nativeElement,'lay-even','')
    }else{
      this.render.removeAttribute(this.ef.nativeElement,'lay-even')
    }
    if(this.skin){
      this.render.setAttribute(this.ef.nativeElement,'lay-skin',this.skin)
    }else{
      this.render.removeAttribute(this.ef.nativeElement,'lay-skin')
    }
    if(this.size){
      this.render.setAttribute(this.ef.nativeElement,'lay-size',this.size)
    }else{
      this.render.removeAttribute(this.ef.nativeElement,'lay-size')
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['stripe']){
      if(changes['stripe'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-even','')
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-even')
      }
    }
    if(changes['skin']){
      if(changes['skin'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-skin',changes['skin'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-skin')
      }
    }
    if(changes['size']){
      if(changes['size'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-size',changes['size'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-size')
      }
    }
  }

}
