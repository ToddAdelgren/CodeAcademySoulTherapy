import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ProvokerService } from 'src/app/services/provoker.service';

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
    private provokerService: ProvokerService) {}

  ngOnInit(): void {
    this.journalForm = this.formBuilder.group({
      journalDate: ['', Validators.compose([Validators.required])],
      journalThoughts: ['', Validators.compose([Validators.required])],
      });

      this.user = JSON.parse(localStorage.getItem('user'));
      
      // User has not made any Journal entries.
      if (this.user.Provoker === 0) {
        this.provokerService.getProvoker(1).subscribe((data: Object) => {
  
            this.provoker = data['Item']['Provoker'];
            console.log(`Provoker:${this.provoker}`);
  
        });
      }
  }

}
