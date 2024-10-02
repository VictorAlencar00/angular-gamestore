import { Component } from '@angular/core';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'loading-spinner',
  standalone: true,
  imports: [NgxSpinnerComponent],
  templateUrl: './loading-spinner.component.html',
})
export class LoadingSpinnerComponent {}
