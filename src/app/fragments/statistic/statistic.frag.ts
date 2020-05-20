import {Component, OnInit} from "@angular/core";
import {StatisticService} from "../../services/statistic.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LayerService} from "../../../../projects/ng2-layui/src/lib/layer/layer.service";
import EChartOption = echarts.EChartOption;
import {LayuiColor} from "../../../../projects/ng2-layui/src/lib/color/layui-color";
import {forkJoin} from "rxjs";
import {TableHeadConfig} from "../../../../projects/ng2-layui/src/lib/table/table.component";
import {TimeUtil} from "../../utils/time.util";


@Component({
  templateUrl:'statistic.frag.html',
  styles:[
    `
    .number-panel{
      background-color: #1E9FFF;
      color:white;
      padding: 15px;
      text-indent: 25px;
    }
      .number-panel .title-text{
        font-size: 18px;
      }
      .number-panel .number-text{
        font-size: 32px;
      }
      .number-panel .icon{
        font-size: 32px;
      }
    `
  ]
})
export class StatisticFrag implements OnInit {

  clients:{client_id:string,client_name}[] = []
  selectClientId:string = null
  start_time:Date = null
  end_time:Date = null

  accessTotalCount:number = 0
  payTotalCount:number = 0
  activeTotalCount:number = 0
  timelineChartOption:EChartOption = null
  typelineChartOption:EChartOption = null
  cols:TableHeadConfig[] = [
    // {title:'活动ID',field:'agent_id',width:'10%'},
    // {title:'用户ID',field:'uid',width:'20%'},
    {title:'奖品类型',field:'award_type_text',width:'10%'},
    {title:'奖品名称',field:'award_name',width:'10%'},
    {title:'金额',field:'award_config_money',width:'10%'},
    {title:'手机号',field:'award_config_tel',width:'15%'},
    {title:'兑换码',field:'award_config_code',width:'20%'},
    {title:'奖品备注',field:'award_comment',width:'15%'},
    {title:'中奖时间',field:'time_text',width:'20%'}
  ]
  rows:any[] = []
  loading:boolean = false
  page:number = 1
  pageSize:number = 15
  pageSizeList:number[] = [15,30,50]
  totalCount:number = 0
  timeOrder:string = 'desc'

  exportState:string = 'READY'
  exportFileUrl:string = null

  constructor(
    private $statistic:StatisticService,
    private $auth:AuthenticationService,
    private layer:LayerService
  ){}

  private setStartEndTime(start_time?:Date,end_time?:Date){
    if(start_time){
      start_time.setHours(0,0,0,0)
      this.start_time = start_time
    }
    if(end_time){
      end_time.setHours(23,59,59,999)
      this.end_time = end_time
    }
  }

  private freshTotalCount(){
    // this.accessTotalCount = 0
    // this.payTotalCount = 0
    // this.activeTotalCount = 0
    this.$statistic.getAccessTotal(this.selectClientId,this.start_time.getTime(),this.end_time.getTime()).subscribe(resp=>{
      if(resp.code == 0){
        this.accessTotalCount = resp.data
      }else{
        this.accessTotalCount = -1
      }
    })
    this.$statistic.getPayTotal(this.selectClientId,this.start_time.getTime(),this.end_time.getTime()).subscribe(resp=>{
      if(resp.code == 0){
        this.payTotalCount = resp.data
      }else{
        this.payTotalCount = -1
      }
    })
    this.$statistic.getActiveTotal(this.selectClientId,this.start_time.getTime(),this.end_time.getTime()).subscribe(resp=>{
      if(resp.code == 0){
        this.activeTotalCount = resp.data
      }else{
        this.activeTotalCount = -1
      }
    })
  }

