import {Component, ElementRef, Renderer2} from "@angular/core";

declare var layui;

@Component({
  selector:'input[layui-input],select[layui-input],textarea[layui-input]',
  template:`    
  <ng-content></ng-content>  
  `
})
export class InputComponent {

  private layFilter:string = `LF-INPUT-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'input'){
      this.render.addClass(this.ef.nativeElement,'layui-input')
      if(this.ef.nativeElement.type == 'checkbox'){
        layui.use('form',()=>{
          layui.form.render('checkbox',this.layFilter)
        })
      }
      if(this.ef.nativeElement.type == 'radio'){
        layui.use('form',()=>{
          layui.form.render('radio',this.layFilter)
        })
      }
    }
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'select'){
      layui.use('form',()=>{
        layui.form.render('select',this.layFilter)
      })
    }
    if(this.ef.nativeElement.nodeName.toLowerCase() == 'textarea'){
      this.render.addClass(this.ef.nativeElement,'layui-textarea')
    }
  }

}
