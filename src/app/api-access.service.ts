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
  constructor(public http:HttpClient){
    this.getCoins();
  }
  
  getCoins(){
    this.http.get('https://api.coingecko.com/api/v3/coins/').subscribe((data:any)=>{ this.coins = data});
  }
  getCoinInfo(coin_id:string){
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + coin_id);
  }
  ngOnInit(){
    this.getCoins();
  }
}
