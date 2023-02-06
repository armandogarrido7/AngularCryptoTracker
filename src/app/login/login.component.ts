import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_email='';
  login_password='';
  constructor(public authService:AuthService){

  } 
  login(){
    // console.log('Email: ',this.login_email," / Password: ", this.login_password);
    this.authService.login(this.login_email, this.login_password);
  }
}
