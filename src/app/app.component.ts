import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private toastCtrl: ToastController,
  ) {
  }

  ngOnInit() {
    this.showUpdateToast();
  }

  async showUpdateToast() {
    const toast = await this.toastCtrl.create({
      header: 'New update available',
      message: 'Please, update to version 1.0.2',
      position: 'bottom',
      // duration: 8000,
      showCloseButton: true,
      closeButtonText: 'Later',
      buttons: [
        {
          side: 'end',
          icon: 'cloud-download',
          text: 'Update now',
          handler: () => {
            //
          }
        }
      ]
    });
    toast.present();
  }
}
