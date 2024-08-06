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
  selector: 'pay-debit-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './pay-debit-form.component.html',
  styleUrl: './pay-debit-form.component.scss',
})
export class PayDebitFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  cpfValidation = inject(CpfValidationService);

  paymentMethodChosen: string = '';

  chosenPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  debitForm: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    cardNumber: new FormControl(''),
    expireDate: new FormControl(''),
    cvv: new FormControl(''),
  });

  ngOnInit() {
    this.debitForm = this.formBuilder.group({
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
    if (this.debitForm.valid) {
    }
    if (!this.debitForm.valid) {
      alert('Purchase went wrong');
    }
  }
}
