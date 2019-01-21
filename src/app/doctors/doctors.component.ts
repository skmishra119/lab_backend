import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

class Doctor {
  id: string;
  fullname:string;
  email_id: string;
  clinic: string;
  address: string;
  mobile: string;
  updated: string;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
    modalRef: BsModalRef;
    message: string;
	  ans = false;
    data: any = [];
    dtOptions: DataTables.Settings = {};
  	constructor(
  		private conf: Config,
      	private authService: AuthService, 
      	private sessionService: SessionService, 
      	private http: HttpClient, 
      	private router: Router, 
      	private route: ActivatedRoute) {
        this.login= this.sessionService.getItem('userClaim');
        this.http.get(this.conf.apiPath+'api/doctors/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
      });
    }

  	ngOnInit() {
		  this.login= this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/doctors/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };
      });
      console.log(data);  	
  	}

    someClickHandler(info: any) {
      this.router.navigate(['edit',  info.id], {relativeTo: this.route});
    }

    onNewDoctor() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      this.ans = confirm('Are you sure, you want to delete?')
      if(this.ans==true){
        this.http.delete(this.conf.apiPath+'api/doctor/'+this.login.lab_id+'::'+id, this.doctor).subscribe(success => {
          if(success.message.type=='success'){
            this.router.navigate(['/doctors']);
          } else {
            this.errorMessage = success.message.msg;
            return false;  
          }
        });
      }
    }
}
