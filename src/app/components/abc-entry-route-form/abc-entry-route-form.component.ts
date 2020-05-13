import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {AbcEntryRouteModel} from "../../models/abc-entry-route.model";


@Component({
  selector:'es-abc-entry-route-form',
  templateUrl:'abc-entry-route-form.component.html'
})
export class AbcEntryRouteFormComponent implements OnChanges {

  @Input('model') model:AbcEntryRouteModel
  @Input('disabled') disabled:boolean = false
  @Output('submit') submit = new EventEmitter<AbcEntryRouteModel>()
  @Output('back') back = new EventEmitter<any>()

  isModify = false

  estype:string = ''
  url:string = ''
  comment:string = ''

  constructor(
  ){}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes['model'] && this.model){
      if(this.model.estype && this.model.estype != '') this.isModify = true
      else this.isModify = false
      this.estype = this.model.estype
      this.url = this.model.url
      this.comment = this.model.comment
    }
  }

  submitButtonHandler(){
    let routeModel = new AbcEntryRouteModel()
    routeModel.estype = this.estype
    routeModel.url = this.url
    routeModel.comment = this.comment
    this.submit.emit(routeModel)
  }

  backButtonClick(){
    this.back.emit(null)
  }

}
