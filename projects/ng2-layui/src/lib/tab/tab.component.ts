import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, ElementRef, EventEmitter,
  Input,
  OnChanges, OnDestroy, OnInit, Output,
  QueryList, Renderer2,
  SimpleChanges, ViewChild
} from "@angular/core";
import {TabItemComponent} from "./tab-item.component";

declare var layui;

@Component({
  selector:'layui-tab',
  template:`
    <div #tab class="layui-tab" [class.layui-tab-brief]="type=='brief'" [class.layui-tab-card]="type=='card'">
      <ul class="layui-tab-title">
        <ng-container *ngIf="!!tabItemComponents">
          <li *ngFor="let item of tabItemComponents;let i=index;" (click)="tabBarItemClick(i)" [class.layui-this]="i==0 && selectTabIndex==-1">{{item.title}}</li>
        </ng-container>
      </ul>
      <div class="layui-tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabComponent implements OnInit,OnDestroy,OnChanges,AfterContentInit,AfterViewInit{

  @ContentChildren(TabItemComponent) tabItemComponents:QueryList<TabItemComponent>
  @ViewChild('tab',{static:false}) tabEf:ElementRef
  @Input('type') type:string = ''
  @Input('allowClose') allowClose:boolean = false
  @Output('tabSelected') tabSelectedEmitter = new EventEmitter<string>()

  selectTabIndex:number = -1
  freshTabUITimer = null

  private layFilter = `LF${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  constructor(
    private render:Renderer2
  ){}

  private updateAllowClose(){
    if(this.allowClose){
      this.render.setAttribute(this.tabEf.nativeElement,'lay-allowClose','true')
    }else{
      this.render.removeAttribute(this.tabEf.nativeElement,'lay-allowClose')
    }
    layui.use('element', ()=>{
      layui.element.render('tab',this.layFilter)
    })
  }

  private initialTabChangeEvent(){
    this.render.setAttribute(this.tabEf.nativeElement,'lay-filter',this.layFilter)
    layui.use('element', ()=>{
      layui.element.on(`tab(${this.layFilter})`,e=>{
        let title = this.tabItemComponents.find((item,idx,arr)=>{return idx == e.index}).title
        this.tabSelectedEmitter.emit(title)
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
    this.tabSelectedEmitter.emit(this.tabItemComponents.first.title)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['allowClose']){
      if(!!this.tabEf){
        this.updateAllowClose()
      }
    }
  }

  tabBarItemClick(idx:number){
    this.selectTabIndex = idx
  }

}
