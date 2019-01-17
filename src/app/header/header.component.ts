import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	user: any = [];
  	constructor(private authService: AuthService,  private sessionService: SessionService) { }

   	logout() {
    	this.authService.logout();
    	location.href = './';
  	}

  	ngOnInit() {
  		if(this.authService.isAuthorised()) {
  			this.user =  this.sessionService.getItem('userClaim');
  			console.log(this.sessionService.getItem('userClaim'));
  		}
  	}

}
