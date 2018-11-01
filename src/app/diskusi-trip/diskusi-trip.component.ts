import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diskusi-trip',
  templateUrl: './diskusi-trip.component.html',
  styleUrls: ['./diskusi-trip.component.css']
})
export class DiskusiTripComponent implements OnInit {

  diskusi;
  myForm = this.fb.group({
    id_diskusi:'',
    comment:''
  })
  constructor(private appService: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.appService.getDiscussionUser().subscribe(diskusi=>{
      this.diskusi = diskusi.data;
      console.log(this.diskusi)
    })
  }


  
  onSubmitComment(id){
   
    this.myForm.patchValue({
      id_diskusi: id,
    })
    console.log(this.myForm.value)
    this.appService.addComment(this.myForm.value).subscribe(dataComment=>{
      if(dataComment.status == 200){
        this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/Akun/DiskusiTrip']));
      }
    });
  }

  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

}
