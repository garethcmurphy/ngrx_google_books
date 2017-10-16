import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Book } from './book-model';
import { GoogleBooksService } from './google-books.service';

import { Store} from '@ngrx/store';
import * as SearchActions from './search-actions';
import * as fromRoot from './reducers';



@Component({
  selector: 'app-search',
  template: `
    <app-book-search [value]="terms | async" (search)="onSearch($event)"></app-book-search>
    
    <md-card>
      <md-card-title> Search Results: {{count | async}}</md-card-title>
    </md-card>

    <app-search-results [books]="books  | async"></app-search-results>
  `
})
export class SearchComponent {
  terms: Observable<string>;
  books: Observable<Book[]>;
  count: Observable<number>;


  constructor(
    private booksService: GoogleBooksService,
    private store: Store<fromRoot.State>
  ) {
    this.terms = store.select(state => state.search.searchTerms);
    this.books = store.select(state => state.search.results);
    this.count = store.select(state => state.search.results.length);
  }

  onSearch(terms: string) {
    this.store.dispatch(new SearchActions.Search(terms));
    this.booksService.searchBooks(terms)
      .subscribe(results => this.store.dispatch(new SearchActions.SearchSuccess(results)));
  }
}
