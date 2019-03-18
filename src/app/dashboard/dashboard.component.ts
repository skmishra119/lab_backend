import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  logUser: any = [];
  authorized = false;
  
  public ChartOptions_1 = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public ChartLabels_1 = ['Jan', 'Feb', 'March'];
    public ChartType_1 = 'bar';
    public ChartLegend_1 = true;
    public ChartData_1 = [
      {data: [65, 59, 63], label: 'Fresh'},
      {data: [48, 35, 49, 52], label: 'Repeat'}
    ];

    public Chart_2: any = [];

    public ChartOptions_2 = {
      responsive: true
    };
    public ChartLabels_2 = ['Orders', 'In-Progress', 'Delivered'];
    public ChartType_2 = 'pie';
    public ChartLegend_2 = true;
    public ChartData_2 = [80, 50, 30];
    
   
    public ChartOptions_3 = {
      responsive: true
    };
    public ChartLabels_3 = ['Orders', 'In-Progress', 'Delivered'];
    public ChartType_3 = 'doughnut';
    public ChartLegend_3 = true;
    public ChartData_3 = [8, 6, 2];

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
    constructor(private authService: AuthService,  
      private sessionService: SessionService, 
      private router: Router, 
      private route: ActivatedRoute) { 

    }

    ngOnInit() {
      this.authorized = this.authService.isAuthorised();
      if(this.authorized == false){
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
}