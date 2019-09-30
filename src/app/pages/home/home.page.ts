import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any = {
    image: 'https://placehold.it/80'
  };
  posts: Observable<any[]>;

  constructor(
    db: AngularFirestore
  ) {
    this.posts = db.collection('posts').valueChanges();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('baltagram.user'));
  }

}
