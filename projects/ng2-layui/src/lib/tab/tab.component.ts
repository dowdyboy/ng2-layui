import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, ElementRef,
  Input,
  OnChanges,
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
          <li *ngFor="let item of tabItemComponents;let i=index;" [class.layui-this]="i==0">{{item.title}}</li>
        </ng-container>
      </ul>
      <div class="layui-tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabComponent implements OnChanges,AfterContentInit,AfterViewInit{

  @ContentChildren(TabItemComponent) tabItemComponents:QueryList<TabItemComponent>
  @ViewChild('tab',{static:false}) tabEf:ElementRef
  @Input('type') type:string = ''
  @Input('allowClose') allowClose:boolean = false

  constructor(
    private render:Renderer2
  ){}

  ngAfterViewInit(): void {
    layui.use('element', ()=>{
      let element = layui.element
    });
    if(this.allowClose){
      this.render.setAttribute(this.tabEf.nativeElement,'lay-allowClose','true')
    }else{
      this.render.removeAttribute(this.tabEf.nativeElement,'lay-allowClose')
    }
  }

  ngAfterContentInit(): void {
    this.tabItemComponents.first.show()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['allowClose']){
      if(!!this.tabEf){
        this.ngAfterViewInit()
      }
    }
  }

}
