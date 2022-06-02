import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdetailService } from '../service/userdetail.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productdet:any;
  quantity:any = 0;
  profiledata:any;
  setval:Boolean = false;
  cartitems:any;

  constructor(public router : Router, public route : ActivatedRoute, public productdetail : UserdetailService) { }

  ngOnInit(): void {
    var ids = this.route.snapshot.paramMap.get('id');
    this.productdetail.getproduct(ids).subscribe((res) => {
      this.productdet = res.body[0];
      console.log(this.productdet, res)
      if(this.productdet.count <= 0){
        this.setval = true;
      }
    })
    this.productdetail.profileData.subscribe((res) => {
      if(res){
        this.profiledata = res;
        console.log("logged", res);
      }        
    })
  }
  
  addtocart(){
    debugger;
    this.productdetail.cartdata.subscribe((res) => {
      this.cartitems = res.find((data:any) => {
        return this.productdet._id == data.productId;
        // this.cartitems = res.length;
      })
    })
    let pro = {
      custId:this.profiledata._id,
      productId:this.productdet._id,
      quantity:(this.cartitems) ? (parseInt(this.quantity) + parseInt(this.cartitems.quantity)) : parseInt(this.quantity)
    }
    this.productdetail.createorder(pro);
    this.updateproducts();
    this.router.navigate(['/home']);
  }

  plus(){
     this.quantity++;
  }
  minus(){
    this.quantity--;
  }

  updateproducts(){
      this.productdet.count = this.productdet.count - this.quantity;
      this.productdetail.updateproduct(this.productdet);
      this.productdetail.getorder(this.profiledata._id).subscribe( (res) => {
         this.productdetail.passorders(res.body);
      })
  }

}
