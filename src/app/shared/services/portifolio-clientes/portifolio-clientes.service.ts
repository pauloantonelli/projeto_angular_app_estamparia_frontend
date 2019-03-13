import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { BaseUrlService } from '../../baseurl.service';
import { PortifolioClientesInterface } from './portifolio-clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PortifolioClientesService implements OnDestroy  {

  protected inscricao: Subscription;

  public eventoCarregamento = new EventEmitter();

  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getPortifolioServiceAll(): any {
    const dados = this.http.get<PortifolioClientesInterface>(this.url.baseUrl() + 'portifolio/todos');
    this.inscricao = dados.subscribe(
      (response) => {
        this.carregamento(20);
      },
      (erro) => {
        this.carregamento(0);
      }
    );
    return dados;
  }
  carregamento(dados: any): any {
    return this.eventoCarregamento.emit(dados);
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
