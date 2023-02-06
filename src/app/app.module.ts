import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CoinsComponent } from './coins/coins.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    PortfolioComponent,
    LoginComponent,
    RegisterComponent,
    CoinsComponent,
    CoinDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
