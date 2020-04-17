import {Directive, ElementRef, Input, NgZone, OnChanges, Renderer2, SimpleChanges} from "@angular/core";

declare var layui;

@Directive({
  selector:'[layui-datetime-picker]'
})
export class DateTimePickerDirective implements OnChanges{

  @Input('pickType') pickType:string = 'date'
  @Input('range') range:boolean|string = false
  @Input('format') format:string = 'yyyy-MM-dd'
  @Input('value') value:Date|string = new Date()
  @Input('max') max:string = '2099-12-31'
  @Input('min') min:string = '1900-1-1'
  @Input('trigger') trigger:string = 'focus'
  @Input('show') show:boolean = false
  @Input('position') position:string = 'absolute'
  @Input('zIndex') zIndex:number = 66666666
  @Input('showBottom') showBottom:boolean = true
  @Input('lang') lang:string = 'cn'
  @Input('theme') theme:string = 'default'
  @Input('calendar') calendar:boolean = false
  @Input('mark') mark:{[key:string]:string} = null

  private queueCount:number = 0
  private prevDate:any = null
  private prevEndDate:any = null

  constructor(
    private ef:ElementRef,
    private render:Renderer2,
    private zone:NgZone
  ){
    this.layuiRender()
  }

  private comparePrevDate(date:any,endDate:any){
    if(!this.prevDate || !this.prevEndDate){
      this.prevDate = date
      this.prevEndDate = endDate
      let time = Object.keys(date).length>0?new Date():null
      let endTime = Object.keys(endDate).length>0?new Date():null
      if(time){
        Object.keys(date).forEach(key=>{
          console.log(key)
        })
      }
    }else{

    }
  }

  private layuiRender(){
    layui.use('laydate',()=>{
      setTimeout(()=>{
        layui.$(this.ef.nativeElement).find('*').remove()
        layui.laydate.render({
          elem:this.ef.nativeElement,
          type:this.pickType,
          range:this.range,
          format:this.format,
          value:this.value,
          isInitValue:this.value?true:false,
          max:this.max,
          min:this.min,
          trigger:this.trigger,
          show:this.show,
          position:this.position,
          zIndex:this.zIndex,
          showBottom:this.showBottom,
          lang:this.lang,
          theme:this.theme,
          calendar:this.calendar,
          mark:this.mark,
          ready:(d,endD)=>{
            // console.log('ready')
            // console.log(d)
          },
          change:(value,d,endD)=>{
            console.log('change')
            console.log(value)
            console.log(d)
            console.log(endD)
            this.comparePrevDate(d,endD)
          },
          done:(value,d,endD)=>{
            // console.log('done')
            // console.log(value)
            // console.log(d)
            // console.log(endD)
          }
        })
        setTimeout(()=>{
          this.queueCount -=1
        },150)
      },300*this.queueCount)
      this.queueCount += 1
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.layuiRender()
  }

}
