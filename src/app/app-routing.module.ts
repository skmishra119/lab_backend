import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsEditComponent } from './doctors/doctors-edit/doctors-edit.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';

import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'login',pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UsersEditComponent },
  { path: 'users/edit/:recId', component: UsersEditComponent },
  
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctors/new', component: DoctorsEditComponent },
  { path: 'doctors/edit/:recId', component: DoctorsEditComponent },

  { path: 'patients', component: PatientsComponent },
  { path: 'patients/new', component: PatientsEditComponent },
  { path: 'patients/edit/:recId', component: PatientsEditComponent },

  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/new', component: CategoriesEditComponent },
  { path: 'categories/edit/:recId', component: CategoriesEditComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductsEditComponent },
  { path: 'products/edit/:recId', component: ProductsEditComponent },

  { path: 'items', component: ItemsComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
