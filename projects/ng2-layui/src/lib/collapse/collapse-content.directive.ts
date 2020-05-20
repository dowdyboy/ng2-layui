import {Component, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";

declare var layui;

// @Component({
//   selector:'div[layui-collapse-content]',
//   template:`
//   <ng-content></ng-content>
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
  selector:'[layui-collapse-content]',
})
export class CollapseContentDirective implements OnChanges {

  @Input('show') show:boolean = false

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-colla-content')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['show']){
      if(this.show) this.render.addClass(this.ef.nativeElement,'layui-show')
      else this.render.removeClass(this.ef.nativeElement,'layui-show')
    }
  }

}
