import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2
} from "@angular/core";

declare var layui;

export interface BreadcrumbItem {
  id:string
  text:string
}

@Component({
  selector:'layui-breadcrumb,span[layui-breadcrumb]',
  template:`    
  <a *ngFor="let item of items" (click)="itemClick(item)">
    <span *ngIf="item.id != selectedItemId" style="cursor: pointer;">{{item.text}}</span>
    <cite *ngIf="item.id == selectedItemId" >{{item.text}}</cite>
  </a>
  `,
  styles:[
    `
    :host{
      display: inline;
    }
      span{
        color: #ababab;
      }
      span:hover{
        color:#5FB878;
      }
    `
  ]
})
export class BreadcrumbComponent implements OnChanges {

  @Input('items') items:BreadcrumbItem[] = []
  @Input('separator') separator:string = null
  @Input('selectedItemId') selectedItemId:string = null
  @Output('select') select = new EventEmitter<BreadcrumbItem>()

  private layFilter:string = `LF-NAV-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    this.render.addClass(this.ef.nativeElement,'layui-breadcrumb')
    this.layuiRender()
  }

  private layuiRender(){
    //重新渲染
    setTimeout(()=>{
      layui.use('element',()=>{
        layui.$('span[lay-separator]').remove()
        layui.element.render('breadcrumb',this.layFilter)
      })
    },100)
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes['items']){
      if(changes['items'].currentValue && changes['items'].currentValue.length > 0){

      }
    }
    if(changes['separator']){
      if(changes['separator'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-separator',changes['separator'].currentValue)
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-separator')
      }
    }
    this.layuiRender()
  }

  itemClick(item:BreadcrumbItem){
    if(item.id != this.selectedItemId){
      this.selectedItemId = item.id
      this.select.emit(item)
    }
  }


}
