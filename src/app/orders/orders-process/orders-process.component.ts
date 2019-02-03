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
    orderId: string;
    editMode = false;
    ans = false;
  	opsForm: FormGroup;
  	login: any = [];
    result: any = [];
    errorMessage= '';

    orderProcessingInfo: any = {
        id: '',
        order_id: '',
        doctor: '',
        patient: '',
        collector: '',
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
        this.route.params.subscribe(
    		  (params: Params) => {
      			this.orderId = params['recId'];
      			this.editMode = params['recId'] != null;
      			this.login = this.sessionService.getItem('userClaim');
      			if(this.editMode){
              this.http.get(this.conf.apiPath+'/api/order_processing/'+this.login.lab_id+'::'+this.orderId).subscribe(prodData => {
                  this.result = prodData;
                  if(this.result.message.type=='success'){
                    this.orderProcessingInfo = this.result.data;
                    //console.log('orderProcessingInfo: ',this.orderProcessingInfo,this.result.data);
                  }
              });
	      		}
    		});
	  }

	doSubmit() {
      this.login = this.sessionService.getItem('userClaim');
      this.http.put(this.conf.apiPath+'api/order_processing/'+this.login.lab_id+'::'+this.orderId, {data: this.orderProcessingInfo.products}).subscribe(success => {
          this.result = success;
          if(this.result.message.type=='success'){
              this.router.navigate(['/orders']);
          } else {
              this.errorMessage = this.result.message.msg;
              return false;  
          }
      });
  }

	doDelete(){}
  	
  	doCancel(){
  		this.router.navigate(['/orders']);
  	}
}
