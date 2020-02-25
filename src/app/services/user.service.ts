import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  // Get the User from DynamoDB table SoulTherapyUser.
  getUser(emailAddress: string) {
    return this.http.get(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/user/${emailAddress}`);
  }

  // Store or update the User to the DynamoDB table SoulTherapyUser.
  user(user: User) {
    return this.http.post(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/user`, user);
  }

}
