import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

class category {
  id: string;
  name: string;
  description: string;
  parent: string;
  updated: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
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
        this.http.get(this.conf.apiPath+'api/categories/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
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
      this.http.get(this.conf.apiPath+'api/categories/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        //console.log(this.data);
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

    onNewCategory() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      this.ans = confirm('Are you sure, you want to delete?')
      if(this.ans==true){
        this.http.delete(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+id, this.category).subscribe(success => {
          if(success.message.type=='success'){
            this.router.navigate(['/categories']);
          } else {
            this.errorMessage = success.message.msg;
            return false;  
          }
        });
      }
    }
}