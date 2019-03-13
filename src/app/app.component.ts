import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DetectaPlataformaService } from './shared/services/detecta-plataforma/detecta-plataforma.service';

import { StatusCarregamentoService } from './shared/services/carregamento/status-carregamento.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected mobile: boolean;
  protected pc: boolean;

  protected dynamic = 0;
  protected type: string;
  protected carregado: boolean;

  constructor(private plataforma: DetectaPlataformaService, private carregamento: StatusCarregamentoService) {
  }
  ngOnInit() {
    this.mobile = this.plataforma.mobile;
    this.pc = this.plataforma.pc;
    this.barraCarregamento(0);

    // menu
    this.inscricao = this.carregamento.getProgressoMenu().subscribe(
      (response) => {
        this.barraCarregamento(response);
      }
    );

    // home
    this.inscricao = this.carregamento.getProgressoHome().subscribe(
      (response) => {
        this.barraCarregamento(response);
      }
    );

    // Pre Rodape
    this.inscricao = this.carregamento.getProgressoPreRodape().subscribe(
      (response) => {
        this.barraCarregamento(response);
      }
    );

    // Portifolio
    this.inscricao = this.carregamento.getProgressoPortifolio().subscribe(
      (response) => {
        this.barraCarregamento(response);
      }
    );

    // Rodape
    this.inscricao = this.carregamento.getProgressoRodape().subscribe(
      (response) => {
        this.barraCarregamento(response);
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  barraCarregamento(porcentagem: number): void {
    const value = this.dynamic + porcentagem;
    let type: string;

    if (value < 25) {
      type = 'success';
      this.carregado = false;
    } else if (value < 50) {
      type = 'info';
      this.carregado = false;
    } else if (value < 75) {
      type = 'warning';
      this.carregado = false;
    } else {
      type = 'danger';
      this.carregado = true;
    }
    this.dynamic = value;
    this.type = type;
  }
}
