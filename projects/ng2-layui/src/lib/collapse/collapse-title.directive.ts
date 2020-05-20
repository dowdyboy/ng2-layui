import {Component, Directive, ElementRef, Renderer2} from "@angular/core";


// @Component({
//   selector:'h2[layui-collapse-title]',
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
  selector:'[layui-collapse-title]',
})
export class CollapseTitleDirective {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-colla-title')
  }

}
