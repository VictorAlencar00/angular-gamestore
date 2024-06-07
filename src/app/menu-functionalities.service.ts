import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuFunctionalitiesService {
  public searchSubject = new BehaviorSubject<string>('');

  setSearchedValue(value: string) {
    this.searchSubject.next(value);
  }
}
