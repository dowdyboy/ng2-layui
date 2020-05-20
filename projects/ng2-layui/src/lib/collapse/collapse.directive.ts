import {Component, Directive, ElementRef, Input, OnChanges, Renderer2} from "@angular/core";

declare var layui;

// 不知为何，只要是使用@Component，不管怎么样是否调用layui.use，都无效，但又不报错...
// @Component({
//   selector:'div[layui-collapse]',
//   template:`
//     <ng-content></ng-content>
//   `,
//   styles:[
//     `
//     :host{
//       display: block;
//     }
//     `
//   ]
// })
@Directive({
  selector:'[layui-collapse]',
})
export class CollapseDirective implements OnChanges {

  @Input('accordion') accordion:boolean = false

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-collapse')
    layui.use('element',()=>{

    })
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes['accordion']){
      if(this.accordion) this.render.setAttribute(this.ef.nativeElement,'lay-accordion','true')
      else this.render.removeAttribute(this.ef.nativeElement,'lay-accordion')
    }
  }

}
