import {Component, OnInit} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  templateUrl:'user-modify.frag.html'
})
export class UserModifyFrag implements OnInit{

  model = null
  submitting = false

  constructor(
    private $user:UserService,
    private layer:LayerService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      let username = x.username
      this.$user.get(username).subscribe(resp=>{
        if(resp.code==0){
          let model = new UserModel()
          model.username = resp.data.username
          model.password = ''
          model.role = resp.data.role
          model.state = resp.data.state
          model.client_ids = resp.data.client_ids
          this.model = model
        }
      })
    })
  }

  submitHandler(model:UserModel){
    this.submitting = true
    this.$user.modify(
      model.username,
      model.password,
      model.role,
      model.state,
      model.client_ids
    ).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('修改用户成功',{
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
