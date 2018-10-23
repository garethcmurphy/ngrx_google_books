import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, filter } from "rxjs/operators";

@Component({
  selector: "app-book-search",
  template: `
    <mat-card>
      <mat-card-title>Find a Book</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <input matInput placeholder="Search for a book" [formControl]="searchTerms">
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      input {
        width: 300px;
      }
    `
  ]
})
export class BookSearchComponent implements OnInit {
  searchTerms: FormControl = new FormControl();
  @Output()
  search = new EventEmitter<string>();

  @Input()
  set value(val: string) {
    this.searchTerms.setValue(val, { onlySelf: true, emitEvent: false });
  }

  ngOnInit() {
    this.searchTerms.valueChanges
      .pipe(
        debounceTime(500),
        filter(terms => terms !== "" && terms !== this.value)
      )
      .subscribe(this.search);
  }
}
