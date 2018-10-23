import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { GoogleBooksService } from "./google-books.service";

import * as SearchActions from "./search-actions";

@Injectable()
export class BookEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    map((action: SearchActions.Search) => action.payload),
    switchMap(terms => this.booksService.searchBooks(terms)),
    map(results => new SearchActions.SearchSuccess(results))
  );

  constructor(
    private actions$: Actions,
    private booksService: GoogleBooksService
  ) {}
}
