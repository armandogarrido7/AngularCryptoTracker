import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { APIAccessService } from '../api-access.service';
@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent{
  coin_id:string='';
  sortMode:string='desc';
  page=1;
  pageSize=10;

  constructor(public authService:AuthService, public db:FirebaseService, public API:APIAccessService){

  }

  ngOnInit(){
    this.db.getUserCoins(this.authService.user_id);
    this.db.getCoinsData();
    // this.db.sortCoins('desc');
  }
  
  isCoinFav(coin_id:any){
    for (let coin of this.db.userCoinsData){
      if (coin.id == coin_id) return true;
    }
    return false;
  }
}
