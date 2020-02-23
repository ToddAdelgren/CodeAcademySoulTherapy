import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './components/splash/splash.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SplashMainComponent } from './components/splash-main/splash-main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfuseComponent } from './components/terms-ofuse/terms-ofuse.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HeaderComponent,
    FooterComponent,
    SplashMainComponent,
    LoginComponent,
    SignupComponent,
    PrivacyPolicyComponent,
    TermsOfuseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
