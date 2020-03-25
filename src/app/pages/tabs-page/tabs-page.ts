import { SharedColorService } from "./../../shared/services/shared-color/shared-color.service";
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "tabs-page.html"
})
export class TabsPage {
  private themeSwitch: string;

  constructor(private sharedColorService: SharedColorService) {
    this.themeSwitch =
      this.sharedColorService.getThemeColor() == true ? "primary" : "dark";
  }
}
