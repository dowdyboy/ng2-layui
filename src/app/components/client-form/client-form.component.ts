import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {ClientModel} from "../../models/client.model";
import {DatePipe} from "@angular/common";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";

@Component({
  selector:'es-client-form',
  templateUrl:'client-form.component.html'
})
export class ClientFormComponent implements OnChanges {

  @Input('model') model:ClientModel
  @Input('disabled') disabled:boolean = false
  @Output('submit') submit = new EventEmitter<ClientModel>()
  @Output('back') back = new EventEmitter<any>()

  isModify = false

  client_id:string
  client_name:string
  client_forward_url:string
  client_prefix:string
  lottery_strategy_config:{start_time:string,end_time:string,limit:string}[] = []
  custom_config:{key:string,value:string,comment:string}[] = []
  start_time:Date = new Date()
  end_time:Date = new Date()
  is_statistic_ip_location:string = ''
  state:string = ''

  strategy_start_time:Date = new Date()
  strategy_end_time:Date = new Date()
  strategy_limit:string = '1'
  custom_config_key:string = ''
  custom_config_value:string = ''
  custom_config_comment:string = ''

  datePipe = new DatePipe('en-US')

  constructor(
    private layer:LayerService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['model'] && this.model){
      this.isModify = this.model.client_id && this.model.client_id!=''
      this.client_id = this.model.client_id
      this.client_name = this.model.client_name
      this.client_forward_url = this.model.client_forward_url
      this.client_prefix = this.model.client_prefix
      this.lottery_strategy_config = JSON.parse(this.model.lottery_strategy_config).strategies
      let custom_config_json = JSON.parse(this.model.custom_config)
      this.custom_config = []
      for(let key in custom_config_json)
      {
        this.custom_config.push({key:key,value:custom_config_json[key].value,comment:custom_config_json[key].comment})
      }
      this.start_time = new Date(this.model.start_time)
      this.end_time = new Date(this.model.end_time)
      this.is_statistic_ip_location = this.model.is_statistic_ip_location+''
      this.state = this.model.state+''
    }
  }

  strategyAddButtonClick(){
    if(this.strategy_limit == ''){
      this.layer.msg('请填写抽奖次数配置')
      return
    }
    if(isNaN(+this.strategy_limit)){
      this.layer.msg('抽奖次数必须为数字')
      return
    }
    let start_time_str = this.datePipe.transform(this.strategy_start_time.getTime(),'yyyy/MM/dd-HH:mm:ss')
    let end_time_str = this.datePipe.transform(this.strategy_end_time.getTime(),'yyyy/MM/dd-HH:mm:ss')
    if(this.lottery_strategy_config.filter(x=>{return x.start_time==start_time_str && x.end_time==end_time_str}).length == 0){
      this.lottery_strategy_config.push({
        start_time:start_time_str,
        end_time:end_time_str,
        limit:`${parseInt(this.strategy_limit)}`
      })
      this.strategy_limit = ''
    }
  }

  strategyDeleteButtonClick(item:{start_time:string,end_time:string,limit:string}){
    this.lottery_strategy_config = this.lottery_strategy_config.filter(x=>{return !(x.start_time==item.start_time && x.end_time==item.end_time)})
  }

  customConfigAddButtonClick(){
    if(this.custom_config_key == ''){
      this.layer.msg('请填写自定义配置的键')
      return
    }
    if(this.custom_config_value == ''){
      this.layer.msg('请填写自定义配置的值')
      return
    }
    this.custom_config = this.custom_config.filter(x=>{return x.key!=this.custom_config_key})
    this.custom_config.push({
      key:this.custom_config_key,
      value:this.custom_config_value,
      comment:this.custom_config_comment
    })
    this.custom_config_key = ''
    this.custom_config_value = ''
    this.custom_config_comment = ''
  }

  customConfigDeleteButtonClick(item:{key:string,value:string,comment:string}){
    this.custom_config = this.custom_config.filter(x=>{return x.key!=item.key})
  }

  customConfigEditButtonClick(item:{key:string,value:string,comment:string}){
    this.custom_config_key = item.key
    this.custom_config_value = item.value
    this.custom_config_comment = item.comment
  }

  submitHandler(){
    let model = new ClientModel()
    model.client_id = this.client_id
    model.client_name = this.client_name
    model.client_forward_url = this.client_forward_url
    model.client_prefix = this.client_prefix
    model.lottery_strategy_config = JSON.stringify({
      strategies:this.lottery_strategy_config
    })
    let customConfig:any = {}
    this.custom_config.forEach(x=>{
      customConfig[x.key] = {
        value:x.value,
        comment:x.comment
      }
    })
    model.custom_config = JSON.stringify(customConfig)
    model.start_time = this.start_time.getTime()
    model.end_time = this.end_time.getTime()
    model.is_statistic_ip_location = +this.is_statistic_ip_location
    model.state = +this.state
    this.submit.emit(model)
  }

  backButtonClick(){
    this.back.emit(null)
  }

}
