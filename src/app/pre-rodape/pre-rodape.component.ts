import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreRodapeService } from '../shared/services/pre-rodape/pre-rodape.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pre-rodape',
  templateUrl: './pre-rodape.component.html',
  styleUrls: ['./pre-rodape.component.scss']
})
export class PreRodapeComponent implements OnInit, OnDestroy {

  private inscricao: Subscription;

  protected certificado01 = {
    titulo: '',
    imagem: '',
    descricao: '',
  };
  protected certificado02 = {
    titulo: '',
    imagem: '',
    descricao: '',
  };

  constructor(private http: PreRodapeService) { }

  ngOnInit() {
    this.inscricao = this.http.getPreRodapeAll().subscribe(
      (response) => {
        const dados = response[0];

        this.certificado01 = dados.certificado01;

        this.certificado02 = dados.certificado02;
      }
    );
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
