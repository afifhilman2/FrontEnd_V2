import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';
import { PagerService } from '../_service/index';
import { ResponseContentType, Http, Response } from '@angular/http';
import saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';


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
  statusPemesanan = [
  "Menunggu Pembayaran", 
  "Sudah dibayar, Menunggu Konfirmasi Agen",
  "Transaksi Diterima, Silahkan Isi Data Peserta",
  "Etiket Terbit",
  "Menunggu Konfirmasi di Meeting Point",
  "Trip Berlangsung",
  "Menunggu Review dan Rating",
  "Trip Selesai"
  ]


  constructor(private toastr:ToastrService, private routeActive : ActivatedRoute, private appService : AppService, private pagerService: PagerService, private router: Router) { 
  
  }

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  id : any;
  idBooking;
  idStatus;
  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); // {order: "popular"}

      this.order = params.order;
      // console.log(this.order); // popular
      this.idBooking = params.order._id;
      // console.log(this.idBooking); 
      
    });

    this.appService.bookingUser().subscribe(booking =>{
      this.allItems = booking.data;
      // console.log(this.allItems);
      // this.pages = new Array(booking);
      this.setPage(1);
      this.history();

    });

    var os = this.getMobileOperationSystem();
    if(os == 'Android' || os == 'Windows Phone' || os == 'iOS'){
      window.location.href = 'https://m.travinesia.com/pemesanan'
    }

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  goToDetail(trip_id){
    this.id = trip_id;
    this.router.navigate(['/DetailPaket', this.id]);
  }

  dataHistory;
  history(){
    this.appService.getHistoryBooking().subscribe(history =>{
      this.dataHistory = history.data;
      // console.log(this.dataHistory);
    })
  }


  showContent(_id): void{
    if(this.otherContent = _id)
    this.otherContent = !this.otherContent;
  }


  button(idStatus, booking){
    if(idStatus == 1){
      this.appService.getPaymentDetail(booking._id).subscribe(detailPayment =>{
        // console.log(detailPayment);
        this.router.navigate(['/ProsesBayar2'], {queryParams: {data: JSON.stringify(detailPayment.data)}})
      })
      
    }else if( idStatus == 3 ){
      this.router.navigate(['/Akun/isiDataPeserta'], {queryParams: {data: JSON.stringify(booking)}});
    }else if( idStatus == 4){
      // this.router.navigate(['/Akun/Ulasan'], {queryParams:{data: JSON.stringify(booking._id)}})
      // console.log('download')
      // console.log('Download E-Ticket')
      var filename = booking.no_booking;
      this.appService.downloadPDF(booking._id).subscribe(
        (res) => {
        saveAs(res, filename+"-eticket.pdf"); 
        // var fileURL = URL.createObjectURL(res);
        // window.open(fileURL);
        }
      );
    }
    else if( idStatus == 7){
      this.router.navigate(['/Akun/Ulasan'], {queryParams:{data: JSON.stringify(booking._id)}})
    }

  }

  kirimPesan(){
   this.toastr.warning('Fitur Dalam Pengembangan') 
  }

  getMobileOperationSystem(){
    var userAgent = navigator.userAgent;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "iOS";
    }

    return "unknown";
  }
  
}

