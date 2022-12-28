import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {
  @Input() profilePicturePath: string = "";
  @Input() name: string = "";
  @Input() subtitle: string = "";
  @Input() customClasses!: string | string[] | Set<string> | { [klass: string]: any; };

  constructor() {
  }

  ngOnInit(): void {
  }

}
