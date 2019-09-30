import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private fbAuth: AngularFireAuth,
  ) { }

  ngOnInit() {

  }

  async submit() {
    // this.fbAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const res = this.fbAuth.auth.createUserWithEmailAndPassword("teste@teste.com", "123456789");
    //const res = await this.fbAuth.auth.signInWithEmailAndPassword("teste@teste.com", "123456789");
    console.log(res);
  }
}
