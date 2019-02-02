import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';



@Component({
  selector: 'app-orders-process',
  templateUrl: './orders-process.component.html',
  styleUrls: ['./orders-process.component.css']
})
export class OrdersProcessComponent implements OnInit {
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
        order_date: '',
        prod_ids: [] ,
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
  	orderProcessingInfo: any = {
        id: '',
        order_id: '',
        status: '',
        updated: '',
        products: []
    };

  	constructor(
  	private conf: Config,
    private authService: AuthService, 
  	private sessionService: SessionService, 
  	private http: HttpClient,
  	private route: ActivatedRoute,
    private router: Router) {
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

              this.http.get(this.conf.apiPath+'api/order_processing/'+this.login.lab_id+'::'+this.id).subscribe(prodData => {
                  this.result = prodData;
                  if(this.result.message.type=='success'){
                    this.orderProcessingInfo = this.result.data;
                    // console.log('this.orderProcessingInfo',this.orderProcessingInfo);
                  }

              });


              this.http.get(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
	      				this.result=editData;
                		if(this.result.message.type=='success'){
                    this.order = this.result.data;
                    console.log('this.order', this.order);
        				}
	    			});
	      		}
      			//this.initForm();
    		}
  		);
	}

	doSubmit() {
    //console.log(this.order);
    this.login = this.sessionService.getItem('userClaim');
    if (this.editMode) {
        this.http.put(this.conf.apiPath+'api/order_processing/'+this.login.lab_id+'::'+this.id, {data: this.orderProcessingInfo.products}).subscribe(success => {
            this.result = success;
            if(this.result.message.type=='success'){
                // this.router.navigate(['/orders']);
            } else {
                this.errorMessage = this.result.message.msg;
                return false;  
            }
        });
      } else {
        //console.log('Post: ',this.order);
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

	doDelete(){}
  	
  	doCancel(){
  		this.router.navigate(['/orders']);
  	}

    addProducts(){

    }

    removeProducts(){
    
    }

    onProcessOrder(){}
}
