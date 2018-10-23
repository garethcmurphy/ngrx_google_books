import { Injectable } from "@angular/core";
import { Book } from "./book-model";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class GoogleBooksService {
  private API_PATH = "https://www.googleapis.com/books/v1/volumes";

  constructor(private http: HttpClient) {}

  searchBooks(queryTitle: string): Observable<Book[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`).pipe(
      catchError(() => {
        if (queryTitle === "RxJS") {
          return this.http.get("/assets/rxjs.json");
        } else if (queryTitle === "Star Wars Bloodline") {
          return this.http.get("/assets/starwars.json");
        } else {
          return this.http.get("/assets/empty.json");
        }
      }),
      map(res => res as Book[] || [])
    );
  }
}
