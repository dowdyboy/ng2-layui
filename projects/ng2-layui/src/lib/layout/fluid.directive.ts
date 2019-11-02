import {Directive, ElementRef, OnInit, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-fluid]'
})
export class FluidDirective implements OnInit {

  constructor(private el:ElementRef,private render:Renderer2){
  }

  ngOnInit(): void {
    this.render.addClass(this.el.nativeElement,'layui-fluid')
  }

}
