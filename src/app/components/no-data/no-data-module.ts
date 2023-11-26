import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {NoDataComponent} from "./no-data.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    NoDataComponent
  ],
  declarations: [
    NoDataComponent
  ]
})
export class NoDataComponentModule { }
