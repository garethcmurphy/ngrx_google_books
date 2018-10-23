import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-search-results",
  template: `
    <div class="books">
      <mat-card *ngFor="let book of books" class="book">
        <mat-card-title-group>
          <img mat-card-sm-image
               *ngIf="book.volumeInfo.imageLinks?.smallThumbnail"
               [src]="book.volumeInfo.imageLinks?.smallThumbnail"/>
          <mat-card-title>{{ book.volumeInfo.title }}</mat-card-title>
        </mat-card-title-group>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      mat-card.book {
        width: 400px;
        height: 150px;
        margin: 15px;
      }

      div.books {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `
  ]
})
export class SearchResultsComponent implements OnInit {
  @Input()
  books;

  constructor() {}

  ngOnInit() {}
}
