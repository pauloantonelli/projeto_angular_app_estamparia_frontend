import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlService } from '../../baseurl.service';
import { ContatoInterface } from './contato.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private url: BaseUrlService, private http: HttpClient) { }
  getContatoAll() {
    return this.http.get<ContatoInterface>(this.url.baseUrl() + 'contato/todos');
  }
  setNovaMensagem(body: any): any {
    return this.http.post<ContatoInterface>(this.url.baseUrl() + 'mensagem-contato/inserir', body);
  }
}
