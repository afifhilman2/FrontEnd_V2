import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesan-masuk-provider',
  templateUrl: './pesan-masuk-provider.component.html',
  styleUrls: ['./pesan-masuk-provider.component.css']
})
export class PesanMasukProviderComponent implements OnInit {
  showChatText:boolean = false;
  constructor() { }

  counter(i:Number) {
    return new Array(i);
  }

  ngOnInit() {
  }

  showChat(){
    this.showChatText = !this.showChatText;
  }

}
