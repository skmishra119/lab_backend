import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})

export class ProductsEditComponent implements OnInit {
	id: string;
	editMode = false;
  	ans = false;
  	patForm: FormGroup;
	login: any = [];

	product: any = {
    	name: '',
    	description: '',
    	category_id: '',
    	status: ''
  	};

    pCat: any =  [];

	errorMessage: string;

  	constructor(
  		private conf: Config,
      	private authService: AuthService, 
  		private sessionService: SessionService, 
  		private http: HttpClient,
  		private route: ActivatedRoute,
      	private router: Router
    ) {
      this.login = this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/categories/'+this.login.lab_id+'::'+this.login.userId).subscribe(pCatData => {
          this.pCat = pCatData;
      });
     }

  	ngOnInit() {
    	this.login = this.sessionService.getItem('userClaim');
      	this.http.get(this.conf.apiPath+'api/categories/'+this.login.lab_id+'::'+this.login.userId).subscribe(pCatData => {
       		this.pCat = pCatData;
      	});

  		this.route.params
      	.subscribe(
        	(params: Params) => {
          		this.id = params['recId'];
          		this.editMode = params['recId'] != null;
          		this.login = this.sessionService.getItem('userClaim');
          		if(this.editMode){
		      		this.http.get(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
                		if(editData.message.type=='success'){
		      				this.product = editData.data[0];
	        			}
		    		});
		      	}
          		//this.initForm();
        	}
      	);
  	}

  	doSubmit() {
  		this.login = this.sessionService.getItem('userClaim');
  		if (this.editMode) {
  			this.http.put(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+this.id, this.product).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/products']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
	    	});
	    } else {
	    	//console.log(this.user);
	    	this.http.post(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+this.login.userId, this.product).subscribe(success => {
	    		if(success.message.type=='success'){
	          		this.router.navigate(['/products']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
	    	});
	    }
  	}

  	doDelete(){
  		this.login = this.sessionService.getItem('userClaim');
  		if (this.editMode) {
  			this.ans = confirm('Are you sure,you want to  delete?');
        	if(this.ans==true){
          		this.http.delete(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+this.id, this.product).subscribe(success => {
  	        		if(success.message.type=='success'){
  	          			this.router.navigate(['/products']);
  	        		} else {
  	          			this.errorMessage = success.message.msg;
  	          			return false;  
  	        		}
    			});
        	}
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/products']);
  	}
}
