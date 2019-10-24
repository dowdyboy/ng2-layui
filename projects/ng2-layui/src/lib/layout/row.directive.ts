import {Directive, ElementRef, OnInit} from "@angular/core";


@Directive({
  selector:'[layui-row]'
})
export class RowDirective implements OnInit{

  constructor(private ef:ElementRef){
  }

  ngOnInit(): void {
    this.ef.nativeElement.className += 'layui-row '
  }
}
