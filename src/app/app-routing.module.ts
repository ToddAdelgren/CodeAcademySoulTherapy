import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermsOfuseComponent } from './components/terms-ofuse/terms-ofuse.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { JournalComponent } from './components/journal/journal.component';


const routes: Routes = [
  {path: 'splash', component: SplashComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', redirectTo: '/splash'},
  {path: 'signup', component: SignupComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'terms-ofuse', component: TermsOfuseComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: '**', redirectTo: '/splash'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
