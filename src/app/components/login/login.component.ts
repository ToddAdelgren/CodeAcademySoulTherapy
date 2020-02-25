import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router) {}

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

          // Email Address in DynamoDB table SoulTherapyUser,
          // database password not equal to entered password.
          if (this.user.Password != this.loginForm.value.password) {

            this.hideInvalidEmailPassword = false;

          } else {

            // Valid login.
            localStorage.setItem('user', JSON.stringify(this.user));
            this.router.navigate(['/journal']);
            
          }
          
        } else {

          // Email Address not in DynamoDB table SoulTherapyUser
          this.hideInvalidEmailPassword = false;

        }
      });

    } else {

      this.showEmailRequired = !this.loginForm.controls.emailAddress.valid;
      this.showPassRequired = !this.loginForm.controls.password.valid;
    }
  }

}
