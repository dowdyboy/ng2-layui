import {Injectable} from "@angular/core";
import {Url} from "../models/url.model";


@Injectable()
export class ConfigurationService {

  NAME:string = '营销活动管理系统'
  VERSION:string = '0.0.1'

  API_BASE_URL = 'http://easymock.dowdyboy.com/mock/5e9564a46226e900164d0ad8/yx'

  AUTH_URLS = {
    LOGIN:new Url(`${this.API_BASE_URL}/api/login`),
    LOGOUT:new Url(`${this.API_BASE_URL}/api/logout`),
    CHANGE_PWD:new Url(`${this.API_BASE_URL}/api/password/change`)
  }

  CLIENT_URLS = {
    LIST:new Url(`${this.API_BASE_URL}/api/client/list?token=$0`),
    GET:new Url(`${this.API_BASE_URL}/api/client/conf/get?token=$0&client_id=$1`),
    MODIFY:new Url(`${this.API_BASE_URL}/api/client/conf/modify`),
    PUT:new Url(`${this.API_BASE_URL}/api/client/conf/put`),
    DELETE:new Url(`${this.API_BASE_URL}/api/client/delete`)
  }

  USER_URLS = {
    LIST:new Url(`${this.API_BASE_URL}/api/user/list?token=$0`),
    GET:new Url(`${this.API_BASE_URL}/api/user/get?token=$0&username=$1`),
    MODIFY:new Url(`${this.API_BASE_URL}/api/user/modify`),
    PUT:new Url(`${this.API_BASE_URL}/api/user/put`),
    DELETE:new Url(`${this.API_BASE_URL}/api/user/delete`)
  }

  STATISTIC_URLS = {
    GET_ACCESS_TOTAL:new Url(`${this.API_BASE_URL}/api/statistic/access/total/get?token=$0&client_id=$1&start_time=$2&end_time=$3`),
    GET_ACCESS_TIMELINE:new Url(`${this.API_BASE_URL}/api/statistic/access/timeline/get?token=$0&client_id=$1&start_time=$2&end_time=$3`),
    GET_PAY_TOTAL:new Url(`${this.API_BASE_URL}/api/statistic/pay/total/get?token=$0&client_id=$1&start_time=$2&end_time=$3`),
    GET_PAY_TIMELINE:new Url(`${this.API_BASE_URL}/api/statistic/pay/timeline/get?token=$0&client_id=$1&start_time=$2&end_time=$3`),
    GET_AWARD_TYPELINE:new Url(`${this.API_BASE_URL}/api/statistic/award/typeline/get?token=$0&client_id=$1&start_time=$2&end_time=$3`),
    GET_AWARD_DETAIL:new Url(`${this.API_BASE_URL}/api/statistic/award/detail/get?token=$0&client_id=$1&start_time=$2&end_time=$3&page=$4&page_size=$5&time_order=$6`),
    EXPORT_AWARD_DETAIL:new Url(`${this.API_BASE_URL}/api/statistic/award/detail/export`),
    GET_EXPORT_FILE:new Url(`${this.API_BASE_URL}/api/statistic/export/file/get?token=$0&ticket=$1`),
    GET_ACTIVE_TOTAL:new Url(`${this.API_BASE_URL}/api/statistic/active/total/get?token=$0&client_id=$1&start_time=$2&end_time=$3`)
  }

}
