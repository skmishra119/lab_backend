import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-orders-final',
  templateUrl: './orders-final.component.html',
  styleUrls: ['./orders-final.component.css']
})

export class OrdersFinalComponent implements OnInit {
	
	orderId: string;
    editMode = false;
    ans = false;
  	opsForm: FormGroup;
  	login: any = [];
    result: any = [];
    errorMessage= '';

    signaturePad: SignaturePad;

    orderProcessingInfo: any = {
        id: '',
        order_id: '',
        doctor: '',
        patient: '',
        collector: '',
        observation:'',
        doctor_name:'',
        sign_date:'',
        doctor_esign:'',
        status: '',
        updated: '',
        products: []
    };

    private sigPadOptions: Object = {
    	'minWidth': 1,
    	'lineWidth': 1
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
  		//this.signaturePad.set('minWidth', 1);
    	//this.signaturePad.clear();
  		this.login = this.sessionService.getItem('userClaim');
        this.route.params.subscribe((params: Params) => {
  			this.orderId = params['recId'];
  			this.editMode = params['recId'] != null;
  			this.login = this.sessionService.getItem('userClaim');
  			if(this.editMode){
          		this.http.get(this.conf.apiPath+'/api/order_esign/'+this.login.lab_id+'::'+this.orderId).subscribe(prodData => {
              		this.result = prodData;
              		if(this.result.message.type=='success'){
                		this.orderProcessingInfo = this.result.data;
                		//console.log('orderProcessingInfo: ',this.orderProcessingInfo,this.result.data);
              		}
          		});
      		}
		});
	}

	drawComplete() {
    	// will be notified of szimek/signature_pad's onEnd event
    	console.log(this.signaturePad.toDataURL());
  	}
 
  	drawStart() {
    	// will be notified of szimek/signature_pad's onBegin event
    	console.log('begin drawing');
  	}

  	doSubmit() {
      /*this.login = this.sessionService.getItem('userClaim');
      this.http.put(this.conf.apiPath+'api/order_esign/'+this.login.lab_id+'::'+this.orderId, {data: this.orderProcessingInfo}).subscribe(success => {
        	this.result = success;
          	if(this.result.message.type=='success'){
            	this.router.navigate(['/orders']);
          	} else {
            	this.errorMessage = this.result.message.msg;
              	return false;  
          	}
      	});*/
      	console.log(this);
  	}

  	doCancel(){
  		this.router.navigate(['/orders']);
  	}
}
