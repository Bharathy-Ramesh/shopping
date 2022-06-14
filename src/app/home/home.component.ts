import { Component, OnInit } from '@angular/core';
import { UserdetailService } from '../service/userdetail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:any;
  quantity:any = 1;
  profiledata:any;
  constructor(public userdetail : UserdetailService, public router : Router, private route: ActivatedRoute, public loadspin : NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProductsDetail();
    this.userdetail.profileData.subscribe((res) => {
      if(res && res.length > 0){
        this.profiledata = res[0];
      }        
    })
  }
  getProductsDetail(){
    this.loadspin.show();
    this.userdetail.getProducts().subscribe( (res)=> {
      if(res && res.length > 0){
        this.products = res;
        this.userdetail.item(res);
      }
      setTimeout( ()=>{
        this.loadspin.hide();
      }, 1000)
    })
  }

  plus(){
    this.quantity++;
  }

  minus(){
    this.quantity--;
  }

  

  detailpage(product:any){
    this.router.navigate(['home/detail', product.id]);
  }

}
