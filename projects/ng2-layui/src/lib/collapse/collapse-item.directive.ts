import {Component, Directive, ElementRef, Renderer2} from "@angular/core";

declare var layui;

// @Component({
//   selector:'div[layui-collapse-item]',
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
  selector:'[layui-collapse-item]',
})
export class CollapseItemDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-colla-item')
  }

}
