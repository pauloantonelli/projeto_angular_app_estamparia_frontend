import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { BaseUrlService } from '../../baseurl.service';
import { RodapeInterface } from './rodape.interface';

@Injectable({
  providedIn: 'root'
})
export class RodapeService implements OnDestroy {

  protected inscricao: Subscription;

  public eventoCarregamento = new EventEmitter();

  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getRodapeAll(): any {
    const dados = this.http.get<RodapeInterface>(this.url.baseUrl() + 'rodape/todos');
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
  setRodapeCadastroEmail(body: any): any {
    return this.http.post<RodapeInterface>(this.url.baseUrl() + 'email/inserir', body);
  }
  carregamento(dados: any): any {
    return this.eventoCarregamento.emit(dados);
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
