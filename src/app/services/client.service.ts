import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {map} from "rxjs/operators";
import {HttpResponseData} from "../models/http-response-data.model";
import {TimeUtil} from "../utils/time.util";


@Injectable()
export class ClientService {

  constructor(
    private http:HttpClient,
    private $conf:ConfigurationService,
    private $auth:AuthenticationService
  ){
  }

  list(){
    return this.http.get<HttpResponseData<{client_id:string,client_name:string,state:number,time:number}[]>>(this.$conf.CLIENT_URLS.LIST.get(this.$auth.getToken())).pipe(
      map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).clients
        }else{
          resp.data = []
        }
        return resp
      })
    )
  }

  get(client_id:string){
    type respT = {client_id:string,client_prefix:string,client_forward_url:string,client_name:string,lottery_strategy_config:{start_time:number,end_time:number,limit:number}[],custom_config:any,start_time:number,end_time:number,is_statistic_ip_location:number,state:number}
    return this.http.get<HttpResponseData<respT>>(this.$conf.CLIENT_URLS.GET.get(this.$auth.getToken(),client_id)).pipe(
      map(resp=>{
        if(resp.code == 0){
          resp.data.custom_config = JSON.parse(resp.data.custom_config)
          resp.data.lottery_strategy_config = JSON.parse((resp.data.lottery_strategy_config as any)).strategies.map(x=>{
            return {
              start_time:TimeUtil.parse('YYYY/MM/DD-HH:mm:ss',x.start_time).getTime(),
              end_time:TimeUtil.parse('YYYY/MM/DD-HH:mm:ss',x.end_time).getTime(),
              limit:x.limit
            }
          })
        }else{
          resp.data = ({} as respT)
        }
        return resp
      })
    )
  }

  modify(
    client_id:string,client_prefix:string,client_forward_url:string,client_name:string,
    lottery_strategy_config:{start_time:number,end_time:number,limit:number}[],
    custom_config:any,
    start_time:number,end_time:number,
    is_statistic_ip_location:number,state:number
  ){
    return this.http.post<HttpResponseData<{}>>(this.$conf.CLIENT_URLS.MODIFY.get(),JSON.stringify({
      token:this.$auth.getToken(),
      client_id:client_id,client_prefix:client_prefix,client_forward_url:client_forward_url,client_name:client_name,
      lottery_strategy_config:JSON.stringify({strategies:lottery_strategy_config.map(x=>{
          return {
            start_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.start_time)),
            end_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.end_time)),
            limit:x.limit
          }
        })}),
      custom_config:custom_config,start_time:start_time,end_time:end_time,
      is_statistic_ip_location:is_statistic_ip_location,state:state
    }))
  }

  put(
    client_id:string,client_prefix:string,client_forward_url:string,client_name:string,
    lottery_strategy_config:{start_time:number,end_time:number,limit:number}[],
    custom_config:any,
    start_time:number,end_time:number,
    is_statistic_ip_location:number,state:number
  ){
    return this.http.post<HttpResponseData<{}>>(this.$conf.CLIENT_URLS.PUT.get(),JSON.stringify({
      token:this.$auth.getToken(),
      client_id:client_id,client_prefix:client_prefix,client_forward_url:client_forward_url,client_name:client_name,
      lottery_strategy_config:JSON.stringify({strategies:lottery_strategy_config.map(x=>{
          return {
            start_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.start_time)),
            end_time:TimeUtil.format('YYYY/MM/DD-HH:mm:ss',new Date(x.end_time)),
            limit:x.limit
          }
        })}),
      custom_config:custom_config,start_time:start_time,end_time:end_time,
      is_statistic_ip_location:is_statistic_ip_location,state:state
    }))
  }

  delete(client_id:string){
    return this.http.post<HttpResponseData<{}>>(this.$conf.CLIENT_URLS.DELETE.get(),JSON.stringify({
      token:this.$auth.getToken(),
      client_id:client_id
    }))
  }

}
