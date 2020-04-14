import {
  AfterViewInit,
  Component, ContentChildren,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges
} from "@angular/core";
import {FormItemComponent} from "./form-item.component";
import {Subscription} from "rxjs";


@Component({
  selector:'form[layui-form]',
  template:`
    <ng-content></ng-content>
  `
})
export class FormComponent implements OnChanges,AfterViewInit,OnDestroy {

  @Input('theme') theme:string = 'normal'
  @ContentChildren(FormItemComponent) formItems:QueryList<FormItemComponent>

  private contentChildrenChangeSubscription:Subscription = null

  constructor(
    private ef:ElementRef,
    private render:Renderer2
  ){
    this.render.addClass(this.ef.nativeElement,'layui-form')
  }

  private updateTheme(){
    if(this.theme == 'pane'){
      this.formItems.forEach(c=>{
        c.render.setAttribute(c.ef.nativeElement,'pane','')
      })
    }else{
      this.formItems.forEach(c=>{
        c.render.removeAttribute(c.ef.nativeElement,'pane','')
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['theme']){
      this.render.removeClass(this.ef.nativeElement,`layui-form-${changes['theme'].previousValue}`)
      this.render.addClass(this.ef.nativeElement,`layui-form-${changes['theme'].currentValue}`)
      if(this.formItems){
        this.updateTheme()
      }
    }
  }

  ngAfterViewInit(): void {
    this.updateTheme()
    this.contentChildrenChangeSubscription = this.formItems.changes.subscribe(x=>{
      this.updateTheme()
    })
  }

  ngOnDestroy(): void {
    if(this.contentChildrenChangeSubscription){
      this.contentChildrenChangeSubscription.unsubscribe()
    }
  }



}
