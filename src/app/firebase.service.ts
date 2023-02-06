import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user_coins:any;
  user_coins_ids= new Array();
  coinsCollection:any;
  constructor(public firestore: Firestore) { }
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
    this.user_coins_ids = [];
    this.coinsCollection = collection(this.firestore, "coins");
    this.user_coins = collectionData(query(this.coinsCollection, where("user_id", "==", user_id)));
    this.user_coins.forEach((list:any) => {
      for (let coin of list){
        this.user_coins_ids.push(coin.coin_id);
      }
    })
    
  }

  async isCoinFav(coin_id:any){
    return true;
  }

}
