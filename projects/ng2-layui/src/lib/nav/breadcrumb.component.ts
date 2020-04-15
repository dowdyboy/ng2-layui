import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2} from "@angular/core";


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

  @Input('items') items:{id:string,text:string}[] = []
  @Input('separator') separator:string = null
  @Input('selectedItemId') selectedItemId:string = null
  @Output('select') select = new EventEmitter<{id:string,text:string}>()

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-breadcrumb')
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
  }

  itemClick(item:{id:string,text:string}){
    if(item.id != this.selectedItemId){
      this.selectedItemId = item.id
      this.select.emit(item)
    }
  }

}
