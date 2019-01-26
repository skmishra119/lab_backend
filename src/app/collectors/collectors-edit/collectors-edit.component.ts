import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-collectors-edit',
  templateUrl: './collectors-edit.component.html',
  styleUrls: ['./collectors-edit.component.css']
})
export class CollectorsEditComponent implements OnInit {
	id: string;
  editMode = false;
  ans=false;
  cltForm: FormGroup;
	login: any = [];
  result: any = [];
  errorMessage= '';

	collector: any = {
    title: '',
    first_name: '',
    last_name: '',
    email_id: '',
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
	     		this.http.get(this.conf.apiPath+'api/collector/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
		     		this.result=editData             
            if(this.result.message.type=='success'){
		      			this.collector = this.result.data[0];
	      	  }
		   	  });
		    }
      //this.initForm();
    });
  }

  doSubmit() {
		this.login = this.sessionService.getItem('userClaim');
    if (this.editMode) {
  		this.http.put(this.conf.apiPath+'api/collector/'+this.login.lab_id+'::'+this.id, this.collector).subscribe(success => {
        this.result=success;
        if(this.result.message.type=='success'){
          this.router.navigate(['/collectors']);
        } else {
	      	this.errorMessage = this.result.message.msg;
          return false;  
        }
	    });
    } else {
	   	//console.log(this.user);
	   	this.http.post(this.conf.apiPath+'api/collector/'+this.login.lab_id+'::'+this.login.userId, this.collector).subscribe(success => {
        this.result=success;
	    	if(this.result.message.type=='success'){
	         this.router.navigate(['/collectors']);
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
          this.http.delete(this.conf.apiPath+'api/collector/'+this.login.lab_id+'::'+this.id, this.collector).subscribe(success => {
	        	this.result=success;
            if(this.result.message.type=='success'){
	          		this.router.navigate(['/collectors']);
	        	} else {
	          		this.errorMessage = this.result.message.msg;
	          		return false;  
	        	}
  			  });
        }
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/collectors']);
  	}
}