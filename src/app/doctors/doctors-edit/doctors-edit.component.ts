import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-doctors-edit',
  templateUrl: './doctors-edit.component.html',
  styleUrls: ['./doctors-edit.component.css']
})
export class DoctorsEditComponent implements OnInit {
	id: string;
  editMode = false;
  ans = false;
  doctorForm: FormGroup;
	
  login: any = [];
  result: any = [];
  errorMessage= '';
	
  doctor: any = {
      	title: '',
    	first_name: '',
    	last_name: '',
    	email_id: '',
    	clinic: '',
    	address: '',
    	city: '',
    	mobile: '',
    	status: ''
  	};

  
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
		      		this.http.get(this.conf.apiPath+'api/doctor/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
                this.result =  editData;
		      			if(this.result.message.type=='success'){
		      				this.doctor = this.result.data[0];
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
      	this.http.put(this.conf.apiPath+'api/doctor/'+this.login.lab_id+'::'+this.id, this.doctor).subscribe(success => {
            this.result = success;
	        	if(this.result.message.type=='success'){
	          		this.router.navigate(['/doctors']);
	        	} else {
	          		this.errorMessage = this.result.message.msg;
	          		return false;  
	        	}
	    	});
	    } else {
	    	//console.log(this.user);
	    	this.http.post(this.conf.apiPath+'api/doctor/'+this.login.lab_id+'::'+this.login.userId, this.doctor).subscribe(success => {
          this.result = success;
	    		if(this.result.message.type=='success'){
	          		this.router.navigate(['/doctors']);
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
          this.http.delete(this.conf.apiPath+'api/doctor/'+this.login.lab_id+'::'+this.id, this.doctor).subscribe(success => {
            this.result = success;
	        	if(this.result.message.type=='success'){
	          		this.router.navigate(['/doctors']);
	        	} else {
	          		this.errorMessage = this.result.message.msg;
	          		return false;  
	        	}
  			  });
        }
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/doctors']);
  	}
}