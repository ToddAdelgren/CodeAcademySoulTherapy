import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showEmailRequired: boolean = false;
  showPassRequired: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      });
  }

  login(): void {

    // Clear values that may have been previously set.
    this.showEmailRequired = false;
    this.showPassRequired = false;

    if (this.loginForm.valid) {

      // Check DynamoDB table SoulTherapyUser to see if this email address is valid.
      this.userService.getUser(this.loginForm.value.emailAddress).subscribe((user: string) => {

        let userFromDB: any = user;

        if ("Item" in userFromDB) {

          // Email address is already being used. Show error messge. 
          document.getElementById("email-address").focus();


        } else {

          console.log('INVALID LOGIN')

        }
      });

    } else {

      
      this.showEmailRequired = !this.loginForm.controls.emailAddress.valid;
      this.showPassRequired = !this.loginForm.controls.password.valid;
    }
  }

}
