import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from "@angular/core";

declare var layui;

@Component({
  selector:'layui-progress,div[layui-progress]',
  template:`
    <div #bar class="layui-progress-bar" lay-percent="0%"></div>
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class ProgressComponent implements OnChanges {

  @Input('isBig') isBig:boolean = false
  @Input('progress') progress:number = 0
  @Input('showPercent') showPercent:boolean = false
  @Input('color') color:string = null

  @ViewChild('bar',{static:true}) barEf:ElementRef

  private layFilter:string = `LF-PROGRESS-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    this.render.addClass(this.ef.nativeElement,'layui-progress')
    layui.use('element',()=>{
      layui.element.progress(this.layFilter,`${this.progress}%`)
    })
  }

  private freshProgress(){
    layui.use('element',()=>{
      layui.element.progress(this.layFilter,`${this.progress}%`)
      setTimeout(()=>{
        let progressTextElements = this.ef.nativeElement.getElementsByClassName('layui-progress-text')
        for(let i=0;i<progressTextElements.length;i++)
        {
          progressTextElements[i].innerHTML = `${this.progress}%`
        }
      },150)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isBig']){
      if(this.isBig) this.render.addClass(this.ef.nativeElement,'layui-progress-big')
      else this.render.removeClass(this.ef.nativeElement,'layui-progress-big')
    }
    if(changes['showPercent']){
      if(this.showPercent) this.render.setAttribute(this.ef.nativeElement,'lay-showPercent','yes')
      else this.render.removeAttribute(this.ef.nativeElement,'lay-showPercent')
    }
    if(changes['progress']){
      this.freshProgress()
    }
    if(changes['color']){
      this.render.removeClass(this.barEf.nativeElement,`layui-bg-${changes['color'].previousValue}`)
      this.render.addClass(this.barEf.nativeElement,`layui-bg-${changes['color'].currentValue}`)
    }
  }

}
