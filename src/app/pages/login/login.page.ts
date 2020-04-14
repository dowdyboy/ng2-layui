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
  habits:{value:string,checked:boolean}[] = [
    {value:'football',checked:false},
    {value:'program',checked:false},
    {value:'music',checked:false},
  ]
  book:string = '0'

  constructor(
    private $conf:ConfigurationService
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

  loginButtonClick(e){
    console.log(e)
    console.log(this.sex)
    console.log(this.habits)
    console.log(this.book)
  }

}
