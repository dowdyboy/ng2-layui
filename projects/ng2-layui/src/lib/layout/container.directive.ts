import {Directive, ElementRef, OnInit, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-container]'
})
export class ContainerDirective implements OnInit{

  constructor(private el:ElementRef,private render:Renderer2){
  }

  ngOnInit(): void {
    this.render.addClass(this.el.nativeElement,'layui-container')
  }

}
