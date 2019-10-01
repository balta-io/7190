import { Component, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  public post: Post = new Post('', '', null);

  constructor() {
    const data = localStorage.getItem('baltagram.post');
    if (data) this.post = JSON.parse(data);
  }

  ngAfterViewInit() {
    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
    var html = '<iframe style="height: 100vh;" width="100%" height="99%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCpr0wVKEYDGm1hEHpS4pB9HVijsE9LTlU&origin=' + this.post.location + '&destination=' + this.post.location + '" allowfullscreen></iframe>';
    document.getElementById('map').innerHTML = html;
  }

}
