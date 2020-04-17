import {Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, Output, Renderer2} from "@angular/core";

declare var layui;

@Component({
  selector:'layui-pager',
  template:`
  
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class PagerComponent implements OnChanges {

  @Input('count') count:number = 0
  @Input('limit') limit:number = 10
  @Input('limits') limits:number[] = [10, 20, 30]
  @Input('groups') groups:number = 5
  @Input('prev') prev:string = '上一页'
  @Input('next') next:string = '下一页'
  @Input('first') first:string = null
  @Input('last') last:string = null
  @Input('layout') layout:string[] = ['prev', 'page', 'next','limit']
  @Input('theme') theme:string = null
  @Input('curr') curr:number = null
  @Input('hash') hash:string = null
  @Output('change') change = new EventEmitter<number>()
  @Output('currChange') currChange = new EventEmitter<number>()
  @Output('limitChange') limitChange = new EventEmitter<number>()

  private layuiRender(){
    layui.use('laypage',()=>{
      layui.laypage.render({
        elem:this.ef.nativeElement,
        count:this.count,
        limit:this.limit,
        limits:this.limits,
        curr:this.curr,
        groups:this.groups,
        prev:this.prev,
        next:this.next,
        first:this.first,
        last:this.last,
        layout:this.layout,
        theme:this.theme,
        hash:this.hash,
        jump:(obj,isFirst)=>{
          if(!isFirst && (obj.curr != this.curr || obj.limit != this.limit)){
            this.zone.run(()=>{
              this.currChange.emit(obj.curr)
              this.limitChange.emit(obj.limit)
              this.change.emit(obj.curr)
            })
          }
        }
      })
    })
  }

  constructor(
    private ef:ElementRef,
    private render:Renderer2,
    private zone:NgZone
  ){
    this.layuiRender()
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // if(!changes['curr'] && !changes['limit']){
    //   this.layuiRender()
    // }
    this.layuiRender()
  }

}
