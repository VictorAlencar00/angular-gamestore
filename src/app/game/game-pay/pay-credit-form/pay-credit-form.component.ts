import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CpfValidationService } from '../cpf-validation.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pay-credit-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './pay-credit-form.component.html',
  styleUrl: './pay-credit-form.component.scss',
})
export class PayCreditFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  cpfValidation = inject(CpfValidationService);

  paymentMethodChosen: string = '';

  chosenPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  creditForm: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    cardNumber: new FormControl(''),
    expireDate: new FormControl(''),
    cvv: new FormControl(''),
  });

  ngOnInit() {
    this.creditForm = this.formBuilder.group({
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern('\\d{3}(\\.\\d{3}){2}-\\d{2}|\\d{11}'),
        ],
      ],
      cardNumber: ['', [Validators.required, Validators.minLength(3)]],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  onCpfInput(event: Event) {
    this.cpfValidation.isCpfValid(event);
  }

  async onSubmitForm(): Promise<void> {
    if (this.creditForm.valid) {
    }
    if (!this.creditForm.valid) {
      alert('Purchase went wrong');
    }
  }
}
