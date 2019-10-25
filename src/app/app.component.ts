import { Component } from '@angular/core';
import {LayerService} from "../../projects/ng2-layui/src/lib/layer/layer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng2-layui-spec';

  constructor(
    private layMessage:LayerService
  ){}

  msgButtonClick(){
    this.layMessage.message('hello,world')
  }

}
