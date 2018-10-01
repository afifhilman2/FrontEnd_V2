import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-diskusi-provider',
  templateUrl: './diskusi-provider.component.html',
  styleUrls: ['./diskusi-provider.component.css']
})
export class DiskusiProviderComponent implements OnInit {

  discussion:any[];

  constructor(public http:Http, public appService:AppService,) {
    this.appService.getDiscussionProvider().subscribe( discussion => {

      this.discussion = discussion.data;

    })
   }

  ngOnInit() {
  }

}
