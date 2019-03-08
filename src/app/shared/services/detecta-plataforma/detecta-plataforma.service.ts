import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectaPlataformaService {

  public mobile: boolean;
  public pc: boolean;

  constructor() {
    const plataforma = () => {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        // navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        this.pc = false;
        this.mobile = true;
      } else {
        this.pc = true;
        this.mobile = false;
      }
      console.log(`pc: ${this.pc} mobile: ${this.mobile}`);
    };
    plataforma();
  }
}
