import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {HttpResponseData} from "../models/http-response-data.model";
import {map} from "rxjs/operators";


@Injectable()
export class RouteService {

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private http:HttpClient
  ){}

  abcEntryAdd(estype:string,url:string,comment:string,has_ext_param:number){
    return this.http.post<HttpResponseData<{}>>(this.$conf.ROUTE_URLS.ABC_ENTRY_ADD.get(),JSON.stringify({
      token:this.$auth.getToken(),
      estype:estype,
      url:url,
      comment:comment,
      has_ext_param:has_ext_param
    }))
  }

  abcEntryModify(estype:string,url:string,comment:string,has_ext_param:number){
    return this.http.post<HttpResponseData<{}>>(this.$conf.ROUTE_URLS.ABC_ENTRY_MODIFY.get(),JSON.stringify({
      token:this.$auth.getToken(),
      estype:estype,
      url:url,
      comment:comment,
      has_ext_param:has_ext_param
    }))
  }

  abcEntryDelete(estype:string){
    return this.http.post<HttpResponseData<{}>>(this.$conf.ROUTE_URLS.ABC_ENTRY_DELETE.get(),JSON.stringify({
      token:this.$auth.getToken(),
      estype:estype
    }))
  }

  abcEntryList(){
    return this.http.get<HttpResponseData<{estype:string,url:string,comment:string,has_ext_param:number}[]>>(this.$conf.ROUTE_URLS.ABC_ENTRY_LIST.get(this.$auth.getToken()))
      .pipe(
        map(resp=>{
          if(resp.code == 0){
            resp.data = (resp.data as any).routeds
          }else{
            resp.data = []
          }
          return resp
        })
      )
  }

  abcEntryGet(estype:string){
    return this.http.get<HttpResponseData<{estype:string,url:string,comment:string,has_ext_param:number}>>(this.$conf.ROUTE_URLS.ABC_ENTRY_GET.get(this.$auth.getToken(),estype))
  }

}
