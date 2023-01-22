import { Component } from '@angular/core';
import { WsService } from './services/ws/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public ws: WsService) {
    // ws.getData().subscribe((a) => console.log(a));
  }
}
