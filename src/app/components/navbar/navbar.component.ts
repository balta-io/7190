import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() { }

  async showOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [{
        text: 'New Contact',
        icon: 'person-add',
        handler: () => {
          // 
        }
      }, {
        text: 'Logout',
        icon: 'exit',
        handler: () => {
          // 
        }
      }, {
        text: 'Refresh App',
        icon: 'refresh',
        handler: () => {
          // 
        }
      }, {
        text: 'Update to version 1.0.1',
        icon: 'cloud-download',
        handler: () => {
          // 
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // 
        }
      }]
    });
    await actionSheet.present();
  }
}
