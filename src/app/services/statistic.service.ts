import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class StatisticService {

  constructor(
    private $conf:ConfigurationService,
    private $auth:AuthenticationService,
    private http:HttpClient
  ){}

}
