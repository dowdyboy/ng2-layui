import {Directive, ElementRef, OnInit} from "@angular/core";


@Directive({
  selector:'[layui-container]'
})
export class ContainerDirective implements OnInit{

  constructor(private el:ElementRef){
  }

  ngOnInit(): void {
    this.el.nativeElement.className += 'layui-container '
  }

}
