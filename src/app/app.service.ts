import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Http, Headers, Response, ResponseContentType, RequestOptions,
    RequestOptionsArgs,
    Request,
    XHRBackend } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tokenNotExpired } from 'angular2-jwt';
import { EventEmitter } from 'events';

// import { AngularReduxRequestOptions } from './loader/angular-redux-request.options'
// import { LoaderService } from './loader/loader-service';
import { Options } from 'selenium-webdriver/ie';






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

    }

    createAuthorizationHeader (headers:Headers) {
        
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }

    requestHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
   
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
        return this.http.get('https://travinesia.com:1210/get/etalase/provider/'+ id)
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

    getSearchTrip(trip_name){
        return this.http.get('https://travinesia.com:1210/get/search_trip/'+ trip_name)
        .map(res => res.json())
      }
  
      getSearchAdvanceTrip(search){
        return this.http.get('https://travinesia.com:1210/get/search_advance'+ '?location=' + search.id_provinsi + '&days=' + search.days + '&date=' + search.date + '&id_category=' + search.id_category + '&id_type=' + search.id_type_trip + '&quantity=' + search.quantity)
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

    getForgotPassword(token){
        return this.http.get('https://travinesia.com:1210/v1/user/forgot_password/'+token)
        .map(res => res.json())
    }
  
    saveNewPassword(user){
        return this.http.put('https://travinesia.com:1210/v1/user/save_password', user)
        .map(res => res.json())
    }

    loginFacebook(authToken){
        return this.http.post('https://travinesia.com:1210/v1/user/auth/facebook', {access_token: authToken})
        .map(res => res.json())
    }

    loginGoogle(authToken){
        return this.http.post('https://travinesia.com:1210/v1/user/auth/google/token', {access_token: authToken})
        .map(res => res.json())
    }
    
    activationAccount(token){
        return this.http.put('https://travinesia.com:1210/v1/user/activate/'+ token, "")
        .map(res => res.json())
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

    editPhotoTrip(id, trip) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/edit_photo_trip/' + id, trip,
        {headers: headers})
        .map(res => res.json());
    }

    editLogoProvider(provider) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/edit_logo',provider,
        {headers: headers})
        .map(res => res.json());
    }

    editCoverProvider(provider) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/edit_cover',provider,
        {headers: headers})
        .map(res => res.json());
    }

    getTermsConditions(){
        return this.http.get('https://travinesia.com:1210/get/terms_condition')
        .map(res => res.json())
      }

    confirmTransaction(confirm) {
        let headers = new Headers();
        this.createAuthorizationHeader (headers);

        return this.http.put('https://travinesia.com:1210/v1/provider/confirm_transaction/',confirm,
        {headers: headers})
        .map(res => res.json());
    }

    downloadPDFTransaction(id_booking, date_trip): any {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        
        return this.http.post('https://travinesia.com:1210/v1/provider/detail_transaction_traveller/'+id_booking +'/'+ date_trip , "" , {headers: headers, responseType: ResponseContentType.Blob}).map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' })
        })
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

    checkPromo(promo){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/user/booking/check_promo', promo, {headers: headers})
        .map(res => res.json())
      }
      
    getAllPromo(){
    return this.http.get('https://travinesia.com:1210/get/promo')
    .map(res => res.json())
    }

    getDetailPromo(promo_id){
    return this.http.get('https://travinesia.com:1210/get/promo/detail/' + promo_id)
    .map(res => res.json())
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

      downloadPDF(id_booking): any {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/user/booking/eticket/'+id_booking, "" , {headers: headers, responseType: ResponseContentType.Blob}).map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' })
        })
      }

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
  
      addComment(id, comments){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/discussion/post_comment/' + id, comments, {headers: headers})
        .map(res => res.json())
      }

      addCommentUser(comments){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post('https://travinesia.com:1210/v1/discussion/post_comment/' + comments, {headers: headers})
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

      getTravel(travel){
        return this.http.get('https://travinesia.com:1210/get/provider/' + travel)
        .map(res => res.json())
      }

      getDetailTrip(id_trip){
        //   this.showLoader()
          return this.http.get('https://travinesia.com:1210/get/trip_detail/' + id_trip)
          .map(res => res.json())
          
      }


      //loader

    //   private redux(angularReduxOptions?: any){
    //     if (angularReduxOptions != null) {

    //         for (let option in angularReduxOptions) {
    //             let optionValue = angularReduxOptions[option];
    //             this[option] = optionValue;
    //         }
    //     }
    //   }

    //   private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

    //     if (options == null) {
    //         options = new this.redux();
    //     }

    //     if (options.headers == null) {
    //         options.headers = new Headers();
    //     }

    //     return options;
    // }



    // private onCatch(error: any, caught: Observable<any>): Observable<any> {
    //     return Observable.throw(error);
    // }

    // private onSuccess(res: Response): void {
    //     console.log('Request successful');
    // }

    // private onError(res: Response): void {
    //     console.log('Error, status code: ' + res.status);
    // }

    // private onEnd(): void {
    //     this.hideLoader();
    // }

    // private showLoader(): void {
    //     this.loaderService.show();
    // }

    // private hideLoader(): void {
    //     this.loaderService.hide();
    // }

      
}