  private freshTimeline(){
    forkJoin(
      [this.$statistic.getAccessTimeline(this.selectClientId,this.start_time.getTime(),this.end_time.getTime()),
        this.$statistic.getPayTimeline(this.selectClientId,this.start_time.getTime(),this.end_time.getTime())]
    ).subscribe(res=>{
      if(res[0].code == 0 && res[1].code == 0){
        this.timelineChartOption = {
          title:{
            text:'访问次数/支付次数 时间分布'
          },
          color:[LayuiColor.COLOR_GREEN.value,LayuiColor.COLOR_ORANGE.value,LayuiColor.COLOR_CLING.value],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['访问次数','支付次数']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            type: 'time',
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'访问次数',
            data: res[0].data.map(x=>{return [x.time,x.count]}),
            type: 'line'
          },{
            name:'支付次数',
            data: res[1].data.map(x=>{return [x.time,x.count]}),
            type: 'line'
          }]
        }
      }
    })
  }

  private freshTypeline(){
    this.$statistic.getAwardTypeline(this.selectClientId,this.start_time.getTime(),this.end_time.getTime()).subscribe(resp=>{
      if(resp.code == 0){
        this.typelineChartOption = {
          title:{
            text:'派发奖品 数量分布'
          },
          color:[LayuiColor.COLOR_ORANGE.value,LayuiColor.COLOR_CLING.value,LayuiColor.COLOR_BLUE.value,LayuiColor.COLOR_GREEN.value,
          LayuiColor.COLOR_CYAN.value,LayuiColor.COLOR_YELLOW.value,LayuiColor.COLOR_WATHET.value,LayuiColor.COLOR_BLACK.value],
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'35',
            data: resp.data.map(x=>{return x.name})
          },
          series: [{
            type: 'pie',
            data: resp.data.map(x=>{return {name:x.name,value:x.count}}),
          }]
        }
      }
    })
  }

  private freshAwardDetailTable(){
    this.rows = []
    this.loading = false
    this.page = 1
    this.pageSize = 15
    this.timeOrder = 'desc'
    this.totalCount = 0
    this.freshAwardDetailTableData()
  }

  private freshAwardDetailTableData(){
    this.loading = true
    this.$statistic.getAwardDetail(this.selectClientId,this.start_time.getTime(),this.end_time.getTime(),this.page,this.pageSize,this.timeOrder).subscribe(resp=>{
      if(resp.code == 0){
        this.totalCount = resp.data.page.data_count
        this.page = resp.data.page.current
        this.pageSize = resp.data.page.page_size
        this.rows = resp.data.items.map(x=>{
          let newX = x as any
          newX.award_name = x.award_config.award_name
          newX.award_type_text = x.award_type=='tel'?'话费':x.award_type=='code'?'两码':x.award_type=='custom'?'自定义':'未知'
          newX.award_config_money = ''
          newX.award_config_tel = ''
          newX.award_config_code = ''
          if(x.award_type=='tel'){
            newX.award_config_money = (+x.award_config.money).toFixed(2)
            newX.award_config_tel = x.award_config.tel
          }else if(x.award_type == 'code'){
            newX.award_config_code = x.award_config.first_code
            if(x.award_config.second_code && x.award_config.second_code.trim()!='')
              newX.award_config_code += `,${x.award_config.second_code}`
          }
          newX.time_text = TimeUtil.format('YYYY/MM/DD HH:mm:ss',new Date(x.time))
          return newX
        })
        this.loading = false
      }
    })
  }

  private freshAllData(){
    this.freshTotalCount()
    this.freshTimeline()
    this.freshTypeline()
    this.freshAwardDetailTable()
  }

  ngOnInit(): void {
    this.setStartEndTime(new Date(),new Date())
    this.$auth.getBindClient().subscribe(resp=>{
      if(resp.code == 0){
        this.clients = resp.data
        if(this.clients.length>0) this.selectChangeHandler(this.clients[0].client_id)
      }
    })
  }

  selectChangeHandler(client_id:string){
    if(client_id != this.selectClientId){
      this.selectClientId = client_id
      this.freshAllData()
    }
  }

  startTimeChange(d:Date){
    this.setStartEndTime(d,null)
    if(this.start_time.getTime() < this.end_time.getTime()){
      this.freshAllData()
    }else{
      this.layer.msg('开始时间必须小于结束时间')
    }
  }

  endTimeChange(d:Date){
    this.setStartEndTime(null,d)
    if(this.start_time.getTime() < this.end_time.getTime()){
      this.freshAllData()
    }else{
      this.layer.msg('开始时间必须小于结束时间')
    }
  }

  timeOrderSelectChange(){
    this.freshAwardDetailTableData()
  }

  pageChangeHandler(e){
    this.page = e.page
    this.pageSize = e.pageSize
    this.freshAwardDetailTableData()
  }

  exportButtonClick(){
    if(this.exportState == 'READY'){
      this.exportState = 'WAIT'
      this.$statistic.exportAwardDetail(this.selectClientId,this.start_time.getTime(),this.end_time.getTime(),this.timeOrder).subscribe(resp=>{
        if(resp.code == 0){
          let ticket = resp.data
          let timer = setInterval(()=>{
            this.$statistic.getExportFile(ticket).subscribe(resp=>{
              if(resp.code == 0){
                if(resp.data.state == 'SUCCESS'){
                  clearInterval(timer)
                  this.exportState = 'SUCCESS'
                  this.exportFileUrl = resp.data.file_url
                }
                if(resp.data.state == 'ERROR'){
                  this.layer.msg('导出失败')
                  clearInterval(timer)
                  this.exportState = 'READY'
                }
              }else{
                this.layer.msg('导出过程中出现异常')
                clearInterval(timer)
                this.exportState = 'READY'
              }
            })
          },3000)
        }else{
          //this.layer.msg('导出请求失败')
          this.exportState = 'READY'
        }
      })
    }
    if(this.exportState == 'SUCCESS'){
      window.open(this.exportFileUrl)
      this.exportState = 'READY'
    }
  }

}
