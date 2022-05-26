import { Injectable } from '@angular/core';
import{ Observable, BehaviorSubject, of, Subject} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
  public userlogo = new Subject<String>();
  public userdetail : any = [];
  public urlpath = environment.host;

  private profile = new BehaviorSubject(this.userdetail);
  profileData = this.profile.asObservable();

  constructor(public http : HttpClient) { }

  createuser(data:any){
    this.http.post(this.urlpath+'/customer', data)  
              .subscribe((res) => {
                console.log('Successfully created!', res)
              })    
  }

  createorder(data:any){
    this.http.post(this.urlpath+'/order', data)  
              .subscribe((res) => {
                console.log('Successfully created!', res)
              })     
  }

  getProducts():Observable<any>{
    return this.http.get(this.urlpath+'/products');//('https://fakestoreapi.com/products')
  }

  profiledetail(data:any){
    this.profile.next(data); 
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
      params: {
        id: values,
      },
      observe: 'response'
    });
  }
 
 
  passValue(data:any){
    this.userlogo.next(data);
  }

  updateuser(data:any){
    this.http.post(this.urlpath+'/customer/update',data).subscribe((res) => {
      console.log("Updated Successfully");
    })
  }

  updateproduct(data:any){
    this.http.post(this.urlpath+'/product/update',data).subscribe((res) => {
      console.log("Updated Successfully");
    })
  }
}
