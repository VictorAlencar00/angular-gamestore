import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'pay-debit-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './pay-debit-form.component.html',
  styleUrls: ['./pay-debit-form.component.scss', '../payment-form.styles.scss'],
})
export class PayDebitFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private countriesService: CountriesService,
  ) {}

  personalInfoStep: Boolean = true;
  cardInfoStep: Boolean = false;

  countries: any[] = [];

  paymentMethodChosen: string = '';

  chosenPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  debitForm!: FormGroup;

  ngOnInit() {
    this.countriesService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
    this.debitForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(3)]],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  arePersonalInfoValid(): boolean {
    const requiredFields = [
      'firstName',
      'lastName',
      'city',
      'adress',
      'postalCode',
    ];

    return requiredFields.every((field) => {
      const control = this.debitForm.get(field);
      // Certifique-se de que o controle existe e está válido
      return control && control.valid;
    });
  }

  async onSubmitForm(): Promise<void> {
    if (this.personalInfoStep && !this.cardInfoStep) {
      if (this.arePersonalInfoValid()) {
        this.changeStep();
      }
      return;
    }
    if (this.cardInfoStep && !this.personalInfoStep) {
      this.changeStep();
    }
  }

  changeStep() {
    this.personalInfoStep = !this.personalInfoStep;
    this.cardInfoStep = !this.cardInfoStep;
  }

  returnToLastStep() {
    this.onSubmitForm();
  }

  reloadPage() {
    window.location.reload();
  }
}
