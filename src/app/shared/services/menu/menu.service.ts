import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { BaseUrlService } from '../../baseurl.service';
import { MenuInterface } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnDestroy {

  protected inscricao: Subscription;

  public eventoCarregamento = new EventEmitter();

  constructor(private http: HttpClient, private url: BaseUrlService) { }
  getMenuAll(): any {
    const dados = this.http.get<MenuInterface>(this.url.baseUrl() + 'menu/todos');
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
