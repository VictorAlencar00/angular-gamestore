import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CardGroupFormatDirective } from '../card-format.directive';
import { CountriesService } from '../countries.service';
import { FormatPostalCodeDirective } from '../postal-code-format.directive';

@Component({
  selector: 'pay-card-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CardGroupFormatDirective,
    FormatPostalCodeDirective,
  ],
  templateUrl: './pay-card-form.component.html',
  styleUrls: ['./pay-card-form.component.scss', '../payment-form.styles.scss'],
})
export class PayCardFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private countriesService: CountriesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  personalInfoStep: Boolean = true;
  cardInfoStep: Boolean = false;

  countries: any[] = [];
  paymentMethodChosen: string = '';

  chosenPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  cardForm!: FormGroup;

  ngOnInit() {
    this.countriesService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
    this.cardForm = this.formBuilder.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^(?:\d{4} ){3}\d{4}$/)],
      ],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
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
      const control = this.cardForm.get(field);
      return control && control.valid;
    });
  }

  areCardInfoValid(): boolean {
    const requiredFields = ['cardNumber', 'expireDate', 'cvv'];

    return requiredFields.every((field) => {
      const control = this.cardForm.get(field);
      return control && control.valid;
    });
  }

  async isPostalCodeValid(): Promise<void> {
    const postalCodeControl = this.cardForm.get('postalCode');
    const postalCodeInput = document.querySelector('#postalCodeInput');

    if (!postalCodeControl) {
      return;
    }

    if (
      postalCodeControl.invalid &&
      (postalCodeControl.touched || postalCodeControl.dirty)
    ) {
      postalCodeInput?.classList.add('incorrectInput');
    } else postalCodeInput?.classList.remove('incorrectInput');
  }

  async validateAllPurchaseInfoInputs(
    overrideDirtyCheck: boolean = false,
  ): Promise<void> {
    const inputs = document.querySelectorAll('.purchaseInfoInput');

    inputs.forEach((input) => {
      const inputName = (input as HTMLInputElement).getAttribute(
        'formControlName',
      );
      if (!inputName) {
        return;
      }

      const control = this.cardForm.get(inputName);
      if (control) {
        if (control.invalid && (control.dirty || overrideDirtyCheck)) {
          input.classList.add('incorrectInput');
        } else if (!control.invalid) {
          input.classList.remove('incorrectInput');
        }
      }
    });
  }

  async onSubmitForm(): Promise<void> {
    this.validateAllPurchaseInfoInputs(true);
    if (
      this.personalInfoStep &&
      !this.cardInfoStep &&
      this.arePersonalInfoValid()
    ) {
      this.changeStep();
      return;
    } else if (this.cardInfoStep && this.areCardInfoValid()) {
      this.router.navigate(['confirmation'], { relativeTo: this.route });
    }
  }

  changeStep() {
    this.personalInfoStep = !this.personalInfoStep;
    this.cardInfoStep = !this.cardInfoStep;
    this.cdr.detectChanges();
  }

  returnToLastStep() {
    this.changeStep();
  }

  reloadPage() {
    window.location.reload();
  }
}
