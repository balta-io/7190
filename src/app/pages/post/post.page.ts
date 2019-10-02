import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public post: Post = new Post('', '', null);
  public filters: string[] = [];

  public task: AngularFireUploadTask;
  public progress: any;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {
    const data = localStorage.getItem('baltagram.post');
    if (data) this.post = JSON.parse(data);

    this.filters.push('filter-normal');
    this.filters.push('filter-1977');
    this.filters.push('filter-aden');
    this.filters.push('filter-gingham');
    this.filters.push('filter-ginza');
    this.filters.push('filter-moon');
    this.filters.push('filter-reyes');
    this.filters.push('filter-willow');
  }

  ngOnInit() {
  }


  getLocation() {
    // https://www.google.com/maps/{{ this.post.location }}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.post.location = `${position.coords.latitude},${position.coords.longitude}`;
        localStorage.setItem('baltagram.post', JSON.stringify(this.post));
      });
    } else {
      this.showMessage('Não foi possível obter sua localização');
    }
  }


  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ message: message, duration: 3000, showCloseButton: true, closeButtonText: "OK" });
    toast.present;
  }

  async showCloseOptions() {
    const alert = await this.alertCtrl.create({
      header: 'Descartar Postagem?',
      message: 'Deseja descartar esta <strong>postagem</strong>?',
      buttons: [
        {
          text: 'Descartar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            localStorage.removeItem('baltagram.post');
            this.close();
          }
        }, {
          text: 'Manter',
          handler: () => {
            this.close();
          }
        }
      ]
    });

    await alert.present();
  }

  saveLocal() {
    localStorage.setItem('baltagram.post', JSON.stringify(this.post));
  }

  async submit() {
    // this.storage.upload('/post-images', this.post.image);
    const filePath = `post_${new Date().getTime()}.jpg`;
    this.task = this.storage.ref(filePath).putString(this.post.image, 'data_url');
    this.progress = this.task.percentageChanges();

    this.task.then((data) => {
      const ref = this.storage.ref(data.metadata.fullPath);
      ref.getDownloadURL().subscribe((imgUrl) => {
        this.post.image = imgUrl;
        this.db.collection('posts').add(this.post);
        localStorage.removeItem('baltagram.post');
        this.navCtrl.navigateBack("/home");
      });
    });


  }

  close() {
    this.navCtrl.navigateBack("/home");
  }

  showMap() {
    this.navCtrl.navigateForward("/map");
  }
}
