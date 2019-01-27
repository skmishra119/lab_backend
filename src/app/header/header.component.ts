import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    logUser: any = [];
    authorized = false;

  	constructor(
      private authService: AuthService,  
      private sessionService: SessionService, 
      private router: Router, 
      private route: ActivatedRoute) { 
    }

   	logout() {
    	this.authService.logout();
    	this.router.navigate(['/login']);
  	}

  	ngOnInit() {
      this.authorized = this.authService.isAuthorised();
  		if(this.authService.isAuthorised()) {
  			this.logUser =  this.sessionService.getItem('userClaim');
  		} else {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
  	}

}
