import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {
  @Input() profilePicturePath: string = "";
  @Input() name: string = "";
  @Input() subtitle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
