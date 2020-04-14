import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {HttpResponseData} from "../models/http-response-data.model";
import {map} from "rxjs/operators";


@Injectable()
export class StatisticService {

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private http:HttpClient
  ){}

  getAccessTotal(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<number>>(this.$conf.STATISTIC_URLS.GET_ACCESS_TOTAL.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).count
        }else{
          resp.data = 0
        }
        return resp
      }))
  }

  getAccessTimeline(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<{time:number,count:number}[]>>(this.$conf.STATISTIC_URLS.GET_ACCESS_TIMELINE.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).items
        }else{
          resp.data = []
        }
        return resp
      }))
  }

  getPayTotal(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<number>>(this.$conf.STATISTIC_URLS.GET_PAY_TOTAL.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).count
        }else{
          resp.data = 0
        }
        return resp
      }))
  }

  getPayTimeline(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<{time:number,count:number}[]>>(this.$conf.STATISTIC_URLS.GET_PAY_TIMELINE.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).items
        }else{
          resp.data = []
        }
        return resp
      }))
  }

  getAwardTypeline(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<{name:string,count:number}[]>>(this.$conf.STATISTIC_URLS.GET_AWARD_TYPELINE.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).items
        }else{
          resp.data = []
        }
        return resp
      }))
  }

  getAwardDetail(client_id:string,start_time:number,end_time:number,page:number,page_size:number,time_order:string){
    type respT = {
      page:{current:number,total:number,data_count:number,page_size:number},
      time_order:string,
      items:{
        agent_id:string,uid:string,award_type:string,
        award_config:{award_name:string,money:number,tel:string,first_code:string,second_code:string},
        time:number
      }[]
    }
    return this.http.get<HttpResponseData<respT>>(this.$conf.STATISTIC_URLS.GET_AWARD_DETAIL.get(this.$auth.getToken(),client_id,start_time,end_time,page,page_size,time_order))
  }

  exportAwardDetail(client_id:string,start_time:number,end_time:number,time_order:string){
    return this.http.post<HttpResponseData<string>>(this.$conf.STATISTIC_URLS.EXPORT_AWARD_DETAIL.get(),JSON.stringify({
      token:this.$auth.getToken(),
      client_id:client_id,
      start_time:start_time,
      end_time:end_time,
      time_order:time_order
    })).pipe(map(resp=>{
      if(resp.code == 0){
        resp.data = (resp.data as any).ticket
      }else{
        resp.data = null
      }
      return resp
    }))
  }

  getExportFile(ticket:string){
    return this.http.get<HttpResponseData<{state:string,file_url:string}>>(this.$conf.STATISTIC_URLS.GET_EXPORT_FILE.get(this.$auth.getToken(),ticket))
  }

  getActiveTotal(client_id:string,start_time:number,end_time:number){
    return this.http.get<HttpResponseData<number>>(this.$conf.STATISTIC_URLS.GET_ACTIVE_TOTAL.get(this.$auth.getToken(),client_id,start_time,end_time))
      .pipe(map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).count
        }else{
          resp.data = 0
        }
        return resp
      }))
  }

}
