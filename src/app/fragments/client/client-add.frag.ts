import {Component} from "@angular/core";
import {ClientModel} from "../../models/client.model";
import {ClientService} from "../../services/client.service";
import {TimeUtil} from "../../utils/time.util";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";
import {HttpResponseData} from "../../models/http-response-data.model";


@Component({
  templateUrl:'client-add.frag.html'
})
export class ClientAddFrag {

  model:ClientModel = new ClientModel()
  submitting:boolean = false

  constructor(
    private $client:ClientService,
    private layer:LayerService
  ){}

  addSubmitHandler(model:ClientModel){
    this.submitting = true
    this.$client.put(
      model.client_id,
      model.client_prefix,
      model.client_forward_url,
      model.client_name,
      JSON.parse(model.lottery_strategy_config).strategies.map(x=>{
        return {
          start_time:TimeUtil.parse('YYYY/MM/DD-HH:mm:ss',x.start_time),
          end_time:TimeUtil.parse('YYYY/MM/DD-HH:mm:ss',x.end_time),
          limit:+x.limit
        }
      }),
      model.custom_config,
      model.start_time,
      model.end_time,
      model.is_statistic_ip_location,
      model.state
    ).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('添加Client成功',{
          closeBtn:false,
          yes:(idx)=>{
            this.layer.close(idx)
            this.backHandler()
          }
        })
      }
      if(resp.code == HttpResponseData.RESPONSE_CODE.CLIENT_ADD_MULTI_ERROR){
        this.layer.msg('Client ID 重复')
      }
      this.submitting = false
    })
  }

  backHandler(){
    window.history.back()
  }

}
