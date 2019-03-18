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
  	
  	barSettings: any =  {
  		elementType: 'svg',
  		format: 'CODE128',
  		lineColor: '#000000',
  		width: 2,
  		height: 50,
  		displayValue: true,
  		fontOptions: '',
  		font: 'monospace',
  		textAlign: 'center',
  		textPosition: 'bottom',
  		textMargin: 2,
  		fontSize: 12,
  		background: '#ffffff',
  		margin: 10,
  		marginTop: 10,
  		marginBottom: 10,
  		marginLeft: 10,
  		marginRight: 10
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
