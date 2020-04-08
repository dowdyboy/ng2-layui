import {Component, OnDestroy, OnInit} from "@angular/core";
import {LayuiColor} from "../../../../projects/ng2-layui/src/lib/color/layui-color";
import {ConfigurationService} from "../../services/configuration.service";

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
    private $conf:ConfigurationService
  ){}

  ngOnInit(): void {
    $('body').css('background-color',LayuiColor.COLOR_CYAN.value)
    this.name = this.$conf.NAME
    this.version = this.$conf.VERSION
  }

  ngOnDestroy(): void {
    $('body').css('background-color','white')
  }

  loginButtonClick(){

  }

}
