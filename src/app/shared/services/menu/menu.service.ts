import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlService } from '../../baseurl.service';
import { MenuInterface } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public eventoCarregamentoMenu = new EventEmitter();

  constructor(private http: HttpClient, private url: BaseUrlService) { }
  getMenuAll(): any {
    const dados = this.http.get<MenuInterface>(this.url.baseUrl() + 'menu/todos');
    this.carregamentoMenu(dados);
    return dados;
  }
  carregamentoMenu(dados: any): any {
    this.eventoCarregamentoMenu.emit(dados);
  }
}
