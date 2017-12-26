import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FirebaseService } from '../_services/firebase.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  stayConnected: boolean = false;

  // formulário
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: FirebaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.signOut();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.alertService.error('Email informado é inválido ou senha não possui no mínimo 6 caracteres.');
    }
  }

  private login(email: string, password: string) {
    this.loading = true;
    this.authenticationService
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.alertService.success('Login efetuado com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  verificaCSS(campo) {
    return this.loginForm.get(campo).valid && this.loginForm.get(campo).touched;
  }

  authWithGoogle() {
    this.loading = true;
    this.authenticationService
      .authWithGoogle()
      .then(data => {
        this.alertService.success('Autenticação com Google efetuada com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  authWithFacebook() {
    this.loading = true;
    this.authenticationService
      .authWithFacebook()
      .then(data => {
        this.alertService.success('Autenticação com Facebook efetuada com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
