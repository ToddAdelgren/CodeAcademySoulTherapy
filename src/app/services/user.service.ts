import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  // Get the User from DynamoDB table SoulTherapyUser.
  getUser(emailAddress: string) {
    console.log(`user.service.emailAddress:${emailAddress}`);
    return this.http.get(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/user/${emailAddress}`);
  }

  // Store the User to the DynamoDB table SoulTherapyUser.
  user(emailAddress: string, password: string) {
    return this.http.post(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/user`, `{"EmailAddress":"${emailAddress}","Password":"${password}"}`);
  }
}
