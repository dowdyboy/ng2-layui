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


@Directive({
  selector:'layui-col-space'
})
export class ColSpaceDirective implements OnChanges{

  @Input('layui-col-space') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-space[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-space${this.size} `
  }
}


@Directive({
  selector:'[layui-col-xs-offset]'
})
export class ColXsOffsetDirective implements OnChanges{

  @Input('layui-col-xs-offset') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-xs-offset[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-xs-offset${this.size} `
  }
}


@Directive({
  selector:'[layui-col-sm-offset]'
})
export class ColSmOffsetDirective implements OnChanges{

  @Input('layui-col-sm-offset') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-sm-offset[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-sm-offset${this.size} `
  }
}



@Directive({
  selector:'[layui-col-md-offset]'
})
export class ColMdOffsetDirective implements OnChanges{

  @Input('layui-col-md-offset') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-md-offset[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-md-offset${this.size} `
  }
}


@Directive({
  selector:'[layui-col-lg-offset]'
})
export class ColLgOffsetDirective implements OnChanges{

  @Input('layui-col-lg-offset') size:string

  constructor(
    private ef:ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.ef.nativeElement.className = this.ef.nativeElement.className.replace(/\s?layui-col-lg-offset[0-9]+\s?/,' ')
    this.ef.nativeElement.className += `layui-col-lg-offset${this.size} `
  }
}
