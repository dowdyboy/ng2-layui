import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";

@Directive({
  selector:'[layui-col-xs]'
})
export class ColXsDirective implements OnChanges{

  @Input('layui-col-xs') size:string

  constructor(private ef:ElementRef){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-xs[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-xs${this.size} `
  }
}

@Directive({
  selector:'[layui-col-sm]'
})
export class ColSmDirective implements OnChanges{

  @Input('layui-col-sm') size:string

  constructor(private ef:ElementRef){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-sm[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-sm${this.size} `
  }
}

@Directive({
  selector:'[layui-col-md]'
})
export class ColMdDirective implements OnChanges{

  @Input('layui-col-md') size:string

  constructor(private ef:ElementRef){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-md[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-md${this.size} `
  }
}

@Directive({
  selector:'[layui-col-lg]'
})
export class ColLgDirective implements OnChanges{

  @Input('layui-col-lg') size:string

  constructor(private ef:ElementRef){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-lg[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-lg${this.size} `
  }
}
