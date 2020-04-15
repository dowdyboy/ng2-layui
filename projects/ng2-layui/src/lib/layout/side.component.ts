import {Component, ElementRef, Renderer2} from "@angular/core";


@Component({
  selector:'layui-side,div[layui-side]',
  template:`
  <div class="layui-side-scroll">
    <ng-content></ng-content>
  </div>
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class SideComponent {

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-side')
  }

}
