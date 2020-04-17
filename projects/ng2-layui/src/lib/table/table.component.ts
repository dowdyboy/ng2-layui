import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, Output,
  Renderer2,
  SimpleChanges, TemplateRef,
  ViewChild
} from "@angular/core";


declare var layui;


export class TableHeadConfig {
  title:string
  field:string
  width?:number
}


@Component({
  selector:'layui-table',
  template:`
    <div style="display: block">
      <ng-content></ng-content>
    </div>
  <table #table class="layui-table">
    <colgroup *ngIf="cols && cols.length>0">
      <col *ngFor="let col of cols" [attr.width]="col.width?col.width:''" />
    </colgroup>
    <thead *ngIf="cols && cols.length>0">
    <tr>
      <th *ngFor="let col of cols">{{col.title}}</th>
    </tr>
    </thead>
    <tbody *ngIf="rows && rows.length>0" style="position: relative;">
    <div *ngIf="loading" style="width: 100%;height: 100%;position: absolute;text-align: center;">
      <layui-icon style="position: absolute;top:50%;margin-top: -17px;font-size: 34px;" type="loading" [rotate]="true"></layui-icon>
    </div>
    <tr *ngFor="let row of displayRows" [ngStyle]="{filter:loading?'blur(3px)':''}" >
      <td *ngFor="let col of cols">
        <ng-container *ngIf="!colTemplates[col.field]">{{row[col.field]}}</ng-container>
        <ng-container *ngIf="colTemplates[col.field]">
          <ng-container  *ngTemplateOutlet="colTemplates[col.field]; context: {$implicit:row}"></ng-container>
        </ng-container>
      </td>
    </tr>
    </tbody>
    <tbody *ngIf="rows && rows.length == 0">
    <tr>
      <td [attr.colspan]="cols.length">
        <div style="text-align: center;height: 120px;line-height: 120px;">
          暂无数据
        </div>
      </td>
    </tr>
    </tbody>
  </table>
    <layui-pager *ngIf="hasPager" (change)="innerPagerChange($event)" [count]="totalCount" [(curr)]="currPage" [(limit)]="pagerSize" [limits]="pagerSizes" [layout]="pagerSizes? ['prev', 'page', 'next','limit']: ['prev', 'page', 'next']" [prev]="'<'" [next]="'>'"></layui-pager>
  `,
  styles:[
    `
    :host{
      display: block;
    }
    `
  ]
})
export class TableComponent implements OnChanges,AfterViewInit {

  @Input('cols') cols:TableHeadConfig[] = []
  @Input('colTemplates') colTemplates:{[key: string]: TemplateRef<any> | undefined | null} = {}
  @Input('rows') rows:any[] = []
  @Input('totalCount') totalCount:number = 0
  @Input('async') async:boolean = false
  @Input('loading') loading:boolean = false

  @Input('stripe') stripe:boolean = false
  @Input('skin') skin:string = null
  @Input('size') size:string = null

  @Input('hasPager') hasPager:boolean = false
  @Input('pagerSize') pagerSize:number = 10
  @Input('pagerSizes') pagerSizes:number[] = [10, 20, 30]
  @Output('pagerChange') pagerChange = new EventEmitter<{page:number,pageSize:number}>()

  @ViewChild('table',{static:false}) tableEf:ElementRef

  displayRows:any[] = []
  currPage:number = 1

  private layFilter:string = `LF-TABLE-${new Date().getTime()}${Math.floor(Math.random()*99999)}`

  private freshData(){
    if(this.async){
      this.displayRows = this.rows
    }else{
      this.totalCount = this.rows.length
      if(this.hasPager){
        this.displayRows = this.rows.slice((this.currPage-1)*this.pagerSize,this.currPage*this.pagerSize)
      }else{
        this.displayRows = this.rows
      }
    }
  }

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['stripe'] && this.tableEf){
      if(changes['stripe'].currentValue){
        this.render.setAttribute(this.tableEf.nativeElement,'lay-even','')
      }else{
        this.render.removeAttribute(this.tableEf.nativeElement,'lay-even')
      }
    }
    if(changes['skin'] && this.tableEf){
      if(changes['skin'].currentValue){
        this.render.setAttribute(this.tableEf.nativeElement,'lay-skin',changes['skin'].currentValue)
      }else{
        this.render.removeAttribute(this.tableEf.nativeElement,'lay-skin')
      }
    }
    if(changes['size'] && this.tableEf){
      if(changes['size'].currentValue){
        this.render.setAttribute(this.tableEf.nativeElement,'lay-size',changes['size'].currentValue)
      }else{
        this.render.removeAttribute(this.tableEf.nativeElement,'lay-size')
      }
    }
    if(changes['rows'] || changes['hasPager'] || changes['pagerSize']){
      this.freshData()
    }
  }

  ngAfterViewInit(): void {
    this.render.setAttribute(this.tableEf.nativeElement,'lay-filter',this.layFilter)
    if(this.stripe){
      this.render.setAttribute(this.tableEf.nativeElement,'lay-even','')
    }else{
      this.render.removeAttribute(this.tableEf.nativeElement,'lay-even')
    }
    if(this.skin){
      this.render.setAttribute(this.tableEf.nativeElement,'lay-skin',this.skin)
    }else{
      this.render.removeAttribute(this.tableEf.nativeElement,'lay-skin')
    }
    if(this.size){
      this.render.setAttribute(this.tableEf.nativeElement,'lay-size',this.size)
    }else{
      this.render.removeAttribute(this.tableEf.nativeElement,'lay-size')
    }
  }

  innerPagerChange(curr:number){
    this.freshData()
    this.pagerChange.emit({page:this.currPage,pageSize:this.pagerSize})
  }

}
