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
  getProgressoMenu() {
   return this.menu.eventoCarregamentoMenu;
  }
}
