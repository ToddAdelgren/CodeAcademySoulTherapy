import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AppVarsService {

  user: User;
  provokerBeingDisplayed: number;

  constructor() {}

  getEmailAddress(): string {
    return this.user.EmailAddress;
  }

  setEmailAddress(emailAddress: string): void {
    this.user.EmailAddress = emailAddress;
  }

  getBeingDisplayed(): number {
    return this.provokerBeingDisplayed;
  }

  setBeingDisplayed(id: number): void {
    this.provokerBeingDisplayed = id;
  }

  setBeingDisplayedPrevious(): void {
    this.provokerBeingDisplayed = this.provokerBeingDisplayed - 1;
  }

  getLastFinished(): number {
    return this.user.ProvokerId;
  }

  setLastFinished(id: number): void {
    this.user.ProvokerId = id;
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
