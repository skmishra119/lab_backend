import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
	bar: any = {
      cnt: ''
  	};
  	
  	barCounter = 0;
  	cDate: any = new Date();
  	codes: any = [];

  	constructor(private conf: Config,
    	private authService: AuthService, 
  		private sessionService: SessionService, 
  		private http: HttpClient,
  		private route: ActivatedRoute,
    	private router: Router) { 
    }

  	ngOnInit() {
  	
  	}
  
  	doSubmit() {
  		this.barCounter = 0;
  		this.codes= [];
  		for(this.barCounter=0;this.barCounter<this.bar.cnt;this.barCounter++){
  			this.cDate = new  Date();
  			this.codes.push(this.cDate.getTime()+this.barCounter);
  		}
  	}

}
