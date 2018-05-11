import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  constructor() { }

  ngOnInit() {
  }

}
