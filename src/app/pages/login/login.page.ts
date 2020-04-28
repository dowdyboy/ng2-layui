import {Component, OnDestroy, OnInit} from "@angular/core";
import {LayuiColor} from "../../../../projects/ng2-layui/src/lib/color/layui-color";
import {ConfigurationService} from "../../services/configuration.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {HttpResponseData} from "../../models/http-response-data.model";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";

declare var $;

@Component({
  templateUrl:'login.page.html'
})
export class LoginPage implements OnInit,OnDestroy {

  name:string = ''
  version:string = ''
  username:string = ''
  password:string = ''

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private router:Router,
    private layer:LayerService
  ){}

  ngOnInit(): void {
    $('body').css('background-color',LayuiColor.COLOR_CYAN.value)
    this.name = this.$conf.NAME
    this.version = this.$conf.VERSION
  }

  ngOnDestroy(): void {
    $('body').css('background-color','#eeeeee')
  }

  loginButtonClick(e){
    this.$auth.login(this.username,this.password).subscribe(resp=>{
      if(resp.code == 0){
        this.router.navigate(['main'])
      }
      if(resp.code == HttpResponseData.RESPONSE_CODE.USER_NOT_EXIST_ERROR){
        this.layer.msg('该用户不存在')
      }
      if(resp.code == HttpResponseData.RESPONSE_CODE.USERNAME_PASSWORD_ERROR){
        this.layer.msg('用户名密码错误')
      }
    })
  }

}
