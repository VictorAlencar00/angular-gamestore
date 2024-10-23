import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatPostalCode]',
  standalone: true,
})
export class FormatPostalCodeDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 9);
    }

    input.value = value;
  }
}
