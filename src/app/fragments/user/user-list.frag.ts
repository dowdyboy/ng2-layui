import {Component, OnInit} from "@angular/core";
import {TableHeadConfig} from "../../../../projects/ng2-layui/src/lib/table/table.component";
import {UserService} from "../../services/user.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LayerConfig, LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  templateUrl:'user-list.frag.html'
})
export class UserListFrag implements OnInit{

  cols:TableHeadConfig[] = [
    {title:'用户名',field:'username'},
    {title:'角色',field:'role'},
    {title:'状态',field:'state'},
    {title:'创建时间',field:'time'},
    {title:'操作',field:'action'}
  ]
  rows:any[] = []

  constructor(
    private $user:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private layer:LayerService
  ){}

  private initialList(){
    this.$user.list().subscribe(resp=>{
      if(resp.code == 0){
        let pipe = new DatePipe('en-US')
        this.rows = resp.data.map(x=>{
          x.role = (x.role==0?'管理员':x.role==1?'普通用户':'未知') as any
          x.state = (x.state==0?'未激活':x.state==1?'正常':'未知') as any
          x.time = (pipe.transform(x.time,'yyyy/MM/dd')) as any
          return x
        })
      }
    })
  }

  ngOnInit(): void {
    this.initialList()
  }

  addButtonClick(){
    this.router.navigate(['user','add'],{relativeTo:this.route.parent})
  }

  modifyButtonClick(row){
    this.router.navigate(['user','modify',row.username],{relativeTo:this.route.parent})
  }

  deleteButtonClick(row){
    this.layer.alert(`删除该用户？【${row.username}】`,{
      icon:LayerConfig.ICON.QUESTION,
      closeBtn:false,
      btn:['删除','取消'],
      yes:(idx)=>{
        this.layer.close(idx)
        this.$user.delete(row.username).subscribe(resp=>{
          if(resp.code == 0){
            this.layer.msg('删除成功')
            this.initialList()
          }else{
            this.layer.msg('删除失败')
          }
        })
      },
      btn2:(idx)=>{
        return true
      }
    })
  }

}
