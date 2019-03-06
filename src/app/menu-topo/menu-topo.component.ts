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
    botoes: ['home', 'sublimacao', 'orcamento', 'contato'],
  };
  protected menuMobile: boolean;
  constructor(private http: MenuService) { }

  ngOnInit() {
    this.inscricao = this.http.getMenuAll().subscribe((res) => {
      const dados = res[0];

      this.logo = dados.logo.imagem;
    });
    this.menuMobile = true;

    const plataforma = () => {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        this.menuMobile = true;
      } else {
        this.menuMobile = false;
      }
      plataforma();
    };
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  ativaMenuMobile() {
    this.menuMobile = !this.menuMobile;
  }
}
