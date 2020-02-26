import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ProvokerService } from 'src/app/services/provoker.service';
import { JournalService } from 'src/app/services/journal.service';
import { JournalEntry } from 'src/app/interfaces/journal-entry.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})

export class JournalComponent implements OnInit {

  journalForm: FormGroup;
  hideInvalidJournalDate: boolean = true;
  hideInvalidJournalThoughts: boolean = true;
  hidePreviousBtn: boolean = true;
  showJournalDateRequired: boolean = false;
  showJournalThoughtsRequired: boolean = false;
  user: User;
  provoker: string = 'Loading... Please wait';
  defaultDate: string;

  constructor(private formBuilder: FormBuilder,
    private provokerService: ProvokerService,
    private journalService: JournalService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    let currentDate = new Date().toISOString().split('T')[0];

    this.defaultDate = currentDate.split('-')[1] + "/" + currentDate.split('-')[2] + "/" + currentDate.split('-')[0];

    this.journalForm = this.formBuilder.group({
      journalDate: [this.defaultDate, Validators.compose([Validators.required])],
      journalThoughts: ['', Validators.compose([Validators.required])],
      });

      this.user = JSON.parse(localStorage.getItem('user'));
      
      this.user.ProvokerId++
      
      // Get the Provoker entry.
      this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {
  
        this.provoker = data['Item']['Provoker'];
  
      });

      if (this.user.ProvokerId >= 2) {

        this.hidePreviousBtn = false;

      }
  }

  save(): void {
    
    // Clear values that may have been previously set.
    this.hideInvalidJournalDate = true;
    this.hideInvalidJournalThoughts = true;
    this.showJournalDateRequired = false;
    this.showJournalThoughtsRequired = false;

    if (this.journalForm.valid) {

      this.user = JSON.parse(localStorage.getItem('user'))

      this.user.ProvokerId++

      let journalEntry: JournalEntry = {
        EmailAddress: this.user.EmailAddress,
        ProvokerId: this.user.ProvokerId,
        JournalDate: this.journalForm.controls.journalDate.value,
        JournalThoughts: this.journalForm.controls.journalThoughts.value
      }

      // Save the Journal entry to the DynamoDB table SoulTherapyJournal.
      this.journalService.journal(journalEntry).subscribe((data: string) => {

        // Update the User's ProvokerId in DynamoDB table SoulTherapy
        this.userService.user(this.user).subscribe((data: string) => {

          // Clear out the input fields.
          this.provoker = 'Loading... Please wait';
          this.journalForm = this.formBuilder.group({
            journalDate: [this.defaultDate, Validators.compose([Validators.required])],
            journalThoughts: ['', Validators.compose([Validators.required])],
          });

          localStorage.setItem('user', JSON.stringify(this.user));

          this.user.ProvokerId++

          // Get the Provoker entry.
          this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {
      
            this.provoker = data['Item']['Provoker'];
      
          });

          if (this.user.ProvokerId >= 2) {

            this.hidePreviousBtn = false;
    
          }

        })

      });

    } else {

      this.showJournalDateRequired = !this.journalForm.controls.journalDate.valid;
      this.showJournalThoughtsRequired = !this.journalForm.controls.journalThoughts.valid;

    }
  }

  previous(): void {

    this.user = JSON.parse(localStorage.getItem('user'));

    console.log('previous clicked');
    console.log(this.user);

    console.log('NEXT LINE IS: this.journalService.getJournal');
    // Get the Journal entry
    this.journalService.getJournal(this.user, this.user.ProvokerId).subscribe((data: Object) => {
      
      console.log('back from http call');
      console.log(data);

      let journalEntry = data['Items'][0];

      console.log(journalEntry);
      console.log('journalEntry.JournalDate'+journalEntry.JournalDate);
      console.log('journalEntry.JournalThoughts'+journalEntry.JournalThoughts);

      this.journalForm = this.formBuilder.group({
        journalDate: [journalEntry.JournalDate, Validators.compose([Validators.required])],
        journalThoughts: [journalEntry.JournalThoughts, Validators.compose([Validators.required])],
      });

      // Get the Provoker entry.
      this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {
      
        this.provoker = data['Item']['Provoker'];
  
      });

      console.log('last check of user');
      console.log(this.user);

      this.user.ProvokerId--

      localStorage.setItem('user', JSON.stringify(this.user));
    
      if (this.user.ProvokerId >= 2) {

        this.hidePreviousBtn = false;

      } else {

        this.hidePreviousBtn = true;

      }

    });
    
  }
}
