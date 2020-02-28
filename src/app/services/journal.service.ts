import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JournalEntry } from '../interfaces/journal-entry.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class JournalService {

  constructor(private http: HttpClient) { }

  // Get the Journal entry from DynamoDB table SoulTherapyJournal.
  getJournal(user: User, id: number) {

      let journalEntry: JournalEntry = {
        EmailAddress: user.EmailAddress,
        ProvokerId: id,
        JournalDate: '',
        JournalThoughts: ''
      }

      return this.http.get(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/journal/${user.EmailAddress}/${id}`);
  }

  // Store the Journal entry to the DynamoDB table SoulTherapyJournal.
  journal(journalEntry: JournalEntry) {
    return this.http.post(`https://30xu029kx1.execute-api.us-east-2.amazonaws.com/prod/journal/`, journalEntry);
  }
}