import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  showChatText:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showChat(){
    this.showChatText = !this.showChatText;
  }

}
