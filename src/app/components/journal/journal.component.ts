import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ProvokerService } from 'src/app/services/provoker.service';
import { JournalService } from 'src/app/services/journal.service';
import { JournalEntry } from 'src/app/interfaces/journal-entry.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProvokerState } from 'src/app/store/reducers/provoker.reducer';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as provokerActions from 'src/app/store/actions/provoker.action';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})

export class JournalComponent implements OnInit {

  journalForm: FormGroup;
  hideInvalidJournalDate: boolean = true;
  hideInvalidJournalThoughts: boolean = true;
  hideNextBtn: boolean = true;
  showJournalDateRequired: boolean = false;
  showJournalThoughtsRequired: boolean = false;
  user: User;
  provoker: string = 'Loading... Please wait';
  defaultDate: string;
  //provoker$: Observable<ProvokerState>;
  //provokerBeingDisplayed: number;
  //provokerLastFinished: number;

  constructor(private formBuilder: FormBuilder,
    private provokerService: ProvokerService,
    private journalService: JournalService,
    private userService: UserService,
    private router: Router,
    private store: Store<RootState>) {
      //this.provoker$ = store.pipe(select('provoker'));
    }

  ngOnInit(): void {
    //this.provoker$.subscribe(id => this.provokerBeingDisplayed = id.beingDisplayed);
    //this.provoker$.subscribe(id => this.provokerLastFinished = id.lastFinished);

    let currentDate = new Date().toISOString().split('T')[0];

    this.defaultDate = currentDate.split('-')[1] + "/" + currentDate.split('-')[2] + "/" + currentDate.split('-')[0];

    this.journalForm = this.formBuilder.group({
      journalDate: [this.defaultDate, Validators.compose([Validators.required])],
      journalThoughts: ['', Validators.compose([Validators.required])],
      });

      //this.store.dispatch(provokerActions.setBeingDisplayed({id: x}));
      
      // Get the Provoker entry.
      this.provokerService.getProvoker(this.provokerBeingDisplayed).subscribe((data: Object) => {
  
        //this.provoker = data['Item']['Provoker'];
  
      });

  }

  save(): void {
    
    // Clear values that may have been previously set.
    this.hideInvalidJournalDate = true;
    this.hideInvalidJournalThoughts = true;
    this.showJournalDateRequired = false;
    this.showJournalThoughtsRequired = false;

    if (this.journalForm.valid) {

      let journalEntry: JournalEntry = {
        EmailAddress: this.user.EmailAddress,
        ProvokerId: this.provokerBeingDisplayed,
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

          //this.store.dispatch(provokerActions.setLastFinished({id: this.provokerBeingDisplayed}))
          //this.store.dispatch(provokerActions.incrementBeingDisplayed());

          // Get the Provoker entry.
          this.provokerService.getProvoker(this.provokerBeingDisplayed).subscribe((data: Object) => {
      
            this.provoker = data['Item']['Provoker'];
      
          });

        })

      });

    } else {

      this.showJournalDateRequired = !this.journalForm.controls.journalDate.valid;
      this.showJournalThoughtsRequired = !this.journalForm.controls.journalThoughts.valid;

    }
  }

  previous(): void {

    //this.store.dispatch(provokerActions.reduceBeingDisplayed());

    // Get the Journal entry
    this.journalService.getJournal(this.user, this.provokerBeingDisplayed).subscribe((data: Object) => {

      let journalEntry = data['Items'][0];

      this.journalForm = this.formBuilder.group({
        journalDate: [journalEntry.JournalDate, Validators.compose([Validators.required])],
        journalThoughts: [journalEntry.JournalThoughts, Validators.compose([Validators.required])],
      });

      // Get the Provoker entry.
      this.provokerService.getProvoker(this.provokerBeingDisplayed).subscribe((data: Object) => {
      
        this.provoker = data['Item']['Provoker'];
  
      });

      this.hideNextBtn = false;

    });
    
  }

  next(): void {

    this.user.ProvokerId =+ 2;

    // Get the Journal entry
    this.journalService.getJournal(this.user, this.user.ProvokerId).subscribe((data: Object) => {

      if (data['Count'] === 0) {

        this.journalForm = this.formBuilder.group({
          journalDate: ['', Validators.compose([Validators.required])],
          journalThoughts: ['', Validators.compose([Validators.required])],
        });

      } else {

        let journalEntry = data['Items'][0];

        this.journalForm = this.formBuilder.group({
          journalDate: [journalEntry.JournalDate, Validators.compose([Validators.required])],
          journalThoughts: [journalEntry.JournalThoughts, Validators.compose([Validators.required])],
        });
      }
      
      // Get the Provoker entry.
      this.provokerService.getProvoker(this.user.ProvokerId).subscribe((data: Object) => {

        this.provoker = data['Item']['Provoker'];

      });

    });
  }
}
