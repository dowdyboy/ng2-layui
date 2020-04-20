import {Component, OnInit} from "@angular/core";
import {TableHeadConfig} from "../../../../projects/ng2-layui/src/lib/table/table.component";


@Component({
  templateUrl:`client-list.frag.html`
})
export class ClientListFrag implements OnInit{

  cols:TableHeadConfig[] = [
    {title:'昵称',field:'a',width:100},
    {title:'加入时间',field:'b',width:200},
    {title:'签名',field:'c'},
    {title:'操作',field:'d',width:100}
  ]
  rows:any[] = [
    {a:'贤心1',b:'2016-11-29',c:'人生就像是一场修行'},
    {a:'许闲心2',b:'2016-11-29',c:'人生就像是一场修行1'},
    {a:'贤心3',b:'2016-11-29',c:'人生就像是一场修行3'},
    {a:'许闲心4',b:'2016-11-29',c:'人生就像是一场修行2'},
    {a:'贤心5',b:'2016-11-29',c:'人生就像是一场修行'},
    {a:'许闲心6',b:'2016-11-29',c:'人生就像是一场修行1'},
    {a:'贤心7',b:'2016-11-29',c:'人生就像是一场修行3'},
    {a:'许闲心8',b:'2016-11-29',c:'人生就像是一场修行2'},
    {a:'贤心9',b:'2016-11-29',c:'人生就像是一场修行'},
    {a:'许闲心10',b:'2016-11-29',c:'人生就像是一场修行1'},
    {a:'贤心,11',b:'2016-11-29',c:'人生就像是一场修行3'},
    {a:'许闲心12',b:'2016-11-29',c:'人生就像是一场修行2'},
    {a:'贤心13',b:'2016-11-29',c:'人生就像是一场修行'},
    {a:'许闲心14',b:'2016-11-29',c:'人生就像是一场修行1'},
    {a:'贤心15',b:'2016-11-29',c:'人生就像是一场修行3'},
    {a:'许闲心16',b:'2016-11-29',c:'人生就像是一场修行2'},
    {a:'贤心17',b:'2016-11-29',c:'人生就像是一场修行'},
    {a:'许闲心18',b:'2016-11-29',c:'人生就像是一场修行1'},
    {a:'贤心19',b:'2016-11-29',c:'人生就像是一场修行3'},
    {a:'许闲心20',b:'2016-11-29',c:'人生就像是一场修行2'},
    {a:'贤心21',b:'2016-11-29',c:'人生就像是一场修行'}
  ]
  displayRows:any[] = []
  loading = false
  pageSize = 10

  constructor(){

  }

  ngOnInit(): void {
    this.displayRows = this.rows.slice(0,this.pageSize)
  }

  pageChange(e){
    this.loading = true
    setTimeout(()=>{
      this.loading = false
      this.displayRows = this.rows.slice((e.page-1)*e.pageSize,e.page*e.pageSize)
    },3000)
  }

  deleteButtonClick(name:string){
    alert(`删了${name}`)
  }

  timeChange(e){
    console.log(e)
  }

}
