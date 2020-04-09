import {Component, OnDestroy, OnInit} from "@angular/core";
import {LayuiColor} from "../../../../projects/ng2-layui/src/lib/color/layui-color";
import {ConfigurationService} from "../../services/configuration.service";
import {ClientService} from "../../services/client.service";
import {TimeUtil} from "../../utils/time.util";

declare var $;

@Component({
  templateUrl:'login.page.html'
})
export class LoginPage implements OnInit,OnDestroy {

  name:string = ''
  version:string = ''
  username:string = ''
  password:string = ''
  sex:string = 'male'

  constructor(
    private $conf:ConfigurationService,
    private $client:ClientService
  ){}

  ngOnInit(): void {
    $('body').css('background-color',LayuiColor.COLOR_CYAN.value)
    this.name = this.$conf.NAME
    this.version = this.$conf.VERSION

    console.log(TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date()))
    console.log(TimeUtil.parse('YYYY/MM/DD-HH:mm:ss','2020/03/17-10:30:31'))
  }

  ngOnDestroy(): void {
    $('body').css('background-color','white')
  }

  loginButtonClick(){
    alert(`${this.username} - ${this.password} - ${this.sex}`)
  }

}
