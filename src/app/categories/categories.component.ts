import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
    ans = false;
    data: any = [];
    dtOptions: DataTables.Settings = {};
    login: any = [];
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
      this.http.get(this.conf.apiPath+'api/categories/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        this.data=uData;
        this.source = {
          localData: this.data,
          dataType: 'json',
          dataFields:
          [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'parent', type: 'string' },
            { name: 'updated', type: 'string' },
            { name: 'id', type: 'string' }
          ]
        };    
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns =
        [
          { text: 'Name', dataField: 'name', cellsRenderer: (row: any, column: any, value: any, rowData: any): string => {
            let retval = '<a href="categories/edit/'+rowData.id+'">'+rowData.name+'</a>';
                return retval;
            }
          },
          { text: 'Description', dataField: 'description'},
          { text: 'Child Of', dataField: 'parent'},
          { text: 'Updated', dataField: 'updated'}
        ];
      }, error => console.error(error));
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
        this.http.delete(this.conf.apiPath+'api/category/'+this.login.lab_id+'::'+id).subscribe(success => {
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
}