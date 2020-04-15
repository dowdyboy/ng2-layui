import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {NavItem} from "../../../../projects/ng2-layui/src/lib/nav/nav.component";
import {Router} from "@angular/router";


@Component({
  templateUrl:'main.page.html'
})
export class MainPage implements OnInit{

  topNavItems:NavItem[] = [
    {
      id:'user-center',
      text:'个人中心',
      img:'//t.cn/RCzsdCq',
      children:[
        {
          id:'change-password',
          text:'修改密码',
          unselect:true
        },
        {
          id:'exit',
          text:'退出登录',
          unselect:true
        }
      ]
    }
  ]

  sideNavItems:NavItem[] = []

  constructor(
    private $auth:AuthenticationService,
    private router:Router
  ){}

  ngOnInit(): void {
    if(this.$auth.getRole() == 0){
      this.sideNavItems = [
        {
          id:'client',
          text:'client管理'
        },
        {
          id:'user',
          text:'用户管理'
        },
        {
          id:'statistic',
          text:'统计数据'
        }
      ]
    }else if(this.$auth.getRole() == 1){

    }
  }

  navItemSelected(e:NavItem){
    if(e.id == 'exit'){
      this.$auth.logout().subscribe(resp=>{
        this.router.navigate(['/login'])
      })
    }
  }

}
