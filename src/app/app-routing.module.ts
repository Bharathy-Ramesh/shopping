import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
  path:'login', component:SigninComponent
 },
 {
  path:'signup', component:SignupComponent
 },
 {
   path:'home', component: HomeComponent,
   canActivate : [AuthGuard],
 },
 {
   path:'home/detail/:id', component:ProductDetailsComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
