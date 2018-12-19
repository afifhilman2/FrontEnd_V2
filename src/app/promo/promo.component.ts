import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  dataPromo;
  detailPromo
  promoId;

  showChatText:boolean = false;
  constructor( private appService : AppService) { 
    this.appService.getAllPromo().subscribe(promo =>{
      this.dataPromo = promo.data;
      // this.promoName = this.dataPromo.promo_name;
      // this.promoDesc = this.dataPromo.description;
      // this.promoPhoto = this.dataPromo.photo_promo;
      // console.log(this.dataPromo)
    })

  }

  ngOnInit() {
  }

  showChat(id){
    this.promoId = id;
    this.appService.getDetailPromo(id).subscribe(detail=>{
      this.detailPromo = detail.data
      // console.log(this.detailPromo)
    })
  }
s
}
