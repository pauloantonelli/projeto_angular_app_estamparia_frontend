import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { BaseUrlService } from '../../baseurl.service';
import { RodapeInterface } from '../rodape/rodape.interface';

@Injectable({
  providedIn: 'root'
})
export class PreRodapeService implements OnDestroy  {

  protected inscricao: Subscription;

  public eventoCarregamentoPreRodape = new EventEmitter();

  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getPreRodapeAll(): any {
    const dados = this.http.get<RodapeInterface>(this.url.baseUrl() + 'pre-rodape/todos');
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
    return this.eventoCarregamentoPreRodape.emit(dados);
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
