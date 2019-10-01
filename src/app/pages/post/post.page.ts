import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public post: Post = new Post('', '', null);
  public filters: string[] = [];

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
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
        this.post.location = `${position.coords.latitude},${position.coords.longitude},25z`;
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

  close() {
    this.navCtrl.navigateBack("/home");
  }
}
