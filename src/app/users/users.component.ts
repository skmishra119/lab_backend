import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';


class Person {
  id: string;
  email_id: string;
  role: string;
  fullame: string;
  updated: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {
    login: any = [];
	  data = [];
    ans = false;
    dtOptions: DataTables.Settings = {};
  	
    constructor(
      private conf: Config,
      private authService: AuthService, 
      private sessionService: SessionService, 
      private http: HttpClient, 
      private router: Router, 
      private route: ActivatedRoute) {
      this.login= this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/users/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data = uData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
      }, error => console.error(error));
    }

  	ngOnInit() {
      this.login= this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/users/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data = uData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
      }, error => console.error(error));
      console.log(data);
   	}

    onNewUser() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      this.ans = confirm('Are you sure, you want to delete?')
      if(this.ans==true){
        this.http.delete(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+id, this.user).subscribe(success => {
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
