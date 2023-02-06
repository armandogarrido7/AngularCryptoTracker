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
  pageSize=5;
  constructor(public authService:AuthService, public db:FirebaseService, public API:APIAccessService){

  }
}
