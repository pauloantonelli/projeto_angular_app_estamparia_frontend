import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../../baseurl.service';
import { RodapeInterface } from './rodape.interface';

@Injectable({
  providedIn: 'root'
})
export class RodapeService {

  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getRodapeAll(): any {
    return this.http.get<RodapeInterface>(this.url.baseUrl() + 'rodape/todos');
  }
  setRodapeCadastroEmail(body: any): any {
    return this.http.post<RodapeInterface>(this.url.baseUrl() + 'email/inserir', body);
  }
}
