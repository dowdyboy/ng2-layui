import {Component, OnDestroy, OnInit} from "@angular/core";
import {LayuiColor} from "../../../../projects/ng2-layui/src/lib/color/layui-color";
import {ConfigurationService} from "../../services/configuration.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

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
    private router:Router
  ){}

  ngOnInit(): void {
    $('body').css('background-color',LayuiColor.COLOR_CYAN.value)
    this.name = this.$conf.NAME
    this.version = this.$conf.VERSION
  }

  ngOnDestroy(): void {
    $('body').css('background-color','white')
  }

  loginButtonClick(e){
    this.$auth.login(this.username,this.password).subscribe(resp=>{
      if(resp.code == 0){
        alert('')
        this.router.navigate(['main'])
      }
    })
  }

}
