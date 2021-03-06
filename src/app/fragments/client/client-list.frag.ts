import {Component, OnInit} from "@angular/core";
import {TableHeadConfig} from "../../../../projects/ng2-layui/src/lib/table/table.component";
import {ClientService} from "../../services/client.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LayerConfig, LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  templateUrl:`client-list.frag.html`
})
export class ClientListFrag implements OnInit{

  cols:TableHeadConfig[] = [
    {title:'Client ID',field:'client_id'},
    {title:'Client名称',field:'client_name'},
    {title:'状态',field:'state'},
    {title:'创建时间',field:'time'},
    {title:'操作',field:'action'}
  ]
  rows:any[] = []

  constructor(
    private $client:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private layer:LayerService
  ){}

  private initialList(){
    this.$client.list().subscribe(resp=>{
      if(resp.code == 0){
        let pipe = new DatePipe('en-US')
        this.rows = resp.data.map(x=>{
          x.state = (x.state==0?'未激活':x.state==1?'已激活':'未知') as any
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
    this.router.navigate(['client','add'],{relativeTo:this.route.parent})
  }

  editButtonClick(client_id:string){
    this.router.navigate(['client','modify',client_id],{relativeTo:this.route.parent})
  }

  async deleteButtonClick(row){
    await this.layer.alert(`删除该Client吗？【${row.client_name}】`,{
      icon:LayerConfig.ICON.QUESTION,
      closeBtn:false,
      btn:['删除','取消'],
      yes:(idx)=>{
        this.layer.close(idx)
        this.$client.delete(row.client_id).subscribe(resp=>{
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
