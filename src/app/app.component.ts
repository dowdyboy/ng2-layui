import { Component } from '@angular/core';
import {LayerService} from "../../projects/ng2-layui/src/lib/layer/layer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ng2-layui-spec';

  showTab:boolean = false
  tabs:string[] = ['tab1','tab2','tab3']
  tabsType:string = ''

  constructor(
    private layer:LayerService
  ){}

  msgButtonClick(e:Event){
    this.layer.tab({
      tab:[
        {
          title:'我是TAB1',
          content:'啦啦啦啦啦啦啦啦啦'
        },
        {
          title:'我是TAB2',
          content:'哈哈哈哈哈啊哈哈哈哈哈哈哈'
        }
      ]
    })
  }

  addTabButtonClick(){
    this.tabs = this.tabs.concat(`${Math.floor(Math.random()*100)}`)
  }
  toggleTabButtonClick(){
    this.showTab = !this.showTab
  }
  shuffleTabButtonClick(){
    this.tabs = this.tabs.sort((a,b)=>{return Math.random()>Math.random()?1:-1})
  }
  tabSelectedHandler(title:string){
    console.log(title)
  }

}
