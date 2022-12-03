import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {Platform} from "@angular/cdk/platform";
import {YearPickerDateAdapter} from "../country-select/year-picker-date.adapter";

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: YearPickerComponent
    },
    {
      provide: DateAdapter,
      useClass: YearPickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class YearPickerComponent implements OnInit, ControlValueAccessor {

  public yearForm: FormGroup;
  public onChange = (value: string) => {
  };

  public onTouched = () => {
  };

  public isDisabled: boolean = false;
  public isTouched: boolean = false;

  constructor() {
    this.yearForm = new FormGroup({
        year: new FormControl(
          null,
          [Validators.minLength(4), Validators.maxLength(4)]
        )
      }
    );
  }

  ngOnInit(): void {
  }

  onYearSelected(value: any, datePicker: any): void {
    datePicker.close();

    this.writeValue(value);
    this.onChange(value);
  }

  clear(): void {
    this.yearForm.reset();
  }

  markAsTouched(): void {
    if (this.isTouched) {
      return;
    }

    this.isTouched = true;
    this.onTouched();
  }

  writeValue(value: string): void {
    this.yearForm.get('year')?.setValue(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
