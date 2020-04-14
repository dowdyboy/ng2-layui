import {Directive, ElementRef, EventEmitter, Input, Output, Renderer2} from "@angular/core";

declare var layui;

@Directive({
  selector:'[layui-form-submit]'
})
export class FormSubmitDirective {

  @Input('preventSubmit') preventSubmit = false
  @Output('submit') submit = new EventEmitter<any>()

  private layFilter:string = `LF-SUBMIT-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-submit','')
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    layui.use('form',()=>{
      layui.form.on(`submit(${this.layFilter})`,d=>{
        this.submit.emit(d.field)
        return !this.preventSubmit
      })
    })
  }

}
