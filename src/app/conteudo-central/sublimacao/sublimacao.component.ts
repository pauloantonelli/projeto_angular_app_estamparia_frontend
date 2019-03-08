import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';

import { SublimacaoService } from 'src/app/shared/services/sublimacao/sublimacao.service';

@Component({
  selector: 'app-sublimacao',
  templateUrl: './sublimacao.component.html',
  styleUrls: ['./sublimacao.component.scss'],
  preserveWhitespaces: true,
})
export class SublimacaoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected aviso = {
    ativo: false,
    mensagem: '',
  };
  protected poster = {
    titulo: [],
    imagem: [],
    descricao: [],
  };
  protected propaganda = {
    imagem:  [],
    titulo: [],
    descricao: [],
  };
  constructor(
    private http: SublimacaoService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.inscricao = this.http.getSublimacaoAll().subscribe(
      (res) => {
      const dados = res[0];

      this.aviso.ativo = dados.aviso.ativo;
      this.aviso.mensagem = dados.aviso.mensagem;
      this.snackBar.open(this.aviso.mensagem, 'Fechar', {
        duration: 60000,
      });

      this.poster.titulo = dados.poster.titulo;
      this.poster.imagem = dados.poster.imagem;
      this.poster.descricao = dados.poster.descricao;

      this.propaganda.imagem = dados.propaganda.imagem;
      this.propaganda.titulo = dados.propaganda.titulo;
      this.propaganda.descricao = dados.propaganda.descricao;
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  trackByIndex(indice: number): any{
    return indice;
  }
}
