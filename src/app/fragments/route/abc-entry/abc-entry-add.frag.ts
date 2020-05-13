import {Component} from "@angular/core";
import {AbcEntryRouteModel} from "../../../models/abc-entry-route.model";
import {RouteService} from "../../../services/route.service";
import {LayerService} from "../../../../../projects/ng2-layui/src/lib/layer/layer.service";
import {HttpResponseData} from "../../../models/http-response-data.model";


@Component({
  templateUrl:'abc-entry-add.frag.html'
})
export class AbcEntryAddFrag {

  model:AbcEntryRouteModel = new AbcEntryRouteModel()
  submitting = false

  constructor(
    private $route:RouteService,
    private layer:LayerService
  ){}

  submitHandler(routeModel:AbcEntryRouteModel){
    this.submitting = true
    this.$route.abcEntryAdd(routeModel.estype,routeModel.url,routeModel.comment).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('添加映射成功',{
          closeBtn:false,
          yes:(idx)=>{
            this.layer.close(idx)
            this.backHandler()
          }
        })
      }
      if(resp.code == HttpResponseData.RESPONSE_CODE.ADD_ROUTE_MULTI_ERROR){
        this.layer.msg('掌银入口转发estype重复')
      }
      this.submitting = false
    })
  }

  backHandler(){
    window.history.back()
  }

}
