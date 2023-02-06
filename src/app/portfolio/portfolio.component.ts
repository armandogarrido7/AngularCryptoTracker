import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { APIAccessService } from '../api-access.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  page=1;
  pageSize=10;
  favCoinsIds:any;
  favCoins=new Array;
  constructor(public authService:AuthService, public db:FirebaseService, public api:APIAccessService){

  }

  ngOnInit(){
    this.db.getUserCoins(this.authService.user_id);
    this.api.getFavCoinsInfo();    
  }
}
