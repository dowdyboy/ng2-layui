import {Component} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  templateUrl:'user-add.frag.html'
})
export class UserAddFrag {

  model = new UserModel()
  submitting = false

  constructor(
    private $user:UserService,
    private layer:LayerService
  ){}

  submitHandler(model:UserModel){
    this.submitting = true
    this.$user.put(
      model.username,
      model.password,
      model.role,
      model.state,
      model.client_ids
    ).subscribe(async resp=>{
      if(resp.code == 0){
        await this.layer.alert('添加用户成功',{
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
