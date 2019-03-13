import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuService } from '../shared/services/menu/menu.service';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.scss']
})
export class MenuTopoComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;

  protected logo = {
    imagem: '',
  };
  protected menus = {
    links: ['', 'sublimacao', 'orcamento', 'contato'],
    botoes: ['home', 'sublimacao', 'orcamento', 'contato'],
  };

  constructor(private http: MenuService) { }

  ngOnInit() {
    this.inscricao = this.http.getMenuAll().subscribe(
      (res) => {
      const dados = res[0];

      this.logo = dados.logo.imagem;
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
