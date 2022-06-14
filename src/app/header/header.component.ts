import { Component, OnInit, OnChanges } from '@angular/core';
import { UserdetailService } from '../service/userdetail.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //id:any; 
  userActive:boolean = false;
  alpha:any;
  username:any;
  cartitems:any; 
  bool:any = false;

  constructor(public userdetail :UserdetailService, public route : Router, public dialog : MatDialog){
    this.userdetail.userlogo.subscribe((res) =>{
      this.alpha = res;
    })
  }
  
  ngOnInit(): void {
      let custid = localStorage.getItem('id');
      this.userdetail.getorder(custid).subscribe((response) => {
        if(response && response.body.length > 0 && custid){
          this.cartitems = response.body.length;
          this.bool = true;
        }
      });   
  }

  ngDoCheck(): void{
      this.userdetail.profileData.subscribe((res) => {
        if(res && res.length > 0){
          this.userActive = true;
          this.username = res[0].name;
          //this.id = res[0]._id;
        }        
      })
      let status = localStorage.getItem('status');
      if(status == 'Active'){
        this.userActive = true;
        this.username = localStorage.getItem('username');
      }
      if(!this.bool){
        this.userdetail.cartdata.subscribe((res) => {
            this.cartitems = res.length;
        })
      }
      
  }
  logout(event:any){
    const value = event.target.value;
    if(value == "Logout")
    {
      localStorage.setItem('status','InActive')
      localStorage.removeItem('username');
      let data;
      this.userdetail.profiledetail(data);
      this.userActive = false;
      this.route.navigate(['/login']);
    }
  }

  opencart(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {id: localStorage.getItem('id')},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
