import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {NavItem} from "../../../../projects/ng2-layui/src/lib/nav/nav.component";
import {ActivatedRoute, Router} from "@angular/router";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";

@Component({
  templateUrl:'main.page.html'
})
export class MainPage implements OnInit{

  @ViewChild('changePasswd',{static:false}) changePasswdEf:ElementRef

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
    private router:Router,
    private route:ActivatedRoute,
    private layer:LayerService
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
          text:'数据统计'
        }
      ]
    }else if(this.$auth.getRole() == 1){
      this.sideNavItems = [
        {
          id:'statistic',
          text:'统计数据'
        }
      ]
    }
  }

  navItemSelected(e:NavItem){
    if(e.id == 'exit'){
      this.$auth.logout().subscribe(resp=>{
        this.router.navigate(['login'])
      })
    }
    if(e.id == 'client'){
      this.router.navigate(['client','list'],{relativeTo:this.route})
    }
    if(e.id == 'user'){
      this.router.navigate(['user','list'],{relativeTo:this.route})
    }
    if(e.id == 'statistic'){
      this.router.navigate(['statistic'],{relativeTo:this.route})
    }
    if(e.id == 'change-password'){
      this.layer.open({
        title:'修改密码',
        type:1,
        area:'380px',
        content:this.changePasswdEf.nativeElement
      })
    }
  }

  changePasswordButtonClick(e){
    if(e.newPassword != e.rePassword){
      this.layer.msg('两次新密码输入不一致')
      return
    }
    if(e.oldPassword == e.newPassword){
      this.layer.msg('新旧密码不能相同')
      return
    }
    this.$auth.changePassword(e.oldPassword,e.newPassword).subscribe(resp=>{
      if(resp.code == 0){
        if(this.changePasswdEf.nativeElement.getElementsByTagName('form').length>0){
          this.changePasswdEf.nativeElement.getElementsByTagName('form').item(0).reset()
        }
        this.layer.msg('修改密码成功')
        setTimeout(()=>{this.layer.closeAll()},3000)
      }else{
        this.layer.msg('修改密码失败')
      }
    })
  }

}
