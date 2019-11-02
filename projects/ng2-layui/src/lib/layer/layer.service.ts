import {Injectable} from "@angular/core";

declare var layui;

export class PhotosData {

  constructor(
    public title?:string,
    public id?:number,
    public start?:number,
    public data?:{alt:string,pid:number,src:string,thumb:string}[]
  ){}
}

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

export class PromptLayerConfig extends LayerConfig{

  static FORM_TYPE = {
    TEXT:0,
    PASSWORD:1,
    MULTI_TEXT:2
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
    public extend?:string,
    public formType?:number,
    public value?:string,
    public maxlength?:number
  ){
    super(
      type, title, content, skin, area, offset, icon, btn, btnAlign, closeBtn, shade, shadeClose, time, id,
      anim, isOutAnim, maxmin, fixed, resize, resizing, scrollbar, maxWidth, maxHeight, zIndex, move,
      moveOut, moveEnd, tips, tipsMore, success, yes, cancel, end, full, min, restore, path, extend
    )
  }
}

export class TabLayerConfig extends LayerConfig{

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
    public extend?:string,
    public tab?:LayerConfig[]
  ){
    super(
      type, title, content, skin, area, offset, icon, btn, btnAlign, closeBtn, shade, shadeClose, time, id,
      anim, isOutAnim, maxmin, fixed, resize, resizing, scrollbar, maxWidth, maxHeight, zIndex, move,
      moveOut, moveEnd, tips, tipsMore, success, yes, cancel, end, full, min, restore, path, extend
    )
  }
}

export class PhotosLayerConfig extends LayerConfig{

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
    public extend?:string,
    public photos?:PhotosData|string,
    public tab?:(pic:any,dom:any)=>any
  ){
    super(
      type, title, content, skin, area, offset, icon, btn, btnAlign, closeBtn, shade, shadeClose, time, id,
      anim, isOutAnim, maxmin, fixed, resize, resizing, scrollbar, maxWidth, maxHeight, zIndex, move,
      moveOut, moveEnd, tips, tipsMore, success, yes, cancel, end, full, min, restore, path, extend
    )
  }
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
    return new Promise<number>((resolve,reject)=>{
      this.layer(layer=>{
        layer.alert(msg,conf?conf:{},idx=>{resolve(idx)})
      })
    })
  }

  confirm(msg:string,conf?:LayerConfig){
    return new Promise<number>((resolve,reject)=>{
      this.layer(layer=>{
        layer.confirm(msg,conf?conf:{},idx=>{resolve(idx)})
      })
    })
  }

  load(icon?:number,conf?:LayerConfig){
    return new Promise<number>((resolve,reject)=>{
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

  prompt(conf?:PromptLayerConfig){
    return new Promise<{value:string,index:number,elem:any}>((resolve,reject)=>{
      this.layer(layer => {
        layer.prompt(conf?conf:{},(value,index,elem)=>{resolve({value,index,elem})})
      })
    })
  }

  tab(conf?:TabLayerConfig){
    this.layer(layer => {
      layer.tab(conf?conf:{})
    })
  }

  photos(conf?:PhotosLayerConfig){
    this.layer(layer => {
      layer.photos(conf?conf:{})
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

  open(conf:LayerConfig){
    return new Promise<number>((resolve,reject)=>{
      this.layer(layer => {
        resolve(layer.open(conf))
      })
    })
  }

  style(index:number,cssStyle:any){
    this.layer(layer => {
      layer.style(index,cssStyle)
    })
  }

  title(index:number,title:string){
    this.layer(layer => {
      layer.title(title,index)
    })
  }

  getChildFrame(index:number,selector:string){
    return new Promise<any>((resolve,reject)=>{
      this.layer(layer => {
        resolve(layer.getChildFrame(selector,index))
      })
    })
  }

  getFrameIndex(windowName:string){
    return new Promise<number>((resolve,reject)=>{
      this.layer(layer => {
        resolve(layer.getFrameIndex(windowName))
      })
    })
  }

  iframeAuto(index:number){
    this.layer(layer => {
      layer.iframeAuto(index)
    })
  }

  iframeSrc(index:number,iframeSrc:string){
    this.layer(layer => {
      layer.iframeSrc(index,iframeSrc)
    })
  }

  setTop(dom:any){
    this.layer(layer => {
      layer.setTop(dom)
    })
  }

  full(){
    this.layer(layer => {
      layer.full()
    })
  }

  min(){
    this.layer(layer => {
      layer.min()
    })
  }

  restore(){
    this.layer(layer => {
      layer.restore()
    })
  }

}
