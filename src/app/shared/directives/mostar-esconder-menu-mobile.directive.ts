import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMostarEsconderMenuMobile]'
})
export class MostarEsconderMenuMobileDirective {

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) { }

  @HostListener('click') revelaMenuMobile() {
    this.renderer2.setValue('target.style.display', 'block');
  }
}
