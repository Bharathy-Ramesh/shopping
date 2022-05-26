import { Component, OnInit } from '@angular/core';
import { UserdetailService } from '../service/userdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userActive:boolean = false;
  alpha:any;
  username:any;
  constructor(public userdetail :UserdetailService, public route : Router){
    this.userdetail.userlogo.subscribe((res) =>{
      this.alpha = res;
    })
  }
  
  ngOnInit(): void {
  }

  ngDoCheck(): void {
      this.userdetail.profileData.subscribe((res) => {
        if(res && res.length > 0){
          this.userActive = true;
          this.username = res[0].name;
          console.log("logged", res);
        }        
      })
      let status = localStorage.getItem('status');
      if(status == 'Active'){
        this.userActive = true;
        this.username = localStorage.getItem('username');
      }
  }
  logout(event:any){
    debugger;
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

}
