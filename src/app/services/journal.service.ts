import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JournalEntry } from '../interfaces/journal-entry.interface';

@Injectable({
  providedIn: 'root'
})

export class JournalService {

  constructor(private http: HttpClient) { }

  // Get the User from DynamoDB table SoulTherapyUser.
  //getUser(emailAddress: string) {
  //  return this.http.get(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/user/${emailAddress}`);
  //}

  // Store the Journal entry to the DynamoDB table SoulTherapyJournal.
  journal(journalEntry: JournalEntry) {
    return this.http.post(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/journal/`, journalEntry);
  }
}