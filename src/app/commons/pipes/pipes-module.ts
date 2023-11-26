import {RemoveCommaPipe} from "./remove-comma.pipe";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RemoveCommaPipe
  ],
  declarations: [
    RemoveCommaPipe
  ]
})
export class PipesModule { }
