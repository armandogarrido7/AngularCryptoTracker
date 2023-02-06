import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'portfolio', component: PortfolioComponent, canActivate : [AuthGuardService] },
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService, AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
