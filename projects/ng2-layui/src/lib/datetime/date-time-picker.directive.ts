import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges
} from "@angular/core";

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

  @Output('change') change = new EventEmitter<{time:Date,endTime:Date}>()
  @Output('valueChange') valueChange = new EventEmitter<Date>()

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
    let parseDate = (date:any)=>{
      let time = Object.keys(date).length>0?new Date():null
      if(time){
        Object.keys(date).forEach(key=>{
          if(key == 'year') time.setFullYear(date[key])
          if(key == 'month') time.setMonth(date[key] - 1)
          if(key == 'date') time.setDate(date[key])
          if(key == 'hours') time.setHours(date[key])
          if(key == 'minutes') time.setMinutes(date[key])
          if(key == 'seconds') time.setSeconds(date[key])
          time.setMilliseconds(0)
        })
      }
      return time
    }
    if(!this.prevDate){
      this.prevDate = date
      this.prevEndDate = endDate
      let time = parseDate(date)
      let endTime = parseDate(endDate)
      return {
        time:time,
        endTime:endTime
      }
    }else{
      let prevTime = parseDate(this.prevDate)
      let prevEndTime = parseDate(this.prevEndDate)
      let time = parseDate(date)
      let endTime = parseDate(endDate)
      let ret = {
        time:time,
        endTime:endTime
      }
      if((prevTime != null && prevEndTime == null && prevTime.getTime() != time.getTime()) ||
        (prevTime != null && prevEndTime != null && (prevTime.getTime() != time.getTime() || prevEndTime.getTime() != endTime.getTime()))){
        this.prevDate = date
        this.prevEndDate = endDate
        return ret
      }else{
        return null
      }
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
            // let timePair = this.comparePrevDate(d,endD)
            // if(timePair){
            //   this.zone.run(()=>{
            //     this.change.emit(timePair)
            //   })
            // }
          },
          done:(value,d,endD)=>{
            let timePair = this.comparePrevDate(d,endD)
            if(timePair){
              this.zone.run(()=>{
                this.change.emit(timePair)
                this.valueChange.emit(timePair.time)
              })
            }
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
