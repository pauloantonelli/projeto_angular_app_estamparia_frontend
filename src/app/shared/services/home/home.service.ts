import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { BaseUrlService } from '../../baseurl.service';
import { HomeInterface } from './home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {

  protected inscricao: Subscription;

  public eventoCarregamento = new EventEmitter();

  constructor(private url: BaseUrlService, private http: HttpClient) {}
  getHomeAll(): any {
    const dados = this.http.get<HomeInterface>(this.url.baseUrl() + 'home/todos');
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
