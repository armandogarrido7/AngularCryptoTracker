import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent {
  coin_id:any;
  coin_data:any;
  constructor(public db:FirebaseService, private _Activatedroute:ActivatedRoute){
    this.coin_id=this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.coin_id);
    this.coin_data = this.db.getCoinData(this.coin_id);
    console.log(this.coin_data);
  }
}
