import {Component} from "@angular/core";


@Component({
  templateUrl:'main.page.html'
})
export class MainPage {

  navItems = [
    {
      id:'a',
      text:'client管理'
    },
    {
      id:'b',
      text:'用户管理',
      dot:true,
      img:'//t.cn/RCzsdCq'
    },
    {
      id:'c',
      text:'子目录',
      children:[
        {
          id:'1',
          text:'策略策略策略策略',
          img:'//t.cn/RCzsdCq'
        },
        {
          id:'2',
          text:'国际刑警',
          dot:true
        }
      ]
    }
  ]

  navItemSelected(e){
    console.log(e)
  }

}
