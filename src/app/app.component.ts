import { Component, OnInit } from '@angular/core';
import { DetectaPlataformaService } from './shared/services/detecta-plataforma/detecta-plataforma.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected mobile: boolean;
  protected pc: boolean;

  constructor(private plataforma: DetectaPlataformaService) {

  }
  ngOnInit() {
    this.mobile = this.plataforma.mobile;
    this.pc = this.plataforma.pc;
  };
}
