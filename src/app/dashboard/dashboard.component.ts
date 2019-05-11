import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    logUser: any = [];
    authorized = false;
    message: string;
    ans = false;
    data: any = [];
    login: any = [];
    result: any = [];
    errorMessage= '';
    dataAdapter: any = [];
    source: any = [];

    public ChartOptions_1 = {
      scaleShowVerticalLines: false,
      responsive: true
    };


    public ChartLabels_1 = ['', '', ''];
    public ChartType_1 = 'bar';
    public ChartLegend_1 = true;
    public ChartData_1 = [
        {data: [], label: ''},
        {data: [], label: ''},
        {data: [], label: ''},
    ];

    public Chart_2: any = [];

    public ChartOptions_2 = {
        responsive: true
    };
    public ChartLabels_2 = ['', '', ''];
    public ChartType_2 = 'pie';
    public ChartLegend_2 = true;
    public ChartData_2 = [0, 0, 0];


    public ChartOptions_3 = {
        responsive: true
    };
    public ChartLabels_3 = ['', '',''];
    public ChartType_3 = 'doughnut';
    public ChartLegend_3 = true;
    public ChartData_3 = [0, 0, 0];

    public ChartOptions_4 = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public ChartLabels_4 = ['1', '2', '3', '4','5','6','7'];
    public ChartType_4 = 'line';
    public ChartLegend_4 = true;
    public ChartData_4 = [
    {data: [65, 59, 63, 68, 83, 90, 85], label: 'Orders'},
    {data: [28, 38, 42, 49, 46, 67, 41], label: 'In Progress'},
    {data: [38, 21, 21, 19, 37, 23, 44], label: 'Delivered'}
    ];
    
    constructor( 
        private conf: Config,
          private authService: AuthService, 
          private sessionService: SessionService, 
          private http: HttpClient, 
          private router: Router, 
          private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.authorized = this.authService.isAuthorised();
      if(this.authorized == false){
        this.authService.logout();
        this.router.navigate(['/login']);
      } else {
          
        this.login= this.sessionService.getItem('userClaim');
        this.http.get(this.conf.apiPath+'api/reports/'+this.login.lab_id+'::'+this.login.userId).subscribe(uData => {
            this.data=uData;
            if(this.data.order_this_month){

                this.ChartLabels_2[0] = this.data.order_this_month.order_status[0];
                this.ChartLabels_2[1] = this.data.order_this_month.order_status[1];
                this.ChartLabels_2[2] = this.data.order_this_month.order_status[2];

                this.ChartData_2 = this.data.order_this_month.graph_data
            }
            if(this.data.order_last_three_month){
                this.ChartLabels_1[0] = this.data.order_last_three_month.months[0];
                this.ChartLabels_1[1] = this.data.order_last_three_month.months[1];
                this.ChartLabels_1[2] = this.data.order_last_three_month.months[2];

                this.ChartData_1 = this.data.order_last_three_month.graph_data
            }

            if(this.data.order_last_seven_month){

                this.ChartLabels_3[0] = this.data.order_last_seven_month.order_status[0];
                this.ChartLabels_3[1] = this.data.order_last_seven_month.order_status[1];
                this.ChartLabels_3[2] = this.data.order_last_seven_month.order_status[2];

                this.ChartData_3 = this.data.order_last_seven_month.graph_data
            }

        }, error => console.error(error));
      }
    }
}