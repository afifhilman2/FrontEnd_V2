import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorit-user',
  templateUrl: './favorit-user.component.html',
  styleUrls: ['./favorit-user.component.css']
})
export class FavoritUserComponent implements OnInit {

  alert: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openAlert():void{
    this.alert = !this.alert;
  }
}
