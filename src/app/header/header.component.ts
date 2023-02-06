import { Component } from '@angular/core';
import { APIAccessService } from '../api-access.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public APIAccessService:APIAccessService, public authService:AuthService){
  }
  
  ngOnInit(){
    this.APIAccessService.getCoins();
  }
}
