import { countries, Country } from './country.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CountrySelectComponent
    }
  ]
})
export class CountrySelectComponent implements OnInit, ControlValueAccessor {

  @Input() public isDeselectPossible = true;
  @Input() @Output() public selectedCountryCode: string = "";
  @Output() public selectionChange = new EventEmitter<MatSelectChange>();

  public countries: Country[] = countries;

  public onChange = (selectedCountryCode: string) => { };
  public onTouched = () => { };

  public isDisabled: boolean = false;
  public isTouched: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChanged(event: MatSelectChange): void {
    this.selectedCountryCode = event.value;

    this.onChange(this.selectedCountryCode);
    this.selectionChange.emit(event);
  }

  markAsTouched(): void {
    if (this.isTouched) {
      return;
    }

    this.isTouched = true;
    this.onTouched();
  }

  writeValue(countryCode: string): void {
    this.selectedCountryCode = countryCode;
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
