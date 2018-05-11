import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  searchTerm : FormControl = new FormControl();

  searchResult = [];

  constructor(private service: AppService){
    // this.searchTerm.valueChanges
    //     .debounceTime(400) 
    //     .subscribe(data => {
    //         this.service.search_word(data).subscribe(response =>{
    //             this.searchResult = response
    //         })
    //     })

    //     this.searchTerm.valueChanges
    //     .subscribe(data => {
    //         this.service.search_word(data).subscribe(response =>{
    //             this.searchResult = response
    //         })
    //     })
  }

  
  ngOnInit() {
  }

}
