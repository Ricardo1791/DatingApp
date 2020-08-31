import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  photourl: string;
  model: any = {};

  constructor(public authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photourl = photoUrl);
  }

  login(){
    this.authservice.login(this.model).subscribe(next => {
      this.alertify.success('Logged in succesfully');
    }, error => {
      this.alertify.error('error');
    }, () =>{
      this.router.navigate(['./members']);
    }
    );
  }

  loggedIn(){
    return this.authservice.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authservice.decodedToken = null;
    this.authservice.CurrentUser = null;

    this.alertify.success('logged out');
    this.router.navigate(['/home']);
  }
}
