import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { SearchComponent } from "./search.component";

import { GoogleBooksService } from "./google-books.service";
import { BookSearchComponent } from "./book-search.component";
import { SearchResultsComponent } from "./search-results.component";

import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers";
import { ResultsCountComponent } from "./results-count.component";

import { EffectsModule } from "@ngrx/effects";
import { BookEffects } from "./book-effects";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookSearchComponent,
    SearchResultsComponent,
    ResultsCountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    RouterModule.forRoot([{ path: "", component: SearchComponent }]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BookEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule {}
