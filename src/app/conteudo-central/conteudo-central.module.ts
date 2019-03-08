import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConteudoCentralComponent } from './conteudo-central.component';
import { ContatoComponent } from './contato/contato.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { SublimacaoComponent } from './sublimacao/sublimacao.component';

@NgModule({
  declarations: [
    ConteudoCentralComponent,
    ContatoComponent,
    OrcamentoComponent,
    SublimacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CarouselModule.forRoot(),
    MatSnackBarModule,
  ],
  exports: [
    ConteudoCentralComponent
  ]
})
export class ConteudoCentralModule { }
