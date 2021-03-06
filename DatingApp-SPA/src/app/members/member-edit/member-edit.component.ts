import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm',{static: true}) EditForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.EditForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user']
    });
    this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser(){
    this.userService.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.EditForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });


  }

  updateMainPhoto(photourl)
  {
    this.user.photoUrl = photourl;
  }

}
