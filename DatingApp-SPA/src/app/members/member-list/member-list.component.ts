import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  Users: User[];

  constructor(private userServie: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.Users = data["users"];
    });
    // this.loadUsers();
  }

  // loadUsers(){
  //   this.userServie.getUsers().subscribe((users: User[]) => {
  //     this.Users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
