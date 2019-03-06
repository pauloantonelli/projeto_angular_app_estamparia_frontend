import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../shared/services/home/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conteudo-central',
  templateUrl: './conteudo-central.component.html',
  styleUrls: ['./conteudo-central.component.scss']
})
export class ConteudoCentralComponent implements OnInit, OnDestroy {

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
  constructor(private http: HomeService) {
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
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  trackByIndex(index: number): any {
    return index;
  }
}
