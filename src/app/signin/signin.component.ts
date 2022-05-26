import { Component, OnInit } from '@angular/core';
import { UserdetailService } from '../service/userdetail.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
        debugger;
        if(res.body && res.body.length > 0){
          this.userservice.profiledetail(res.body);
          localStorage.setItem('status','Active');
          localStorage.setItem('username',res.body[0].name);
          this.route.navigate(['/home']);
          this.log.reset();
          this.logged = false;
          this.userservice.passValue(res.body[0].name);
        }
      })
    } 
  }
  get f() { return this.log.controls; }
  get l() { return this.updatelog.controls; } 
  update(){
    console.log(this.updatelog);
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
