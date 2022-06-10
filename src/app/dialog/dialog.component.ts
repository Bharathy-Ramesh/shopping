import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserdetailService } from '../service/userdetail.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productData:any = [];
  custid:any;
  constructor(public userdetail: UserdetailService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public loadspin : NgxSpinnerService, public route : Router ) { }

  ngOnInit(): void {
    this.loadpage();
  }

  loadpage(){
    this.custid = localStorage.getItem('id');
    this.userdetail.getorder(this.custid).subscribe( (res) => {
      if(res && res.body.length > 0){
      let data:any;
      this.userdetail.getProducts().subscribe( (resp) =>{
        this.loadspin.hide();
        data = resp;
        res.body.forEach((element:any) => {
          let products = data.filter((ele:any) =>{
            return element.productId == ele._id;
          });
          this.productData.push({
            _id:products[0]._id,
            title:products[0].title,
            price:(parseFloat(products[0].price) * parseInt(element.quantity)),
            image:products[0].image,
            quantity:element.quantity,
            count:products[0].count
          })
        });
      })
      }
    })
  }

  onNoClick(prodId:any): void {
    this.route.navigate(['/home/detail',prodId]).then(() => {
      window.location.reload();
  });
    this.close();
  }

  close(){
    this.dialogRef.close();
  }

  deleteproduct(product:any){
    this.userdetail.deleteorder(product._id,this.custid);
    let para = {
      _id : product._id,
      count: parseFloat(product.count) + parseInt(product.quantity)
    } 
      this.userdetail.updateproduct(para);
      window.location.reload();
      // this.userdetail.getorder(this.custid).subscribe( (res) => {
      //    this.userdetail.passorders(res.body);
      // })
  }
}
