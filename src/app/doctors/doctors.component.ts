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
	data: any = [];
    dtOptions: DataTables.Settings = {};
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
      this.http.get(this.conf.apiPath+'api/doctors/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        this.dtOptions = {
          data: this.data,
          pageLength: 20,
          columns: [
            {
              title: 'Email ID',
              data: 'email_id'
            }, {
              title: 'Full Name',
              data: 'fullname'
            }, {
              title: 'Clinic',
              data: 'clinic'
            }, {
              title: 'Address',
              data: 'address'
            },{
              title: 'Contact No.',
              data: 'mobile'
            },  {
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
      this.router.navigate(['edit',  info.id], {relativeTo: this.route});
    }

    onNewDoctor() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }
}
