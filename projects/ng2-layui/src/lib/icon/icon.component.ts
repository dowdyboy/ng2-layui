import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";


@Component({
  selector:'layui-icon',
  template:`<i style="font: inherit;color: inherit;background: inherit;" [className]="className"></i>`
})
export class IconComponent implements OnChanges{

  @Input('type') type:string

  className:string = ''

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['type']){
      this.className = `layui-icon layui-icon-${changes['type'].currentValue}`
    }
  }

}
