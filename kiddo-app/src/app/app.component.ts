import { Component } from '@angular/core';

import { AlertService } from './_services/alert.service';
import { FirebaseService } from './_services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biblioteca Virtual';
  // stayConnected = false;
  private message: string = null;
  constructor(private firebaseService: FirebaseService) {}

}
