import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User = new User('', '', 'https://placehold.it/80');
  posts: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.posts = db.collection('posts').valueChanges();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('baltagram.user'));

    const img = localStorage.getItem('baltagram.post');
    if (img) this.showMessage("Você tem uma publicação não salva");
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 3000, buttons: [
        {
          icon: "send",
          handler: () => {
            this.navCtrl.navigateForward("/post");
          }
        }
      ]
    });
    toast.present();
  }

}
