import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpfValidationService {
  constructor() {}

  public isCpfValid(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length > 11) {
      value = value.slice(0, 11); // Limit to 11 characters for CPF
    }

    // Format CPF with dots and dash
    input.value = this.formatCpf(value);
  }

  public formatCpf(value: string): string {
    if (value.length === 11) {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    }
    return value;
  }
}
