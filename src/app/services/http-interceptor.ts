
import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {Observable, of} from "rxjs/index";
import {catchError, map} from "rxjs/internal/operators";
import {HttpResponseData} from "../models/http-response-data.model";
import {ConfigurationService} from "./configuration.service";
import {LayerConfig, LayerService} from "../../../projects/ng2-layui/src/lib/layer/layer.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class PostBodyJsonifyInterceptor implements HttpInterceptor {

  constructor(
    private $conf:ConfigurationService
  ){}

  private whiteList = []

  isInWhiteList(url:string){
    return this.whiteList.filter(x=>x==url).length > 0
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method.toLowerCase() == 'post' && !this.isInWhiteList(req.url)){
      const newReq = req.clone({
        headers:req.headers.set('Content-Type','application/json')
      })
      return next.handle(newReq)
    } else return next.handle(req)
  }
}

@Injectable()
export class ExceptionHandleInterceptor implements HttpInterceptor {

  successCode = 0
  exceptErrorCodes = [
    HttpResponseData.RESPONSE_CODE.USER_NOT_EXIST_ERROR,
    HttpResponseData.RESPONSE_CODE.USERNAME_PASSWORD_ERROR,
    HttpResponseData.RESPONSE_CODE.CHANGE_PASSWORD_ERROR,
    HttpResponseData.RESPONSE_CODE.CLIENT_ADD_MULTI_ERROR,
    HttpResponseData.RESPONSE_CODE.DELETE_USER_SELF_ERROR,
    HttpResponseData.RESPONSE_CODE.ADD_USER_MULTI_ERROR
  ]

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private layer:LayerService,
    private router:Router
  ){}

  private handleException(resp:HttpResponseData<any>){
    if(this.exceptErrorCodes.indexOf(resp.code) < 0){
      this.layer.alert(resp.msg,{
        icon:LayerConfig.ICON.WRONG,
        closeBtn:false,
        yes:(idx)=>{
          this.layer.close(idx)
          this.$auth.removeToken()
          this.router.navigateByUrl('/')
        }
      })
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err:HttpErrorResponse)=>{
        console.log(err)
        let resp = new HttpResponse().clone({
          status:err.status,
          statusText:err.statusText,
          url:err.url,
          headers:err.headers,
          body:{code:-1,msg:'Http 错误',data:{error:err}}
        })
        return of((resp as HttpEvent<any>))
      }),
      map(resp=>{
        if(resp.type == 4){
          let actualResp:HttpResponse<any> = resp as HttpResponse<any>
          let data:HttpResponseData<any> = actualResp.body
          if(data.code != this.successCode){
            console.log(data)
            if(this.$conf.DEBUG) alert(JSON.stringify(data))
            this.handleException(data)
          }
        }
        return resp
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide:HTTP_INTERCEPTORS, useClass:PostBodyJsonifyInterceptor, multi:true},
  {provide:HTTP_INTERCEPTORS, useClass:ExceptionHandleInterceptor, multi:true}
]
