import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected mobile: boolean;
  protected pc: boolean;

  constructor() {

  }
  ngOnInit() {
    this.plataforma();
    console.log(`pc: ${this.pc} mobile: ${this.mobile}`);
  }
  plataforma = () => {
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
  };
}
