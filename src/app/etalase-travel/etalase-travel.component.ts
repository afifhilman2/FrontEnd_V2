import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../_service/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-etalase-travel',
  templateUrl: './etalase-travel.component.html',
  styleUrls: ['./etalase-travel.component.css']
})


export class EtalaseTravelComponent implements OnInit {

  etalaseProvider:any[];
  tripProvider:any[];
  pageOps:boolean = false;
  pageData:boolean = true;
  success;

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};
 
     // paged items
   pagedItems: any[];

  constructor(private appService:AppService, private toastr: ToastrService, public activeRoute:ActivatedRoute, public route:Router, private pagerService: PagerService) {

    let id = this.activeRoute.snapshot.params['id']
    this.appService.getEtalseProvider(id).subscribe(etalase => {
      // console.log(etalase);

      this.success = etalase.booking_success;
      this.etalaseProvider = etalase.provider;
      this.tripProvider = etalase.provider.trips;
      this.allItems = etalase.provider.trips;
     
      if(this.allItems.length == 0) {
        this.pageOps = !this.pageOps;
        this.pageData = !this.pageData;
      }

      this.setPage(1);
    })
   }

   counter(i: number) {
    return Array(Math.round(i)).fill(4);
  }

  goDetail(id){
    // console.log(id);
    this.route.navigate(['/DetailPaket/' + id])
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPagerEtalase(this.allItems.length, page);
  


    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
  }

  chat() {
    this.toastr.warning('Fitur masih dalam pengembangan');
  }

  
  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
