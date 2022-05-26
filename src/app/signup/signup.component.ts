import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdetailService } from '../service/userdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../signin/signin.component.scss']
})
export class SignupComponent implements OnInit {
  formsubmit:FormGroup;
  submitted:any = false;
  constructor( public form : FormBuilder, public userdetail : UserdetailService, public route : Router) {
    this.formsubmit = this.form.group({
      "fullname":new FormControl('',Validators.required),
      "pswd":new FormControl('',Validators.required),
      "c_pswd":new FormControl('',Validators.required),
      "email":new FormControl('', [Validators.required, Validators.email]),
      "phone":new FormControl('', Validators.required),
      "dob":new FormControl('', Validators.required)
   })
   }

  ngOnInit(): void {
  }
  signup(){
    this.submitted = true;
    if(this.formsubmit.status == 'VALID'){
      this.userdetail.createuser(this.formsubmit.value);
      this.formsubmit.reset();
      this.submitted = false;
      this.route.navigate(['/login']);
    }       
  }
  get f() { return this.formsubmit.controls; }

}
