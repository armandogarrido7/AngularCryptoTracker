import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import { APIAccessService } from './api-access.service';
// import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userCoins:any;
  userCoinsData=new Array();
  coinsCollection:any;
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
}
