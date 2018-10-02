import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-ulasan',
  templateUrl: './rating-ulasan.component.html',
  styleUrls: ['./rating-ulasan.component.css']
})
export class RatingUlasanComponent implements OnInit {

  review: any={
    _id:'',
    rate:'',
    field:''
  }

  constructor() { }

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
  }

  starList: boolean[] = [true,true,true,true,true]; 
  // rating:number; 

  setStar(data:any){
    this.review.rate=data+1;                               
    for(var i=0;i<=4;i++){  
      if(i<=data){  
        this.starList[i]=false; 
        // console.log(this.starList[i])
      }  
      else{  
        this.starList[i]=true;  
        // console.log(this.starList[i])
      }  
    }  
  } 
  
  onClick(rating: number): void {
    this.review.rate = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  sendreview(){

    console.log(this.review);
    // this.appService.sendReview(this.review).subscribe(content =>{

    // })
  }


}
