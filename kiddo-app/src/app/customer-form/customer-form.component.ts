import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertService } from './../_services/alert.service';
import { FirebaseService } from './../_services/firebase.service';
import { Customer } from './../_models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  private reference = 'customer';
  private databaseChildRef: any = null;

  customerForm: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  private getFirebaseReferences(reference: string) {
    this.databaseChildRef = this.firebase.getDatabaseChildRef(reference);
  }

  private createForm() {
    this.customerForm = this.formBuilder.group({
      kidName: [null, Validators.required],
      parentName: [null, Validators.required],
      contact: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getFirebaseReferences(this.reference);
    this.createForm();
  }

  private clearForm() {
    this.customerForm.reset();
  }

  verificaCSS(campo) {
    return (
      this.customerForm.get(campo).valid && this.customerForm.get(campo).touched
    );
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.createCustomer();
    } else {
      this.alertService.error('Verificar preenchimento dos campos.');
    }
  }

  private createCustomer() {
    let customer: Customer = new Customer(
      this.customerForm.value.kidName,
      new Date(),
      this.customerForm.value.parentName,
      this.customerForm.value.contact,
      false
    );

    this.databaseChildRef.push(customer).then(() => {
      this.alertService.success(`${customer.kidName} cadastrado com sucesso!`, true);
      this.clearForm();
    })
    .catch(error => {
      this.alertService.error(`Erro: ${error}`);
    });
  }
}
