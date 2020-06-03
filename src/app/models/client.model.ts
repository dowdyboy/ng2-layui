

export class ClientModel {

  client_id:string = ''
  client_prefix:string = ''
  client_forward_url:string = ''
  client_name:string = ''
  lottery_strategy_config:string = '{"strategies":[]}'
  custom_config:string = '{}'
  is_statistic_ip_location:number = 0
  start_time:number = new Date().getTime()
  end_time:number = new Date().getTime()
  state:number = 0

}
