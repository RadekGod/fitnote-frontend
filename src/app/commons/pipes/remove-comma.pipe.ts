import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'removeComma'
})
@Injectable({
  providedIn: 'root'
})
export class RemoveCommaPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value !== undefined && value !== null) {
      return value.replace(/,/g, "");
    } else {
      return "";
    }
  }
}
