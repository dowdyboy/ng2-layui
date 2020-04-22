import {
  AfterContentChecked,
  Component, DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  Renderer2
} from "@angular/core";

declare var layui;

@Component({
  selector:'input[layui-input],select[layui-input],textarea[layui-input]',
  template:`    
  <ng-content></ng-content>  
  `
})
export class InputComponent implements OnChanges,AfterContentChecked,DoCheck {

  @Input('skin') skin:string = 'default'
  @Input('switchOnText') switchOnText:string = null
  @Input('switchOffText') switchOffText:string = null
  @Input('verify') verify:string = null
  @Input('verType') verType:string = null
  @Input('reqText') reqText:string = null


  @Output('ngModelChange') ngModelChange:EventEmitter<any> = new EventEmitter()

  private layFilter:string = `LF-INPUT-${new Date().getTime()}${Math.floor(Math.random()*99999)}`
  private selectOptionCount = 0
  private radioCheckState = false

  constructor(
    private ef:ElementRef,
    private render:Renderer2,
    private zone:NgZone
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'input'){
      this.render.addClass(this.ef.nativeElement,'layui-input')
      if(this.ef.nativeElement.type == 'checkbox'){
        layui.use('form',()=>{
          // layui.form.render('checkbox',this.layFilter)
          layui.form.render('checkbox')
          layui.form.on(`checkbox(${this.layFilter})`,d=>{
            this.zone.run(()=>{
              this.ngModelChange.emit(d.elem.checked)
            })
          })
          layui.form.on(`switch(${this.layFilter})`,d=>{
            this.zone.run(()=>{
              this.ngModelChange.emit(d.elem.checked)
            })
          })
        })
      }
      if(this.ef.nativeElement.type == 'radio'){
        layui.use('form',()=>{
          // layui.form.render('radio',this.layFilter)
          layui.form.render('radio')
          layui.form.on(`radio(${this.layFilter})`,d=>{
            this.zone.run(()=>{
              this.ngModelChange.emit(d.value)
            })
          })
        })
      }
    }
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'select'){
      layui.use('form',()=>{
        // layui.form.render('select',this.layFilter)
        layui.form.render('select')
        layui.form.on(`select(${this.layFilter})`,d=>{
          this.zone.run(()=>{
            this.ngModelChange.emit(d.value)
          })
        })
      })
    }
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'textarea'){
      this.render.addClass(this.ef.nativeElement,'layui-textarea')
    }
    this.layuiRender()
  }

  private layuiRender(cb?:()=>void){
    setTimeout(()=>{
      layui.use('form',()=>{
        if(this.ef.nativeElement.nodeName.toLowerCase() == 'input'){
          if(this.ef.nativeElement.type == 'checkbox') {
            // layui.form.render('checkbox',this.layFilter)
            layui.form.render('checkbox')
          }
          if(this.ef.nativeElement.type == 'radio') {
            // layui.form.render('radio',this.layFilter)
            layui.form.render('radio')
          }
        }
        if(this.ef.nativeElement.nodeName.toLowerCase() == 'select'){
          // layui.form.render('select',this.layFilter)
          layui.form.render('select')
        }
        if(cb) cb()
      })
    },100)
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes['skin']){
      this.render.removeAttribute(this.ef.nativeElement,'lay-skin')
      this.render.setAttribute(this.ef.nativeElement,'lay-skin',changes['skin'].currentValue)
      if(this.switchOnText && this.switchOffText){
        this.render.setAttribute(this.ef.nativeElement,'lay-text',`${this.switchOnText}|${this.switchOffText}`)
      }
    }
    if(changes['switchOnText']){
      if(changes['switchOnText'].currentValue && this.switchOffText){
        this.render.setAttribute(this.ef.nativeElement,'lay-text',`${changes['switchOnText'].currentValue}|${this.switchOffText}`)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-text')
      }
    }
    if(changes['switchOffText']){
      if(changes['switchOffText'].currentValue && this.switchOnText){
        this.render.setAttribute(this.ef.nativeElement,'lay-text',`${this.switchOnText}|${changes['switchOffText'].currentValue}`)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-text')
      }
    }
    if(changes['verify']){
      if(changes['verify'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-verify',changes['verify'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-verify')
      }
    }
    if(changes['verType']){
      if(changes['verType'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-verType',changes['verType'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-verType')
      }
    }
    if(changes['reqText']){
      if(changes['reqText'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-reqText',changes['reqText'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-reqText')
      }
    }
    this.layuiRender()
  }

  ngAfterContentChecked(): void {
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'select'){
      let nowOptionCount = layui.$(this.ef.nativeElement).find('option').length
      if(this.selectOptionCount != nowOptionCount){
        this.layuiRender()
        this.selectOptionCount = nowOptionCount
      }
    }
  }

  ngDoCheck(): void {
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'input'){
      if(this.ef.nativeElement.type == 'radio'){
        if(this.radioCheckState != this.ef.nativeElement.checked){
          this.radioCheckState = this.ef.nativeElement.checked
          this.layuiRender()
        }
      }
    }
  }

}
