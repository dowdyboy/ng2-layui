import {Component, OnInit} from "@angular/core";
import {RouteService} from "../../../services/route.service";
import {LayerService} from "../../../../../projects/ng2-layui/src/lib/layer/layer.service";
import {ActivatedRoute} from "@angular/router";
import {AbcEntryRouteModel} from "../../../models/abc-entry-route.model";


@Component({
  templateUrl:'abc-entry-modify.frag.html'
})
export class AbcEntryModifyFrag implements OnInit{

  model:AbcEntryRouteModel = null
  submitting = false

  constructor(
    private $route:RouteService,
    private layer:LayerService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      let estype = x.estype
      this.$route.abcEntryGet(estype).subscribe(resp=>{
        if(resp.code == 0){
          let routeModel = new AbcEntryRouteModel()
          routeModel.estype = resp.data.estype
          routeModel.url = resp.data.url
          routeModel.comment = resp.data.comment
          this.model = routeModel
        }
      })
    })
  }

  submitHandler(routeModel:AbcEntryRouteModel){
    this.submitting = true
    this.$route.abcEntryModify(routeModel.estype,routeModel.url,routeModel.comment).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('修改映射成功',{
          closeBtn:false,
          yes:(idx)=>{
            this.layer.close(idx)
            this.backHandler()
          }
        })
      }
      this.submitting = false
    })
  }

  backHandler(){
    window.history.back()
  }

}
