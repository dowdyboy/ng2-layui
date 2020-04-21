import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {ClientModel} from "../../models/client.model";
import {TimeUtil} from "../../utils/time.util";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  templateUrl:'client-modify.frag.html'
})
export class ClientModifyFrag implements OnInit {

  model:ClientModel = null
  submitting:boolean = false

  constructor(
    private route:ActivatedRoute,
    private $client:ClientService,
    private layer:LayerService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      let client_id = x.client_id
      this.$client.get(client_id).subscribe(resp=>{
        if(resp.code == 0){
          let model = new ClientModel()
          model.client_id = resp.data.client_id
          model.client_name = resp.data.client_name
          model.client_prefix = resp.data.client_prefix
          model.client_forward_url = resp.data.client_forward_url
          model.lottery_strategy_config = JSON.stringify({
            strategies:resp.data.lottery_strategy_config.map(x=>{
              return {
                start_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.start_time)),
                end_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.end_time)),
                limit:`${x.limit}`
              }
            })
          })
          model.custom_config = JSON.stringify(resp.data.custom_config)
          model.start_time = resp.data.start_time
          model.end_time = resp.data.end_time
          model.state = resp.data.state
          this.model = model
        }
      })
    })
  }

  modifySubmitHandler(model:ClientModel){
    this.submitting = true
    this.$client.modify(
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
      model.state
    ).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('修改Client成功',{
          closeBtn:false,
          yes:(idx)=>{
            this.layer.close(idx)
            this.backHandler()
          }
        })
      }
      this.submitting = false
    })
  }

  backHandler(){
    window.history.back()
  }

}
