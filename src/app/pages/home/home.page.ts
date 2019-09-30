import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: Observable<any[]>;

  constructor(
    db: AngularFirestore
  ) {

    this.posts = db.collection('posts').valueChanges();
  }

}
