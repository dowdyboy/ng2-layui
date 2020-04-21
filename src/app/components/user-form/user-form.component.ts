import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {ClientService} from "../../services/client.service";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  selector:'es-user-form',
  templateUrl:'user-form.component.html'
})
export class UserFormComponent implements OnInit,OnChanges {

  @Input('model') model:UserModel
  @Input('disabled') disabled:boolean = false
  @Output('submit') submit = new EventEmitter<UserModel>()
  @Output('back') back = new EventEmitter<any>()

  isModify = false

  username:string = ''
  password:string = ''
  role:string = ''
  state:string = ''
  clients:string[] = []

  selectClientId = null
  clientList = []

  constructor(
    private $client:ClientService,
    private layer:LayerService
  ){}

  ngOnInit(): void {
    this.$client.list().subscribe(resp=>{
      if(resp.code == 0){
        this.clientList = resp.data
        if(this.clientList.length>0){
          this.selectClientId = this.clientList[0].client_id
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['model'] && this.model){
      if(this.model.username && this.model.username!='') this.isModify = true
      else this.isModify = false
      this.username = this.model.username
      this.password = this.model.password
      this.role = `${this.model.role}`
      this.state = `${this.model.state}`
      this.clients = this.model.client_ids
    }
  }

  getClientName(client_id:string,clientList:any[]){
    let resArr = clientList.filter(x=>{return x.client_id == client_id})
    if(resArr.length>0){
      return resArr[0].client_name
    }else{
      return client_id
    }
  }

  bindClientIdButtonClick(){
    if(this.clients.filter(x=>{return x == this.selectClientId}).length==0){
      this.clients.push(this.selectClientId)
    }
  }

  unbindClientIdButtonClick(client_id){
    this.clients = this.clients.filter(x=>{return x!=client_id})
  }

  submitButtonHandler(){
    if(!this.isModify && (!this.password || this.password=='')){
      this.layer.msg('请配置用户密码')
      return
    }
    let model = new UserModel()
    model.username = this.username
    model.password = this.password&&this.password!=''?this.password:null
    model.role = +this.role
    model.state = +this.state
    model.client_ids = this.clients
    this.submit.emit(model)
  }

  backButtonClick(){
    this.back.emit(null)
  }

}
