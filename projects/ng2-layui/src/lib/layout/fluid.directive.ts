import {Directive, ElementRef, OnInit} from "@angular/core";


@Directive({
  selector:'[layui-fluid]'
})
export class FluidDirective implements OnInit {

  constructor(private el:ElementRef){
  }

  ngOnInit(): void {
    this.el.nativeElement.className += 'layui-fluid '
  }

}
