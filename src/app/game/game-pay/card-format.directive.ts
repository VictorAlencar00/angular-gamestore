import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardGroupFormat]',
  standalone: true,
})
export class CardGroupFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
    const input = this.el.nativeElement.value.replace(/\D/g, '');

    const limitedInput = input.slice(0, 16);

    const formatted = this.formatCardNumber(limitedInput);

    this.el.nativeElement.value = formatted;
  }

  private formatCardNumber(value: string): string {
    const groupsOfFour = value.match(/.{1,4}/g);
    return groupsOfFour ? groupsOfFour.join(' ') : '';
  }
}
