import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {MatSnackBar} from '@angular/material';

import { HomeService } from '../shared/services/home/home.service';

@Component({
  selector: 'app-conteudo-central',
  templateUrl: './conteudo-central.component.html',
  styleUrls: ['./conteudo-central.component.scss']
})
export class ConteudoCentralComponent implements OnInit, OnDestroy {

  protected indiceSlide = 0;
  protected slideAtivo: boolean[] = [];

  protected aviso = {
    ativo: null,
    mensagem: '',
  };

  protected titulo = '';
  protected subtitulo = '';

  protected slides = {
    titulo: [],
    subtitulo: [],
    imagens: [],
  };

  protected propaganda01 = {
    imagem: '',
    titulo: '',
    descricao: '',
    subtitulo: '',
    lista: [],
    btnTxt: '',
  };

  protected propaganda02 = {
    imagem: '',
    titulo: '',
    descricao: '',
    subtitulo: '',
    lista: [],
    btnTxt: '',
  };

  private inscricao: Subscription;
  constructor(private http: HomeService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.inscricao = this.http.getHomeAll().subscribe(
      (res) => {
      const dados = res[0];

      this.aviso = dados.aviso;

      this.titulo = dados.titulo;
      this.subtitulo = dados.subtitulo;

      this.slides = dados.slides;

      this.propaganda01 = dados.propaganda01;

      this.propaganda02 = dados.propaganda02;

      if (this.aviso.ativo) {
        this.snackBar.open(this.aviso.mensagem, 'Fechar', {
          duration: 60000,
        });
      }
      this.geraSlides(0);
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  trackByIndex(index: number): any {
    return index;
  }

  anteriorImagem() {
    this.indiceSlide -= 1;
    if (this.indiceSlide < 0) {
      this.indiceSlide = this.slides.imagens.length - 1;
    }
    this.geraSlides(this.indiceSlide);
  }
  proximaImagem() {
    this.indiceSlide += 1;
    if (this.indiceSlide >= this.slides.imagens.length) {
      this.indiceSlide = 0;
    }
    this.geraSlides(this.indiceSlide);
  }

  geraSlides(indice: number) {
    this.slideAtual(indice);
  }
  slideAtual(indice: number) {
    for (let i = 0; i < this.slides.imagens.length; i++) {
        this.slideAtivo[i] = false;
      }
    this.slideAtivo[indice] = true;
  }
}
