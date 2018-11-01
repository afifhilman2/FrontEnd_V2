import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Product } from './product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

declare const FB:any;

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { EventEmitter } from 'events';



@Injectable ()

export class AppService {
    users:string[];
    headers
    url: string;
    idCategory:'';

    emmiter : EventEmitter = new EventEmitter();
    private totalharga: BehaviorSubject<number> = new BehaviorSubject<number>(0)

    constructor (public http:Http, public http2: HttpClient) {
        this.url  = 'api.datamuse.com/words?ml=';

        FB.init({
            appId      : 261462964525976,
            status     : false, // the SDK will attempt to get info about the current user immediately after init
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
            version    : 'v2.12' // use graph api version 2.5
          });
    }

    //token localstorage
    createAuthorizationHeader (headers:Headers) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    //httpClient Headers
    requestHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //user
    getUsers() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/user/profile',
        {headers: headers})
        .map(res => res.json());
    }

    //provider
    getProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/provider/profile',
        {headers: headers})
        .map(res => res.json());
    }

    getTripProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/provider/all_trip',
        {headers: headers})
        .map(res => res.json());
    }

    getTransactionProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/provider/transaction_trip',
        {headers: headers})
        .map(res => res.json());
    }

    getBalanceProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/provider/balance',
        {headers: headers})
        .map(res => res.json());
    }

    getDaftarPemesan(id_trip) {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/provider/detail_transaction/'+ id_trip,
        {headers: headers}) 
        .map(res => res.json());
    }

    getDiscussionProvider() {
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.get('https://travinesia.com:1210/v1/discussion/provider',
        {headers: headers}) 
        .map(res => res.json());
    }

    getCategoryTrip() {
        return this.http.get('https://travinesia.com:1210/get/category')
        .map(res => res.json());
    }

    getEtalseProvider(id) {
        return this.http.get('https://travinesia.com:1210/get/etalase_provider/'+ id)
        .map(res => res.json());
    }

    getFacilityTrip() {
        return this.http.get('https://travinesia.com:1210/get/facility')
        .map(res => res.json());
    }

    getProvinceTrip() {
        return this.http.get('https://travinesia.com:1210/get/province')
        .map(res => res.json());
    }

    getTypeTrip() {
        return this.http.get('https://travinesia.com:1210/get/type')
        .map(res => res.json());
    }   

    getDataTrip() {
        return this.http.get('https://travinesia.com:1210/get/trip/')
        .map(res => res.json())
    }
    

    //post
    //register
    registerUser(newUser) {
        return this.http.post('https://travinesia.com:1210/v1/user/users', newUser)
        .map(res => res.json());
    }

    //login
    addUser(user) {
        return this.http.post('https://travinesia.com:1210/v1/user/authenticate', user)
        .map(res => res.json());
    }

    //with token
    postBeTravel(travel) {
        
        let headers = new Headers();
        this.createAuthorizationHeader (headers);
        // console.log(headers)
        return this.http.post('https://travinesia.com:1210/v1/user/register_provider',travel,
        {headers: headers})
        .map(res => res.json());
    }

    addTripProvider(trip) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.post('https://travinesia.com:1210/v1/provider/add_trip',trip,
        {headers: headers})
        .map(res => res.json());
    }

    withdrawBalanceProvider(withdraw) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.post('https://travinesia.com:1210/v1/provider/withdraw',withdraw,
        {headers: headers})
        .map(res => res.json());
    }

    editProfileProvider(provider) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/profile',provider,
        {headers: headers})
        .map(res => res.json());
    }

    kosongkanKuotaProvider(id, kosong) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/quota_null/' + id, kosong,
        {headers: headers})
        .map(res => res.json());
    }

    beriDiskonProvider(id, diskon) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/discountby_provider/' + id, diskon,
        {headers: headers})
        .map(res => res.json());
    }

    confirmTransaction(confirm) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/confirm_transaction/',confirm,
        {headers: headers})
        .map(res => res.json());
    }

    //searchResult
    search_word(term){
        return this.http.get(this.url + term).map(res => {
            return res.json().map(item => {
                return item.word
            })
        })
    }

    //booking
    private extractData(res: Response){
        let body = res.json();
            return body || {};
        }

    booking(book){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);       
        return this.http.post('https://travinesia.com:1210/v1/user/booking/add', book, { headers: headers })
        .map(res => res.json())
        
        
    }

    getBooking(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/user/bookinguser', {headers: headers})
        .map(res => res.json());
    }


    //akhir booking


    //edit user

    editUser(edit){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('https://travinesia.com:1210/v1/user/profile', edit , {headers: headers})
        .map(res => res.json());
    }

    // getProfil(){
    //     let headers = new Headers();
    //     this.createAuthorizationHeader(headers);
    //     return this.http.put('https://travinesia.com:1210/v1/user/profile', {headers: headers})
    //     .map(res => res.json());
    // }

    // change password 
    changePwd(pwd){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/user/change_password', pwd, {headers: headers})
        .map(this.extractData);
    }

    queryUrl: string = '?search=';
    search(terms: Observable<string>) {
        return terms.debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => this.getTripName(term));
    }
    
      getTripName(term){
        return this.http.get('https://travinesia.com:1210/get/trip_name' + this.queryUrl + term)
        .map(res => res.json());
    }

    searchName(trip_name){
        return this.http.get('https://travinesia.com:1210/get/search_trip/' + trip_name)
        .map(res => res.json());
    }
     
    
    diskusi(trip_id){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/get/trip/discussion/'+ trip_id, {headers: headers})
        .map(res => res.json());
    }

    addPayment(boking){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('https://travinesia.com:1210/v1/user/booking/add_payment', boking, {headers: headers})
        .map(res => res.json())
    }

    sendDiskusi(trip_id,text){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/discussion/post/'+ trip_id, text, {headers: headers})
        .map(res => res.json());
    }

    nextBooking(nbook){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('https://travinesia.com:1210/v1/user/booking/add_detail', nbook , {headers: headers})
        .map(res => res.json());
    }

    review(trip_id){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/get/trip/review/' + trip_id, {headers: headers})
        .map(res => res.json());
    }

    sendReview(review){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://trvinesia.com:1210/v1/user/review/', review, {headers: headers})
        .map(res=> res.json());
    }
    
    paymentBooking(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/get/payment_method', {headers: headers})
        .map(res => res.json());
    }

    bookingUser(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/user/booking/booking_user', {headers: headers})
        .map(res => res.json());
    }

    searchCategory(_id){
        return this.http.get('https://travinesia.com:1210/get/search_category/' + _id)
        .map(res => res.json());
    }

    addFavorit(dataFavorite){
        let headers = new Headers();
        this,this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/user/add_favorite', dataFavorite, {headers: headers})
        .map(res => res.json());
    }

    getHistoryBooking(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/user/booking/history', {headers: headers})
        .map(res => res.json())
      }

    getPaymentDetail(id_booking){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/user/booking/detail_payment/' +id_booking, {headers: headers})
        .map(res => res.json())
    }

    getDiscountTrip() {
        return this.http.get('https://travinesia.com:1210/get/trip/discount')
        .map(res => res.json())
      }

      addTravellerDetail(booking){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('https://travinesia.com:1210/v1/user/booking/add_traveller_detail', booking, {headers: headers})
        .map(res => res.json())
      }


    // loginFb
    fbLogin() {
        return new Promise((resolve, reject) => {
          FB.login(result => {
            if (result.authResponse) {
              return this.http.post(`https://travinesia.com:1210/v1/user/auth/facebook`, {access_token: result.authResponse.accessToken})
                  .toPromise()
                  .then(response => {
                    var token = response.headers.get('x-auth-token');
                    if (token) {
                      localStorage.setItem('id_token', token);
                    }
                    resolve(response.json());
                  })
                  .catch(() => reject());
            } else {
              reject();
            }
          }, {scope: 'public_profile,email'})
        });
      }
      logout() {
        localStorage.removeItem('id_token');
      }
    
      isLoggedIn() {
        return new Promise((resolve, reject) => {
          this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
        });
      }
    
      getCurrentUser() {
        return new Promise((resolve, reject) => {
          return this.http.get(`https://localhost:1210/api/v1/auth/me`).toPromise().then(response => {
            resolve(response.json());
          }).catch(() => reject());
        });
      }
    // tutup loginFb

    loggedIn(){
        return tokenNotExpired();
    }

    getAllDiscountTrip(){
        return this.http.get('https://travinesia.com:1210/get/trip/all_discount')
        .map(res => res.json())
      }
    
      getDiscussionUser(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/discussion/user', {headers: headers})
        .map(res => res.json())
      }

      deleleDiscussion(id_discussion){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/discussion/delete/' + id_discussion,'', {headers: headers})
        .map(res => res.json())
      }
  
      addComment(comments){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/discussion/post_comment/' + comments.id_diskusi, comments, {headers: headers})
        .map(res => res.json())
      }

      getAllFavorites(){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get('https://travinesia.com:1210/v1/user/get_all_favorite', {headers: headers})
        .map(res => res.json())
      }

      deleteFavoriteTrip(id_favorite){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/user/delete_favorite/'+ id_favorite,'', {headers: headers})
        .map(res => res.json())
      }

      editProfilePictureUser(user){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put('https://travinesia.com:1210/v1/user/edit_photo_profile', user, {headers: headers})
        .map(res => res.json())
      }

      
}