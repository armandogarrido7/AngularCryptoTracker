import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register_email='';
  register_password='';
  constructor(public authService:AuthService){

  }
  register(){
    this.authService.register(this.register_email, this.register_password);
  }
}
