import {Injectable} from "@angular/core";

declare var layui;

export class LayerConfig {

  static TYPE = {
    INFO:0,
    PAGE:1,
    IFRAME:2,
    LOAD:3,
    TIPS:4
  }

  static OFFSET = {
    AUTO:'auto',
    TOP:'t',
    RIGHT:'r',
    BOTTOM:'b',
    LEFT:'l',
    LEFT_TOP:'lt',
    LEFT_BOTTOM:'lb',
    RIGHT_TOP:'rt',
    RIGHT_BOTTOM:'rb'
  }

  static ICON = {
    EXCL:0,
    RIGHT:1,
    WRONG:2,
    QUESTION:3,
    LOCK:4,
    SAD:5,
    HAPPY:6
  }

  static BTN_ALIGN = {
    LEFT:'l',
    CENTER:'c',
    RIGHT:'r'
  }

  static ANIM = {
    NONE:-1,
    EXPEND:0,
    DROP_TOP:1,
    SLIDE_BOTTOM:2,
    SLIDE_LEFT:3,
    ROLL_LEFT:4,
    FADE:5,
    SHAKE:6
  }

  static TIPS = {
    TOP:1,
    RIGHT:2,
    BOTTOM:3,
    LEFT:4
  }

  constructor(
    public type?:number,
    public title?:string,
    public content?:any,
    public skin?:string,
    public area?:string|string[],
    public offset?:string|string[],
    public icon?:number,
    public btn?:string|string[],
    public btnAlign?:string,
    public closeBtn?:string|boolean,
    public shade?:string|string[]|boolean,
    public shadeClose?:boolean,
    public time?:number,
    public id?:string,
    public anim?:number,
    public isOutAnim?:boolean,
    public maxmin?:boolean,
    public fixed?:boolean,
    public resize?:boolean,
    public resizing?:(dom:any)=>any,
    public scrollbar?:boolean,
    public maxWidth?:number,
    public maxHeight?:number,
    public zIndex?:number,
    public move?:string|boolean,
    public moveOut?:boolean,
    public moveEnd?:(any)=>any,
    public tips?:number|any[],
    public tipsMore?:boolean,
    public success?:(dom:any,index:number)=>any,
    public yes?:(index:number,dom:any)=>any,
    public cancel?:(index:number,dom:any)=>boolean,
    public end?:()=>any,
    public full?:()=>any,
    public min?:()=>any,
    public restore?:()=>any,
    public path?:string,
    public extend?:string
  ){}
}

@Injectable({providedIn:'root'})
export class LayerService {

  static baseConf:LayerConfig = null

  static config(conf:LayerConfig){
    this.baseConf = conf
    return LayerService
  }

  constructor(){
    if(!!LayerService.baseConf){
      this.layer(layer=>{
        layer.config(LayerService.baseConf)
      })
    }
  }

  private layer(next:(layer:any)=>any){
    layui.use('layer', ()=>{
      let layer = layui.layer
      next(layer)
    })
  }

  msg(msg:string,conf?:LayerConfig){
    return new Promise((resolve,reject)=>{
      this.layer(layer=>{
        layer.msg(msg,conf?conf:{},()=>{resolve()})
      })
    })
  }

  alert(msg:string,conf?:LayerConfig){
    return new Promise((resolve,reject)=>{
      this.layer(layer=>{
        layer.alert(msg,conf?conf:{},idx=>{resolve(idx)})
      })
    })
  }

  confirm(msg:string,conf?:LayerConfig){
    return new Promise((resolve,reject)=>{
      this.layer(layer=>{
        layer.confirm(msg,conf?conf:{},idx=>{resolve(idx)})
      })
    })
  }

  load(icon?:number,conf?:LayerConfig){
    return new Promise((resolve,reject)=>{
      this.layer(layer=>{
        resolve(layer.load(icon,conf))
      })
    })
  }

  tips(msg:string,dom:any,conf?:LayerConfig){
    this.layer(layer=>{
      layer.tips(msg,dom,conf?conf:{})
    })
  }

  close(index:number){
    this.layer(layer=>{
      layer.close(index)
    })
  }

  closeAll(type?:number|string){
    this.layer(layer=>{
      layer.closeAll(type?type:null)
    })
  }

}
