import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvokerService {

  constructor(private http: HttpClient) {}

  // Get the Provoker from DynamoDB table SoulTherapyProvoker.
  getProvoker(id: number) {
    return this.http.get(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/provoker/${id}`);
  }
}