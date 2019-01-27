import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
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
        console.log(this.conf.apiPath+'api/orders/'+this.login.lab_id+'::'+this.login.userId);
      	this.http.get(this.conf.apiPath+'api/orders/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
       		 this.data=uData;
           this.source = {
                localData: this.data,
                dataType: 'json',
                dataFields:
                [
                    { name: 'barcode', type: 'string' },
                    { name: 'order_date', type: 'string' },
                    { name: 'patient', type: 'string' },
                    { name: 'doctor', type: 'string' },
                    { name: 'collector', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'updated', type: 'string' },
                    { name: 'id', type: 'string' }
                ]
            };    
            this.dataAdapter = new jqx.dataAdapter(this.source);
            this.columns =
            [
                { text: 'Barcode', dataField: 'barcode', cellsRenderer: (row: any, column: any, value: any, rowData: any): string => {
                    let retval = '<a href="orders/edit/'+rowData.id+'">'+rowData.barcode+'</a>';
                    return retval;
                    }
                },
                { text: 'Ordered On', dataField: 'order_date'},
                { text: 'Patient', dataField: 'patient'},
                { text: 'Referred By', dataField: 'doctor'},
                { text: 'Sample Collector', dataField: 'collector'},
                { text: 'Status', dataField: 'status'},
                { text: 'Updated', dataField: 'updated'}
            ];
        }, error => console.error(error));
  	}

    onNewOrder() {
    	this.router.navigate(['new'], {relativeTo: this.route}); 
    }

    onEditRecord(id: string){
      	this.router.navigate(['edit',  id], {relativeTo: this.route});
    }
    
    onDeleteRecord(id: string){
      	this.ans = confirm('Are you sure, you want to delete?')
      	if(this.ans==true){
        	this.http.delete(this.conf.apiPath+'api/order/'+this.login.lab_id+'::'+id).subscribe(success => {
    	      	this.result = success;
        	  	if(this.result.message.type=='success'){
            		this.router.navigate(['/orders']);
          		} else {
            		this.errorMessage = this.result.message.msg;
            		return false;  
          		}
        	});
    	}
    }
}