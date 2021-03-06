import { BrowserModule } from '@angular/platform-browser';
import { Config } from './config';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable';

import { NgxBarcodeModule } from 'ngx-barcode';
import { ChartsModule } from 'ng2-charts';

import { SignaturePadModule } from 'angular2-signaturepad';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/Interceptors/auth-interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionService } from './shared/services/session.service';
import { HelperService } from './shared/services/helper.service';
import { AuthService } from './shared/services/auth.service';
import { CategoriesComponent } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsEditComponent } from './doctors/doctors-edit/doctors-edit.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientsEditComponent } from './patients/patients-edit/patients-edit.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { ItemsEditComponent } from './items/items-edit/items-edit.component';
import { CollectorsComponent } from './collectors/collectors.component';
import { CollectorsEditComponent } from './collectors/collectors-edit/collectors-edit.component';
import { OrdersEditComponent } from './orders/orders-edit/orders-edit.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { OrdersProcessComponent } from './orders/orders-process/orders-process.component';
import { ReportsComponent } from './reports/reports.component';
import { OrdersFinalComponent } from './orders/orders-final/orders-final.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoriesComponent,
    ItemsComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesEditComponent,
    UsersEditComponent,
    DoctorsComponent,
    DoctorsEditComponent,
    PatientsComponent,
    PatientsEditComponent,
    ProductsEditComponent,
    ItemsEditComponent,
    CollectorsComponent,
    CollectorsEditComponent,
    OrdersEditComponent,
    jqxGridComponent,
    jqxCalendarComponent,
    jqxDateTimeInputComponent,
    jqxDataTableComponent,
    BarcodeComponent,
    OrdersProcessComponent,
    ReportsComponent,
    OrdersFinalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxBarcodeModule,
    ChartsModule,
    SignaturePadModule,
  ],
  providers: [
    Config, SessionService, HelperService, AuthService, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
