import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIAccessService {
  public coins = new Array();
  public userFavCoins = new Array();
  constructor(public http:HttpClient, public db:FirebaseService){
    this.getCoins();
  }
  
  getCoins(){
    this.http.get('https://api.coingecko.com/api/v3/coins/').subscribe((data:any)=>{ this.coins = data});
  }
  getCoinInfo(coin_id:string){
    this.userFavCoins = [];
    this.http.get('https://api.coingecko.com/api/v3/coins/' + coin_id).subscribe((data:any)=>{ 
      for (let coin of this.userFavCoins){
        if (coin.id == coin_id){
          return;
        }
      }
      this.userFavCoins.push(data);
      });
  }
  ngOnInit(){
    this.getCoins();
  }
  getFavCoinsInfo(){
    this.db.user_coins.forEach((list:any) => {
      for (let coin of list){
        this.getCoinInfo(coin.coin_id);
      }
      }) 
    }
}
