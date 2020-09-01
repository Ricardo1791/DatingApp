import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  model: User;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  BsConfig: Partial<BsDatepickerConfig>;

  constructor(private authservice: AuthService, private alertify: AlertifyService, private fb: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.BsConfig = {
      containerClass: 'theme-red'
    }
  }

 createRegisterForm(){
   this.registerForm = this.fb.group({
     gender: ['male'],
     username: ['', Validators.required],
     knownAs: ['', Validators.required],
     dateOfBirth: [null, Validators.required],
     city: ['', Validators.required],
     country: ['', Validators.required],
     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
     confirmPassword: ['', Validators.required]
   }, {validators: this.passwordMatchValidator});
 }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true};
  }

  register(){
    if (this.registerForm.valid){
      this.model = Object.assign({}, this.registerForm.value);
      this.authservice.register(this.model).subscribe(() => {
          this.alertify.success('Registation succesfull!');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.authservice.login(this.model).subscribe(()=>{
            this.router.navigate(['/members']);
          });
        });
    }
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
