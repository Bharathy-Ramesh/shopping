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
      if(res && res.length > 0){
        this.profiledata = res[0];
        console.log("logged", res);
      }        
    })
  }

  addtocart(){
    debugger;
    let pro = {
      custId:this.profiledata._id,
      productId:this.productdet._id,
      quantity:this.quantity
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
    debugger;
      this.productdet.count = this.productdet.count - this.quantity;
      this.productdetail.updateproduct(this.productdet);
  }

}
