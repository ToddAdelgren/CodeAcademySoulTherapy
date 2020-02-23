import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
      });
  }

  signup(){
    console.log("signup()")
    //if(this.signupForm.valid){
      //console.log('DATA IS VALID');
      //this.userStore.login(this.loginForm.value.username, this.loginForm.value.password);
    //}
  }
}
