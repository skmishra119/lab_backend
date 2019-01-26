import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  	ans = false;
    data: any = [];
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
      	this.http.get(this.conf.apiPath+'api/products/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
        	this.data=uData;
        	this.source = {
                localData: this.data,
                dataType: 'json',
                dataFields:
                [
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'Category', type: 'string' },
                    { name: 'updated', type: 'string' },
                    { name: 'id', type: 'string' }
                ]
            };    
            this.dataAdapter = new jqx.dataAdapter(this.source);
            this.columns =
            [
                { text: 'Name', dataField: 'name', cellsRenderer: (row: any, column: any, value: any, rowData: any): string => {
                    let retval = '<a href="products/edit/'+rowData.id+'">'+rowData.name+'</a>';
                    return retval;
                    }
                },
                { text: 'Category', dataField: 'category'},
                { text: 'Description', dataField: 'description'},
                { text: 'Updated', dataField: 'updated'}
            ];
        }, error => console.error(error));  	
  	}

    onNewProduct() {
      this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      this.ans = confirm('Are you sure, you want to delete?')
      if(this.ans==true){
        this.http.delete(this.conf.apiPath+'api/product/'+this.login.lab_id+'::'+id).subscribe(success => {
          this.result =success;
          if(this.result.message.type=='success'){
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = this.result.message.msg;
            return false;  
          }
        });
      }
    }
}