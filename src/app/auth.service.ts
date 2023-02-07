import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated:boolean = false;
  public user_email:any = '';
  public user_id:string = '';

  constructor(public auth:Auth, public router:Router, public db:FirebaseService) { 
    this.checkAuthState();
  }
  async checkAuthState(){
    onAuthStateChanged(this.auth, (user) => {
      if(user){
        this.isAuthenticated = true;
        this.user_email = user.email;
        this.user_id = user.uid;
        this.db.getUserCoins(this.user_id);
      }else{
        this.isAuthenticated = false;
        this.user_id = '';
      }
    })
  }
  register(email:string, password:string){
    createUserWithEmailAndPassword(this.auth, email, password)
  .then((userCredential) => {
    // Signed in 
    this.isAuthenticated = true;
    this.user_id = userCredential.user.uid;
    this.user_email = userCredential.user.email
    this.router.navigate(['/']);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }
  login(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.isAuthenticated = true;
      this.user_id = userCredential.user.uid;
      this.user_email = userCredential.user.email;
      // this.db.getUserCoins();
      this.router.navigate(['/portfolio']);
    })
    .catch((error) => {
      this.isAuthenticated = false;
      this.user_id = '';
    });
  }
  loginWithGoogle(){
    const auth = getAuth();
  signInWithPopup(auth, new GoogleAuthProvider())
  .then((userCredential:any) => {
    this.user_id = userCredential.user.uid;
    this.router.navigate(['/portfolio']);
  }).catch((error:any) => {
    this.user_id = '';
    this.router.navigate(['/']);

  });
  }
  getAuthenticated(){
      return this.isAuthenticated;
  }

  logout(){
    console.log('logout');
    signOut(this.auth).then(() => {
      this.isAuthenticated = false;
      this.user_id = '';
      this.router.navigate(['/']);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }
}

