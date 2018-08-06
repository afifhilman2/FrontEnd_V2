import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesan-masuk',
  templateUrl: './pesan-masuk.component.html',
  styleUrls: ['./pesan-masuk.component.css']
})
export class PesanMasukComponent implements OnInit {

  showChatText:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showChat(){
    this.showChatText = !this.showChatText;
  }
}
