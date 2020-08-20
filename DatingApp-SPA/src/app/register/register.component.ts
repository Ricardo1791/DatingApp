import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.authservice.register(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled...');
  }

}
