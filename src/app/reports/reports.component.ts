import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
	renderReport = '';
  	
  	constructor(private conf: Config,
      	private authService: AuthService, 
      	private sessionService: SessionService, 
      	private http: HttpClient, 
      	private router: Router, 
      	private route: ActivatedRoute) { 
    }

  	ngOnInit() {
  	
  	}

}
