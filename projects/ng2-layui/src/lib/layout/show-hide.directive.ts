import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";

@Directive({
  selector:'[layui-show-block]'
})
export class ShowBlockDirective implements OnChanges{

  @Input('layui-show-block') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-show-[\w]+-block\s?/,' ')
    this.ef.nativeElement.className += `layui-show-${this.size}-block `
  }
}


@Directive({
  selector:'[layui-show-inline]'
})
export class ShowInlineDirective implements OnChanges{

  @Input('layui-show-inline') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-show-[\w]+-inline\s?/,' ')
    this.ef.nativeElement.className += `layui-show-${this.size}-inline `
  }
}


@Directive({
  selector:'[layui-show-inline-block]'
})
export class ShowInlineBlockDirective implements OnChanges{

  @Input('layui-show-inline-block') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-show-[\w]+-inline-block\s?/,' ')
    this.ef.nativeElement.className += `layui-show-${this.size}-inline-block `
  }
}


@Directive({
  selector:'[layui-hide]'
})
export class HideDirective implements OnChanges{

  @Input('layui-hide') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-hide-[\w]+\s?/,' ')
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-hide\s?/,' ')
    if(!!this.size && this.size!=''){
      this.ef.nativeElement.className += `layui-hide-${this.size} `
    }else{
      this.ef.nativeElement.className += `layui-hide `
    }
  }
}
