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

  protected dynamic: number;
  protected type: string;
  protected carregado: boolean;

  constructor(private plataforma: DetectaPlataformaService, private carregamento: StatusCarregamentoService) {
    this.barraCarregamento(1);
  }
  ngOnInit() {
    this.mobile = this.plataforma.mobile;
    this.pc = this.plataforma.pc;
    this.barraCarregamento(3.3);

    this.inscricao = this.carregamento.getProgressoMenu().subscribe(
      (response) => {
        response.subscribe(
          (responseCarregamentoMenu) => {
            console.log(responseCarregamentoMenu);
            this.barraCarregamento(6.3);
          },
          (erro) => {
            this.barraCarregamento(9.3);
          },
          () => {
            this.barraCarregamento(12.3);
          }
        );
      },
      (erro) => {
        this.barraCarregamento(15.3);
      },
      () => {
        this.barraCarregamento(18.3);
      }
    );

  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  barraCarregamento(porcentagem: number): void {
    const value = porcentagem;
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
      this.carregado = false;
    }
    this.dynamic = value;
    this.type = type;
  }

}
