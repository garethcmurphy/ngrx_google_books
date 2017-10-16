import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import * as fromRoot from './reducers';

@Component({
  selector: 'app-results-count',
  template: `
    <mat-card>
      <mat-card-title>Search results: {{count | async}}</mat-card-title>
    </mat-card>
  `,
  styles: [`
    mat-card-title,
    mat-card-content {
      display: flex;
      justify-content:: center;
    }
  `]
})
export class ResultsCountComponent implements OnInit {
  count: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.count = store.select(fromRoot.selectCount);
  }

  ngOnInit() {
  }

}
