import { Injectable } from '@angular/core';

import { MenuService } from '../menu/menu.service';
import { HomeService } from '../home/home.service';
import { PreRodapeService } from '../pre-rodape/pre-rodape.service';
import { PortifolioClientesService } from '../portifolio-clientes/portifolio-clientes.service';
import { RodapeService } from '../rodape/rodape.service';

@Injectable({
  providedIn: 'root'
})
export class StatusCarregamentoService {

  constructor(private menu: MenuService,
              private home: HomeService,
              private preRodape: PreRodapeService,
              private portifolio: PortifolioClientesService,
              private rodape: RodapeService,
    ) { }
  getProgressoMenu(): any {
    return this.menu.eventoCarregamento;
  }
  getProgressoHome(): any {
    return this.home.eventoCarregamento;
  }
  getProgressoPreRodape(): any {
    return this.preRodape.eventoCarregamentoPreRodape;
  }
  getProgressoPortifolio(): any {
    return this.portifolio.eventoCarregamento;
  }
  getProgressoRodape(): any {
    return this.rodape.eventoCarregamento;
  }
}
