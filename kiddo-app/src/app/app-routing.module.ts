import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'customer-form', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product-form', component: ProductFormComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting {}

// export const routing = RouterModule.forRoot(appRoutes);
