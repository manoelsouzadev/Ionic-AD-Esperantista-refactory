import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  templateUrl: "tabs-page.html"
})
export class TabsPage {
  @ViewChild('tabs',{ static: true}) tabs;


  ngOnInit(){
    console.log(this.tabs);
  }
}
