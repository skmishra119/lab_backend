import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
    id: string;
    editMode = false;
    ans = false;
  	userForm: FormGroup;
	  login: any = [];
    roles: any = [];
	
    user: any = {
      title: '',
    	first_name: '',
    	last_name:'',
    	email_id:'',
    	status: '',
    	role:''
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
  		this.login = this.sessionService.getItem('userClaim');
  		this.http.get(this.conf.apiPath+'api/roles/'+this.login.lab_id+'::'+this.login.userId).subscribe(success => {
      		this.roles = success;
    	});
  		this.route.params
      	.subscribe(
        	(params: Params) => {
          		this.id = params['recId'];
          		this.editMode = params['recId'] != null;
          		this.login = this.sessionService.getItem('userClaim');
          		if(this.editMode){
		      		this.http.get(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
		      			if(editData.message.type=='success'){
		      				this.user = editData.data[0];
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
  			this.http.put(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+this.id, this.user).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/users']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
	    	});
	    } else {
	    	//console.log(this.user);
	    	this.http.post(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+this.login.userId, this.user).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/users']);
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
        	this.http.delete(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+this.id, this.user).subscribe(success => {
	        	if(success.message.type=='success'){
	          		this.router.navigate(['/users']);
	        	} else {
	          		this.errorMessage = success.message.msg;
	          		return false;  
	        	}
  			  });
        }
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/users']);
  	}
}
