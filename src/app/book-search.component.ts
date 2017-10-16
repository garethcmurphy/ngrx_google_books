import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  template: `
    <mat-card>
      <mat-card-title>Find a Book</mat-card-title>
      <mat-card-content>
        <mat-input-container>
          <input matInput placeholder="Search for a book" [formControl]="searchTerms">
        </mat-input-container>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card-title,
    mat-card-content {
      display: flex;
      justify-content: center;
    }
    input {
      width: 300px;
    }
  `]
})
export class BookSearchComponent implements OnInit {
  searchTerms: FormControl = new FormControl();

  @Input() set value(val: string) {
    this.searchTerms.setValue(val, { onlySelf: true, emitEvent: false });
  }

  @Output() search = new EventEmitter<string>();

  ngOnInit() {
    this.searchTerms
      .valueChanges
      .debounceTime(500)
      .filter(terms => terms !== '' && terms !== this.value)
      .subscribe(this.search);
  }
}
