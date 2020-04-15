import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, ElementRef, EventEmitter,
  Input, NgZone,
  OnChanges, OnDestroy, OnInit, Output,
  QueryList, Renderer2,
  SimpleChanges
} from "@angular/core";
import {TabItemComponent} from "./tab-item.component";

declare var layui;

@Component({
  selector:'layui-tab,div[layui-tab]',
  template:`
    <ul class="layui-tab-title">
      <ng-container *ngIf="!!tabItemComponents">
        <li *ngFor="let item of tabItemComponents;let i=index;" (click)="tabBarItemClick(i)" [class.layui-this]="i==0 && selectTabIndex==-1">{{item.title}}</li>
      </ng-container>
    </ul>
    <div class="layui-tab-content">
      <ng-content></ng-content>
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
export class TabComponent implements OnInit,OnDestroy,OnChanges,AfterContentInit,AfterViewInit{

  @ContentChildren(TabItemComponent) tabItemComponents:QueryList<TabItemComponent>
  @Input('type') type:string = ''
  @Input('allowClose') allowClose:boolean = false
  @Output('tabSelected') tabSelectedEmitter = new EventEmitter<string>()

  selectTabIndex:number = -1
  freshTabUITimer = null

  private layFilter = `LF${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private render:Renderer2,
    private ef:ElementRef,
    private zone:NgZone
  ){
    this.render.addClass(this.ef.nativeElement,'layui-tab')
  }

  private updateAllowClose(){
    if(this.allowClose){
      this.render.setAttribute(this.ef.nativeElement,'lay-allowClose','true')
    }else{
      this.render.removeAttribute(this.ef.nativeElement,'lay-allowClose')
    }
    layui.use('element', ()=>{
      layui.element.render('tab',this.layFilter)
    })
  }

  private initialTabChangeEvent(){
    this.render.setAttribute(this.ef.nativeElement,'lay-filter',this.layFilter)
    layui.use('element', ()=>{
      layui.element.on(`tab(${this.layFilter})`,e=>{
        let title = this.tabItemComponents.find((item,idx,arr)=>{return idx == e.index}).title
        this.zone.run(()=>{
          this.tabSelectedEmitter.emit(title)
        })
      })
    })
  }

  ngOnInit(): void {
    this.freshTabUITimer = setInterval(()=>{
      layui.use('element', ()=>{
        layui.element.render('tab',this.layFilter)
      })
    },1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.freshTabUITimer)
  }

  ngAfterViewInit(): void {
    this.updateAllowClose()
    this.initialTabChangeEvent()
  }

  ngAfterContentInit(): void {
    this.tabItemComponents.first.show()
    this.zone.run(()=>{
      this.tabSelectedEmitter.emit(this.tabItemComponents.first.title)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['allowClose']){
      if(!!this.ef){
        this.updateAllowClose()
      }
    }
    if(changes['type']){
      this.render.removeClass(this.ef.nativeElement,`layui-tab-${changes['type'].previousValue}`)
      this.render.addClass(this.ef.nativeElement,`layui-tab-${changes['type'].currentValue}`)
    }
  }

  tabBarItemClick(idx:number){
    this.selectTabIndex = idx
  }

}
