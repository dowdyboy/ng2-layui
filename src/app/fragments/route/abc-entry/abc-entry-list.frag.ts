import {Component, OnInit} from "@angular/core";
import {TableHeadConfig} from "../../../../../projects/ng2-layui/src/lib/table/table.component";
import {RouteService} from "../../../services/route.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LayerConfig, LayerService} from "../../../../../projects/ng2-layui/src/lib/layer/layer.service";


@Component({
  templateUrl:'abc-entry-list.frag.html'
})
export class AbcEntryListFrag implements OnInit {

  cols:TableHeadConfig[] = [
    {title:'ESTYPE',field:'estype',width:'15%'},
    {title:'映射地址',field:'url',width:'45%'},
    {title:'备注',field:'comment',width:'25%'},
    {title:'操作',field:'action',width:'15%'}
  ]
  rows:any[] = []

  constructor(
    private $route:RouteService,
    private router:Router,
    private route:ActivatedRoute,
    private layer:LayerService
  ){}

  private initialList(){
    this.$route.abcEntryList().subscribe(resp=>{
      if(resp.code == 0){
        this.rows = resp.data
      }
    })
  }

  ngOnInit(): void {
    this.initialList()
  }

  addButtonClick(){
    this.router.navigate(['route','abc','add'],{relativeTo:this.route.parent})
  }

  modifyButtonClick(row){
    this.router.navigate(['route','abc','modify',row.estype],{relativeTo:this.route.parent})
  }

  deleteButtonClick(row){
    this.layer.alert(`删除该映射？【${row.estype}】`,{
      icon:LayerConfig.ICON.QUESTION,
      closeBtn:false,
      btn:['删除','取消'],
      yes:(idx)=>{
        this.layer.close(idx)
        this.$route.abcEntryDelete(row.estype).subscribe(resp=>{
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
