import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  constructor(public spinner: NgxSpinnerService) {}

  public showLoadingSpinner() {
    this.spinner.show();
  }

  public hideLoadingSpinner() {
    this.spinner.hide();
  }
}
