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
  userCoinsData=new Array;
  constructor(public authService:AuthService, public db:FirebaseService, public API:APIAccessService){

  }

  ngOnInit(){
    this.db.getUserCoins(this.authService.user_id);
    this.userCoinsData = new Array<any>();
    this.getCoinsData();
  }
  removeCoin(coin_id:any, user_id:any){
    this.db.deleteCrypto(coin_id, user_id),
    this.getCoinsData();
  }
  getCoinsData(){
    this.userCoinsData = [];
    this.db.userCoins.forEach((element:any) => {
      for(let i = 0; i < element.length; i++){
        this.API.getCoinInfo(element[i].coin_id).subscribe((data:any) => {
          if(this.userCoinsData.find((crypto:any) => crypto.id == data.id))
            return;
          this.userCoinsData.push(data);
        })
      }
    });
  }
  isCoinFav(coin_id:any){
    for (let coin of this.userCoinsData){
      if (coin.id == coin_id) return true;
    }
    return false;
  }
}
