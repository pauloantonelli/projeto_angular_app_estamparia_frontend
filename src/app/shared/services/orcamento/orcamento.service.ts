import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlService } from '../../baseurl.service';
import { OrcamentoInterface } from './orcamento.interface';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(private url: BaseUrlService, private http: HttpClient) { }
  getOrcamentoAll(): any {
    return this.http.get<OrcamentoInterface>(this.url.baseUrl() + 'orcamento/todos');
  }
  setOrcamentoClienteAll(body: any) {
    return this.http.post<OrcamentoInterface>(this.url.baseUrl() + 'formulario/inserir', body);
  }
}
