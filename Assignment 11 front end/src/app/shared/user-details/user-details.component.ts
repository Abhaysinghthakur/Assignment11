import { Component, OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userFirstName: String;
  @Input() userLastName: String;
  @Input() userStatus: boolean;
  @Input() messageRead: String;

  
  public firstChar: String;


  ngOnInit(): void {

      this.firstChar = this.userFirstName[0];

  } // end ngOnInit


  // handling the click



}
