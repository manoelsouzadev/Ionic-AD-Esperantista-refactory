import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SharedColorService {
  constructor() {}

  getThemeColor(themeSwitch?: boolean) {
    return themeSwitch;
  }
}
