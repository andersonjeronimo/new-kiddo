import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PreloaderComponent } from './_directives/preloader/preloader.component';
import { AlertComponent } from './_directives/alert/alert.component';

import { AuthGuard } from './_guards/auth.guard';
import { FirebaseService } from './_services/firebase.service';
import { AlertService } from './_services/alert.service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PreloaderComponent,
    AlertComponent,
    CustomerComponent,
    CustomerFormComponent,
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    FirebaseService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
