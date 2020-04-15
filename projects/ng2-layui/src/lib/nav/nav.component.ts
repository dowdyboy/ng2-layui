import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges} from "@angular/core";

declare var layui;

@Component({
  selector:'layui-nav,div[layui-nav]',
  template:`
    <div *ngFor="let item of items" class="layui-nav-item" [class.layui-this]="(selectedItemId==item.id && !item.unselect && !item.children)" [attr.lay-unselect]="item.unselect">
      <a (click)="itemClick(item)" style="cursor: pointer;">
        <img *ngIf="item.img" [src]="item.img" class="layui-nav-img" />
        {{item.text}}
        <span *ngIf="item.badge && item.badge!=0" class="layui-badge">{{item.badge}}</span>
        <span *ngIf="item.dot" class="layui-badge-dot"></span>
      </a>
      <dl *ngIf="!!item.children" class="layui-nav-child">
        <dd *ngFor="let c of item.children" [class.layui-this]="selectedItemId==c.id && !c.unselect" [attr.lay-unselect]="c.unselect" >
          <a (click)="itemClick(c)" style="cursor: pointer;">
            <img *ngIf="c.img" [src]="c.img" class="layui-nav-img" />
            {{c.text}}
            <span *ngIf="c.badge && c.badge!=0" class="layui-badge">{{c.badge}}</span>
            <span *ngIf="c.dot" class="layui-badge-dot"></span>
          </a>
        </dd>
      </dl>
    </div>
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class NavComponent implements OnChanges{

  @Input('items') items:{id:string,text:string,badge?:number,dot?:boolean,img?:string,unselect?:boolean,children?:{id:string,text:string,badge?:number,dot?:boolean,img?:string,unselect?:boolean}[]}[] = []
  @Input('selectedItemId') selectedItemId:string = null
  @Input('type') type:string = 'horizontal'
  @Input('shrink') shrink:boolean = false
  @Output('select') select = new EventEmitter<{id:string,text:string}>()

  private layFilter:string = `LF-NAV-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-nav')
    layui.use('element',()=>{
      layui.element.render('nav',this.layFilter)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['items']){
      if(changes['items'].currentValue && changes['items'].currentValue.length > 0){
        if(changes['items'].currentValue[0].children && changes['items'].currentValue[0].children.length > 0){
          if(this.selectedItemId == null) this.itemClick(changes['items'].currentValue[0].children[0])
        }else{
          if(this.selectedItemId == null) this.itemClick(changes['items'].currentValue[0])
        }
      }
    }
    if(changes['type']){
      if(changes['type'].currentValue == 'horizontal'){
        this.render.removeClass(this.ef.nativeElement,'layui-nav-tree')
        this.render.removeClass(this.ef.nativeElement,'layui-nav-side')
      }
      if(changes['type'].currentValue == 'vertical'){
        this.render.removeClass(this.ef.nativeElement,'layui-nav-side')
        this.render.addClass(this.ef.nativeElement,'layui-nav-tree')
      }
      if(changes['type'].currentValue == 'side'){
        this.render.addClass(this.ef.nativeElement,'layui-nav-tree')
        this.render.addClass(this.ef.nativeElement,'layui-nav-side')
      }
    }
    if(changes['shrink']){
      if(changes['shrink'].currentValue){
        this.render.setAttribute(this.ef.nativeElement,'lay-shrink','all')
      }else{
        this.render.removeAttribute(this.ef.nativeElement,'lay-shrink')
      }
    }
  }

  itemClick(item:{id:string,text:string,badge?:number,dot?:boolean,unselect?:boolean,children?:{id:string,text:string,badge?:number,dot?:boolean,unselect?:boolean}[]}){
    if(!item.children){
      this.selectedItemId = item.id
      this.select.emit(item)
    }
  }

}
