import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit {
	id: string;
    editMode = false;
    ans = false;
  	ordForm: FormGroup;
  	login: any = [];
    result: any = [];
    errorMessage= '';

    order: any = {
        barcode: '',
      	patient_id: '',
        doctor_id: '',
        collector_id: '',
        ordeer_date: '',
        status: ''
  	};

    ord_prds: any =  {
        prod_ids: '',
    };
  	
  	doctors: any =  [];
  	patients: any = [];
  	collectors: any = [];

  	allPrds: any = [];
  	selPrds: any = [];

  	constructor(
  	private conf: Config,
    private authService: AuthService, 
  	private sessionService: SessionService, 
  	private http: HttpClient,
  	private route: ActivatedRoute,
    private router: Router) {
        /*this.login = this.sessionService.getItem('userClaim');
      	this.http.get(this.conf.apiPath+'api/doctors/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.doctors = prodData;
      	});
      	this.http.get(this.conf.apiPath+'api/patients/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.patients = prodData;
      	});
      	this.http.get(this.conf.apiPath+'api/collectors/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.collectors = prodData;
      	});
      	this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.allPrds = prodData;
      	});
 	      this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.selPrds = prodData;
      	});*/
    }

  	ngOnInit() {
  		this.login = this.sessionService.getItem('userClaim');
      	this.http.get(this.conf.apiPath+'api/doctors/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.doctors = prodData;
      	});
      	this.http.get(this.conf.apiPath+'api/patients/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.patients = prodData;
      	});
      	this.http.get(this.conf.apiPath+'api/collectors/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.collectors = prodData;
      	});
      	
      	this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.allPrds = prodData;
      	});
 	  	this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(prodData => {
          	this.selPrds = prodData;
      	});
 	  	this.route.params
	  	.subscribe(
    		(params: Params) => {
      			this.id = params['recId'];
      			this.editMode = params['recId'] != null;
      			this.login = this.sessionService.getItem('userClaim');
      			if(this.editMode){
              this.http.get(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
	      				this.result=editData;
                		if(this.result.message.type=='success'){
	      					  this.order = this.result.data[0];
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
  			this.http.put(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+this.id, this.order).subscribe(success => {
            this.result = success;
        		if(this.result.message.type=='success'){
          			this.router.navigate(['/orders']);
        		} else {
          			this.errorMessage = this.result.message.msg;
          			return false;  
        		}
    		});
    	} else {
    		//console.log(this.user);
    		this.http.post(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+this.login.userId, this.order).subscribe(success => {
          		this.result = success;
    			if(this.result.message.type=='success'){
          			this.router.navigate(['/orders']);
        		} else {
          			this.errorMessage = this.result.message.msg;
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
    	    	this.http.delete(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+this.id, this.order).subscribe(success => {
              		this.result = success;
	        		if(this.result.message.type=='success'){
	          			this.router.navigate(['/orders']);
	        		} else {
	          			this.errorMessage = this.result.message.msg;
	          			return false;  
	        		}
  			  	});
        	}
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/orders']);
  	}
}