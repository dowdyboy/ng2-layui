import {Component, OnInit} from "@angular/core";


@Component({
  templateUrl:'test.page.html'
})
export class TestPage implements OnInit{

  progress:number = 0
  progressShowPercent:boolean = true

  collapseAccordion:boolean = false

  ngOnInit(): void {
    setInterval(()=>{
      this.progress += 1
      if(this.progress > 10) this.progressShowPercent = false
    },300)
    setTimeout(()=>{
      this.collapseAccordion = true
    },3000)
  }

}
