import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PagerService } from '../_service/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-paket-pemesanan',
  templateUrl: './detail-paket-pemesanan.component.html',
  styleUrls: ['./detail-paket-pemesanan.component.css']
})
export class DetailPaketPemesananComponent implements OnInit {

 
  flag_status;
  travelAgent
  discount_trip: number[] = [];
  
  pageOps:boolean = false;
  pageData:boolean = true;
  success;
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

    // paged items
  pagedItems: any[];

  starEmpty= "https://img.travinesia.com/iconweb/icon card trip_bintang kosong.png"
  star = "https://img.travinesia.com/icon/ikon card trip_bintang_16x16.png"
  trip_star: boolean[] = [false,false,false,false,false];
  rating

  constructor( private pagerService:PagerService, private router: Router, public active: ActivatedRoute, private toastr: ToastrService, private appServis: AppService) { 
    this.active.paramMap.subscribe(params => {
      this.appServis.getTravel(params.get('domain')).subscribe(travelAgent => {
        this.flag_status = travelAgent.status;
        if(travelAgent.status==200){
          this.success = travelAgent.booking_success;
          this.travelAgent = travelAgent.provider;
          this.allItems = travelAgent.provider.trips;

          if(travelAgent.rate_div!=0){
            this.rating = Math.floor(travelAgent.rate_total/travelAgent.rate_div);
            for(var i = 0; i < this.rating; i++){
              this.trip_star[i] = !this.trip_star[i];
            }
          }

          if(this.allItems.length == 0) {
            this.pageOps = !this.pageOps;
            this.pageData = !this.pageData;
          }
          // console.log(travelAgent)
          // console.log(this.allItems)
          for(var i = 0 ; i < this.travelAgent.trips.length ; i++ ){
            if(this.travelAgent.trips[i].flag_discount){
              for(var j = 0 ; j < this.travelAgent.trips[i].discount_date.length ; j++){
                if(this.discount_trip[i]!=0 && this.travelAgent.trips[i].discount_date[j]!=0){
                  this.discount_trip[i] = this.travelAgent.trips[i].discount_date[j];
                }
                else if(this.travelAgent.trips[i].discount_date[j] > this.discount_trip[i]){
                  this.discount_trip[i] = this.travelAgent.trips[i].discount_date[j];
                }
              }
            }
            else{
              this.discount_trip[i] = null;
            }
          }
        }
        else{
          this.router.navigate(['notfound'])
        }

         
    this.setPage(1);
      })
    }) 
   
  }

  ngOnInit() {
    
  }

  counter(i: number) {
    return Array(Math.round(i)).fill(4);
  }

  setPage(page: number) {
    // console.log(this.allItems)
    // get pager object from service
    this.pager = this.pagerService.getPagerEtalase(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  
    
  }

  chat() {
    this.toastr.warning('Silahkan Hubungi No '+ this.travelAgent.provider.office_phone_number,'Fitur masih dalam pengembangan');
  }

  goDetail(id){
    this.router.navigate(['/DetailPaket/' + id])
  }
}
