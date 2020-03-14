import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProvokerState } from 'src/app/store/reducers/provoker.reducer';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as provokerActions from 'src/app/store/actions/provoker.action';

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
  //provoker$: Observable<ProvokerState>;
  //provokerLastFinished: number

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<RootState>) {
      //this.provoker$ = store.pipe(select('provoker'));
    }

  ngOnInit(): void {
    //this.provoker$.subscribe(id => this.provokerLastFinished = id.lastFinished);
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
            // TODDDEBUG - line above will go away because
            // 1. user.emailaddress should be saved in state
            //this.store.dispatch(provokerActions.setLastFinished({id: this.user.ProvokerId}));
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
