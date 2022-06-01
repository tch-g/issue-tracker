import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() issue: Issue | undefined;
  @Output() formClose = new EventEmitter();
  issueForm: FormGroup | undefined;
selectOption = 'Select Option'


  constructor(private builder: FormBuilder, 
    private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [this.issue?.title, Validators.required],
      description: [this.issue?.description],
      priority: [this.issue?.priority, Validators.required],
      type: [this.issue?.type, Validators.required]
    });

  

  }

  save() {
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.value);
      this.formClose.emit();
    }
  }
  

}

  