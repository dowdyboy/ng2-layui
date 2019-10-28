import { Component } from '@angular/core';
import {LayerConfig, LayerService} from "../../projects/ng2-layui/src/lib/layer/layer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ng2-layui-spec';

  constructor(
    private layer:LayerService
  ){}

  msgButtonClick(e:Event){
    this.layer.tips('hello',e.currentTarget,{time:500,tips:LayerConfig.TIPS.TOP})
  }

}
