import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide: boolean;
  hideAddressInUse: boolean = true;
  showEmailRequired: boolean = false;
  showPassRequired: boolean = false;
  showConfPassRequired: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
      });
  }

  signup(){

    // Clear values that may have been previously set.
    this.hideAddressInUse = true;
    this.showEmailRequired = false;
    this.showPassRequired = false;
    this.showConfPassRequired = false;

    if (this.signupForm.valid) {

      // Check DynamoDB table SoulTherapyUser to see if this email address is already being used.
      this.userService.getUser(this.signupForm.value.emailAddress).subscribe((user: string) => {

        let userFromDB: any = user;

        if ("Item" in userFromDB) {

          // Email address is already being used. Show error messge. 
          this.hideAddressInUse = false;
          document.getElementById("email-address").focus();


        } else {

          let user: User = {
            EmailAddress: this.signupForm.value.emailAddress,
            Password: this.signupForm.value.password,
            ProvokerId: 0
          }

          // Add the user to the DynamoDB table SoulTherapyUser
          this.userService.user(user).subscribe((result: string) => {

            this.router.navigate(['/login']);
            
          })
        }
      });

    } else {

      
      this.showEmailRequired = !this.signupForm.controls.emailAddress.valid;
      this.showPassRequired = !this.signupForm.controls.password.valid;
      this.showConfPassRequired = !this.signupForm.controls.confirmPassword.valid;
    }
  }
}
