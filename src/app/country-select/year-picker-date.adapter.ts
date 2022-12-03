import {NativeDateAdapter} from "@angular/material/core";
import {Platform} from "@angular/cdk/platform";

export class YearPickerDateAdapter extends NativeDateAdapter {
  private regexYear: RegExp = /[\d]{4}/;

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    if (!value?.match(this.regexYear)) {
      return null;
    }

    return new Date(value);
  }

  override format(date: Date, displayFormat: any): string {
    return date.getFullYear().toString();
  }
}
