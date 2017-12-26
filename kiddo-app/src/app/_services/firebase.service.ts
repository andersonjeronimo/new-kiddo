import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class FirebaseService {

  /*
<script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDr9FVOODDSDqxUREgKeTvZZuu75iuAiEQ",
    authDomain: "kiddo-app.firebaseapp.com",
    databaseURL: "https://kiddo-app.firebaseio.com",
    projectId: "kiddo-app",
    storageBucket: "kiddo-app.appspot.com",
    messagingSenderId: "297076652416"
  };
  firebase.initializeApp(config);
</script>
   */

  private setting = {
    apiKey: 'AIzaSyDr9FVOODDSDqxUREgKeTvZZuu75iuAiEQ',
    authDomain: 'kiddo-app.firebaseapp.com',
    databaseURL: 'https://biblioteca-pro-vida.firebaseio.com',
    projectId: 'kiddo-app',
    storageBucket: 'kiddo-app.appspot.com',
    messagingSenderId: '297076652416'
  };
  private provider: any = {};
  constructor() {
    firebase.initializeApp(this.setting);
  }
  // database
  getDatabaseRef(reference: string) {
    return firebase
      .database()
      .ref(reference);
  }

  getDatabaseChildRef(reference: string) {
    return firebase
      .database()
      .ref()
      .child(reference);
  }

  // storage
  getStorageRef(reference: string) {
    return firebase.storage().ref(reference);
  }

  // authentication
  // estas funções são responsáveis por utilizar os métodos de auth do firebase e de setarem
  // ... o usuário no LocalStorage / SessionStorage

  private saveCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  authWithFacebook() {
    this.provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(data => {
        // local storage (...)
        const user = data.user; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  authWithGoogle() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(data => {
        // local storage (...)
        const user = data.user; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  signOut() {
    firebase.auth().signOut();
    // remover usuário do local storage
    this.removeCurrentUser();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        // local storage (...)
        const user = data; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  /* authWithTwitter() {
    this.provider = new firebase.auth.TwitterAuthProvider();
    return this.signInWithProvider();
  }

  authWithGithub() {
    this.provider = new firebase.auth.GithubAuthProvider();
    return this.signInWithProvider();
  } */

}
