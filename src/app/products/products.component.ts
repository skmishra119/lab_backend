import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

class product {
  id: string;
  name: string;
  description: string;
  cat_id: string;
  updated: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  	ans = false;
    data: any = [];
    dtOptions: DataTables.Settings = {};
  	
  	constructor(
  		private conf: Config,
      	private authService: AuthService, 
      	private sessionService: SessionService, 
      	private http: HttpClient, 
      	private router: Router, 
      	private route: ActivatedRoute) {
        this.login= this.sessionService.getItem('userClaim');
        this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        	this.data=uData;
        	this.dtOptions = {
          		pagingType: 'full_numbers',
          		pageLength: 10,
          		processing: true
        	};
      	});
    }

  	ngOnInit() {
		this.login= this.sessionService.getItem('userClaim');
      	this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        	this.data=uData;
        	console.log(this.data);
        	this.dtOptions = {
            	pagingType: 'full_numbers',
            	pageLength: 10,
            	processing: true
          	};
      	});
      	console.log(data);  	
  	}

    onNewProduct() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      this.ans = confirm('Are you sure, you want to delete?')
      if(this.ans==true){
        this.http.delete(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+id, this.product).subscribe(success => {
          if(success.message.type=='success'){
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = success.message.msg;
            return false;  
          }
        });
      }
    }
    
    confirm(): void {
      this.message = 'Confirmed!';
      this.modal.hide();
    }
 
    decline(): void {
      this.message = 'Declined!';
      this.modalRef.hide();
    }
}