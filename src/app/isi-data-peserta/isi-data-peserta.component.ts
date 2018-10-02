import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-isi-data-peserta',
  templateUrl: './isi-data-peserta.component.html',
  styleUrls: ['./isi-data-peserta.component.css']
})
export class IsiDataPesertaComponent implements OnInit {
  dataBooking;

  booking: any = {
    _id : "",
    traveller_name:[],
    traveller_age:[],
    traveller_identity:[],
    save_status:0
  }


  constructor(private active: ActivatedRoute, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.dataBooking = JSON.parse(this.active.snapshot.queryParams['data']);
    console.log(this.dataBooking)
    this.booking._id = this.dataBooking._id;
    this.booking.traveller_name = this.dataBooking.traveller_name;
    this.booking.traveller_age = this.dataBooking.traveller_age;
    this.booking.traveller_identity = this.dataBooking.traveller_identity;
  }

  counter(i: number){
    return new Array(i);
  }

  addTravellerDetail(save_status){
    this.booking.save_status = save_status;
    console.log(this.booking);
    if(save_status==0){
      this.appService.addTravellerDetail(this.booking).subscribe(booking => {
      
      })
    }
    else if(save_status==1 && this.booking.traveller_name.length==this.dataBooking.quantity && this.booking.traveller_age.length==this.dataBooking.quantity && this.booking.traveller_identity.length==this.dataBooking.quantity ){
      this.appService.addTravellerDetail(this.booking).subscribe(booking => {
        console.log(booking)
        if(booking.status == 200){
          this.router.navigate(['/Akun/Pemesanan']);
        }
      })
    }
    else{
      console.log('Gagal')
    }
  }


}
