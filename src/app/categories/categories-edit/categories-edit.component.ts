import { Component, OnInit } from '@angular/core';
import { Config } from '../../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  id: string;
  editMode = false;
  ans = false;
  catForm: FormGroup;
	login: any = [];
  result: any = [];
  errorMessage= '';

	category: any = {
      name: '',
    	description: '',
    	parent_id: '',
    	status: ''
  };

    pCat: any =  [];

   	constructor(
  		private conf: Config,
     	private authService: AuthService, 
  		private sessionService: SessionService, 
  		private http: HttpClient,
  		private route: ActivatedRoute,
      	private router: Router
    ) {
      this.login = this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/categories/parent/'+this.login.lab_id+'::0').subscribe(pCatData => {
        this.result = pCatData;    
        if(this.result.message.type=='success'){
          this.pCat = this.result.data;
        }
      });
     }

  	ngOnInit() {
      this.login = this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/categories/parent/'+this.login.lab_id+'::0').subscribe(pCatData => {
        this.result = pCatData;
        if(this.result.message.type=='success'){
          this.pCat = this.result.data;
        }
      });

  		this.route.params
      	.subscribe(
        	(params: Params) => {
          		this.id = params['recId'];
          		this.editMode = params['recId'] != null;
          		this.login = this.sessionService.getItem('userClaim');
          		if(this.editMode){
		      		  this.http.get(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+this.id).subscribe(editData => {
                  this.result = editData;
                if(this.result.message.type=='success'){
		      				this.category = this.result.data[0];
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
  			this.http.put(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+this.id, this.category).subscribe(success => {
            this.result =success;
	        	if(this.result.message.type=='success'){
	          		this.router.navigate(['/categories']);
	        	} else {
	          		this.errorMessage = this.result.message.msg;
	          		return false;  
	        	}
	    	});
	    } else {
	    	//console.log(this.user);
	    	this.http.post(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+this.login.userId, this.category).subscribe(success => {
          this.result = success;
	    		if(this.result.message.type=='success'){
	          		this.router.navigate(['/categories']);
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
          this.http.delete(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+this.id, this.category).subscribe(success => {
            this.result =  success;
  	        	if(this.result.message.type=='success'){
  	          		this.router.navigate(['/categories']);
  	        	} else {
  	          		this.errorMessage = this.result.message.msg;
  	          		return false;  
  	        	}
    			});
        }
  		}
  	}
  	
  	doCancel(){
  		this.router.navigate(['/categories']);
  	}
}
