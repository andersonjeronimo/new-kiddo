import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../_services/firebase.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  // formulário
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: FirebaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password1: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  verificaCSS(campo) {
    return (
      this.registerForm.get(campo).valid && this.registerForm.get(campo).touched
    );
  }

  onSubmit() {
    if (this.registerForm.value.password1 !== this.registerForm.value.password2) {
      this.alertService.error('Senha informada no campo 1 não confere com informada no campo 2.');
    } else {
      if (this.registerForm.valid) {
        this.register(
          this.registerForm.value.email,
          this.registerForm.value.password1
        );
      }
    }
  }

  private register(email: string, password: string) {
    this.loading = true;
    this.authService
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        this.alertService.success('Cadastro efetuado com sucesso', true);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });

    /* this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }); */
  }
}
