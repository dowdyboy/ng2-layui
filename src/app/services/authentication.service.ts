import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConfigurationService} from "./configuration.service";
import {map} from "rxjs/operators";
import {StorageUtil} from "../utils/storage.util";
import {HttpResponseData} from "../models/http-response-data.model";


@Injectable()
export class AuthenticationService {

  static USER_TOKEN_KEY = 'USER_TOKEN_KEY'

  private token:{token:string,deadline:number} = null

  constructor(
    private http:HttpClient,
    private $conf:ConfigurationService
  ){
    if(StorageUtil.getLocalStorage(AuthenticationService.USER_TOKEN_KEY)){
      this.token = JSON.parse(StorageUtil.getLocalStorage(AuthenticationService.USER_TOKEN_KEY))
    }
  }

  private setToken(token:string){
    this.token = {token:token,deadline:new Date().getTime()+86300000}
    StorageUtil.setLocalStorage(AuthenticationService.USER_TOKEN_KEY,JSON.stringify(this.token))
  }

  private removeToken(){
    if(!!this.token){
      this.token = null
      StorageUtil.removeLocalStorage(AuthenticationService.USER_TOKEN_KEY)
    }
  }

  getToken(){
    if(!!this.token){
      if(new Date().getTime() > this.token.deadline){
        this.removeToken()
        return null
      } else return this.token.token
    }else return null
  }

  login(username:string,password:string){
    return this.http.post<HttpResponseData<{token:string}>>(this.$conf.AUTH_URLS.LOGIN.get(),JSON.stringify({
      username:username,
      password:password
    })).pipe(
      map(resp=>{
        if(resp.code == 0){
          this.setToken(resp.data.token)
        }
        resp.data = {token:''}
        return resp
      })
    )
  }

  logout(){
    return this.http.post<HttpResponseData<{}>>(this.$conf.AUTH_URLS.LOGOUT.get(),JSON.stringify({
      token:this.getToken()
    })).pipe(
      map(resp=>{
        if(resp.code == 0){
          this.removeToken()
        }
        return resp
      })
    )
  }

  changePassword(old_password:string,new_password:string){
    return this.http.post<HttpResponseData<{}>>(this.$conf.AUTH_URLS.CHANGE_PWD.get(),JSON.stringify({
      token:this.getToken(),
      old_password:old_password,
      new_password:new_password
    }))
  }

}
