import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';
import { PagerService } from '../_service/index';



@Component({
  selector: 'app-pemesanan',
  templateUrl: './pemesanan.component.html',
  styleUrls: ['./pemesanan.component.css']
})
export class PemesananComponent implements OnInit {
  public order: string;
  otherContent: boolean = false;

  idPemesanan = ["Bayar Sekarang","","Isi Data Peserta","Download E Tiket", "Konfirmasi Kehadiran", "", "Beri Review & Rating"];
  // private pages : Array<any>;


  constructor(private routeActive : ActivatedRoute, private appService : AppService, private pagerService: PagerService, private router: Router) { 
  
  }

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  id : any;
  idBooking;
  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); // {order: "popular"}

      this.order = params.order;
      // console.log(this.order); // popular
      this.idBooking = params.order._id;
      console.log(this.idBooking); 
      
    });

    this.appService.bookingUser().subscribe(booking =>{
      this.allItems = booking.data;
      // console.log(this.allItems);
      // this.pages = new Array(booking);

      this.setPage(1);
      this.history();

    });

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  goToDetail(trip_id){
    this.id = trip_id;
    this.router.navigate(['/traveler/DetailPaket', this.id]);
  }

  dataHistory;
  history(){
    this.appService.getHistoryBooking().subscribe(history =>{
      this.dataHistory = history.data;
      console.log(this.dataHistory);
    })
  }


  showContent(_id): void{
    if(this.otherContent = _id)
    this.otherContent = !this.otherContent;
  }


  button(idStatus, booking){
    if(idStatus == 1){
      this.appService.getPaymentDetail(booking._id).subscribe(detailPayment =>{
        console.log(detailPayment);
        this.router.navigate(['/ProsesBayar2'], {queryParams: {data: JSON.stringify(detailPayment.data)}})
      })
      
    }else if( idStatus == 3 ){
      this.router.navigate(['/Akun/isiDataPeserta'], {queryParams: {data: JSON.stringify(booking)}});
    }else if( idStatus == 7){
      this.router.navigate(['/Akun/Ulasan'], {queryParams:{data: JSON.stringify(booking._id)}})
    }

  }
  
}
