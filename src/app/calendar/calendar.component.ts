import { Component, OnInit, ElementRef,  OnDestroy } from '@angular/core';
// import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs/Rx'
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayNames=['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // public date= moment();
  public daysArr;
  private future: Date;
    private futureString: string;
    private counter$: Observable<number>;
    private subscription: Subscription;
    private message: string;
    route: string;
  constructor(elm: ElementRef, private router: Router, location: Location) { 
    this.futureString = elm.nativeElement.getAttribute('inputDate');
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
  }

  ngOnInit() {
    // this.daysArr= this.creatCalendar(this.date);
    this.future = new Date(this.futureString);
        this.counter$ = Observable.interval(1000).map((x) => {
          // console.log(this.future.getTime)
           return Math.floor((new Date().getTime()) / 1000);
           
        });

        this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
  }

  // public creatCalendar(month){
  //   let firsDay = moment(month).startOf('M');
  //   let days = Array.apply(null, {length: month.daysInMonth()})
  //     .map(Number.call,Number)
  //     .map((n)=>{
  //       return moment(firsDay).add(n,'d'); 
  //     });
  //   for(let n=0; n<firsDay.weekday();n++){
  //     days.unshift(null);
  //   }
  //   return days;
  // }

  // public todayCheck(day){
  //   if(!day){
  //     return false;
  //   }
  //   return moment().format('L') === day.format('L');
  // }

  // public nextMonth(){
  //   this.date.add(1,'M');
  //   this.daysArr = this.creatCalendar(this.date);
  // }

  // public prevMonth(){
  //   this.date.subtract(1,'M');
  //   this.daysArr = this.creatCalendar(this.date);
  // }
//   countdown: number;
//  startCountdownTimer() {
//     const interval = 1000;
//     const duration = 10 * 1000;
//     const stream$ = Observable.timer(0, interval)
//       .finally(() => console.log("All done!"))
//       .takeUntil(Observable.timer(duration + interval))
//       .map(value => duration - value * interval);
//     stream$.subscribe(value => this.countdown = value);
//   }

  dhms(t) {
    var days, hours, minutes, seconds;
    // days = Math.floor(t / 86400);
    // t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
  }

  


}
