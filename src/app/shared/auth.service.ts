import { Injectable } from '@angular/core';
// import { user } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import{GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router ) { }

  // login method
  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(res=>{
        localStorage.setItem('token','true');
        // this.router.navigate(['dashboard']);

      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard'])
      }else{
        this.router.navigate(['/varify-email'])
      }

    },err=>{
        alert(err.message);
        this.router.navigate(['/login'])
    })
  }
  // register method

  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res=>{
      alert('Registration Successfull')
      this.router.navigate(['/login'])
      this.sendEmailForVarification(res.user);
    },err=>{
        alert(err.message);
        this.router.navigate(['/register'])
    })
  }

  //sign out

  // logout(){
  //   this.fireauth.signOut.then(()=>{
  //       localStorage.removeItem('token');
  //       this.router.navigate(['/login'])
  //   },(err: { message: any; })=>{
  //     alert(err.message)
  //   })
  // }
    logout(){
      this.fireauth.signOut().then(()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },(err: { message: any; })=>{
        alert(err.message)
      })
    }

    // forgot Password

    forgotPassword(email:string){
      this.fireauth.sendPasswordResetEmail(email).then(()=>{
        this.router.navigate(['/verify-email'])
      },err=>{
        alert('Somthing went wrong');
      })
    }

    // email Varification

    sendEmailForVarification(user:any){
      user.sendEmailForVarification().then((res:any)=>{
        this.router.navigate(['/verfiy-email']);
      },(err:any)=>{
        alert("Somthing went Wrong, Not able to send mail to your mail")
      })
    }


    // sign In with google
    googleSignIn(){
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
          this.router.navigate(['/dashboard'])
          localStorage.setItem('token',JSON.stringify(res.user?.uid))
      },err=>{
        alert(err.message)
      })
    }

}