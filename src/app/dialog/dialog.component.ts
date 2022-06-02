import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserdetailService } from '../service/userdetail.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productData:any = [];
  constructor(public userdetail: UserdetailService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    let custid = localStorage.getItem('id');
    this.userdetail.getorder(custid).subscribe( (res) => {
      if(res && res.body.length > 0){
      let data:any;
      this.userdetail.items.subscribe( (resp) =>{
        data = resp;
      })
        res.body.forEach((element:any) => {
          let products = data.filter((ele:any) =>{
            return element.productId == ele._id;
          });
          this.productData.push({
            _id:products[0]._id,
            title:products[0].title,
            price:(parseFloat(products[0].price) * parseInt(element.quantity)),
            image:products[0].image,
            quantity:element.quantity
          })
        });
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
