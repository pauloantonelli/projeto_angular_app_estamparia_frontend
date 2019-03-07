import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuService } from '../shared/services/menu/menu.service';

@Component({
  selector: 'app-menu-topo-mobile',
  templateUrl: './menu-topo-mobile.component.html',
  styleUrls: ['./menu-topo-mobile.component.scss']
})
export class MenuTopoMobileComponent implements OnInit, OnDestroy {

  protected inscricao: Subscription;
  protected logo = {
    imagem: '',
  };
  protected menus = {
    botoes: ['home', 'sublimacao', 'orcamento', 'contato'],
  };
  protected menuMobile: boolean;
  constructor(private http: MenuService) { }

  ngOnInit() {
    this.inscricao = this.http.getMenuAll().subscribe((res) => {
      const dados = res[0];

      this.logo = dados.logo.imagem;
      this.menuMobile = false;
    });
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  ativaMenuMobile() {
    this.menuMobile = !this.menuMobile;
  }
}
