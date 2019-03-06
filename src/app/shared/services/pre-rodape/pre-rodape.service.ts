import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlService } from '../../baseurl.service';
import { RodapeInterface } from '../rodape/rodape.interface';

@Injectable({
  providedIn: 'root'
})
export class PreRodapeService {

  constructor(private http: HttpClient, private url: BaseUrlService) { }

  getPreRodapeAll(): any {
    return this.http.get<RodapeInterface>(this.url.baseUrl() + 'pre-rodape/todos');
  }
}
