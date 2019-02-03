import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsEditComponent } from './doctors/doctors-edit/doctors-edit.component';
import { CollectorsComponent } from './collectors/collectors.component';
import { CollectorsEditComponent } from './collectors/collectors-edit/collectors-edit.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { ItemsComponent } from './items/items.component';
import { ItemsEditComponent } from './items/items-edit/items-edit.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersEditComponent } from './orders/orders-edit/orders-edit.component';
import { OrdersProcessComponent } from './orders/orders-process/orders-process.component';
import { ReportsComponent } from './reports/reports.component';

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

  { path: 'collectors', component: CollectorsComponent },
  { path: 'collectors/new', component: CollectorsEditComponent },
  { path: 'collectors/edit/:recId', component: CollectorsEditComponent },

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
  { path: 'items/new', component: ItemsEditComponent },
  { path: 'items/edit/:recId', component: ItemsEditComponent },

  { path: 'orders', component: OrdersComponent },
  { path: 'orders/new', component: OrdersEditComponent },
  { path: 'orders/edit/:recId', component: OrdersEditComponent },
  { path: 'orders/process/:recId', component: OrdersProcessComponent },

  { path: 'barcode/generate', component: BarcodeComponent },
  
  { path: 'reports', component: ReportsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
