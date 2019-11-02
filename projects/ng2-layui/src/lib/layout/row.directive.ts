import {Directive, ElementRef, OnInit, Renderer2} from "@angular/core";


@Directive({
  selector:'[layui-row]'
})
export class RowDirective implements OnInit{

  constructor(private ef:ElementRef,private render:Renderer2){
  }

  ngOnInit(): void {
    this.render.addClass(this.ef.nativeElement,'layui-row')
  }
}
