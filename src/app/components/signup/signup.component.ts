import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
      });
  }

  signup(){
    //if(this.signupForm.valid){
      console.log(`form emailAddress: ${this.signupForm.value.emailAddress}`);
      // Check DynamoDB table SoulTherapyUser to see if this email address is already being used.
      this.userService.getUser(this.signupForm.value.emailAddress).subscribe((user: string) => {
        let userFromDB: any = user;
        if ("Item" in userFromDB) {
          console.log('EMAIL ADDRESS IS ALREADY IN USE');
        } else {
          console.log('EMAIL ADDRESS IS NOT CURRENTLY BEING USED');
        }
      });
      //this.userStore.login(this.loginForm.value.username, this.loginForm.value.password);
    //}
  }
}
