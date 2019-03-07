import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMostraEscondeSlide]'
})
export class MostraEscondeSlideDirective {

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) { }

  @HostBinding('style.backgroundColor') corFundo: string;

  @HostListener('mouseenter') alteraCor() {
    this.corFundo = 'red';
  }
  @HostListener('mouseleave') voltaCor() {
    this.corFundo = 'blue';
  }
}
