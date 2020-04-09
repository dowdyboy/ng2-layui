import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {HttpResponseData} from "../models/http-response-data.model";


@Injectable()
export class UserService {

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private http:HttpClient
  ){}

  list(){
    return this.http.get<HttpResponseData<{username:string,role:number,state:number,time:number}[]>>(this.$conf.USER_URLS.LIST.get(this.$auth.getToken())).pipe(
      map(resp=>{
        if(resp.code == 0){
          resp.data = (resp.data as any).users
        }else{
          resp.data = []
        }
        return resp
      })
    )
  }

  get(username:string){
    return this.http.get<HttpResponseData<{username:string,role:number,state:number,time:number,client_ids:string[]}>>(this.$conf.USER_URLS.GET.get(this.$auth.getToken(),username))
  }

  modify(username:string,password:string,role:number,state:number,client_ids:string[]){
    return this.http.post<HttpResponseData<{}>>(this.$conf.USER_URLS.MODIFY.get(),JSON.stringify({
      token:this.$auth.getToken(),
      username:username,
      password:password,
      role:role,
      state:state,
      client_ids:client_ids
    }))
  }

  put(username:string,password:string,role:number,state:number,client_ids:string[]){
    return this.http.post<HttpResponseData<{}>>(this.$conf.USER_URLS.PUT.get(),JSON.stringify({
      token:this.$auth.getToken(),
      username:username,password:password,role:role,
      state:state,client_ids:client_ids
    }))
  }

  delete(username:string){
    return this.http.post<HttpResponseData<{}>>(this.$conf.USER_URLS.DELETE.get(),JSON.stringify({
      token:this.$auth.getToken(),
      username:username
    }))
  }

}
