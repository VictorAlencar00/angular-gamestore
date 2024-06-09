import { Component, Input, OnInit, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'pay-credit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pay-credit-form.component.html',
  styleUrls: ['./pay-credit-form.component.css'],
})
export class PayCreditFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  @Input() testingInput: string = '';

  paymentMethodChosen: string = '';

  chosedPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  form: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    cardNumber: new FormControl(''),
    expireDate: new FormControl(''),
    cvv: new FormControl(''),
  });

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpf: ['', Validators.required],
      cardNumber: ['', Validators.required, Validators.minLength(3)],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }
}
