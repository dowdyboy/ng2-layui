import {Injectable} from "@angular/core";

declare var layui;

@Injectable({providedIn:'root'})
export class LayerService {

  message(msg:string){
    layui.use('layer', function(){
      let layer = layui.layer;
      layer.msg(msg);
    });
  }

}
