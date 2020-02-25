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
  showJournalDateRequired: boolean = false;
  showJournalThoughtsRequired: boolean = false;
  user: User;
  provoker: string;

  constructor(private formBuilder: FormBuilder,
    private provokerService: ProvokerService,
    private journalService: JournalService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.journalForm = this.formBuilder.group({
      journalDate: ['', Validators.compose([Validators.required])],
      journalThoughts: ['', Validators.compose([Validators.required])],
      });

      this.user = JSON.parse(localStorage.getItem('user'));
      
      this.user.ProvokerId++
      
      // Get the Provoker entry.
      this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {
  
        this.provoker = data['Item']['Provoker'];
  
      });
  }

  save(): void {
    
    // Clear values that may have been previously set.
    this.hideInvalidJournalDate = true;
    this.hideInvalidJournalThoughts = true;
    this.showJournalDateRequired = false;
    this.showJournalThoughtsRequired = false;

    if (this.journalForm.valid) {

      let user = JSON.parse(localStorage.getItem('user'))

      user.ProvokerId++

      let journalEntry: JournalEntry = {
        EmailAddress: user.EmailAddress,
        ProvokerId: user.ProvokerId,
        JournalDate: this.journalForm.controls.journalDate.value,
        JournalThoughts: this.journalForm.controls.journalThoughts.value
      }

      console.log('before write to SoulTherapyJournal');
      console.log(journalEntry);
      // Save the Journal entry to the DynamoDB table SoulTherapyJournal.
      this.journalService.journal(journalEntry).subscribe((data: string) => {

        console.log('before write to SoulTherapyUser');
        console.log(user);
        // Update the User's ProvokerId in DynamoDB table SoulTherapy
        this.userService.user(user).subscribe((data: string) => {

          // Clear out the input fields.
          this.journalForm = this.formBuilder.group({
            journalDate: ['', Validators.compose([Validators.required])],
            journalThoughts: ['', Validators.compose([Validators.required])],
          });

          localStorage.setItem('user', JSON.stringify(this.user));

          console.log(`before ++:${this.user.ProvokerId}`);
          this.user.ProvokerId++
          console.log(`after ++:${this.user.ProvokerId}`);

          // Get the Provoker entry.
          this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {
      
            this.provoker = data['Item']['Provoker'];
      
          });

        })

      });

    } else {

      this.showJournalDateRequired = !this.journalForm.controls.journalDate.valid;
      this.showJournalThoughtsRequired = !this.journalForm.controls.journalThoughts.valid;

    }
  }
}
