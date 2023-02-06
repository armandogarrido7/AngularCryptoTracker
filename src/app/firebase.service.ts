import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { APIAccessService } from './api-access.service';
// import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentCoinId:string='';
  userCoins:any;
  userCoinsData=new Array;
  coinsCollection:any;
  sortMode='desc';
  constructor(public firestore: Firestore, public API:APIAccessService) { 
    this.coinsCollection = collection(this.firestore, "coins");
  }
  addCrypto(coin_id: any, user_id: any){
    setDoc(doc(this.firestore, 'coins', coin_id+"-"+ user_id), {
      user_id: user_id,
      coin_id: coin_id,
    });
  }

  deleteCrypto(coin_id: any, user_id:any){
    deleteDoc(doc(this.firestore, 'coins', coin_id+"-"+ user_id));
    this.getUserCoins(user_id);
  }  

  getUserCoins(user_id:any){
    if (user_id){
      this.userCoins = collectionData(query(this.coinsCollection, where("user_id", "==", user_id)));
      this.userCoins.forEach((list:any) => {
        for (let coin of list){
          this.API.getCoinInfo(coin.coin_id);
        }
      }) 
    }
  }
  getCoinsData(){
    this.userCoinsData = [];
    this.userCoins.forEach((element:any) => {
      for(let i = 0; i < element.length; i++){
        this.API.getCoinInfo(element[i].coin_id).subscribe((data:any) => {
          if(this.userCoinsData.find((crypto:any) => crypto.id == data.id))
            return;
          this.userCoinsData.push(data);
          this.sortCoins();
        })
      }
    });
  }
  getCoinData(coin_id:string){
    for (let coin of this.userCoinsData){
      if (coin.id == coin_id){
        return this.userCoinsData[this.userCoinsData.indexOf(coin)];
      }
    }
  }

  isCoinFav(coin_id:any){
    for (let coin of this.userCoinsData){
      if (coin.id == coin_id) return true;
    }
    return false;
  }
  removeCoin(coin_id:any, user_id:any){
    this.deleteCrypto(coin_id, user_id),
    this.getCoinsData();
  }
  sortCoins(){
    this.userCoinsData = this.userCoinsData.sort((coin1:any, coin2:any) => {
      if (coin1.market_data.current_price.eur < coin2.market_data.current_price.eur) return -1;
      else if (coin1.market_data.current_price.eur > coin2.market_data.current_price.eur) return 1;
      else return 0;
    })
    if (this.sortMode == 'desc') this.userCoinsData = this.userCoinsData.reverse();
  }
}
