import { Component, OnInit } from '@angular/core';
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
    dtOptions: DataTables.Settings = {};
  	
    constructor(private authService: AuthService, private sessionService: SessionService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    }

  	ngOnInit() {
      this.login= this.sessionService.getItem('userClaim');
      this.http.get('http://lab.bintechsol.com/backend/api/users/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        this.dtOptions = {
          data: this.data,
          pageLength: 20,
          columns: [
            {
              title: 'Email ID',
              data: 'email_id'
            }, {
              title: 'Role',
              data: 'role'
            }, {
              title: 'Full Name',
              data: 'fullname'
            }, {
              title: 'Updated  On',
              data: 'updated'
            }
          ],
          rowCallback: (row: Node, rData: any[] | Object, index: number) => {
            const self = this;
            // Unbind first in order to avoid any duplicate handler
            // (see https://github.com/l-lin/angular-datatables/issues/87)
            $('td', row).unbind('click');
            $('td', row).bind('click', () => {
              this.someClickHandler(rData);
            });
            return row;
          }
        };
      });
      console.log(data);
   	}

    someClickHandler(info: any) {
      this.router.navigate(['edit',  info.user_id], {relativeTo: this.route});
    }

    onNewUser() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }
}
