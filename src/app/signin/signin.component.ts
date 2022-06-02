import { Component, OnInit } from '@angular/core';
import { UserdetailService } from '../service/userdetail.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  existuser:any = true;
  log:FormGroup;
  pwd_msg:any;
  updatelog:FormGroup;
  logged:any = false;
  constructor(public form : FormBuilder, public userservice : UserdetailService, public route : Router) { 
    this.log = this.form.group({
       "username":new FormControl('',Validators.required),
       "password":new FormControl('',Validators.required)
    });
    this.updatelog = this.form.group({
      "username":new FormControl('',Validators.required),
      "password":new FormControl('',Validators.required),
      "c_password":new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    
  }
  login(){
    this.logged = true;
    if(this.log.status == 'VALID'){
      this.userservice.getuser(this.log.value).subscribe((res) => {
        if(res.body && res.body.detail){
          let response = [];
          response.push(res.body.detail);
          localStorage.setItem('token',`Bearer ${res.body.token}`);
          this.userservice.profiledetail(res.body.detail);
          localStorage.setItem('status','Active');
          localStorage.setItem('username',res.body.detail.name);
          localStorage.setItem('id',res.body.detail._id);
          this.userservice.getorder(res.body.detail._id).subscribe((response) => {
            if(response && response.body.length > 0){
              this.userservice.passorders(response.body);
            }
          });
          this.route.navigate(['/home']);
          this.log.reset();
          this.logged = false;
          this.userservice.passValue(res.body.detail.name);
        }
      })
    } 
  }
  get f() { return this.log.controls; }
  get l() { return this.updatelog.controls; } 
  update(){
    this.logged = true;
    if(this.updatelog.status == 'VALID' && !this.confirmvalidator()){
      this.userservice.updateuser(this.updatelog.value);
      this.existuser = true;
      this.logged = false;
    }else if(this.confirmvalidator()){
      this.logged = true;
      this.pwd_msg = "Password does not match";
    }
    
  }
  changeuser(){
    this.existuser = false;
  }

  confirmvalidator(){
    if(this.updatelog.value.password == this.updatelog.value.c_password){
      return false;
    }else{
      return true;
    }
    return false;
  }
}
