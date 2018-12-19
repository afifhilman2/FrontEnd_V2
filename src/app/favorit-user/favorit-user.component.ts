import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorit-user',
  templateUrl: './favorit-user.component.html',
  styleUrls: ['./favorit-user.component.css']
})
export class FavoritUserComponent implements OnInit {

  alert: boolean = false;
  favorite;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getAllFavorites().subscribe(dataFavorit=>{
      this.favorite = dataFavorit.data
      // console.log(this.favorite)
    })
  }

  deleteFav(id){
    // console.log(id);
    this.appService.deleteFavoriteTrip(id).subscribe(deleteFav=>{
      if(deleteFav.status == 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/Akun/Favorit']));
      }
    })
  }

  openAlert(id):void{
    // console.log(id)
    this.alert = !this.alert;
  }
  closeAlert():void{
    this.alert = !this.alert;
  }

  goToDetail(id){
    this.router.navigate(['/DetailPaket/', id])
  }
}
