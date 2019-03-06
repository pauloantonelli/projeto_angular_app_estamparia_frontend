import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlService } from '../../baseurl.service';
import { PortifolioClientesInterface } from './portifolio-clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PortifolioClientesService {
  protected teste: any;
  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getPortifolioServiceAll(): any {
    return this.http.get<PortifolioClientesInterface>(this.url.baseUrl() + 'portifolio/todos');
  }
}
