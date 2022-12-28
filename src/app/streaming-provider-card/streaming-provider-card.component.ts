import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-streaming-provider-card[name][logoPath]',
  templateUrl: './streaming-provider-card.component.html',
  styleUrls: ['./streaming-provider-card.component.css']
})
export class StreamingProviderCardComponent implements OnInit {

  @Input() name!: string;
  @Input() logoPath!: string;
  @Input() isAvailableToBuy: boolean = false;
  @Input() isAvailableForRent: boolean = false;
  @Input() isAvailableInFlatrate: boolean = false;

  @Input() customClasses!: string | string[] | Set<string> | { [klass: string]: any; };

  constructor() { }

  ngOnInit(): void {
  }

}
