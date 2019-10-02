import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.page.html',
  styleUrls: ['./take-picture.page.scss'],
})
export class TakePicturePage implements OnInit {
  constructor(
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var video = <any>document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1 } })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err) {
          console.log("Não rolou carregar o vídeo");
        });
    }
  }

  takePicture() {
    var video = <any>document.getElementById('video');
    var canvas = <any>document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, 1000, 1000);
    localStorage.setItem('baltagram.post', JSON.stringify(new Post(canvas.toDataURL(), '', '')));

    video.classList.add("animated");
    video.classList.add("flash");

    setTimeout(() => {
      this.navCtrl.navigateForward('/post');
    }, 1000);
  }
}
