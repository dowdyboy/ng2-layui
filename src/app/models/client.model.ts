

export class ClientModel {

  client_id:string = ''
  client_prefix:string = ''
  client_forward_url:string = ''
  client_name:string = ''
  lottery_strategy_config:string = '{"strategies":[]}'
  custom_config:string = '{}'
  start_time:number = new Date().getTime()
  end_time:number = new Date().getTime()
  state:number = 0

}
