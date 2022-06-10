import { Injectable } from '@angular/core';
import{ Observable, BehaviorSubject, of, Subject} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})

export class UserdetailService {
  public userlogo = new Subject<String>();
  public userdetail : any = [];
  public urlpath = environment.host;
  public token :any = {};
  //public requestOptions:any;
  public cartitem:any = [];
  public product:any = [];

  private headtoken = new BehaviorSubject(this.token);
  private profile = new BehaviorSubject(this.userdetail);
  private cartItem = new BehaviorSubject(this.cartitem);
  public productitem = new BehaviorSubject(this.product);

  profileData = this.profile.asObservable();
  tokendata = this.headtoken.asObservable();
  cartdata = this.cartItem.asObservable();
  items = this.productitem.asObservable();


  // tokendetail(data:any){
  //   debugger
  //   this.requestOptions = {                                                                                                                                                                                 
  //     headers: new HttpHeaders()
  //   };
  //   this.headtoken.next(data);
  // }

  constructor(public http : HttpClient, public loadspin : NgxSpinnerService) { }

  profiledetail(data:any){
    this.profile.next(data); 
  }

  item(data:any){
    this.productitem.next(data);
  }

  passValue(data:any){
    this.userlogo.next(data);
  }

  passorders(data:any){
    this.cartItem.next(data);
  }

  createuser(data:any){
    this.http.post(this.urlpath+'/customer', data)  
              .subscribe((res) => {
                console.log('Successfully created!', res)
              })    
  }

  createorder(data:any){
    this.http.post(this.urlpath+'/order', data, {headers : new HttpHeaders({
      Authorization : localStorage.getItem('token') || ''})}).subscribe((res) => {
            console.log('Successfully created!', res)
          });     
  }

  getorder(values:any):Observable<any>{
    return this.http.get(this.urlpath+'/order',{
      headers: new HttpHeaders({
        Authorization : localStorage.getItem('token') || ''}),
      params: {
        custId: values,
      },
      observe: 'response',
    });
  }

  getProducts():Observable<any>{
    this.loadspin.show();
    return this.http.get(`${this.urlpath}/products`, {headers : new HttpHeaders({
      Authorization : localStorage.getItem('token') || ''})});//('https://fakestoreapi.com/products')
  }

  getuser(values:any):Observable<any>{
    return this.http.get(this.urlpath+'/customer',{
      params: {
        username: values.username,
        password: values.password
      },
      observe: 'response'
    });
  }

  getproduct(values:any):Observable<any>{
    return this.http.get(this.urlpath+'/product',{
      headers: new HttpHeaders({
        Authorization : localStorage.getItem('token') || ''}),
      params: {
        id: values,
      },
      observe: 'response',
    });
  }
 
  updateuser(data:any){
    this.http.post(this.urlpath+'/customer/update',data, {headers : new HttpHeaders({
      Authorization : localStorage.getItem('token') || ''})}).subscribe((res) => {
      console.log("Updated Successfully");
    })
  }

  updateproduct(data:any){
    this.http.post(this.urlpath+'/product/update',data, {headers : new HttpHeaders({
      Authorization : localStorage.getItem('token') || ''})}).subscribe((res) => {
      console.log("Updated Successfully");
    })
  }

  deleteorder(data:any,custid:any){
    this.http.delete(this.urlpath+'/order',  
    {
      params: {
        prodId: data,
        custId:custid
      }
    }).subscribe((res) => {
      console.log("Deleted Successfully");
    })
  }

}
