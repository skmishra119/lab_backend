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
	  data: any = [];
    ans = false;
    result: any = [];
    errorMessage= '';
    dataAdapter: any = [];
    source: any = [];
    columns: any = [];

    constructor(
      private conf: Config,
      private authService: AuthService, 
      private sessionService: SessionService, 
      private http: HttpClient, 
      private router: Router, 
      private route: ActivatedRoute) {
    }

  	ngOnInit() {
      this.login= this.sessionService.getItem('userClaim');
      this.http.get(this.conf.apiPath+'api/users/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data = uData;
        this.source = {
          localData: this.data,
          dataType: 'json',
          dataFields:
          [
            { name: 'email_id', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'fullname', type: 'string' },
            { name: 'updated', type: 'string' },
            { name: 'user_id', type: 'string' }
          ]
        };    
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns =
        [
          { text: 'Email Id', dataField: 'email_id', cellsRenderer: (row: any, column: any, value: any, rowData: any): string => {
            let retval = '<a href="users/edit/'+rowData.user_id+'">'+rowData.email_id+'</a>';
                return retval;
            }
          },
          { text: 'Role', dataField: 'role'},
          { text: 'Full Name', dataField: 'fullname'},
          { text: 'Updated', dataField: 'updated'}
        ];
      }, error => console.error(error));
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
        this.login= this.sessionService.getItem('userClaim');
        this.http.delete(this.conf.apiPath+'api/user/'+this.login.lab_id+'::'+id).subscribe(success => {
          this.result = success;
          if(this.result.message.type=='success'){
            this.router.navigate(['/users']);
          } else {
            this.errorMessage = this.result.message.msg;
            return false;  
          }
        });
      }
    }
}
