import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ImmoBab';

  constructor(){
    const firebaseConfig = {
      apiKey: 'AIzaSyAf9ARpbW5kveBWLdf5-MVpEuLGELcTq2E',
      authDomain: 'immobab-77233.firebaseapp.com',
      projectId: 'immobab-77233',
      storageBucket: 'immobab-77233.appspot.com',
      messagingSenderId: '571777476350',
      appId: '1:571777476350:web:298a5d15012ce73a2067af'
    };

    firebase.initializeApp(firebaseConfig);
  }

}
