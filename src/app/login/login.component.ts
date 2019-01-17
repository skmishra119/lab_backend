import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email_id: '',
    password: '',
    lab_id:''
  };

  labs: any = [];
  //[{"id":"","alias":"","name":"Select  One"}];

  errorMessage: string;

  /*const httpOptions = {
      headers: new HttpClient({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
      })
  };*/

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private http: HttpClient
  ) { }

  doLogin() {
    this.http.post('http://lab.bintechsol.com/backend/api/user/auth', this.user).subscribe(success => {
        if(success.message.type=='success'){
          this.errorMessage='';
          this.authService.userClaim.token = success.data[0].token;
          this.authService.userClaim.userId = success.data[0].id;
          this.authService.userClaim.fullName = success.data[0].fullname;
          this.authService.userClaim.lab_id = success.data[0].lab_id;
          this.authService.userClaim.isAuthenticated = true;
          this.sessionService.addItem('userClaim', this.authService.userClaim);
          //console.log(this.sessionService.getItem('userClaim'));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = success.message.msg;
          return false;  
        }
    });
  }

  ngOnInit() {
    if (this.authService.isAuthorised()) {
      this.router.navigate(['/dashboard']);
    }
    this.http.get('http://lab.bintechsol.com/backend/api/labs').subscribe(success => {
      this.labs = success;
    });
  }
}
