import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hideInvalidEmailPassword: boolean = true;
  showEmailRequired: boolean = false;
  showPassRequired: boolean = false;
  user: User;

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
      this.userService.getUser(this.loginForm.value.emailAddress).subscribe((data: Object) => {

        if ("Item" in data) {

          this.user = data['Item'];

          console.log(`formpassword:${this.loginForm.value.password}`);
          console.log(`dbpassword:${this.user.Password}`)

          if (this.user.Password != this.loginForm.value.password) {

            this.hideInvalidEmailPassword = false;

          } else {

            console.log('LOGIN IS VALID');
          }
          
        } else {

          this.hideInvalidEmailPassword = false;

        }
      });

    } else {

      this.showEmailRequired = !this.loginForm.controls.emailAddress.valid;
      this.showPassRequired = !this.loginForm.controls.password.valid;
    }
  }

}
