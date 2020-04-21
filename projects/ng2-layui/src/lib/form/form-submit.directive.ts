import {Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";

declare var layui;

@Directive({
  selector:'[layui-form-submit]'
})
export class FormSubmitDirective {

  @Input('preventSubmit') preventSubmit = true
  @Output('submit') submit = new EventEmitter<any>()

  private layFilter:string = `LF-SUBMIT-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2,
    private zone:NgZone
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-submit','')
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    layui.use('form',()=>{
      layui.form.on(`submit(${this.layFilter})`,d=>{
        // 因为layui的submit事件部署于angular体系，因此需要手动使用zone运行事件回调函数
        this.zone.run(()=>{
          this.submit.emit(d.field)
        })
        return !this.preventSubmit
      })
    })
  }

}
