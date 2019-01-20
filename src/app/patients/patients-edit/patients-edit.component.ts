import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-patients-edit',
  templateUrl: './patients-edit.component.html',
  styleUrls: ['./patients-edit.component.css']
})
export class PatientsEditComponent implements OnInit {
	id: string;
    editMode = false;
  	patForm: FormGroup;
	login: any = [];

	patient: any = {
      	title: '',
    	first_name: '',
    	last_name: '',
    	email_id: '',
    	address: '',
    	city: '',
    	mobile: '',
    	status: ''
  	};

  	errorMessage: string;

  	constructor(
  		private conf: Config,
      	private authService: AuthService, 
  		private sessionService: SessionService, 
  		private http: HttpClient,
  		private route: ActivatedRoute,
      	private router: Router
    ) { }

  	ngOnInit() {
  		this.route.params
      	.subscribe(
        	(params: Params) => {
          		this.id = params['recId'];
          		this.editMode = params['recId'] != null;
          		this.login = this.sessionService.getItem('userClaim');
          		if(this.editMode){
		      		this.http.get(this.conf.apiPath+'api/patient/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
		      			if(editData.message.type=='success'){
		      				this.patient = editData.data[0];
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
  			this.http.put(this.conf.apiPath+'api/patient/'+this.login.lab_id+'::'+this.id, this.patient).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/patients']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
	    	});
	    } else {
	    	//console.log(this.user);
	    	this.http.post(this.conf.apiPath+'api/patient/'+this.login.lab_id+'::'+this.login.userId, this.patient).subscribe(success => {
	    		if(success.message.type=='success'){
	          		this.router.navigate(['/patients']);
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
        ans = confirm('Are you sure,you want to  delete?');
        if(ans==true){
          this.http.delete(this.conf.apiPath+'api/patient/'+this.login.lab_id+'::'+this.id, this.patient).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/patients']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
  			  });
        }
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/patients']);
  	}
}
