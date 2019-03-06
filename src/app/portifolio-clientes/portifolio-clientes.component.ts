import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortifolioClientesService } from '../shared/services/portifolio-clientes/portifolio-clientes.service';

@Component({
  selector: 'app-portifolio-clientes',
  templateUrl: './portifolio-clientes.component.html',
  styleUrls: ['./portifolio-clientes.component.scss']
})
export class PortifolioClientesComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected portifolio = {
    titulo: '',
    subtitulo: '',
    imagens: [],
  };

  constructor(private http: PortifolioClientesService) { }

  ngOnInit() {
    this.inscricao = this.http.getPortifolioServiceAll().subscribe(
      (response) => {
        const dados = response[0];

        this.portifolio = dados.portifolio;
      }
    );
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
